# Skill: CMS Content Publish Agent

## When to use
Use this skill when the user has a content **draft** and wants it published as a **Blog** article in the CMS, so that a visitor can open the Blog page, see the newly created article in the listing, click it, and read the article detail. Every CMS read, write, and publish step must go through MonoMCP MCP tools — no direct DB writes, no private HTTP calls, no filesystem edits.

## Goal
Bridge a `content`-toolkit draft into a published `cms`-toolkit Blog entry, then prove the public reader journey:

- The article shows up in the Blog listing (the public Blog page).
- Clicking the card/link opens the article detail page.
- The detail page renders the intended title, summary/metadata, and body.

## Architecture (how the two toolkits connect)
The draft and the published article live in **different** toolkits:

- **`content` toolkit** — the editorial pipeline. A draft (`content.get_draft`) carries `title`, `slug`, `meta_title`, `meta_description`, `body_markdown`, `body_html`, `excerpt`, `featured_image_prompt`, `author`, and a lifecycle status. Drafts belong to a calendar item.
- **`cms` toolkit** — the publishable content store. The Blog is a **collection content type**; each article is an **entry** with one or more **entry locales**; publishing happens at the entry-locale level.

This agent reads the draft from `content.*`, maps its fields onto the Blog schema discovered from `cms.*`, creates the entry, publishes the locale, and (optionally) writes the lifecycle status back to the source draft/calendar item.

## Inputs required
- **Draft reference** — a `draft_id`, or a `calendar_item_id` to look up its latest draft, or raw draft fields (title + body at minimum).
- **Publish intent / approval** — explicit "publish it", or a draft already at status `approved` / `ready_to_publish`. Without one of these, stop and ask.
- **Target Blog collection** — content type UID/name if the user knows it (otherwise discover it).
- **Locale** — defaults to `en` if unspecified.
- **Optional** — category/tags/author/hero image/SEO overrides, and a desired slug.

## MCP tools used
Tools are namespaced `<toolkit>.<function>` (the MCP-exposed name). Use these deterministic tools; do not invent names.

Read the draft (source):
- `content.get_draft` — fetch one draft by id.
- `content.list_drafts` — list drafts for a calendar item (newest version first); filter by status.
- `content.get_calendar_item` — context for the draft (format should be `blog_post`).

Discover the Blog schema (target):
- `cms.content_types_list` — find collection content types (`kind=collection`).
- `cms.content_type_get_by_uid` — get the Blog type by its uid (e.g. `article`, `blog-post`).
- `cms.content_type_get` / `cms.fields_list` — inspect field keys, `field_type`, required/unique/enum/slug rules, and whether draft/publish + localization are enabled.

Avoid duplicates:
- `cms.entries_list` — list Blog entries (filter by `q` on title/slug, and by `status`).
- `cms.entry_get` — inspect a candidate entry and its locales.

Create / write the article:
- `cms.entry_create` — create the entry + first locale (`content_type_id`, `locale`, `title`, `slug`, `data`, `seo`, `meta`).
- `cms.entry_locale_update` — save a draft version of the locale's content (`title`, `slug`, `data`, `seo`, `meta`).
- `cms.entry_locale_get` — read locale back to confirm draft vs published state.
- `cms.seo_profile_upsert` — write the locale's SEO profile (full upsert — omitted fields reset).

Media (only if a real image asset exists):
- `cms.media_folder_get` — get the org's CMS media drive folder (upload files there first).
- `cms.entry_media_attach` — link an already-uploaded drive file to a media field.

Publish:
- `cms.entry_locale_publish` — publish the current draft of the entry locale.
- `cms.entry_locale_unpublish` / `cms.entry_locale_rollback` — recover if a wrong version went live.

Write status back to the pipeline (optional but recommended):
- `content.set_draft_status` — move the source draft forward.
- `content.set_calendar_item_status` — set the calendar item to `published`.

Verify the public reader journey (browser MCP, server-agnostic):
- Browser tools (`mcp__claude-in-chrome__*`, or `mcp__Claude_Preview__*` for a local preview) to open the Blog listing, find the new title, click through, and read the detail page.

Gateway behavior to respect:
- Write/publish tools may resolve to `needs_approval`; the call returns a pending request. Poll the built-in `approval_status` tool and re-call with identical arguments once approved. A `blocked` permission means stop and tell the user.

## Workflow
1. **Confirm publish intent.** If the user said "publish", proceed. If the draft is only `approved`/`ready_to_publish` and the user asked to publish, proceed. Otherwise stop and request approval — never publish on assumption.

