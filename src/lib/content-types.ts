// Shared types and helpers for the content pipeline (/content).

export type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

export type IdeaStatus = "idea" | "approved" | "rejected" | "planned" | "drafting";
export type CalendarFormat =
  | "blog_post"
  | "landing_page"
  | "comparison_page"
  | "case_study"
  | "tutorial"
  | "seo_glossary"
  | "product_update"
  | "thought_leadership";
export type CalendarStatus =
  | "planned"
  | "brief_ready"
  | "drafting"
  | "draft_ready"
  | "in_review"
  | "needs_revision"
  | "approved"
  | "scheduled"
  | "published"
  | "failed"
  | "archived";
export type BriefStatus = "draft" | "approved" | "needs_revision";
export type DraftStatus =
  | "draft_created"
  | "seo_checked"
  | "brand_checked"
  | "fact_checked"
  | "human_review"
  | "needs_revision"
  | "approved"
  | "rejected"
  | "ready_to_publish";

export type StrategyResponse = {
  id: string;
  brand_id: string;
  goals: Record<string, unknown>;
  target_personas: string[];
  funnel_stages: string[];
  seo_clusters: string[];
  distribution_channels: string[];
  success_metrics: string[];
  publishing_frequency: string | null;
  auto_approve_threshold: string | null;
  created_at: string;
  updated_at: string;
};

export type PillarResponse = {
  id: string;
  strategy_id: string;
  name: string;
  description: string | null;
  target_persona: string | null;
  funnel_stage: string | null;
  example_topics: string[];
  priority: number;
};

export type IdeaResponse = {
  id: string;
  brand_id: string;
  pillar_id: string | null;
  title: string;
  angle: string | null;
  target_keyword: string | null;
  secondary_keywords: string[];
  funnel_stage: string | null;
  intent: string | null;
  priority_score: string | null;
  status: IdeaStatus;
  seo_score: string | null;
  business_score: string | null;
  funnel_relevance_score: string | null;
  difficulty_score: string | null;
  product_relevance_score: string | null;
  conversion_score: string | null;
  freshness_score: string | null;
  total_score: string | null;
  recommendation: string | null;
  rejection_reason: string | null;
  created_at: string;
};

export type CalendarItemResponse = {
  id: string;
  brand_id: string;
  content_idea_id: string;
  title: string | null;
  format: CalendarFormat;
  channel: string | null;
  planned_publish_date: string | null;
  assigned_agent: string | null;
  status: CalendarStatus;
};

export type BriefResponse = {
  id: string;
  calendar_item_id: string;
  title: string;
  target_keyword: string | null;
  search_intent: string | null;
  audience: string | null;
  angle: string | null;
  cta: string | null;
  language: string | null;
  outline: string[];
  internal_links: unknown[];
  external_references: string[];
  product_mentions: string[];
  required_sections: string[];
  forbidden_topics: string[];
  status: BriefStatus;
};

export type DraftResponse = {
  id: string;
  calendar_item_id: string;
  brief_id: string | null;
  title: string;
  slug: string | null;
  meta_title: string | null;
  meta_description: string | null;
  body_markdown: string | null;
  body_html: string | null;
  excerpt: string | null;
  featured_image_prompt: string | null;
  author: string | null;
  version: number;
  status: DraftStatus;
  updated_at: string;
};

export const SCORE_FIELDS = [
  ["seo_score", "SEO"],
  ["business_score", "Business"],
  ["funnel_relevance_score", "Funnel"],
  ["difficulty_score", "Difficulty"],
  ["product_relevance_score", "Product"],
  ["conversion_score", "Conversion"],
  ["freshness_score", "Freshness"],
] as const;

export const CALENDAR_FORMATS: CalendarFormat[] = [
  "blog_post",
  "landing_page",
  "comparison_page",
  "case_study",
  "tutorial",
  "seo_glossary",
  "product_update",
  "thought_leadership",
];

export const CALENDAR_STATUSES: CalendarStatus[] = [
  "planned",
  "brief_ready",
  "drafting",
  "draft_ready",
  "in_review",
  "needs_revision",
  "approved",
  "scheduled",
  "published",
  "failed",
  "archived",
];

export const BRIEF_STATUSES: BriefStatus[] = ["draft", "approved", "needs_revision"];

export const DRAFT_STATUSES: DraftStatus[] = [
  "draft_created",
  "seo_checked",
  "brand_checked",
  "fact_checked",
  "human_review",
  "needs_revision",
  "approved",
  "rejected",
  "ready_to_publish",
];

export function statusLabel(value: string) {
  return value.replace(/_/g, " ");
}

export const STATUS_BADGES: Record<string, string> = {
  // ideas
  idea: "bg-slate-100 text-slate-700",
  rejected: "bg-rose-100 text-rose-700",
  // shared
  approved: "bg-emerald-100 text-emerald-700",
  planned: "bg-sky-100 text-sky-700",
  drafting: "bg-amber-100 text-amber-700",
  // calendar
  brief_ready: "bg-indigo-100 text-indigo-700",
  draft_ready: "bg-violet-100 text-violet-700",
  in_review: "bg-amber-100 text-amber-700",
  needs_revision: "bg-orange-100 text-orange-700",
  scheduled: "bg-cyan-100 text-cyan-700",
  published: "bg-emerald-100 text-emerald-700",
  failed: "bg-rose-100 text-rose-700",
  archived: "bg-slate-200 text-slate-600",
  // briefs / drafts
  draft: "bg-amber-100 text-amber-700",
  draft_created: "bg-slate-100 text-slate-700",
  seo_checked: "bg-sky-100 text-sky-700",
  brand_checked: "bg-indigo-100 text-indigo-700",
  fact_checked: "bg-violet-100 text-violet-700",
  human_review: "bg-amber-100 text-amber-700",
  ready_to_publish: "bg-emerald-100 text-emerald-700",
};

export function badgeClass(status: string) {
  return STATUS_BADGES[status] ?? "bg-slate-100 text-slate-700";
}

// Line-per-item textarea helpers for JSON list fields.
export function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function listToLines(value: unknown[]): string {
  return (value ?? [])
    .map((item) => (typeof item === "string" ? item : JSON.stringify(item)))
    .join("\n");
}
