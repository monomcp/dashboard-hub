import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery, a as useQueryClient, b as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AppsMenu, a as AccountMenu, P as Popover, b as PopoverTrigger, c as PopoverContent } from "./account-menu-C0NsdiGi.mjs";
import { E as EnableMcpServerButton } from "./enable-mcp-server-button-CO3RX209.mjs";
import { a as PermissionsMatrixLoading, d as darkPermissionsTheme, P as PermissionsMatrix } from "./permissions-matrix-C2_ILwvs.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { B as Button, c as cn } from "./button-BXrfXN_b.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-BupjB1aY.mjs";
import { A as ApiError, c as clearAuthTokens, a as apiRequest, d as API_BASE_URL } from "./api-client-CDT_AGSo.mjs";
import { I as Input } from "./input-DwaGuH4D.mjs";
import { L as Label } from "./label-Brw405F4.mjs";
import { S as Skeleton } from "./skeleton-F-7As_y7.mjs";
import { T as Textarea } from "./textarea-BBisE2jS.mjs";
import { b as Route$1 } from "./router-BFhvHQx8.mjs";
import { M as Menu, aN as Dna, f as Search, g as CircleQuestionMark, h as Settings, aO as MessageSquareQuote, aP as Swords, aA as KeyRound, S as ShieldCheck, ab as LoaderCircle, aQ as Save, aR as ChevronsUpDown, al as X, a6 as Check, an as Link2, o as Pencil, a8 as Upload, v as Trash2, aS as ImagePlus, z as Plus, E as ExternalLink, e as SlidersHorizontal, aL as Plug, at as MousePointerClick, a7 as User, ag as Bot } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./alert-dialog-DpCH8EKh.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
const Command = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = _e.displayName;
const CommandInput = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = _e.Input.displayName;
const CommandList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = _e.List.displayName;
const CommandEmpty = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = _e.Empty.displayName;
const CommandGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = _e.Group.displayName;
const CommandSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = _e.Separator.displayName;
const CommandItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = _e.Item.displayName;
async function listFonts(params = {}) {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  search.set("limit", String(params.limit ?? 200));
  if (params.offset) search.set("offset", String(params.offset));
  return apiRequest(`/api/v1/brand/fonts?${search.toString()}`);
}
let catalogPromise = null;
function loadFontCatalog() {
  if (!catalogPromise) {
    catalogPromise = listFonts({ limit: 300 }).then((page) => page.items).catch((err) => {
      catalogPromise = null;
      throw err;
    });
  }
  return catalogPromise;
}
const PREVIEW_SUBSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
function fontStack(family) {
  return `'${family.replace(/'/g, "")}', system-ui, sans-serif`;
}
function googleFontsHref(families, text) {
  const unique = [...new Set(families.map((f) => f.trim()).filter(Boolean))];
  if (!unique.length) return "";
  const family = unique.map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}`).join("&");
  const textParam = text ? `&text=${encodeURIComponent(text)}` : "";
  return `https://fonts.googleapis.com/css2?${family}${textParam}&display=swap`;
}
function ensureGoogleFonts(families, key, text = PREVIEW_SUBSET) {
  if (typeof document === "undefined") return;
  const id = `gf-${key}`;
  const href = googleFontsHref(families, text ?? void 0);
  let link = document.getElementById(id);
  if (!href) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  if (link.href !== href) link.href = href;
}
function useGoogleFonts(families, key, text = PREVIEW_SUBSET) {
  const signature = families.join("|");
  reactExports.useEffect(() => {
    ensureGoogleFonts(families, key, text);
  }, [signature, key, text]);
}
function FontPicker({
  id,
  value,
  onChange,
  placeholder = "Select a font"
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [catalog, setCatalog] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!open || catalog.length || loading) return;
    setLoading(true);
    setError(false);
    loadFontCatalog().then(setCatalog).catch(() => setError(true)).finally(() => setLoading(false));
  }, [open, catalog.length, loading]);
  reactExports.useEffect(() => {
    if (catalog.length)
      ensureGoogleFonts(
        catalog.map((f) => f.family),
        "catalog"
      );
  }, [catalog]);
  reactExports.useEffect(() => {
    if (value) ensureGoogleFonts([value], "selected");
  }, [value]);
  const select = (family) => {
    onChange(family);
    setOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        id,
        type: "button",
        role: "combobox",
        "aria-expanded": open,
        className: "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-white/10 bg-[#202318] px-3 text-sm text-[#e8eadb] transition hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cfe09a]/40",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn("truncate", !value && "text-[#c4c8b0]/45"),
              style: value ? { fontFamily: fontStack(value) } : void 0,
              children: value || placeholder
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContent,
      {
        align: "start",
        className: "max-h-[min(420px,var(--radix-popover-content-available-height))] w-[var(--radix-popover-trigger-width)] overflow-hidden border-white/10 bg-[#202318] p-0 text-[#e8eadb]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { className: "bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CommandInput,
            {
              placeholder: "Search fonts…",
              className: "text-[#e8eadb] placeholder:text-[#c4c8b0]/45"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { className: "max-h-[320px] overflow-y-auto overscroll-contain", children: [
            loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-6 text-sm text-[#c4c8b0]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
              " Loading fonts…"
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6 text-center text-sm text-rose-200", children: "Could not load fonts." }),
            !loading && !error && /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "No fonts found." }),
            value && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              CommandItem,
              {
                value: "clear current font selection none",
                onSelect: () => select(""),
                className: "gap-2 text-[#c4c8b0] data-[selected=true]:bg-white/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
                  " Clear selection"
                ]
              }
            ),
            catalog.map((font) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              CommandItem,
              {
                value: font.family,
                onSelect: () => select(font.family),
                className: "flex items-center justify-between gap-3 text-[#e8eadb] data-[selected=true]:bg-white/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Check,
                      {
                        className: cn(
                          "h-4 w-4 shrink-0 text-[#cfe09a]",
                          value === font.family ? "opacity-100" : "opacity-0"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "truncate text-base",
                        style: { fontFamily: fontStack(font.family) },
                        children: font.family
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs text-[#c4c8b0]/70", children: font.category })
                ]
              },
              font.id
            ))
          ] })
        ] })
      }
    )
  ] });
}
const SYSTEM_FOLDER_NAME = "System";
const BRAND_DNA_FOLDER_NAME = "Brand DNA";
function driveFileSrc(file) {
  return file.download_url ?? `${API_BASE_URL}/api/v1/drive-files/${file.id}/content`;
}
async function findChildFolder(name, parentFolderId) {
  const params = new URLSearchParams({ q: name, limit: "50" });
  if (parentFolderId) params.set("parent_folder_id", parentFolderId);
  const page = await apiRequest(
    `/api/v1/drive-folders?${params.toString()}`
  );
  return page.items.find((f) => f.name === name && f.parent_folder_id === parentFolderId) ?? null;
}
async function getOrCreateSystemFolder() {
  const page = await apiRequest(
    "/api/v1/drive-folders?system=true&limit=1"
  );
  if (page.items.length) return page.items[0];
  return apiRequest("/api/v1/drive-folders", {
    method: "POST",
    body: JSON.stringify({ name: SYSTEM_FOLDER_NAME, parent_folder_id: null, is_system: true })
  });
}
async function getOrCreateBrandImagesFolder() {
  const system = await getOrCreateSystemFolder();
  const existing = await findChildFolder(BRAND_DNA_FOLDER_NAME, system.id);
  if (existing) return existing;
  return apiRequest("/api/v1/drive-folders", {
    method: "POST",
    body: JSON.stringify({
      name: BRAND_DNA_FOLDER_NAME,
      parent_folder_id: system.id,
      is_system: true
    })
  });
}
async function listBrandImages(folderId) {
  const params = new URLSearchParams({ folder_id: folderId, kind: "image", limit: "100" });
  const page = await apiRequest(`/api/v1/drive-files?${params.toString()}`);
  return page.items;
}
async function sha256Hex(file) {
  const digest = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function uploadBrandImage(folderId, file) {
  const checksum = await sha256Hex(file);
  const mimeType = file.type || "application/octet-stream";
  const { file: created, upload_url, upload_headers } = await apiRequest("/api/v1/drive-files/uploads", {
    method: "POST",
    body: JSON.stringify({
      name: file.name,
      folder_id: folderId,
      kind: "image",
      mime_type: mimeType,
      size_bytes: file.size,
      checksum_sha256: checksum
    })
  });
  const uploadResponse = await fetch(upload_url, {
    method: "PUT",
    headers: upload_headers,
    body: file
  });
  if (!uploadResponse.ok) {
    throw new Error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`);
  }
  return apiRequest(`/api/v1/drive-files/${created.id}/complete-upload`, {
    method: "POST",
    body: JSON.stringify({
      etag: uploadResponse.headers.get("ETag") ?? void 0,
      size_bytes: file.size,
      checksum_sha256: checksum
    })
  });
}
async function deleteBrandImage(fileId) {
  await apiRequest(`/api/v1/drive-files/${fileId}`, { method: "DELETE" });
}
const ACTIVITY_PAGE_SIZE = 50;
const NAV = [{
  id: "dna",
  label: "Brand DNA",
  icon: Dna
}, {
  id: "tov",
  label: "ToV",
  icon: MessageSquareQuote
}, {
  id: "competitors",
  label: "Competitors",
  icon: Swords
}, {
  id: "permissions",
  label: "Permissions",
  icon: KeyRound
}, {
  id: "activity",
  label: "Activity",
  icon: ShieldCheck
}];
const EMPTY_PROFILE_FORM = {
  name: "",
  website_url: "",
  industry: "",
  target_audience: "",
  product_description: "",
  value_proposition: "",
  positioning: "",
  primary_goal: "",
  secondary_goals: ""
};
const EMPTY_TONE_FORM = {
  style: "",
  formality_level: "",
  humor_level: "",
  emotional_tone: "",
  point_of_view: "",
  preferred_terms: "",
  sentence_length: "",
  use_active_voice: true,
  prefer_plain_language: true,
  words_to_use: "",
  words_to_avoid: "",
  writing_examples: "",
  forbidden_claims: ""
};
const EMPTY_VISUAL_FORM = {
  logo_url: "",
  primary_font: "",
  secondary_font: "",
  color_palette: "",
  image_urls: ""
};
const EMPTY_COMPETITOR_FORM = {
  name: "",
  website_url: "",
  notes: ""
};
const card = "rounded-3xl bg-[#33362a] p-6 ring-1 ring-white/5";
const cardTitle = "text-sm font-medium text-[#e8eadb]";
const mutedText = "text-sm leading-relaxed text-[#e8eadb]/75";
const inputClass = "border-white/10 bg-[#202318] text-[#e8eadb] placeholder:text-[#c4c8b0]/45";
const textareaClass = "min-h-24 border-white/10 bg-[#202318] text-[#e8eadb] placeholder:text-[#c4c8b0]/45";
function BrandDnaPage() {
  const navigate = useNavigate();
  const view = Route$1.useParams().view;
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const setView = reactExports.useCallback((next) => {
    void navigate({
      to: "/brand/$view",
      params: {
        view: next
      }
    });
  }, [navigate]);
  const [profile, setProfile] = reactExports.useState(null);
  const [tone, setTone] = reactExports.useState(null);
  const [visual, setVisual] = reactExports.useState(null);
  const [competitors, setCompetitors] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [mutating, setMutating] = reactExports.useState(false);
  const [images, setImages] = reactExports.useState([]);
  const [imagesFolderId, setImagesFolderId] = reactExports.useState(null);
  const [imageBusy, setImageBusy] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const [profileOpen, setProfileOpen] = reactExports.useState(false);
  const [toneOpen, setToneOpen] = reactExports.useState(false);
  const [visualOpen, setVisualOpen] = reactExports.useState(false);
  const [competitorOpen, setCompetitorOpen] = reactExports.useState(false);
  const [editingCompetitor, setEditingCompetitor] = reactExports.useState(null);
  const [profileForm, setProfileForm] = reactExports.useState(EMPTY_PROFILE_FORM);
  const [toneForm, setToneForm] = reactExports.useState(EMPTY_TONE_FORM);
  const [visualForm, setVisualForm] = reactExports.useState(EMPTY_VISUAL_FORM);
  const [competitorForm, setCompetitorForm] = reactExports.useState(EMPTY_COMPETITOR_FORM);
  const {
    data: catalog
  } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest("/api/v1/mcp-catalog"),
    staleTime: 60 * 1e3
  });
  const brandServer = catalog?.find((s) => s.slug === "brand");
  const handleApiError = reactExports.useCallback((err, fallback = "Brand request failed") => {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      clearAuthTokens();
      void navigate({
        to: "/login",
        replace: true
      });
      return;
    }
    setError(err instanceof Error ? err.message : fallback);
  }, [navigate]);
  const loadBrand = reactExports.useCallback(async () => {
    setLoading(true);
    setError("");
    const emptyOn404 = async (path) => {
      try {
        return await apiRequest(path);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
      }
    };
    const results = await Promise.allSettled([emptyOn404("/api/v1/brand/profile"), emptyOn404("/api/v1/brand/tone-of-voice"), emptyOn404("/api/v1/brand/visual-identity"), apiRequest("/api/v1/brand/competitors")]);
    let sawError = false;
    results.forEach((result) => {
      if (result.status === "rejected") {
        sawError = true;
        handleApiError(result.reason);
      }
    });
    if (!sawError) {
      setProfile(results[0].status === "fulfilled" ? results[0].value : null);
      setTone(results[1].status === "fulfilled" ? results[1].value : null);
      setVisual(results[2].status === "fulfilled" ? results[2].value : null);
      setCompetitors(results[3].status === "fulfilled" ? results[3].value : []);
    }
    setLoading(false);
  }, [handleApiError]);
  reactExports.useEffect(() => {
    void loadBrand();
  }, [loadBrand]);
  const loadImages = reactExports.useCallback(async () => {
    try {
      const folder = await getOrCreateBrandImagesFolder();
      setImagesFolderId(folder.id);
      setImages(await listBrandImages(folder.id));
    } catch (err) {
      handleApiError(err, "Could not load brand images");
    }
  }, [handleApiError]);
  reactExports.useEffect(() => {
    if (!loading && profile) void loadImages();
  }, [loading, profile, loadImages]);
  const handlePickImage = () => fileInputRef.current?.click();
  const handleUploadImage = async (event) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    let folderId = imagesFolderId;
    setImageBusy(true);
    setError("");
    try {
      if (!folderId) folderId = (await getOrCreateBrandImagesFolder()).id;
      setImagesFolderId(folderId);
      const created = await uploadBrandImage(folderId, file);
      setImages((prev) => [created, ...prev]);
    } catch (err) {
      handleApiError(err, "Image upload failed");
    } finally {
      setImageBusy(false);
    }
  };
  const handleDeleteImage = async (id) => {
    setImageBusy(true);
    setError("");
    try {
      await deleteBrandImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      handleApiError(err, "Could not remove image");
    } finally {
      setImageBusy(false);
    }
  };
  const openProfileDialog = () => {
    setProfileForm(profileToForm(profile));
    setProfileOpen(true);
  };
  const openToneDialog = () => {
    setToneForm(toneToForm(tone));
    setToneOpen(true);
  };
  const openVisualDialog = () => {
    setVisualForm(visualToForm(visual));
    setVisualOpen(true);
  };
  const openCompetitorDialog = (competitor) => {
    setEditingCompetitor(competitor);
    setCompetitorForm({
      name: competitor?.name ?? "",
      website_url: competitor?.website_url ?? "",
      notes: competitor?.notes ?? ""
    });
    setCompetitorOpen(true);
  };
  const saveProfile = async (event) => {
    event.preventDefault();
    const payload = profilePayload(profileForm);
    if (!payload.name) return;
    setMutating(true);
    setError("");
    try {
      await apiRequest("/api/v1/brand/profile", {
        method: "PUT",
        body: JSON.stringify(payload)
      });
      setProfileOpen(false);
      await loadBrand();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const saveTone = async (event) => {
    event.preventDefault();
    setMutating(true);
    setError("");
    try {
      await apiRequest("/api/v1/brand/tone-of-voice", {
        method: "PUT",
        body: JSON.stringify(tonePayload(toneForm))
      });
      setToneOpen(false);
      await loadBrand();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const saveVisual = async (event) => {
    event.preventDefault();
    setMutating(true);
    setError("");
    try {
      await apiRequest("/api/v1/brand/visual-identity", {
        method: "PUT",
        body: JSON.stringify(visualPayload(visualForm))
      });
      setVisualOpen(false);
      await loadBrand();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const saveCompetitor = async (event) => {
    event.preventDefault();
    const payload = {
      name: competitorForm.name.trim(),
      website_url: nullable(competitorForm.website_url),
      notes: nullable(competitorForm.notes)
    };
    if (!payload.name) return;
    setMutating(true);
    setError("");
    try {
      if (editingCompetitor) {
        await apiRequest(`/api/v1/brand/competitors/${editingCompetitor.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      } else {
        await apiRequest("/api/v1/brand/competitors", {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }
      setCompetitorOpen(false);
      setEditingCompetitor(null);
      setCompetitorForm(EMPTY_COMPETITOR_FORM);
      await loadBrand();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const deleteCompetitor = async (competitor) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest(`/api/v1/brand/competitors/${competitor.id}`, {
        method: "DELETE"
      });
      await loadBrand();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  let viewContent = /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, { view });
  if (!loading && view === "dna") {
    viewContent = /* @__PURE__ */ jsxRuntimeExports.jsx(DnaBoard, { profile, visual, tone, images, imageBusy, onSetup: openProfileDialog, onEditProfile: openProfileDialog, onEditVisual: openVisualDialog, onEditTone: openToneDialog, onUploadImage: handlePickImage, onDeleteImage: handleDeleteImage });
  } else if (!loading && view === "tov") {
    viewContent = profile ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToneOfVoice, { profile, tone, onEdit: openToneDialog }) : /* @__PURE__ */ jsxRuntimeExports.jsx(NeedsProfile, { onSetup: openProfileDialog });
  } else if (!loading && view === "permissions") {
    viewContent = /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionsView, { brandServer, onApiError: handleApiError });
  } else if (!loading && view === "activity") {
    viewContent = /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityView, { brandServer, onApiError: handleApiError });
  } else if (!loading) {
    viewContent = profile ? /* @__PURE__ */ jsxRuntimeExports.jsx(CompetitorsView, { competitors, mutating, onAdd: () => openCompetitorDialog(null), onEdit: openCompetitorDialog, onDelete: deleteCompetitor }) : /* @__PURE__ */ jsxRuntimeExports.jsx(NeedsProfile, { onSetup: openProfileDialog });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#1f2118] text-[#e8eadb]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full text-[#e8eadb] hover:bg-white/10 hover:text-white", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-700 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dna, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Brand DNA" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        brandServer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EnableMcpServerButton, { serverSlug: "brand", enabled: brandServer.enabled, toolkitIds: brandServer.toolkit_ids }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full text-[#c4c8b0] hover:bg-white/10 hover:text-white", "aria-label": "Search", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full text-[#c4c8b0] hover:bg-white/10 hover:text-white", "aria-label": "Help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full text-[#c4c8b0] hover:bg-white/10 hover:text-white", "aria-label": "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden w-[260px] shrink-0 px-3 md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1 pt-2", children: NAV.map((n) => {
        const active = view === n.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setView(n.id), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", active ? "bg-[#cfe09a] text-[#1f2118]" : "text-[#e8eadb]/80 hover:bg-white/10"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: cn("h-5 w-5", active ? "text-[#1f2118]" : "text-[#e8eadb]/60") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: n.label })
        ] }, n.id);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6"), children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-2xl bg-rose-950/70 px-4 py-3 text-sm text-rose-100 ring-1 ring-rose-300/20", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-[2rem] bg-[#272a1f] p-4 shadow-sm ring-1 ring-white/5 sm:p-6", children: viewContent })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileDialog, { open: profileOpen, form: profileForm, mutating, onOpenChange: setProfileOpen, onSubmit: saveProfile, onChange: setProfileForm }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToneDialog, { open: toneOpen, form: toneForm, mutating, onOpenChange: setToneOpen, onSubmit: saveTone, onChange: setToneForm }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VisualDialog, { open: visualOpen, form: visualForm, mutating, onOpenChange: setVisualOpen, onSubmit: saveVisual, onChange: setVisualForm }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CompetitorDialog, { open: competitorOpen, form: competitorForm, editing: editingCompetitor, mutating, onOpenChange: setCompetitorOpen, onSubmit: saveCompetitor, onChange: setCompetitorForm }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", className: "hidden", onChange: handleUploadImage })
  ] });
}
function DnaBoard({
  profile,
  visual,
  tone,
  images,
  imageBusy,
  onSetup,
  onEditProfile,
  onEditVisual,
  onEditTone,
  onUploadImage,
  onDeleteImage
}) {
  const brandFonts = [visual?.primary_font, visual?.secondary_font].filter(Boolean);
  useGoogleFonts(brandFonts, "brand-preview");
  if (!profile) return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyBrand, { onSetup });
  const colors = visual?.color_palette ?? [];
  const websiteHref = profile.website_url ? withProtocol(profile.website_url) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1.8fr_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(card, "group"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-normal tracking-tight text-white", children: profile.name }),
          websiteHref && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: websiteHref, target: "_blank", rel: "noreferrer", className: "mt-3 inline-flex items-center gap-2 text-sm text-[#c4c8b0] hover:text-white hover:underline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-4 w-4" }),
            " ",
            trimProtocol(profile.website_url)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: "Edit profile", onClick: onEditProfile, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-[200px_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-40 place-items-center rounded-3xl bg-[#f6f4ea] p-6", children: visual?.logo_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: visual.logo_url, alt: `${profile.name} logo`, className: "max-h-28 max-w-full object-contain" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-black tracking-tight text-[#1f2118]", children: profile.name.slice(0, 1).toUpperCase() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(card, "group"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cardTitle, children: "Fonts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: "Edit visual identity", onClick: onEditVisual, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-end gap-10", children: [
            brandFonts.map((font) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl text-[#cfe09a]", style: {
                fontFamily: fontStack(font)
              }, children: "Aa" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-[#e8eadb]/80", children: font })
            ] }, font)),
            !visual?.primary_font && !visual?.secondary_font && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: mutedText, children: "Not set up yet." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(card, "group"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cardTitle, children: "Colors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: "Edit visual identity", onClick: onEditVisual, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-8", children: colors.length ? colors.map((hex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full ring-1 ring-white/10", style: {
            backgroundColor: hex
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-[#c4c8b0]", children: hex })
        ] }, hex)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: mutedText, children: "Not set up yet." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextCard, { title: "One liner", value: profile.value_proposition, italic: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextCard, { title: "Industry", value: profile.industry })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextCard, { title: "Positioning", value: profile.positioning }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cardTitle, children: "Goals" }),
          profile.primary_goal || profile.secondary_goals.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-3", children: [
            profile.primary_goal && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#e8eadb]", children: profile.primary_goal }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChipList, { items: profile.secondary_goals })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-3", mutedText), children: "Not set up yet." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(card, "group"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cardTitle, children: "Tone of voice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: "Edit tone of voice", onClick: onEditTone, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChipList, { className: "mt-3", items: [tone?.style, tone?.formality_level, tone?.humor_level, tone?.emotional_tone].filter(Boolean) }),
          !tone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-3", mutedText), children: "Not set up yet." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextCard, { title: "Target audience", value: profile.target_audience })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextCard, { title: "About the business", value: profile.product_description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[#2d3024] p-5 ring-1 ring-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cardTitle, children: "Images" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#e8eadb]/55", children: "Stored in Drive · System" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: onUploadImage, disabled: imageBusy, className: "mt-4 grid w-full place-items-center gap-2 rounded-2xl bg-[#4d5538] py-12 text-sm text-[#e8eadb] transition hover:bg-[#586141] disabled:cursor-not-allowed disabled:opacity-60", children: [
        imageBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5" }),
        imageBusy ? "Uploading…" : "Upload an image"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 gap-3", children: images.length ? images.map((image) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: driveFileSrc(image), alt: image.name, className: "aspect-square w-full rounded-2xl object-cover ring-1 ring-white/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", "aria-label": `Remove ${image.name}`, onClick: () => onDeleteImage(image.id), disabled: imageBusy, className: "absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 transition hover:bg-black/75 group-hover:opacity-100 disabled:cursor-not-allowed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, image.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 grid aspect-square place-items-center rounded-2xl bg-[#3a3f2b] text-center text-sm text-[#e8eadb]/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "mx-auto mb-2 h-5 w-5 text-[#cfe09a]" }),
        "Not set up yet"
      ] }) }) })
    ] })
  ] });
}
function ToneOfVoice({
  profile,
  tone,
  onEdit
}) {
  if (!tone) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight text-white", children: "Tone of voice" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: cn("mt-2", mutedText), children: [
        "Not set up yet for ",
        profile.name,
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-5 bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]", onClick: onEdit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        " Set up"
      ] })
    ] });
  }
  const traits = [["Style", tone.style], ["Formality", tone.formality_level], ["Humor", tone.humor_level], ["Emotional tone", tone.emotional_tone]];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: card, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight text-white", children: "Tone of voice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: cn("mt-2", mutedText), children: [
          "How ",
          profile.name,
          " sounds across every channel."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]", onClick: onEdit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-2 h-4 w-4" }),
        " Edit"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: traits.map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium text-[#cfe09a]", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-2", mutedText), children: value || "Not set up yet." })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cardTitle, children: "Vocabulary rules" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Rule, { label: "Point of view", value: tone.vocabulary_rules.point_of_view }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Rule, { label: "Sentence length", value: tone.vocabulary_rules.sentence_length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChipList, { className: "mt-4", items: tone.vocabulary_rules.preferred_terms }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { active: tone.vocabulary_rules.use_active_voice, children: "Active voice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { active: tone.vocabulary_rules.prefer_plain_language, children: "Plain language" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChipCard, { title: "Words to use", items: tone.words_to_use }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChipCard, { title: "Words to avoid", items: tone.words_to_avoid })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListCard, { title: "Writing examples", items: tone.writing_examples, italic: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListCard, { title: "Forbidden claims", items: tone.forbidden_claims })
  ] });
}
function CompetitorsView({
  competitors,
  mutating,
  onAdd,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: card, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight text-white", children: "Competitors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-2", mutedText), children: "Companies this brand is positioned against." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]", onClick: onAdd, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        " Add competitor"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl bg-[#33362a] ring-1 ring-white/5", children: competitors.length ? competitors.map((competitor) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group grid gap-3 border-b border-white/5 p-4 last:border-b-0 md:grid-cols-[1fr_1fr_1.4fr_auto]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-white", children: competitor.name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: competitor.website_url ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: withProtocol(competitor.website_url), target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-sm text-[#cfe09a] hover:underline", children: [
        trimProtocol(competitor.website_url),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-[#e8eadb]/55", children: "No website" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: mutedText, children: competitor.notes || "No notes yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 md:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: "Edit competitor", onClick: () => onEdit(competitor), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconButton, { label: "Delete competitor", onClick: () => onDelete(competitor), disabled: mutating, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }, competitor.id)) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#e8eadb]/75", children: "No competitors yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-4 bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]", onClick: onAdd, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
        " Add competitor"
      ] })
    ] }) })
  ] });
}
function PermissionsView({
  brandServer,
  onApiError
}) {
  const toolkitIds = reactExports.useMemo(() => brandServer?.toolkit_ids ?? [], [brandServer]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionsMatrix, { toolkitIds, enabled: Boolean(brandServer?.enabled), theme: darkPermissionsTheme, toolsNoun: "Brand DNA", stripToolPrefix: /^brand_/, disabledHint: "Who can use the Brand DNA tools, and how. Enable the Brand DNA MCP server first to start granting access.", connectHint: "No toolkit is connected yet — enable the Brand DNA MCP server from the header.", onApiError });
}
const EMPTY_ACTIVITY_FILTERS = {
  source: "all",
  status: "all",
  principal: "all",
  event: "",
  since: "",
  until: ""
};
function activityRequestPath(filters, offset) {
  const params = new URLSearchParams({
    limit: String(ACTIVITY_PAGE_SIZE),
    offset: String(offset)
  });
  if (filters.source !== "all") params.set("source", filters.source);
  if (filters.status !== "all") params.set("outcome", filters.status);
  if (filters.since) params.set("since", (/* @__PURE__ */ new Date(`${filters.since}T00:00:00`)).toISOString());
  if (filters.until) params.set("until", (/* @__PURE__ */ new Date(`${filters.until}T23:59:59.999`)).toISOString());
  if (filters.principal.startsWith("user:")) {
    params.set("actor_user_id", filters.principal.slice("user:".length));
  } else if (filters.principal.startsWith("key:")) {
    params.set("api_key_id", filters.principal.slice("key:".length));
  }
  return `/api/v1/request-logs?${params.toString()}`;
}
function sameActivityFilters(a, b) {
  return a.source === b.source && a.status === b.status && a.principal === b.principal && a.event === b.event && a.since === b.since && a.until === b.until;
}
function shortId(id) {
  return id.slice(0, 8);
}
function logPrincipal(log, userNames) {
  if (log.actor_user_id) {
    return {
      key: `user:${log.actor_user_id}`,
      label: userNames.get(log.actor_user_id) ?? `User ${shortId(log.actor_user_id)}`,
      type: "user"
    };
  }
  if (log.api_key_id) {
    return {
      key: `key:${log.api_key_id}`,
      label: `API key ${shortId(log.api_key_id)}`,
      type: "api_key"
    };
  }
  return {
    key: "system",
    label: "System",
    type: "system"
  };
}
function logIsSuccess(log) {
  if (log.outcome != null) return log.outcome === "success" || log.outcome === "ok";
  if (log.status_code != null) return log.status_code < 400;
  return true;
}
function logIsBlocked(log) {
  return log.outcome === "blocked";
}
function PrincipalBadge({
  principal
}) {
  const Icon = principal.type === "user" ? User : principal.type === "api_key" ? KeyRound : Bot;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-[#e8eadb]/80", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 shrink-0 text-[#cfe09a]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: principal.label })
  ] });
}
const activityControl = "rounded-full border border-white/10 bg-[#202318] px-3 py-1.5 text-sm text-[#e8eadb] outline-none placeholder:text-[#c4c8b0]/45";
function ActivityView({
  brandServer,
  onApiError
}) {
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [filters, setFilters] = reactExports.useState(EMPTY_ACTIVITY_FILTERS);
  const [eventInput, setEventInput] = reactExports.useState("");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [filtering, setFiltering] = reactExports.useState(false);
  const loadMoreRef = reactExports.useRef(null);
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error
  } = useInfiniteQuery({
    queryKey: ["brand-activity", filters],
    queryFn: ({
      pageParam,
      signal
    }) => apiRequest(activityRequestPath(filters, pageParam), {
      signal
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.items.length;
      return nextOffset < lastPage.total ? nextOffset : void 0;
    },
    staleTime: 30 * 1e3
  });
  reactExports.useEffect(() => {
    if (error) onApiError(error, "Could not load activity");
  }, [error, onApiError]);
  const firstToolkitId = brandServer?.toolkit_ids?.[0];
  const {
    data: matrix
  } = useQuery({
    queryKey: ["toolkit-access-matrix", firstToolkitId],
    queryFn: () => apiRequest(`/api/v1/toolkits/${firstToolkitId}/access-matrix`),
    enabled: Boolean(brandServer?.enabled && firstToolkitId),
    staleTime: 60 * 1e3,
    retry: false
  });
  const userNames = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const p of matrix?.principals ?? []) {
      if (p.auth_user_id) map.set(p.auth_user_id, p.name);
    }
    return map;
  }, [matrix]);
  const allLogs = reactExports.useMemo(() => (data?.pages.flatMap((page) => page.items) ?? []).filter(isBrandLog).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), [data]);
  const principalOptions = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Map();
    for (const log of allLogs) {
      const p = logPrincipal(log, userNames);
      if (!seen.has(p.key)) seen.set(p.key, p);
    }
    return Array.from(seen.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [allLogs, userNames]);
  const sinceMs = filters.since ? (/* @__PURE__ */ new Date(`${filters.since}T00:00:00`)).getTime() : null;
  const untilMs = filters.until ? (/* @__PURE__ */ new Date(`${filters.until}T23:59:59.999`)).getTime() : null;
  const eventQuery = filters.event.trim().toLowerCase();
  const logs = reactExports.useMemo(() => allLogs.filter((log) => {
    if (filters.source !== "all" && log.source !== filters.source) return false;
    if (filters.status === "success" && !logIsSuccess(log)) return false;
    if (filters.status === "blocked" && !logIsBlocked(log)) return false;
    if (filters.status === "error" && (logIsSuccess(log) || logIsBlocked(log))) return false;
    if (filters.principal !== "all" && logPrincipal(log, userNames).key !== filters.principal) return false;
    if (eventQuery) {
      const haystack = `${eventLabel(log)} ${log.path ?? ""} ${log.tool_name ?? ""}`.toLowerCase();
      if (!haystack.includes(eventQuery)) return false;
    }
    const ts = new Date(log.created_at).getTime();
    if (sinceMs != null && ts < sinceMs) return false;
    if (untilMs != null && ts > untilMs) return false;
    return true;
  }), [allLogs, filters, eventQuery, sinceMs, untilMs, userNames]);
  const filtersActive = filters.source !== "all" || filters.status !== "all" || filters.principal !== "all" || filters.event.trim() !== "" || filters.since !== "" || filters.until !== "";
  const updateFilters = reactExports.useCallback((updater) => {
    const next = updater(filters);
    void queryClient.cancelQueries({
      queryKey: ["brand-activity"]
    });
    setFilters(next);
    setFiltering(true);
    if (sameActivityFilters(filters, next)) {
      void queryClient.refetchQueries({
        queryKey: ["brand-activity", next],
        type: "active"
      });
    }
  }, [filters, queryClient]);
  const updateEventInput = reactExports.useCallback((value) => {
    setEventInput(value);
    const query = value.trim();
    if (query.length > 0 && query.length < 3) return;
    updateFilters((f) => ({
      ...f,
      event: value
    }));
  }, [updateFilters]);
  reactExports.useEffect(() => {
    if (!isFetching) setFiltering(false);
  }, [isFetching]);
  reactExports.useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, {
      rootMargin: "240px"
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(card, "flex min-h-32 items-end justify-between gap-4"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight text-white", children: "Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-2", mutedText), children: "Every change made through Console and via MCP tool calls." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setShowFilters((open) => !open), "aria-label": showFilters ? "Hide activity filters" : "Show activity filters", className: cn("relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition", filtersActive ? "bg-[#cfe09a] text-[#1f2118] shadow-sm" : showFilters ? "bg-white/10 text-white" : "bg-white/5 text-[#c4c8b0] hover:bg-white/10 hover:text-white"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-5 w-5" }),
        filtersActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-[#cfe09a]" })
      ] })
    ] }),
    showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(card, "flex flex-wrap items-end gap-3"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Source", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentedFilter, { value: filters.source, onChange: (source) => updateFilters((f) => ({
        ...f,
        source
      })), options: [{
        value: "all",
        label: "All"
      }, {
        value: "api",
        label: "Console"
      }, {
        value: "mcp",
        label: "MCP"
      }] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentedFilter, { value: filters.status, onChange: (status) => updateFilters((f) => ({
        ...f,
        status
      })), options: [{
        value: "all",
        label: "All"
      }, {
        value: "success",
        label: "Success"
      }, {
        value: "blocked",
        label: "Blocked"
      }, {
        value: "error",
        label: "Error"
      }] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Principal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: filters.principal, onChange: (e) => updateFilters((f) => ({
        ...f,
        principal: e.target.value
      })), className: activityControl, "aria-label": "Filter by principal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All principals" }),
        principalOptions.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.key, children: p.label }, p.key))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Event", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: eventInput, onChange: (e) => updateEventInput(e.target.value), placeholder: "Search tool or path", className: cn(activityControl, "w-48"), "aria-label": "Filter by event" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "From", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: filters.since, max: filters.until || void 0, onChange: (e) => updateFilters((f) => ({
        ...f,
        since: e.target.value
      })), className: cn(activityControl, "[color-scheme:dark]"), "aria-label": "From date" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "To", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: filters.until, min: filters.since || void 0, onChange: (e) => updateFilters((f) => ({
        ...f,
        until: e.target.value
      })), className: cn(activityControl, "[color-scheme:dark]"), "aria-label": "To date" }) }),
      filtersActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
        setEventInput("");
        updateFilters(() => EMPTY_ACTIVITY_FILTERS);
      }, className: "inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-sm text-[#e8eadb]/75 transition hover:bg-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
        " Clear"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl bg-[#33362a] ring-1 ring-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#2d3024] text-xs uppercase tracking-wide text-[#c4c8b0]/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Principal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        (isLoading || filtering && isFetching && !isFetchingNextPage) && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTableSkeletonRows, {}),
        !isLoading && !(filtering && isFetching && !isFetchingNextPage) && logs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { onClick: () => setSelectedId(log.id), className: "cursor-pointer border-t border-white/5 transition hover:bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-white", children: eventLabel(log) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate text-xs text-[#e8eadb]/55", children: log.tool_name ? log.path ?? log.method : log.path })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrincipalBadge, { principal: logPrincipal(log, userNames) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SourceBadge, { source: log.source }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-[#e8eadb]/65", children: timeAgo(log.created_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { outcome: log.outcome }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-[#e8eadb]/80", children: log.outcome ?? statusLabel(log.status_code) }),
            log.duration_ms != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[#e8eadb]/45", children: [
              "· ",
              log.duration_ms,
              "ms"
            ] })
          ] }) })
        ] }, log.id)),
        !isLoading && !(filtering && isFetching && !isFetchingNextPage) && logs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-10 text-center text-[#e8eadb]/60", children: filtersActive ? "No activity matches these filters." : "No activity recorded yet." }) }),
        !isLoading && !(filtering && isFetching && !isFetchingNextPage) && isFetchingNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTableSkeletonRows, {})
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: loadMoreRef, className: "grid min-h-8 place-items-center text-sm text-[#e8eadb]/55", children: !isFetchingNextPage && hasNextPage && "Loading more activity..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityDetailDialog, { logId: selectedId, userNames, onOpenChange: (open) => !open && setSelectedId(null), onApiError })
  ] });
}
function FilterField({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wide text-[#c4c8b0]/70", children: label }),
    children
  ] });
}
function SegmentedFilter({
  value,
  onChange,
  options
}) {
  const activeIndex = Math.max(0, options.findIndex((opt) => opt.value === value));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid overflow-hidden rounded-full border border-white/10 bg-[#202318] p-0.5", style: {
    gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "absolute inset-y-0.5 left-0.5 rounded-full bg-[#cfe09a] transition-transform duration-300 ease-out", style: {
      width: `calc((100% - 4px) / ${options.length})`,
      transform: `translateX(${activeIndex * 100}%)`
    } }),
    options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onChange(opt.value), className: cn("relative z-10 min-w-20 rounded-full px-3 py-1 text-sm transition-colors duration-200", value === opt.value ? "text-[#1f2118]" : "text-[#e8eadb]/70 hover:text-[#e8eadb]"), children: opt.label }, opt.value))
  ] });
}
function ActivityTableSkeletonRows() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Array.from({
    length: 4
  }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { "aria-hidden": "true", className: "border-t border-white/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-4 w-40 max-w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-3 w-56 max-w-full" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-4 w-28" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-6 w-20 rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-4 w-24" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-2.5 w-2.5 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-4 w-24" }),
      index % 2 === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-3 w-10" })
    ] }) })
  ] }, index)) });
}
function ActivityDetailDialog({
  logId,
  userNames,
  onOpenChange,
  onApiError
}) {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["brand-activity", logId],
    queryFn: () => apiRequest(`/api/v1/request-logs/${logId}`),
    enabled: Boolean(logId)
  });
  reactExports.useEffect(() => {
    if (error) onApiError(error, "Could not load activity detail");
  }, [error, onApiError]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: Boolean(logId), onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl bg-[#272a1f] text-[#e8eadb] sm:max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      data && /* @__PURE__ */ jsxRuntimeExports.jsx(SourceBadge, { source: data.source }),
      data ? eventLabel(data) : "Activity detail"
    ] }) }),
    isLoading || !data ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-[#e8eadb]/60" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Source", value: data.source === "mcp" ? "MCP" : "Console" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Principal", value: logPrincipal(data, userNames).label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Status", value: data.outcome ?? statusLabel(data.status_code) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "When", value: new Date(data.created_at).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Duration", value: data.duration_ms != null ? `${data.duration_ms} ms` : "—" }),
        data.method && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Method", value: data.method }),
        data.status_code != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Status code", value: String(data.status_code) }),
        data.tool_name && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Tool", value: data.tool_name }),
        data.path && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Path", value: data.path })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#c4c8b0]/70", children: "Request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(JsonBlock, { value: data.request_body, truncated: data.request_truncated })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#c4c8b0]/70", children: "Response" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(JsonBlock, { value: data.response_body, truncated: data.response_truncated })
      ] })
    ] })
  ] }) });
}
function Detail({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase text-[#c4c8b0]/70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 break-words text-[#e8eadb]", children: value })
  ] });
}
function JsonBlock({
  value,
  truncated
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-auto rounded-xl bg-[#202318] p-3 text-xs leading-relaxed text-[#e8eadb]/90 ring-1 ring-white/5", children: value == null ? "—" : JSON.stringify(value, null, 2) }),
    truncated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[#e8eadb]/45", children: "Payload truncated." })
  ] });
}
function SourceBadge({
  source
}) {
  const mcp = source === "mcp";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", mcp ? "bg-violet-500/20 text-violet-200" : "bg-sky-500/20 text-sky-200"), children: [
    mcp ? /* @__PURE__ */ jsxRuntimeExports.jsx(Plug, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "h-3 w-3" }),
    mcp ? "MCP" : "Console"
  ] });
}
function StatusDot({
  outcome
}) {
  const ok = outcome == null || outcome === "success" || outcome === "ok";
  const blocked = outcome === "blocked";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-block h-2 w-2 rounded-full", ok ? "bg-emerald-400" : blocked ? "bg-amber-300" : "bg-rose-400") });
}
function isBrandLog(log) {
  if (log.tool_name) return log.tool_name.startsWith("brand_");
  return Boolean(log.path?.startsWith("/api/v1/brand"));
}
function eventLabel(log) {
  if (log.tool_name) return log.tool_name;
  if (log.method && log.path) return `${log.method} ${log.path}`;
  return log.path ?? log.method ?? "request";
}
function statusLabel(statusCode) {
  if (statusCode == null) return "unknown";
  return statusCode < 400 ? "success" : "error";
}
function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function ProfileDialog({
  open,
  form,
  mutating,
  onOpenChange,
  onSubmit,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl bg-[#272a1f] text-[#e8eadb] sm:max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Brand profile" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", htmlFor: "brand-name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "brand-name", className: inputClass, value: form.name, onChange: (e) => onChange({
        ...form,
        name: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Website", htmlFor: "brand-website", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "brand-website", className: inputClass, value: form.website_url, placeholder: "https://example.com", onChange: (e) => onChange({
        ...form,
        website_url: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Industry", htmlFor: "brand-industry", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "brand-industry", className: inputClass, value: form.industry, onChange: (e) => onChange({
        ...form,
        industry: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Value proposition", htmlFor: "brand-value", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "brand-value", className: textareaClass, value: form.value_proposition, onChange: (e) => onChange({
        ...form,
        value_proposition: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Positioning", htmlFor: "brand-positioning", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "brand-positioning", className: textareaClass, value: form.positioning, onChange: (e) => onChange({
        ...form,
        positioning: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Primary goal", htmlFor: "brand-primary-goal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "brand-primary-goal", className: inputClass, value: form.primary_goal, onChange: (e) => onChange({
        ...form,
        primary_goal: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Secondary goals", htmlFor: "brand-secondary-goals", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "brand-secondary-goals", className: textareaClass, placeholder: "One per line", value: form.secondary_goals, onChange: (e) => onChange({
        ...form,
        secondary_goals: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Target audience", htmlFor: "brand-audience", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "brand-audience", className: textareaClass, value: form.target_audience, onChange: (e) => onChange({
        ...form,
        target_audience: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Product description", htmlFor: "brand-product", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "brand-product", className: textareaClass, value: form.product_description, onChange: (e) => onChange({
        ...form,
        product_description: e.target.value
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), disabled: mutating, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !form.name.trim(), className: "bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]", children: [
        mutating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
        "Save"
      ] })
    ] })
  ] }) }) });
}
function ToneDialog({
  open,
  form,
  mutating,
  onOpenChange,
  onSubmit,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl bg-[#272a1f] text-[#e8eadb] sm:max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Tone of voice" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Style", htmlFor: "tone-style", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "tone-style", className: inputClass, value: form.style, onChange: (e) => onChange({
          ...form,
          style: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Formality", htmlFor: "tone-formality", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "tone-formality", className: inputClass, value: form.formality_level, onChange: (e) => onChange({
          ...form,
          formality_level: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Humor", htmlFor: "tone-humor", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "tone-humor", className: inputClass, value: form.humor_level, onChange: (e) => onChange({
          ...form,
          humor_level: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Emotional tone", htmlFor: "tone-emotional", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "tone-emotional", className: inputClass, value: form.emotional_tone, onChange: (e) => onChange({
          ...form,
          emotional_tone: e.target.value
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Point of view", htmlFor: "tone-pov", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "tone-pov", className: inputClass, value: form.point_of_view, onChange: (e) => onChange({
          ...form,
          point_of_view: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sentence length", htmlFor: "tone-sentence", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "tone-sentence", className: inputClass, value: form.sentence_length, onChange: (e) => onChange({
          ...form,
          sentence_length: e.target.value
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Preferred terms", htmlFor: "tone-preferred", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "tone-preferred", className: textareaClass, placeholder: "Comma or newline separated", value: form.preferred_terms, onChange: (e) => onChange({
        ...form,
        preferred_terms: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-2xl bg-[#33362a] p-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.use_active_voice, onChange: (e) => onChange({
            ...form,
            use_active_voice: e.target.checked
          }) }),
          "Use active voice"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-2xl bg-[#33362a] p-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.prefer_plain_language, onChange: (e) => onChange({
            ...form,
            prefer_plain_language: e.target.checked
          }) }),
          "Prefer plain language"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Words to use", htmlFor: "tone-use", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "tone-use", className: textareaClass, placeholder: "Comma or newline separated", value: form.words_to_use, onChange: (e) => onChange({
        ...form,
        words_to_use: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Words to avoid", htmlFor: "tone-avoid", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "tone-avoid", className: textareaClass, placeholder: "Comma or newline separated", value: form.words_to_avoid, onChange: (e) => onChange({
        ...form,
        words_to_avoid: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Writing examples", htmlFor: "tone-examples", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "tone-examples", className: textareaClass, placeholder: "One per line", value: form.writing_examples, onChange: (e) => onChange({
        ...form,
        writing_examples: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Forbidden claims", htmlFor: "tone-forbidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "tone-forbidden", className: textareaClass, placeholder: "One per line", value: form.forbidden_claims, onChange: (e) => onChange({
        ...form,
        forbidden_claims: e.target.value
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), disabled: mutating, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating, className: "bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]", children: [
        mutating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
        "Save"
      ] })
    ] })
  ] }) }) });
}
function VisualDialog({
  open,
  form,
  mutating,
  onOpenChange,
  onSubmit,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl bg-[#272a1f] text-[#e8eadb] sm:max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Visual identity" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Logo URL", htmlFor: "visual-logo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "visual-logo", className: inputClass, value: form.logo_url, placeholder: "https://example.com/logo.png", onChange: (e) => onChange({
        ...form,
        logo_url: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Primary font", htmlFor: "visual-primary-font", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontPicker, { id: "visual-primary-font", value: form.primary_font, placeholder: "Select a primary font", onChange: (font) => onChange({
          ...form,
          primary_font: font
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Secondary font", htmlFor: "visual-secondary-font", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontPicker, { id: "visual-secondary-font", value: form.secondary_font, placeholder: "Select a secondary font", onChange: (font) => onChange({
          ...form,
          secondary_font: font
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Color palette", htmlFor: "visual-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "visual-colors", className: textareaClass, placeholder: "#1f2118, #cfe09a", value: form.color_palette, onChange: (e) => onChange({
        ...form,
        color_palette: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#e8eadb]/55", children: "Images are managed in Drive (System / Brand DNA) — upload them from the Images panel." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), disabled: mutating, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating, className: "bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]", children: [
        mutating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
        "Save"
      ] })
    ] })
  ] }) }) });
}
function CompetitorDialog({
  open,
  form,
  editing,
  mutating,
  onOpenChange,
  onSubmit,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl bg-[#272a1f] text-[#e8eadb]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit competitor" : "Add competitor" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", htmlFor: "competitor-name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "competitor-name", className: inputClass, value: form.name, onChange: (e) => onChange({
        ...form,
        name: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Website", htmlFor: "competitor-website", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "competitor-website", className: inputClass, value: form.website_url, placeholder: "https://example.com", onChange: (e) => onChange({
        ...form,
        website_url: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notes", htmlFor: "competitor-notes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "competitor-notes", className: textareaClass, value: form.notes, onChange: (e) => onChange({
        ...form,
        notes: e.target.value
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), disabled: mutating, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !form.name.trim(), className: "bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]", children: [
        mutating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
        "Save"
      ] })
    ] })
  ] }) }) });
}
function EmptyBrand({
  onSetup
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-normal tracking-tight text-white", children: "Not set up yet" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-3 max-w-2xl", mutedText), children: "Create the brand profile first. Tone of voice, visual identity, and competitors attach to that organization-level profile." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-5 bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]", onClick: onSetup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      " Set up"
    ] })
  ] });
}
function NeedsProfile({
  onSetup
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight text-white", children: "Create the profile first" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-2", mutedText), children: "This view unlocks once the Brand DNA profile exists." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mt-5 bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]", onClick: onSetup, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
      " Set up"
    ] })
  ] });
}
function LoadingState({
  view
}) {
  if (view === "activity") return /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityLoadingState, {});
  if (view === "permissions") return /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionsMatrixLoading, { theme: darkPermissionsTheme });
  if (view === "competitors") return /* @__PURE__ */ jsxRuntimeExports.jsx(CompetitorsLoadingState, {});
  if (view === "tov") return /* @__PURE__ */ jsxRuntimeExports.jsx(ToneLoadingState, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1.8fr_1fr]", "aria-label": "Loading Brand DNA", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: card, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-12 w-64 max-w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-5 w-44" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-9 w-9 rounded-full" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-[200px_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-40 place-items-center rounded-3xl bg-[#f6f4ea]/90 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-20 w-20 rounded-full bg-[#1f2118]/15" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-5 w-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-9 w-9 rounded-full" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-10 w-14" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-4 w-24" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-10 w-14" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-4 w-32" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-5 w-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-9 w-9 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-8", children: Array.from({
          length: 5
        }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-16 w-16 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-3 w-14" })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTextCard, { lines: 3 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTextCard, { lines: 2 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTextCard, { lines: 4 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTextCard, { lines: 3 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-5 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "aspect-square rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "aspect-square rounded-2xl" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTextCard, { lines: 5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTextCard, { lines: 4 })
    ] })
  ] });
}
function PageIntroSkeleton({
  titleWidth = "w-48",
  textWidth = "w-80"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: cn("h-8 max-w-full", titleWidth) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: cn("mt-4 h-4 max-w-full", textWidth) })
  ] });
}
function ToneLoadingState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", "aria-label": "Loading tone of voice", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageIntroSkeleton, { titleWidth: "w-52" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: Array.from({
      length: 4
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-5 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-4 w-2/3" })
      ] })
    ] }, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTextCard, { lines: 4 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTextCard, { lines: 3 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTextCard, { lines: 3 })
    ] })
  ] });
}
function CompetitorsLoadingState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", "aria-label": "Loading competitors", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageIntroSkeleton, { titleWidth: "w-44", textWidth: "w-72" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl bg-[#33362a] ring-1 ring-white/5", children: Array.from({
      length: 4
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 border-b border-white/5 p-4 last:border-b-0 md:grid-cols-[1fr_1fr_1.4fr_auto]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-5 w-36 max-w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-5 w-44 max-w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-4 w-2/3" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 md:justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-8 w-8 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-8 w-8 rounded-full" })
      ] })
    ] }, index)) })
  ] });
}
function ActivityLoadingState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", "aria-label": "Loading activity", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageIntroSkeleton, { titleWidth: "w-32", textWidth: "w-96" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl bg-[#33362a] ring-1 ring-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[#2d3024] text-xs uppercase tracking-wide text-[#c4c8b0]/70", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTableSkeletonRows, {}) })
    ] }) })
  ] });
}
function SkeletonTextCard({
  lines
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: "h-5 w-28" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-3", children: Array.from({
      length: lines
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(BrandSkeleton, { className: cn("h-4", index === lines - 1 ? "w-2/3" : "w-full") }, index)) })
  ] });
}
function BrandSkeleton({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: cn("bg-[#c4c8b0]/12", className) });
}
function TextCard({
  title,
  value,
  italic = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cardTitle, children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-3", italic ? "font-serif text-lg italic text-[#e8eadb]" : mutedText), children: value || "Not set up yet." })
  ] });
}
function ChipCard({
  title,
  items
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cardTitle, children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChipList, { className: "mt-3", items })
  ] });
}
function ListCard({
  title,
  items,
  italic = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cardTitle, children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2", children: items.length ? items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: italic ? "font-serif text-lg italic text-[#e8eadb]" : mutedText, children: item }, item)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: mutedText, children: "Not set up yet." }) })
  ] });
}
function Rule({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-[#c4c8b0]/70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-[#e8eadb]", children: value || "Not set up yet." })
  ] });
}
function ChipList({
  items,
  className
}) {
  const clean = items.filter((item) => Boolean(item));
  if (!clean.length) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn(mutedText, className), children: "Not set up yet." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-wrap gap-2", className), children: clean.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-xl bg-[#454935] px-3 py-1 text-xs text-[#e8eadb]", children: item }, item)) });
}
function Badge({
  active,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-3 py-1 text-xs", active ? "bg-[#cfe09a] text-[#1f2118]" : "bg-[#454935] text-[#e8eadb]/65"), children });
}
function IconButton({
  label,
  children,
  onClick,
  disabled,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", "aria-label": label, title: label, disabled, onClick, className: cn("h-9 w-9 rounded-full text-[#c4c8b0] hover:bg-white/10 hover:text-white", "opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100", className), children });
}
function Field({
  label,
  htmlFor,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor, children: label }),
    children
  ] });
}
function nullable(value) {
  return value.trim() || null;
}
function splitList(value) {
  return value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
}
function joinList(items) {
  return (items ?? []).join("\n");
}
function profileToForm(profile) {
  if (!profile) return EMPTY_PROFILE_FORM;
  return {
    name: profile.name,
    website_url: profile.website_url ?? "",
    industry: profile.industry ?? "",
    target_audience: profile.target_audience ?? "",
    product_description: profile.product_description ?? "",
    value_proposition: profile.value_proposition ?? "",
    positioning: profile.positioning ?? "",
    primary_goal: profile.primary_goal ?? "",
    secondary_goals: joinList(profile.secondary_goals)
  };
}
function profilePayload(form) {
  return {
    name: form.name.trim(),
    website_url: nullable(form.website_url),
    industry: nullable(form.industry),
    target_audience: nullable(form.target_audience),
    product_description: nullable(form.product_description),
    value_proposition: nullable(form.value_proposition),
    positioning: nullable(form.positioning),
    primary_goal: nullable(form.primary_goal),
    secondary_goals: splitList(form.secondary_goals)
  };
}
function toneToForm(tone) {
  if (!tone) return EMPTY_TONE_FORM;
  return {
    style: tone.style ?? "",
    formality_level: tone.formality_level ?? "",
    humor_level: tone.humor_level ?? "",
    emotional_tone: tone.emotional_tone ?? "",
    point_of_view: tone.vocabulary_rules.point_of_view ?? "",
    preferred_terms: joinList(tone.vocabulary_rules.preferred_terms),
    sentence_length: tone.vocabulary_rules.sentence_length ?? "",
    use_active_voice: tone.vocabulary_rules.use_active_voice,
    prefer_plain_language: tone.vocabulary_rules.prefer_plain_language,
    words_to_use: joinList(tone.words_to_use),
    words_to_avoid: joinList(tone.words_to_avoid),
    writing_examples: joinList(tone.writing_examples),
    forbidden_claims: joinList(tone.forbidden_claims)
  };
}
function tonePayload(form) {
  return {
    style: nullable(form.style),
    formality_level: nullable(form.formality_level),
    humor_level: nullable(form.humor_level),
    emotional_tone: nullable(form.emotional_tone),
    vocabulary_rules: {
      point_of_view: nullable(form.point_of_view),
      preferred_terms: splitList(form.preferred_terms),
      sentence_length: nullable(form.sentence_length),
      use_active_voice: form.use_active_voice,
      prefer_plain_language: form.prefer_plain_language
    },
    words_to_use: splitList(form.words_to_use),
    words_to_avoid: splitList(form.words_to_avoid),
    writing_examples: splitList(form.writing_examples),
    forbidden_claims: splitList(form.forbidden_claims)
  };
}
function visualToForm(visual) {
  if (!visual) return EMPTY_VISUAL_FORM;
  return {
    logo_url: visual.logo_url ?? "",
    primary_font: visual.primary_font ?? "",
    secondary_font: visual.secondary_font ?? "",
    color_palette: joinList(visual.color_palette),
    image_urls: joinList(visual.image_urls)
  };
}
function visualPayload(form) {
  return {
    logo_url: nullable(form.logo_url),
    primary_font: nullable(form.primary_font),
    secondary_font: nullable(form.secondary_font),
    color_palette: splitList(form.color_palette),
    image_urls: splitList(form.image_urls)
  };
}
function withProtocol(value) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}
function trimProtocol(value) {
  return value?.replace(/^https?:\/\//i, "").replace(/\/$/, "") ?? "";
}
export {
  BrandDnaPage as component
};
