// Types for the GitHub integration module. Mirrors
// api/app/modules/github/schemas.py.

import type { PrincipalStatus, PrincipalType } from "@/lib/mcp-types";

export type GithubAccountType = "Organization" | "User";
export type GithubInstallationStatus = "active" | "suspended" | "deleted";
export type GithubRepositorySelection = "all" | "selected";

export type GithubInstallation = {
  id: string;
  installation_id: number;
  account_login: string;
  account_type: GithubAccountType;
  account_avatar_url: string | null;
  repository_selection: GithubRepositorySelection;
  status: GithubInstallationStatus;
  repository_count: number;
  installed_at: string;
  suspended_at: string | null;
  last_synced_at: string | null;
};

export type GithubRepository = {
  id: string;
  installation_id: string;
  github_repo_id: number;
  name: string;
  full_name: string;
  default_branch: string | null;
  language: string | null;
  private: boolean;
  html_url: string;
  connected: boolean;
  github_updated_at: string | null;
};

export type GithubPermissionScope = {
  key: string;
  label: string;
  requested_level: string;
  granted_levels: string[];
};

export type GithubPermissionsResponse = {
  scopes: GithubPermissionScope[];
};

export type GithubStatusResponse = {
  app_configured: boolean;
  installation_count: number;
  repository_count: number;
  connected_repository_count: number;
  last_synced_at: string | null;
};

export type GithubInstallUrlResponse = {
  url: string;
};

export type GithubAccessMode = "all_repos" | "selected";
export type GithubAccessCellMode = "none" | GithubAccessMode;

export type GithubAccessRepository = {
  id: string;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  default_branch: string | null;
  language: string | null;
};

export type GithubAccessInstallation = {
  id: string;
  account_login: string;
  account_type: GithubAccountType;
  account_avatar_url: string | null;
  repository_count: number;
  repositories: GithubAccessRepository[];
};

export type GithubAccessCell = {
  mode: GithubAccessCellMode;
  repository_ids: string[];
};

export type GithubAccessMatrixPrincipal = {
  id: string;
  name: string;
  type: PrincipalType;
  status: PrincipalStatus;
  auth_user_id: string | null;
  installations: Record<string, GithubAccessCell>;
};

export type GithubAccessMatrix = {
  installations: GithubAccessInstallation[];
  principals: GithubAccessMatrixPrincipal[];
};

export type GithubAccessUpsert = {
  installation_id: string;
  mode: GithubAccessMode;
  repository_ids: string[];
};

export type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

export function githubManageUrl(installation: GithubInstallation): string {
  return installation.account_type === "Organization"
    ? `https://github.com/organizations/${installation.account_login}/settings/installations/${installation.installation_id}`
    : `https://github.com/settings/installations/${installation.installation_id}`;
}
