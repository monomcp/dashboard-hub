// Types for the Pinterest MCP module. Mirrors
// api/app/modules/pinterest/schemas.py (PinterestFieldsResponse,
// PinterestSettingsUpdate) and the field catalog in fields.py.

export type PinterestResource = "search" | "pin";

export type PinterestFieldInfo = {
  name: string;
  // Required fields are always returned and cannot be toggled off.
  required: boolean;
  // Whether this field is currently included by default for the org.
  default: boolean;
  description: string;
};

export type PinterestResourceFields = {
  resource: PinterestResource;
  fields: PinterestFieldInfo[];
};

export type PinterestFieldsResponse = {
  resources: PinterestResourceFields[];
  allow_agent_field_override: boolean;
};

export type PinterestSettingsUpdate = {
  search_default_fields: string[];
  pin_default_fields: string[];
  allow_agent_field_override: boolean;
};

export const RESOURCE_LABELS: Record<PinterestResource, string> = {
  search: "Search results",
  pin: "Pin detail",
};
