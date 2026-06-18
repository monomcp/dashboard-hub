// Shared types and helpers for the social content pipeline (/content, Social mode).

import { badgeClass } from "@/lib/content-types";

export type { Page } from "@/lib/content-types";

export type SocialIdeaFormat =
  | "reel"
  | "story"
  | "carousel"
  | "meme"
  | "single_post"
  | "thread"
  | "short"
  | "pin";
export type SocialIdeaSourceType =
  | "manual"
  | "competitor"
  | "ugc"
  | "blog"
  | "event"
  | "trend";
export type SocialIdeaStatus = "idea" | "approved" | "rejected" | "planned";
export type SocialCalendarStatus =
  | "planned"
  | "brief_created"
  | "brief_approved"
  | "brief_rejected"
  | "draft_created"
  | "draft_approved"
  | "draft_rejected"
  | "creative_ready"
  | "qa_pending"
  | "needs_revision"
  | "approved"
  | "scheduled"
  | "published"
  | "failed"
  | "archived";
export type SocialBriefStatus = "draft" | "approved" | "needs_revision";
export type SocialDraftStatus =
  | "draft_created"
  | "variant_selected"
  | "qa_pending"
  | "needs_revision"
  | "approved"
  | "rejected"
  | "scheduled"
  | "published";

export type SocialPlatform = {
  id: string;
  slug: string;
  name: string;
};

export type SocialStrategyResponse = {
  id: string;
  brand_id: string;
  goals: Record<string, unknown>;
  target_audiences: unknown[];
  platforms: string[];
  content_mix: unknown[];
  posting_frequency: Record<string, unknown>;
  engagement_strategy: Record<string, unknown>;
  growth_strategy: Record<string, unknown>;
  kpis: string[];
  constraints: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

export type SocialIdeaResponse = {
  id: string;
  brand_id: string;
  platform_id: string;
  pillar_id: string | null;
  format: SocialIdeaFormat;
  title: string;
  hook: string | null;
  angle: string | null;
  source_type: SocialIdeaSourceType;
  source_id: string | null;
  viral_potential_score: string | null;
  brand_fit_score: string | null;
  effort_score: string | null;
  status: SocialIdeaStatus;
  rejection_reason: string | null;
  created_at: string;
};

export type SocialCalendarItemResponse = {
  id: string;
  brand_id: string;
  social_idea_id: string;
  platform_id?: string | null;
  platform_slug?: string | null;
  platform_name?: string | null;
  title: string | null;
  planned_publish_at: string | null;
  timezone: string | null;
  assigned_agent: string | null;
  campaign_id: string | null;
  status: SocialCalendarStatus;
};

export type SocialCalendarRescheduleResponse = {
  id: string;
  calendar_item_id: string;
  previous_planned_publish_at: string | null;
  planned_publish_at: string;
  reason: string | null;
  created_at: string;
};

export type SocialBriefResponse = {
  id: string;
  calendar_item_id: string;
  title: string;
  objective: string | null;
  audience: string | null;
  hook: string | null;
  key_message: string | null;
  creative_direction: Record<string, unknown>;
  caption_direction: string | null;
  visual_requirements: Record<string, unknown>;
  cta: string | null;
  references: unknown[];
  assets_needed: unknown[];
  forbidden_topics: unknown[];
  status: SocialBriefStatus;
};

export type SocialBriefReviewResponse = {
  id: string;
  brief_id: string;
  decision: "approved" | "needs_revision";
  reviewer: string | null;
  feedback: string | null;
  created_at: string;
};

export type SocialDraftResponse = {
  id: string;
  brief_id: string;
  caption: string;
  hook: string | null;
  text_overlays: unknown[];
  hashtags: string[];
  mentions: string[];
  cta: string | null;
  creative_spec: Record<string, unknown>;
  selected_variant_id: string | null;
  selected_variant_reason: string | null;
  status: SocialDraftStatus;
  updated_at: string;
};

export type SocialVariantResponse = {
  id: string;
  draft_id: string;
  caption: string;
  hook: string | null;
  text_overlays: unknown[];
  hashtags: string[];
  mentions: string[];
  cta: string | null;
  creative_spec: Record<string, unknown>;
  created_at: string;
};

export const SOCIAL_SCORE_FIELDS = [
  ["viral_potential_score", "Viral potential"],
  ["brand_fit_score", "Brand fit"],
  ["effort_score", "Effort"],
] as const;

export const SOCIAL_IDEA_FORMATS: SocialIdeaFormat[] = [
  "reel",
  "story",
  "carousel",
  "meme",
  "single_post",
  "thread",
  "short",
  "pin",
];

export const SOCIAL_SOURCE_TYPES: SocialIdeaSourceType[] = [
  "manual",
  "competitor",
  "ugc",
  "blog",
  "event",
  "trend",
];

export const SOCIAL_CALENDAR_STATUSES: SocialCalendarStatus[] = [
  "planned",
  "brief_created",
  "brief_approved",
  "brief_rejected",
  "draft_created",
  "draft_approved",
  "draft_rejected",
  "creative_ready",
  "qa_pending",
  "needs_revision",
  "approved",
  "scheduled",
  "published",
  "failed",
  "archived",
];

export const SOCIAL_BRIEF_STATUSES: SocialBriefStatus[] = [
  "draft",
  "approved",
  "needs_revision",
];

export const SOCIAL_DRAFT_STATUSES: SocialDraftStatus[] = [
  "draft_created",
  "variant_selected",
  "qa_pending",
  "needs_revision",
  "approved",
  "rejected",
  "scheduled",
  "published",
];

export const SOCIAL_STATUS_BADGES: Record<string, string> = {
  brief_created: "bg-indigo-100 text-indigo-700",
  brief_approved: "bg-emerald-100 text-emerald-700",
  brief_rejected: "bg-rose-100 text-rose-700",
  draft_approved: "bg-emerald-100 text-emerald-700",
  draft_rejected: "bg-rose-100 text-rose-700",
  creative_ready: "bg-violet-100 text-violet-700",
  qa_pending: "bg-amber-100 text-amber-700",
  variant_selected: "bg-indigo-100 text-indigo-700",
};

export function socialBadgeClass(status: string) {
  return SOCIAL_STATUS_BADGES[status] ?? badgeClass(status);
}
