export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function clearAuthTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("token_type");
}

function buildHeaders(init: RequestInit): Headers {
  const accessToken = localStorage.getItem("access_token");
  const organizationId = localStorage.getItem("organization_id");
  const headers = new Headers(init.headers);

  // FormData sets its own multipart Content-Type (with boundary); forcing JSON
  // here would corrupt the request, so only default JSON for other bodies.
  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (organizationId) {
    headers.set("X-Organization-Id", organizationId);
  }
  return headers;
}

export async function apiRequestText(path: string, init: RequestInit = {}): Promise<string> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: buildHeaders(init),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new ApiError(response.status, "Request failed");
  }
  return text;
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: buildHeaders(init),
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = typeof body?.detail === "string" ? body.detail : "Request failed";
    throw new ApiError(response.status, detail);
  }

  return body as T;
}
