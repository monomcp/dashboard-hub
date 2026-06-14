const API_BASE_URL = "https://api-1-bxq9.onrender.com";
class ApiError extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
function clearAuthTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("token_type");
}
function buildHeaders(init) {
  const accessToken = localStorage.getItem("access_token");
  const organizationId = localStorage.getItem("organization_id");
  const headers = new Headers(init.headers);
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
async function apiRequestText(path, init = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: buildHeaders(init)
  });
  const text = await response.text();
  if (!response.ok) {
    throw new ApiError(response.status, "Request failed");
  }
  return text;
}
async function apiRequest(path, init = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: buildHeaders(init)
  });
  if (response.status === 204) {
    return void 0;
  }
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const detail = typeof body?.detail === "string" ? body.detail : "Request failed";
    throw new ApiError(response.status, detail);
  }
  return body;
}
export {
  ApiError as A,
  apiRequest as a,
  apiRequestText as b,
  clearAuthTokens as c,
  API_BASE_URL as d
};
