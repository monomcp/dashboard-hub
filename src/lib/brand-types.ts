// Shared types for the Brand DNA module (/brand).

export type VocabularyRules = {
  point_of_view: string | null;
  preferred_terms: string[];
  sentence_length: string | null;
  use_active_voice: boolean;
  prefer_plain_language: boolean;
};

export type BrandProfileResponse = {
  id: string;
  organization_id: string;
  name: string;
  website_url: string | null;
  industry: string | null;
  target_audience: string | null;
  product_description: string | null;
  value_proposition: string | null;
  positioning: string | null;
  primary_goal: string | null;
  secondary_goals: string[];
  created_at: string;
  updated_at: string;
};

export type BrandProfileUpsert = {
  name: string;
  website_url: string | null;
  industry: string | null;
  target_audience: string | null;
  product_description: string | null;
  value_proposition: string | null;
  positioning: string | null;
  primary_goal: string | null;
  secondary_goals: string[];
};

export type ToneOfVoiceResponse = {
  id: string;
  brand_id: string;
  style: string | null;
  formality_level: string | null;
  humor_level: string | null;
  emotional_tone: string | null;
  vocabulary_rules: VocabularyRules;
  words_to_use: string[];
  words_to_avoid: string[];
  writing_examples: string[];
  forbidden_claims: string[];
  created_at: string;
  updated_at: string;
};

export type ToneOfVoiceUpsert = Omit<
  ToneOfVoiceResponse,
  "id" | "brand_id" | "created_at" | "updated_at"
>;

export type VisualIdentityResponse = {
  id: string;
  brand_id: string;
  logo_url: string | null;
  primary_font: string | null;
  secondary_font: string | null;
  color_palette: string[];
  image_urls: string[];
  created_at: string;
  updated_at: string;
};

export type VisualIdentityUpsert = Omit<
  VisualIdentityResponse,
  "id" | "brand_id" | "created_at" | "updated_at"
>;

export type CompetitorResponse = {
  id: string;
  brand_id: string;
  name: string;
  website_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type CompetitorCreate = {
  name: string;
  website_url: string | null;
  notes: string | null;
};

export type CompetitorUpdate = Partial<CompetitorCreate>;