2. **Load the draft.** `content.get_draft` (or `content.list_drafts` for a calendar item → newest). Capture `title`, `slug`, body (`body_html` preferred for rich text, else `body_markdown`), `excerpt`, `meta_title`, `meta_description`, `author`, `featured_image_prompt`.

3. **Discover the Blog collection.** `cms.content_types_list(kind="collection")`; match the user's target or a `blog`/`article`/`post`-like uid. Then `cms.fields_list` to learn exact field **keys** and types. If several Blog-like collections exist, ask which one.

4. **Map draft → schema.** Build the `data` dict using the discovered field keys, not guesses:
   - title → `title`; slug → `slug` (generate a URL-safe slug from the title if absent).
   - body → the rich_text/markdown/long_text body field (convert format to match the field's `field_type`).
   - excerpt/summary → the matching field.
   - author → author text/relation field.
   - meta_title/meta_description → `seo` on `entry_create` or `cms.seo_profile_upsert` afterward.
   - Do not fabricate required values (category/enum/relation) — discover defaults or ask.

5. **Check for duplicates.** `cms.entries_list(content_type_id, q=<slug or title>)`. Reuse/update an existing **unpublished** entry only if the user asked to update or it clearly matches. If a **published** duplicate exists, stop and ask: update, new version, or cancel.

6. **Create or update the entry.** `cms.entry_create(...)` with the mapped `data`/`seo`. If creation and content are split, follow with `cms.entry_locale_update`. Attach media only when a real uploaded asset exists (`cms.media_folder_get` → `cms.entry_media_attach`); a `featured_image_prompt` alone is not an image.

7. **Read back before publishing.** `cms.entry_locale_get` and confirm stored `title`, `slug`, and body match the intended draft.

8. **Publish.** `cms.entry_locale_publish(entry_locale_id)`. If it returns `needs_approval`, poll `approval_status` and re-call unchanged once approved. Confirm the locale status is `published` and a published version id exists. Record entry id, locale id, slug, published version id.

9. **Close the loop in the pipeline.** Optionally `content.set_draft_status` and `content.set_calendar_item_status(item_id, "published")`.

10. **Verify CMS state.** `cms.entries_list(content_type_id, status="published")` and `cms.entry_get` — confirm the new article is present and fields match.

11. **Verify the public Blog UI (the user's ask).** With browser MCP tools: open the Blog page, confirm the new title appears in the listing, click the card/link, and confirm the detail URL and visible title + summary + representative body text. If the public site is eventually consistent, retry briefly before reporting failure.

12. **Report.** Title, CMS ids, publish status, Blog listing URL, article detail URL, and the verification outcome.

## Output format
- **Published article** — title and slug.
- **CMS identifiers** — content type id, entry id, entry-locale id, published version id.
- **Public URLs** — Blog listing URL and article detail URL.
- **Verification checklist** — listing-shows / click-opens-detail / detail-renders, each pass/fail.
- **Follow-ups** — only if manual action remains (missing hero image, fallback category, delayed indexing).

## Rules
- Every CMS and verification action goes through MCP tools. No direct DB, private API, or filesystem writes.
- Keep **draft writes** (`entry_create`/`entry_locale_update`) separate from the **publish** action (`entry_locale_publish`).
- Never publish unless the user explicitly asked or the draft is approved/ready-to-publish.
- Discover required schema values from `cms.fields_list`; do not invent enum/relation/required fields.
- Do not overwrite a **published** duplicate without explicit user approval.
- Map to exact schema field **keys**, not fuzzy text insertion.
- Respect gateway permissions: handle `needs_approval` via `approval_status`; stop on `blocked`.
- Verify **both** CMS data and the real Blog UI before declaring success. If UI verification fails post-publish, report it as "published but not yet user-visible" with the failing step and likely cause (cache/routing/indexing).

## Edge cases
- **No Blog collection** — report it and list available collection content types from `cms.content_types_list`.
- **Required field can't be inferred** — ask before `entry_create`.
- **Slug conflict** — generate a unique slug only if the schema allows; otherwise ask.
- **Locale unsupported** — publish in the default locale (`en`) and report the locale used.
- **Body format mismatch** — convert the draft body to the field's `field_type` (markdown ↔ rich_text/blocks) before writing.
- **Hero image referenced but not uploaded** — publish without it only with user approval, or attach an existing drive file; never treat `featured_image_prompt` as an asset.
- **Publish gated by approval** — surface the pending approval, poll `approval_status`, re-call with identical args; do not duplicate the entry while waiting.
- **Published but Blog UI stale** — confirm CMS published state, retry the UI with short backoff, then report cache/routing as the likely blocker.
