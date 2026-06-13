// Drive "System" folder support.
//
// The System folder is a backend-managed Drive folder (`is_system === true`)
// that holds files the app writes on the user's behalf rather than files the
// user creates by hand — currently Brand DNA imagery. It is created lazily the
// first time something needs it and is surfaced read-only under its own entry
// in the Drive sidebar.
//
// Backend contract assumed by this module:
//   GET  /api/v1/drive-folders?system=true        -> page of system folders
//   POST /api/v1/drive-folders  { is_system: true } -> creates a system folder
//   GET  /api/v1/drive-files?folder_id=&kind=image  -> page of files in folder
//   POST /api/v1/drive-files (multipart)            -> uploads a file + bytes
//   DELETE /api/v1/drive-files/{id}                 -> removes a file
// Files in a "ready" state carry a `download_url` the browser can render.

import { apiRequest, API_BASE_URL } from "@/lib/api-client";

export const SYSTEM_FOLDER_NAME = "System";
export const BRAND_DNA_FOLDER_NAME = "Brand DNA";

export type DriveSystemFolder = {
  id: string;
  parent_folder_id: string | null;
  name: string;
  is_system: boolean;
  created_at: string;
  updated_at: string;
};

export type DriveSystemFile = {
  id: string;
  folder_id: string | null;
  name: string;
  kind: "document" | "image" | "video" | "pdf" | "other";
  mime_type: string | null;
  size_bytes: number | null;
  storage_status: "pending_upload" | "ready" | "failed";
  download_url: string | null;
  created_at: string;
  updated_at: string;
};

type Page<T> = { items: T[]; total: number; limit: number; offset: number };

// Renders a Drive file. Prefers the backend-provided signed URL and falls back
// to the content endpoint so a freshly created record still shows something.
export function driveFileSrc(file: DriveSystemFile): string {
  return file.download_url ?? `${API_BASE_URL}/api/v1/drive-files/${file.id}/content`;
}

async function findChildFolder(
  name: string,
  parentFolderId: string | null,
): Promise<DriveSystemFolder | null> {
  const params = new URLSearchParams({ q: name, limit: "50" });
  if (parentFolderId) params.set("parent_folder_id", parentFolderId);
  const page = await apiRequest<Page<DriveSystemFolder>>(
    `/api/v1/drive-folders?${params.toString()}`,
  );
  return page.items.find((f) => f.name === name && f.parent_folder_id === parentFolderId) ?? null;
}

// Returns the singleton System folder, creating it on first use.
export async function getOrCreateSystemFolder(): Promise<DriveSystemFolder> {
  const page = await apiRequest<Page<DriveSystemFolder>>(
    "/api/v1/drive-folders?system=true&limit=1",
  );
  if (page.items.length) return page.items[0];
  return apiRequest<DriveSystemFolder>("/api/v1/drive-folders", {
    method: "POST",
    body: JSON.stringify({ name: SYSTEM_FOLDER_NAME, parent_folder_id: null, is_system: true }),
  });
}

// Returns the "Brand DNA" subfolder under System, creating both as needed.
export async function getOrCreateBrandImagesFolder(): Promise<DriveSystemFolder> {
  const system = await getOrCreateSystemFolder();
  const existing = await findChildFolder(BRAND_DNA_FOLDER_NAME, system.id);
  if (existing) return existing;
  return apiRequest<DriveSystemFolder>("/api/v1/drive-folders", {
    method: "POST",
    body: JSON.stringify({
      name: BRAND_DNA_FOLDER_NAME,
      parent_folder_id: system.id,
      is_system: true,
    }),
  });
}

export async function listBrandImages(folderId: string): Promise<DriveSystemFile[]> {
  const params = new URLSearchParams({ folder_id: folderId, kind: "image", limit: "100" });
  const page = await apiRequest<Page<DriveSystemFile>>(`/api/v1/drive-files?${params.toString()}`);
  return page.items;
}

export async function uploadBrandImage(folderId: string, file: File): Promise<DriveSystemFile> {
  const body = new FormData();
  body.append("file", file);
  body.append("folder_id", folderId);
  body.append("kind", "image");
  // Let the browser set the multipart boundary; apiRequest only forces JSON
  // when Content-Type is unset *and* a body exists, so pass FormData directly.
  return apiRequest<DriveSystemFile>("/api/v1/drive-files", {
    method: "POST",
    body,
    headers: {},
  });
}

export async function deleteBrandImage(fileId: string): Promise<void> {
  await apiRequest<void>(`/api/v1/drive-files/${fileId}`, { method: "DELETE" });
}
