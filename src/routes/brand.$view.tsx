import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Bot,
  Dna,
  ExternalLink,
  Gauge,
  HelpCircle,
  ImagePlus,
  KeyRound,
  Link2,
  Loader2,
  Menu,
  MessageSquareQuote,
  MousePointerClick,
  Pencil,
  Plug,
  Plus,
  Save,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Swords,
  Trash2,
  Upload,
  User as UserIcon,
  X,
} from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu } from "@/components/apps-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { PermissionsMatrix, PermissionsMatrixLoading } from "@/components/permissions-matrix";
import { TasksUptimeView } from "@/components/tasks-uptime-view";
import { darkPermissionsTheme } from "@/lib/permissions-theme";
import { FontPicker } from "@/components/font-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";
import type {
  BrandProfileResponse,
  BrandProfileUpsert,
  CompetitorCreate,
  CompetitorResponse,
  ToneOfVoiceResponse,
  ToneOfVoiceUpsert,
  VisualIdentityResponse,
  VisualIdentityUpsert,
} from "@/lib/brand-types";
import {
  deleteBrandImage,
  driveFileSrc,
  type DriveSystemFile,
  getOrCreateBrandImagesFolder,
  listBrandImages,
  uploadBrandImage,
} from "@/lib/drive-system";
import { fontStack, useGoogleFonts } from "@/lib/fonts";
import type { CatalogServer, ToolkitAccessMatrix } from "@/lib/mcp-types";
import { cn } from "@/lib/utils";

type BrandView = "dna" | "tov" | "competitors" | "permissions" | "activity" | "uptime";

const BRAND_VIEWS: BrandView[] = ["dna", "tov", "competitors", "permissions", "activity", "uptime"];

function isBrandView(value: string): value is BrandView {
  return (BRAND_VIEWS as string[]).includes(value);
}

export const Route = createFileRoute("/brand/$view")({
  beforeLoad: ({ params }) => {
    if (!isBrandView(params.view)) {
      throw redirect({ to: "/brand/$view", params: { view: "dna" }, replace: true });
    }
  },
  head: ({ params }) => ({
    meta: [
      { title: "Brand DNA - My Business" },
      {
        name: "description",
        content: "Your brand identity: logo, fonts, colors, voice and imagery.",
      },
      { property: "og:title", content: "Brand DNA - My Business" },
      {
        property: "og:description",
        content: "Your brand identity: logo, fonts, colors, voice and imagery.",
      },
    ],
    links: [{ rel: "canonical", href: `/brand/${params.view}` }],
  }),
  component: BrandDnaPage,
});

type RequestLogSource = "api" | "mcp";

type RequestLogSummary = {
  id: string;
  organization_id: string | null;
  source: RequestLogSource;
  method: string | null;
  path: string | null;
  tool_name: string | null;
  status_code: number | null;
  outcome: string | null;
  duration_ms: number | null;
  actor_user_id: string | null;
  api_key_id: string | null;
  request_truncated: boolean;
  response_truncated: boolean;
  ip: string | null;
  created_at: string;
};

type RequestLogDetail = RequestLogSummary & {
  request_body: unknown;
  response_body: unknown;
  meta: Record<string, unknown>;
};

const ACTIVITY_PAGE_SIZE = 50;

type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

type ProfileForm = {
  name: string;
  website_url: string;
  industry: string;
  target_audience: string;
  product_description: string;
  value_proposition: string;
  positioning: string;
  primary_goal: string;
  secondary_goals: string;
};

type ToneForm = {
  style: string;
  formality_level: string;
  humor_level: string;
  emotional_tone: string;
  point_of_view: string;
  preferred_terms: string;
  sentence_length: string;
  use_active_voice: boolean;
  prefer_plain_language: boolean;
  words_to_use: string;
  words_to_avoid: string;
  writing_examples: string;
  forbidden_claims: string;
};

type VisualForm = {
  logo_url: string;
  primary_font: string;
  secondary_font: string;
  color_palette: string;
  image_urls: string;
};

type CompetitorForm = {
  name: string;
  website_url: string;
  notes: string;
};

const NAV = [
  { id: "dna", label: "Brand DNA", icon: Dna },
  { id: "tov", label: "ToV", icon: MessageSquareQuote },
  { id: "competitors", label: "Competitors", icon: Swords },
  { id: "permissions", label: "Permissions", icon: KeyRound },
  { id: "activity", label: "Activity", icon: ShieldCheck },
  { id: "uptime", label: "Uptime", icon: Gauge },
] satisfies { id: BrandView; label: string; icon: typeof Dna }[];

const EMPTY_PROFILE_FORM: ProfileForm = {
  name: "",
  website_url: "",
  industry: "",
  target_audience: "",
  product_description: "",
  value_proposition: "",
  positioning: "",
  primary_goal: "",
  secondary_goals: "",
};

const EMPTY_TONE_FORM: ToneForm = {
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
  forbidden_claims: "",
};

const EMPTY_VISUAL_FORM: VisualForm = {
  logo_url: "",
  primary_font: "",
  secondary_font: "",
  color_palette: "",
  image_urls: "",
};

const EMPTY_COMPETITOR_FORM: CompetitorForm = {
  name: "",
  website_url: "",
  notes: "",
};

const card = "rounded-3xl bg-[#33362a] p-6 ring-1 ring-white/5";
const cardTitle = "text-sm font-medium text-[#e8eadb]";
const mutedText = "text-sm leading-relaxed text-[#e8eadb]/75";
const inputClass = "border-white/10 bg-[#202318] text-[#e8eadb] placeholder:text-[#c4c8b0]/45";
const textareaClass =
  "min-h-24 border-white/10 bg-[#202318] text-[#e8eadb] placeholder:text-[#c4c8b0]/45";

async function optionalBrandRequest<T>(path: string): Promise<T | null> {
  try {
    return await apiRequest<T>(path);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

function BrandDnaPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // beforeLoad guarantees a valid view (redirecting otherwise), so narrow here.
  const view = Route.useParams().view as BrandView;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const setView = useCallback(
    (next: BrandView) => {
      void navigate({ to: "/brand/$view", params: { view: next } });
    },
    [navigate],
  );
  const [profile, setProfile] = useState<BrandProfileResponse | null>(null);
  const [tone, setTone] = useState<ToneOfVoiceResponse | null>(null);
  const [visual, setVisual] = useState<VisualIdentityResponse | null>(null);
  const [competitors, setCompetitors] = useState<CompetitorResponse[]>([]);
  const [error, setError] = useState("");
  const [mutating, setMutating] = useState(false);

  // Brand imagery now lives in Drive (System / Brand DNA folder) rather than as
  // free-text URLs on the visual identity record.
  const [images, setImages] = useState<DriveSystemFile[]>([]);
  const [imagesFolderId, setImagesFolderId] = useState<string | null>(null);
  const [imageBusy, setImageBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const [toneOpen, setToneOpen] = useState(false);
  const [visualOpen, setVisualOpen] = useState(false);
  const [competitorOpen, setCompetitorOpen] = useState(false);
  const [editingCompetitor, setEditingCompetitor] = useState<CompetitorResponse | null>(null);

  const [profileForm, setProfileForm] = useState<ProfileForm>(EMPTY_PROFILE_FORM);
  const [toneForm, setToneForm] = useState<ToneForm>(EMPTY_TONE_FORM);
  const [visualForm, setVisualForm] = useState<VisualForm>(EMPTY_VISUAL_FORM);
  const [competitorForm, setCompetitorForm] = useState<CompetitorForm>(EMPTY_COMPETITOR_FORM);

  // Enable-state of the "brand" MCP server for this org (drives the header
  // "Enable this MCP server" control). The enable mutation invalidates this key.
  const { data: catalog, isLoading: catalogLoading } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 60 * 1000,
  });
  const catalogReady = !catalogLoading;
  const brandServer = catalog?.find((s) => s.slug === "brand");

  const handleApiError = useCallback(
    (err: unknown, fallback = "Brand request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  const profileEnabled = view === "dna" || view === "tov" || view === "competitors";
  const toneEnabled = view === "dna" || view === "tov";
  const visualEnabled = view === "dna";
  const competitorsEnabled = view === "competitors";

  const profileQuery = useQuery({
    queryKey: ["brand", "profile"],
    queryFn: () => optionalBrandRequest<BrandProfileResponse>("/api/v1/brand/profile"),
    enabled: profileEnabled,
    staleTime: 30 * 1000,
  });
  const toneQuery = useQuery({
    queryKey: ["brand", "tone-of-voice"],
    queryFn: () => optionalBrandRequest<ToneOfVoiceResponse>("/api/v1/brand/tone-of-voice"),
    enabled: toneEnabled,
    staleTime: 30 * 1000,
  });
  const visualQuery = useQuery({
    queryKey: ["brand", "visual-identity"],
    queryFn: () => optionalBrandRequest<VisualIdentityResponse>("/api/v1/brand/visual-identity"),
    enabled: visualEnabled,
    staleTime: 30 * 1000,
  });
  const competitorsQuery = useQuery({
    queryKey: ["brand", "competitors"],
    queryFn: () => apiRequest<CompetitorResponse[]>("/api/v1/brand/competitors"),
    enabled: competitorsEnabled,
    staleTime: 30 * 1000,
  });
  const imagesQuery = useQuery({
    queryKey: ["brand", "images"],
    queryFn: async () => {
      const folder = await getOrCreateBrandImagesFolder();
      const files = await listBrandImages(folder.id);
      return { folderId: folder.id, files };
    },
    enabled: view === "dna" && Boolean(profile),
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (profileQuery.error) handleApiError(profileQuery.error);
  }, [profileQuery.error, handleApiError]);
  useEffect(() => {
    if (toneQuery.error) handleApiError(toneQuery.error);
  }, [toneQuery.error, handleApiError]);
  useEffect(() => {
    if (visualQuery.error) handleApiError(visualQuery.error);
  }, [visualQuery.error, handleApiError]);
  useEffect(() => {
    if (competitorsQuery.error) handleApiError(competitorsQuery.error);
  }, [competitorsQuery.error, handleApiError]);
  useEffect(() => {
    if (imagesQuery.error) handleApiError(imagesQuery.error, "Could not load brand images");
  }, [imagesQuery.error, handleApiError]);

  useEffect(() => {
    if (profileQuery.data !== undefined) setProfile(profileQuery.data);
  }, [profileQuery.data]);
  useEffect(() => {
    if (toneQuery.data !== undefined) setTone(toneQuery.data);
  }, [toneQuery.data]);
  useEffect(() => {
    if (visualQuery.data !== undefined) setVisual(visualQuery.data);
  }, [visualQuery.data]);
  useEffect(() => {
    if (competitorsQuery.data !== undefined) setCompetitors(competitorsQuery.data);
  }, [competitorsQuery.data]);
  useEffect(() => {
    if (imagesQuery.data === undefined) return;
    setImagesFolderId(imagesQuery.data.folderId);
    setImages(imagesQuery.data.files);
  }, [imagesQuery.data]);

  const loading =
    (profileEnabled && profileQuery.isLoading) ||
    (toneEnabled && toneQuery.isLoading) ||
    (visualEnabled && visualQuery.isLoading) ||
    (competitorsEnabled && competitorsQuery.isLoading);

  const handlePickImage = () => fileInputRef.current?.click();

  const handleUploadImage = async (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.value = ""; // allow re-selecting the same file
    if (!file) return;
    let folderId = imagesFolderId;
    setImageBusy(true);
    setError("");
    try {
      if (!folderId) folderId = (await getOrCreateBrandImagesFolder()).id;
      setImagesFolderId(folderId);
      const created = await uploadBrandImage(folderId, file);
      setImages((prev) => [created, ...prev]);
      queryClient.setQueryData<{ folderId: string; files: DriveSystemFile[] }>(
        ["brand", "images"],
        (prev) => ({
          folderId,
          files: [created, ...(prev?.files ?? images)],
        }),
      );
    } catch (err) {
      handleApiError(err, "Image upload failed");
    } finally {
      setImageBusy(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    setImageBusy(true);
    setError("");
    try {
      await deleteBrandImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
      queryClient.setQueryData<{ folderId: string; files: DriveSystemFile[] }>(
        ["brand", "images"],
        (prev) =>
          prev
            ? { ...prev, files: prev.files.filter((img) => img.id !== id) }
            : { folderId: imagesFolderId ?? "", files: images.filter((img) => img.id !== id) },
      );
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

  const openCompetitorDialog = (competitor: CompetitorResponse | null) => {
    setEditingCompetitor(competitor);
    setCompetitorForm({
      name: competitor?.name ?? "",
      website_url: competitor?.website_url ?? "",
      notes: competitor?.notes ?? "",
    });
    setCompetitorOpen(true);
  };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = profilePayload(profileForm);
    if (!payload.name) return;
    setMutating(true);
    setError("");
    try {
      const next = await apiRequest<BrandProfileResponse>("/api/v1/brand/profile", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setProfile(next);
      queryClient.setQueryData(["brand", "profile"], next);
      setProfileOpen(false);
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const saveTone = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMutating(true);
    setError("");
    try {
      const next = await apiRequest<ToneOfVoiceResponse>("/api/v1/brand/tone-of-voice", {
        method: "PUT",
        body: JSON.stringify(tonePayload(toneForm)),
      });
      setTone(next);
      queryClient.setQueryData(["brand", "tone-of-voice"], next);
      setToneOpen(false);
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const saveVisual = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMutating(true);
    setError("");
    try {
      const next = await apiRequest<VisualIdentityResponse>("/api/v1/brand/visual-identity", {
        method: "PUT",
        body: JSON.stringify(visualPayload(visualForm)),
      });
      setVisual(next);
      queryClient.setQueryData(["brand", "visual-identity"], next);
      setVisualOpen(false);
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const saveCompetitor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: CompetitorCreate = {
      name: competitorForm.name.trim(),
      website_url: nullable(competitorForm.website_url),
      notes: nullable(competitorForm.notes),
    };
    if (!payload.name) return;
    setMutating(true);
    setError("");
    try {
      if (editingCompetitor) {
        await apiRequest<CompetitorResponse>(`/api/v1/brand/competitors/${editingCompetitor.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest<CompetitorResponse>("/api/v1/brand/competitors", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setCompetitorOpen(false);
      setEditingCompetitor(null);
      setCompetitorForm(EMPTY_COMPETITOR_FORM);
      await queryClient.invalidateQueries({ queryKey: ["brand", "competitors"] });
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const deleteCompetitor = async (competitor: CompetitorResponse) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<void>(`/api/v1/brand/competitors/${competitor.id}`, {
        method: "DELETE",
      });
      await queryClient.invalidateQueries({ queryKey: ["brand", "competitors"] });
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  let viewContent: ReactNode = <LoadingState view={view} />;
  if (view === "permissions") {
    viewContent = <PermissionsView brandServer={brandServer} onApiError={handleApiError} />;
  } else if (view === "activity") {
    viewContent = (
      <ActivityView
        brandServer={brandServer}
        catalogReady={catalogReady}
        onApiError={handleApiError}
      />
    );
  } else if (view === "uptime") {
    viewContent = (
      <TasksUptimeView
        moduleSlug="brand"
        onApiError={handleApiError}
        onViewHistory={() => setView("activity")}
        theme={{
          cardClassName: "rounded-3xl bg-[#33362a] p-5 ring-1 ring-white/5 sm:p-6",
          mutedClassName: "text-[#c4c8b0]/75",
          headingClassName: "text-[#e8eadb]",
          linkClassName: "text-[#cfe09a] hover:text-[#dcebab]",
          emptyChartClassName: "bg-[#272a1f] text-[#c4c8b0]/70 ring-1 ring-white/5",
          chartGridStroke: "rgba(232,234,219,0.14)",
          chartLabelFill: "rgba(196,200,176,0.72)",
          chartLineStroke: "#86d86d",
          skeletonClassName: "bg-[#424632]",
        }}
      />
    );
  } else if (!loading && view === "dna") {
    viewContent = (
      <DnaBoard
        profile={profile}
        visual={visual}
        tone={tone}
        images={images}
        imageBusy={imageBusy}
        onSetup={openProfileDialog}
        onEditProfile={openProfileDialog}
        onEditVisual={openVisualDialog}
        onEditTone={openToneDialog}
        onUploadImage={handlePickImage}
        onDeleteImage={handleDeleteImage}
      />
    );
  } else if (!loading && view === "tov") {
    viewContent = profile ? (
      <ToneOfVoice profile={profile} tone={tone} onEdit={openToneDialog} />
    ) : (
      <NeedsProfile onSetup={openProfileDialog} />
    );
  } else if (!loading) {
    viewContent = profile ? (
      <CompetitorsView
        competitors={competitors}
        mutating={mutating}
        onAdd={() => openCompetitorDialog(null)}
        onEdit={openCompetitorDialog}
        onDelete={deleteCompetitor}
      />
    ) : (
      <NeedsProfile onSetup={openProfileDialog} />
    );
  }

  return (
    <div className="min-h-screen bg-[#1f2118] text-[#e8eadb]">
      <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#e8eadb] hover:bg-white/10 hover:text-white"
            aria-label="Toggle menu"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-lime-300 to-emerald-700 shadow-sm">
              <Dna className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Brand DNA</span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          {brandServer && (
            <div className="mr-1">
              <EnableMcpServerButton
                serverSlug="brand"
                enabled={brandServer.enabled}
                toolkitIds={brandServer.toolkit_ids}
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#c4c8b0] hover:bg-white/10 hover:text-white"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#c4c8b0] hover:bg-white/10 hover:text-white"
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-[#c4c8b0] hover:bg-white/10 hover:text-white"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <nav className="space-y-1 pt-2">
              {NAV.map((n) => {
                const active = view === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => setView(n.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      active
                        ? "bg-[#cfe09a] text-[#1f2118]"
                        : "text-[#e8eadb]/80 hover:bg-white/10",
                    )}
                  >
                    <n.icon
                      className={cn("h-5 w-5", active ? "text-[#1f2118]" : "text-[#e8eadb]/60")}
                    />
                    <span className="flex-1 truncate text-left">{n.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        )}

        <main
          className={cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6")}
        >
          {error && (
            <div className="mb-4 rounded-2xl bg-rose-950/70 px-4 py-3 text-sm text-rose-100 ring-1 ring-rose-300/20">
              {error}
            </div>
          )}
          <section className="rounded-[2rem] bg-[#272a1f] p-4 shadow-sm ring-1 ring-white/5 sm:p-6">
            {viewContent}
          </section>
        </main>
      </div>

      <ProfileDialog
        open={profileOpen}
        form={profileForm}
        mutating={mutating}
        onOpenChange={setProfileOpen}
        onSubmit={saveProfile}
        onChange={setProfileForm}
      />
      <ToneDialog
        open={toneOpen}
        form={toneForm}
        mutating={mutating}
        onOpenChange={setToneOpen}
        onSubmit={saveTone}
        onChange={setToneForm}
      />
      <VisualDialog
        open={visualOpen}
        form={visualForm}
        mutating={mutating}
        onOpenChange={setVisualOpen}
        onSubmit={saveVisual}
        onChange={setVisualForm}
      />
      <CompetitorDialog
        open={competitorOpen}
        form={competitorForm}
        editing={editingCompetitor}
        mutating={mutating}
        onOpenChange={setCompetitorOpen}
        onSubmit={saveCompetitor}
        onChange={setCompetitorForm}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUploadImage}
      />
    </div>
  );
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
  onDeleteImage,
}: {
  profile: BrandProfileResponse | null;
  visual: VisualIdentityResponse | null;
  tone: ToneOfVoiceResponse | null;
  images: DriveSystemFile[];
  imageBusy: boolean;
  onSetup: () => void;
  onEditProfile: () => void;
  onEditVisual: () => void;
  onEditTone: () => void;
  onUploadImage: () => void;
  onDeleteImage: (id: string) => void;
}) {
  // Load the brand's chosen fonts so the "Aa" preview renders in them.
  const brandFonts = [visual?.primary_font, visual?.secondary_font].filter(Boolean) as string[];
  useGoogleFonts(brandFonts, "brand-preview");

  if (!profile) return <EmptyBrand onSetup={onSetup} />;

  const colors = visual?.color_palette ?? [];
  const websiteHref = profile.website_url ? withProtocol(profile.website_url) : null;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
      <div className="grid content-start gap-4">
        <div className={cn(card, "group")}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-normal tracking-tight text-white">{profile.name}</h1>
              {websiteHref && (
                <a
                  href={websiteHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-[#c4c8b0] hover:text-white hover:underline"
                >
                  <Link2 className="h-4 w-4" /> {trimProtocol(profile.website_url)}
                </a>
              )}
            </div>
            <IconButton label="Edit profile" onClick={onEditProfile}>
              <Pencil className="h-4 w-4" />
            </IconButton>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
          <div className="grid min-h-40 place-items-center rounded-3xl bg-[#f6f4ea] p-6">
            {visual?.logo_url ? (
              <img
                src={visual.logo_url}
                alt={`${profile.name} logo`}
                className="max-h-28 max-w-full object-contain"
              />
            ) : (
              <span className="text-4xl font-black tracking-tight text-[#1f2118]">
                {profile.name.slice(0, 1).toUpperCase()}
              </span>
            )}
          </div>
          <div className={cn(card, "group")}>
            <div className="flex items-center justify-between gap-3">
              <h2 className={cardTitle}>Fonts</h2>
              <IconButton label="Edit visual identity" onClick={onEditVisual}>
                <Pencil className="h-4 w-4" />
              </IconButton>
            </div>
            <div className="mt-4 flex flex-wrap items-end gap-10">
              {brandFonts.map((font) => (
                <div key={font} className="text-center">
                  <div className="text-4xl text-[#cfe09a]" style={{ fontFamily: fontStack(font) }}>
                    Aa
                  </div>
                  <div className="mt-2 text-sm text-[#e8eadb]/80">{font}</div>
                </div>
              ))}
              {!visual?.primary_font && !visual?.secondary_font && (
                <p className={mutedText}>Not set up yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className={cn(card, "group")}>
          <div className="flex items-center justify-between gap-3">
            <h2 className={cardTitle}>Colors</h2>
            <IconButton label="Edit visual identity" onClick={onEditVisual}>
              <Pencil className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="mt-4 flex flex-wrap gap-8">
            {colors.length ? (
              colors.map((hex) => (
                <div key={hex} className="text-center">
                  <div
                    className="h-16 w-16 rounded-full ring-1 ring-white/10"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="mt-2 text-xs text-[#c4c8b0]">{hex}</div>
                </div>
              ))
            ) : (
              <p className={mutedText}>Not set up yet.</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextCard title="One liner" value={profile.value_proposition} italic />
          <TextCard title="Industry" value={profile.industry} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextCard title="Positioning" value={profile.positioning} />
          <div className={card}>
            <h2 className={cardTitle}>Goals</h2>
            {profile.primary_goal || profile.secondary_goals.length ? (
              <div className="mt-3 space-y-3">
                {profile.primary_goal && (
                  <p className="text-sm text-[#e8eadb]">{profile.primary_goal}</p>
                )}
                <ChipList items={profile.secondary_goals} />
              </div>
            ) : (
              <p className={cn("mt-3", mutedText)}>Not set up yet.</p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className={cn(card, "group")}>
            <div className="flex items-center justify-between gap-3">
              <h2 className={cardTitle}>Tone of voice</h2>
              <IconButton label="Edit tone of voice" onClick={onEditTone}>
                <Pencil className="h-4 w-4" />
              </IconButton>
            </div>
            <ChipList
              className="mt-3"
              items={[
                tone?.style,
                tone?.formality_level,
                tone?.humor_level,
                tone?.emotional_tone,
              ].filter(Boolean)}
            />
            {!tone && <p className={cn("mt-3", mutedText)}>Not set up yet.</p>}
          </div>
          <TextCard title="Target audience" value={profile.target_audience} />
        </div>

        <TextCard title="About the business" value={profile.product_description} />
      </div>

      <div className="rounded-3xl bg-[#2d3024] p-5 ring-1 ring-white/5">
        <div className="flex items-center justify-between gap-3">
          <h2 className={cardTitle}>Images</h2>
          <span className="text-xs text-[#e8eadb]/55">Stored in Drive · System</span>
        </div>
        <button
          type="button"
          onClick={onUploadImage}
          disabled={imageBusy}
          className="mt-4 grid w-full place-items-center gap-2 rounded-2xl bg-[#4d5538] py-12 text-sm text-[#e8eadb] transition hover:bg-[#586141] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {imageBusy ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
          {imageBusy ? "Uploading…" : "Upload an image"}
        </button>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {images.length ? (
            images.map((image) => (
              <div key={image.id} className="group relative">
                <img
                  src={driveFileSrc(image)}
                  alt={image.name}
                  className="aspect-square w-full rounded-2xl object-cover ring-1 ring-white/10"
                />
                <button
                  type="button"
                  aria-label={`Remove ${image.name}`}
                  onClick={() => onDeleteImage(image.id)}
                  disabled={imageBusy}
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 transition hover:bg-black/75 group-hover:opacity-100 disabled:cursor-not-allowed"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-2 grid aspect-square place-items-center rounded-2xl bg-[#3a3f2b] text-center text-sm text-[#e8eadb]/70">
              <div>
                <ImagePlus className="mx-auto mb-2 h-5 w-5 text-[#cfe09a]" />
                Not set up yet
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToneOfVoice({
  profile,
  tone,
  onEdit,
}: {
  profile: BrandProfileResponse;
  tone: ToneOfVoiceResponse | null;
  onEdit: () => void;
}) {
  if (!tone) {
    return (
      <div className={card}>
        <h1 className="text-2xl font-normal tracking-tight text-white">Tone of voice</h1>
        <p className={cn("mt-2", mutedText)}>Not set up yet for {profile.name}.</p>
        <Button className="mt-5 bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]" onClick={onEdit}>
          <Plus className="mr-2 h-4 w-4" /> Set up
        </Button>
      </div>
    );
  }

  const traits = [
    ["Style", tone.style],
    ["Formality", tone.formality_level],
    ["Humor", tone.humor_level],
    ["Emotional tone", tone.emotional_tone],
  ];

  return (
    <div className="grid content-start gap-4">
      <div className={card}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-normal tracking-tight text-white">Tone of voice</h1>
            <p className={cn("mt-2", mutedText)}>How {profile.name} sounds across every channel.</p>
          </div>
          <Button className="bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]" onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {traits.map(([label, value]) => (
          <div key={label} className={card}>
            <h2 className="text-base font-medium text-[#cfe09a]">{label}</h2>
            <p className={cn("mt-2", mutedText)}>{value || "Not set up yet."}</p>
          </div>
        ))}
      </div>
      <div className={card}>
        <h2 className={cardTitle}>Vocabulary rules</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Rule label="Point of view" value={tone.vocabulary_rules.point_of_view} />
          <Rule label="Sentence length" value={tone.vocabulary_rules.sentence_length} />
        </div>
        <ChipList className="mt-4" items={tone.vocabulary_rules.preferred_terms} />
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge active={tone.vocabulary_rules.use_active_voice}>Active voice</Badge>
          <Badge active={tone.vocabulary_rules.prefer_plain_language}>Plain language</Badge>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ChipCard title="Words to use" items={tone.words_to_use} />
        <ChipCard title="Words to avoid" items={tone.words_to_avoid} />
      </div>
      <ListCard title="Writing examples" items={tone.writing_examples} italic />
      <ListCard title="Forbidden claims" items={tone.forbidden_claims} />
    </div>
  );
}

function CompetitorsView({
  competitors,
  mutating,
  onAdd,
  onEdit,
  onDelete,
}: {
  competitors: CompetitorResponse[];
  mutating: boolean;
  onAdd: () => void;
  onEdit: (competitor: CompetitorResponse) => void;
  onDelete: (competitor: CompetitorResponse) => void;
}) {
  return (
    <div className="grid content-start gap-4">
      <div className={card}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-normal tracking-tight text-white">Competitors</h1>
            <p className={cn("mt-2", mutedText)}>Companies this brand is positioned against.</p>
          </div>
          <Button className="bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]" onClick={onAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add competitor
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl bg-[#33362a] ring-1 ring-white/5">
        {competitors.length ? (
          competitors.map((competitor) => (
            <div
              key={competitor.id}
              className="group grid gap-3 border-b border-white/5 p-4 last:border-b-0 md:grid-cols-[1fr_1fr_1.4fr_auto]"
            >
              <div>
                <div className="text-sm font-medium text-white">{competitor.name}</div>
              </div>
              <div>
                {competitor.website_url ? (
                  <a
                    href={withProtocol(competitor.website_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-[#cfe09a] hover:underline"
                  >
                    {trimProtocol(competitor.website_url)}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="text-sm text-[#e8eadb]/55">No website</span>
                )}
              </div>
              <p className={mutedText}>{competitor.notes || "No notes yet."}</p>
              <div className="flex items-center gap-1 md:justify-end">
                <IconButton label="Edit competitor" onClick={() => onEdit(competitor)}>
                  <Pencil className="h-4 w-4" />
                </IconButton>
                <IconButton
                  label="Delete competitor"
                  onClick={() => onDelete(competitor)}
                  disabled={mutating}
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-[#e8eadb]/75">No competitors yet.</p>
            <Button className="mt-4 bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]" onClick={onAdd}>
              <Plus className="mr-2 h-4 w-4" /> Add competitor
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function PermissionsView({
  brandServer,
  onApiError,
}: {
  brandServer: CatalogServer | undefined;
  onApiError: (err: unknown, fallback?: string) => void;
}) {
  const toolkitIds = useMemo(() => brandServer?.toolkit_ids ?? [], [brandServer]);
  return (
    <PermissionsMatrix
      toolkitIds={toolkitIds}
      moduleSlugs={["brand"]}
      enabled={Boolean(brandServer?.enabled)}
      theme={darkPermissionsTheme}
      toolsNoun="Brand DNA"
      stripToolPrefix={/^brand_/}
      disabledHint="Who can use the Brand DNA tools, and how. Enable the Brand DNA MCP server first to start granting access."
      connectHint="No toolkit is connected yet — enable the Brand DNA MCP server from the header."
      onApiError={onApiError}
    />
  );
}

type SourceFilter = "all" | "api" | "mcp";
type StatusFilter = "all" | "success" | "blocked" | "error";

type ActivityFilters = {
  source: SourceFilter;
  status: StatusFilter;
  principal: string; // "all" or a PrincipalInfo.key
  event: string;
  since: string; // yyyy-mm-dd or ""
  until: string; // yyyy-mm-dd or ""
};

const EMPTY_ACTIVITY_FILTERS: ActivityFilters = {
  source: "all",
  status: "all",
  principal: "all",
  event: "",
  since: "",
  until: "",
};

type ActivityScope = {
  moduleSlug: "brand";
  toolkitIds: string[];
};

function activityRequestPath(filters: ActivityFilters, offset: number, scope: ActivityScope) {
  const params = new URLSearchParams({
    limit: String(ACTIVITY_PAGE_SIZE),
    offset: String(offset),
  });

  params.set("module_slug", scope.moduleSlug);
  for (const toolkitId of scope.toolkitIds) params.append("toolkit_id", toolkitId);

  if (filters.source !== "all") params.set("source", filters.source);
  if (filters.status !== "all") params.set("outcome", filters.status);
  if (filters.since) params.set("since", new Date(`${filters.since}T00:00:00`).toISOString());
  if (filters.until) params.set("until", new Date(`${filters.until}T23:59:59.999`).toISOString());

  if (filters.principal.startsWith("user:")) {
    params.set("actor_user_id", filters.principal.slice("user:".length));
  } else if (filters.principal.startsWith("key:")) {
    params.set("api_key_id", filters.principal.slice("key:".length));
  }

  return `/api/v1/request-logs?${params.toString()}`;
}

function sameActivityFilters(a: ActivityFilters, b: ActivityFilters) {
  return (
    a.source === b.source &&
    a.status === b.status &&
    a.principal === b.principal &&
    a.event === b.event &&
    a.since === b.since &&
    a.until === b.until
  );
}

type PrincipalInfo = {
  key: string;
  label: string;
  type: "user" | "api_key" | "system";
};

function shortId(id: string) {
  return id.slice(0, 8);
}

// Identify who made the call. Names for user principals are resolved
// best-effort from the toolkit access matrix (auth_user_id → name); api keys and
// unmapped users fall back to a short id.
function logPrincipal(log: RequestLogSummary, userNames: Map<string, string>): PrincipalInfo {
  if (log.actor_user_id) {
    return {
      key: `user:${log.actor_user_id}`,
      label: userNames.get(log.actor_user_id) ?? `User ${shortId(log.actor_user_id)}`,
      type: "user",
    };
  }
  if (log.api_key_id) {
    return {
      key: `key:${log.api_key_id}`,
      label: `API key ${shortId(log.api_key_id)}`,
      type: "api_key",
    };
  }
  return { key: "system", label: "System", type: "system" };
}

function logIsSuccess(log: RequestLogSummary) {
  if (log.outcome != null) return log.outcome === "success" || log.outcome === "ok";
  if (log.status_code != null) return log.status_code < 400;
  return true;
}

function logIsBlocked(log: RequestLogSummary) {
  return log.outcome === "blocked";
}

function PrincipalBadge({ principal }: { principal: PrincipalInfo }) {
  const Icon = principal.type === "user" ? UserIcon : principal.type === "api_key" ? KeyRound : Bot;
  return (
    <span className="inline-flex items-center gap-1.5 text-[#e8eadb]/80">
      <Icon className="h-3.5 w-3.5 shrink-0 text-[#cfe09a]" />
      <span className="truncate">{principal.label}</span>
    </span>
  );
}

const activityControl =
  "rounded-full border border-white/10 bg-[#202318] px-3 py-1.5 text-sm text-[#e8eadb] outline-none placeholder:text-[#c4c8b0]/45";

function ActivityView({
  brandServer,
  catalogReady,
  onApiError,
}: {
  brandServer: CatalogServer | undefined;
  catalogReady: boolean;
  onApiError: (err: unknown, fallback?: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ActivityFilters>(EMPTY_ACTIVITY_FILTERS);
  const [eventInput, setEventInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const activityScope = useMemo<ActivityScope>(() => {
    const toolkitIds = brandServer?.enabled ? (brandServer.toolkit_ids ?? []) : [];
    return { moduleSlug: "brand", toolkitIds };
  }, [brandServer]);

  const { data, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, error } =
    useInfiniteQuery({
      queryKey: ["brand-activity", activityScope.moduleSlug, activityScope.toolkitIds, filters],
      queryFn: ({ pageParam, signal }) =>
        apiRequest<Page<RequestLogSummary>>(
          activityRequestPath(filters, pageParam, activityScope),
          {
            signal,
          },
        ),
      initialPageParam: 0,
      enabled: catalogReady,
      getNextPageParam: (lastPage) => {
        const nextOffset = lastPage.offset + lastPage.items.length;
        return nextOffset < lastPage.total ? nextOffset : undefined;
      },
      staleTime: 30 * 1000,
    });

  useEffect(() => {
    if (error) onApiError(error, "Could not load activity");
  }, [error, onApiError]);

  // Best-effort name lookup for user principals. The access matrix is admin-gated,
  // so a 403/empty result simply leaves principals labelled by short id.
  const firstToolkitId = activityScope.toolkitIds[0];
  const { data: matrix } = useQuery({
    queryKey: ["toolkit-access-matrix", firstToolkitId, activityScope.moduleSlug],
    queryFn: () =>
      apiRequest<ToolkitAccessMatrix>(
        `/api/v1/toolkits/${firstToolkitId}/access-matrix?module_slug=${activityScope.moduleSlug}`,
      ),
    enabled: Boolean(firstToolkitId),
    staleTime: 60 * 1000,
    retry: false,
  });

  const userNames = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of matrix?.principals ?? []) {
      if (p.auth_user_id) map.set(p.auth_user_id, p.name);
    }
    return map;
  }, [matrix]);

  // Brand DNA only: UI calls hit /api/v1/brand/*, MCP calls use brand_* tools.
  const allLogs = useMemo(
    () =>
      (data?.pages.flatMap((page) => page.items) ?? [])
        .filter(isBrandLog)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [data],
  );

  // Distinct principals seen in the loaded logs, for the principal filter.
  const principalOptions = useMemo(() => {
    const seen = new Map<string, PrincipalInfo>();
    for (const log of allLogs) {
      const p = logPrincipal(log, userNames);
      if (!seen.has(p.key)) seen.set(p.key, p);
    }
    return Array.from(seen.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [allLogs, userNames]);

  const sinceMs = filters.since ? new Date(`${filters.since}T00:00:00`).getTime() : null;
  const untilMs = filters.until ? new Date(`${filters.until}T23:59:59.999`).getTime() : null;
  const eventQuery = filters.event.trim().toLowerCase();

  const logs = useMemo(
    () =>
      allLogs.filter((log) => {
        if (filters.source !== "all" && log.source !== filters.source) return false;
        if (filters.status === "success" && !logIsSuccess(log)) return false;
        if (filters.status === "blocked" && !logIsBlocked(log)) return false;
        if (filters.status === "error" && (logIsSuccess(log) || logIsBlocked(log))) return false;
        if (filters.principal !== "all" && logPrincipal(log, userNames).key !== filters.principal)
          return false;
        if (eventQuery) {
          const haystack =
            `${eventLabel(log)} ${log.path ?? ""} ${log.tool_name ?? ""}`.toLowerCase();
          if (!haystack.includes(eventQuery)) return false;
        }
        const ts = new Date(log.created_at).getTime();
        if (sinceMs != null && ts < sinceMs) return false;
        if (untilMs != null && ts > untilMs) return false;
        return true;
      }),
    [allLogs, filters, eventQuery, sinceMs, untilMs, userNames],
  );

  const filtersActive =
    filters.source !== "all" ||
    filters.status !== "all" ||
    filters.principal !== "all" ||
    filters.event.trim() !== "" ||
    filters.since !== "" ||
    filters.until !== "";

  const updateFilters = useCallback(
    (updater: (filters: ActivityFilters) => ActivityFilters) => {
      const next = updater(filters);
      void queryClient.cancelQueries({ queryKey: ["brand-activity"] });
      setFilters(next);
      setFiltering(true);
      if (sameActivityFilters(filters, next)) {
        void queryClient.refetchQueries({ queryKey: ["brand-activity", next], type: "active" });
      }
    },
    [filters, queryClient],
  );

  const updateEventInput = useCallback(
    (value: string) => {
      setEventInput(value);
      const query = value.trim();
      if (query.length > 0 && query.length < 3) return;
      updateFilters((f) => ({ ...f, event: value }));
    },
    [updateFilters],
  );

  useEffect(() => {
    if (!isFetching) setFiltering(false);
  }, [isFetching]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="grid content-start gap-4">
      <div className={cn(card, "flex min-h-32 items-end justify-between gap-4")}>
        <div className="self-center">
          <h1 className="text-2xl font-normal tracking-tight text-white">Activity</h1>
          <p className={cn("mt-2", mutedText)}>
            Every change made through Console and via MCP tool calls.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((open) => !open)}
          aria-label={showFilters ? "Hide activity filters" : "Show activity filters"}
          className={cn(
            "relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition",
            filtersActive
              ? "bg-[#cfe09a] text-[#1f2118] shadow-sm"
              : showFilters
                ? "bg-white/10 text-white"
                : "bg-white/5 text-[#c4c8b0] hover:bg-white/10 hover:text-white",
          )}
        >
          <SlidersHorizontal className="h-5 w-5" />
          {filtersActive && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-[#cfe09a]" />
          )}
        </button>
      </div>

      {showFilters && (
        <div className={cn(card, "flex flex-wrap items-end gap-3")}>
          <FilterField label="Source">
            <SegmentedFilter
              value={filters.source}
              onChange={(source) => updateFilters((f) => ({ ...f, source }))}
              options={[
                { value: "all", label: "All" },
                { value: "api", label: "Console" },
                { value: "mcp", label: "MCP" },
              ]}
            />
          </FilterField>
          <FilterField label="Status">
            <SegmentedFilter
              value={filters.status}
              onChange={(status) => updateFilters((f) => ({ ...f, status }))}
              options={[
                { value: "all", label: "All" },
                { value: "success", label: "Success" },
                { value: "blocked", label: "Blocked" },
                { value: "error", label: "Error" },
              ]}
            />
          </FilterField>
          <FilterField label="Principal">
            <select
              value={filters.principal}
              onChange={(e) => updateFilters((f) => ({ ...f, principal: e.target.value }))}
              className={activityControl}
              aria-label="Filter by principal"
            >
              <option value="all">All principals</option>
              {principalOptions.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Event">
            <input
              type="text"
              value={eventInput}
              onChange={(e) => updateEventInput(e.target.value)}
              placeholder="Search tool or path"
              className={cn(activityControl, "w-48")}
              aria-label="Filter by event"
            />
          </FilterField>
          <FilterField label="From">
            <input
              type="date"
              value={filters.since}
              max={filters.until || undefined}
              onChange={(e) => updateFilters((f) => ({ ...f, since: e.target.value }))}
              className={cn(activityControl, "[color-scheme:dark]")}
              aria-label="From date"
            />
          </FilterField>
          <FilterField label="To">
            <input
              type="date"
              value={filters.until}
              min={filters.since || undefined}
              onChange={(e) => updateFilters((f) => ({ ...f, until: e.target.value }))}
              className={cn(activityControl, "[color-scheme:dark]")}
              aria-label="To date"
            />
          </FilterField>
          {filtersActive && (
            <button
              type="button"
              onClick={() => {
                setEventInput("");
                updateFilters(() => EMPTY_ACTIVITY_FILTERS);
              }}
              className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1.5 text-sm text-[#e8eadb]/75 transition hover:bg-white/10"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-3xl bg-[#33362a] ring-1 ring-white/5">
        <table className="w-full text-sm">
          <thead className="bg-[#2d3024] text-xs uppercase tracking-wide text-[#c4c8b0]/70">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Event</th>
              <th className="px-4 py-3 text-left font-medium">Principal</th>
              <th className="px-4 py-3 text-left font-medium">Source</th>
              <th className="px-4 py-3 text-left font-medium">When</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || (filtering && isFetching && !isFetchingNextPage)) && (
              <ActivityTableSkeletonRows />
            )}
            {!isLoading &&
              !(filtering && isFetching && !isFetchingNextPage) &&
              logs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedId(log.id)}
                  className="cursor-pointer border-t border-white/5 transition hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{eventLabel(log)}</div>
                    <div className="mt-0.5 truncate text-xs text-[#e8eadb]/55">
                      {log.tool_name ? (log.path ?? log.method) : log.path}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <PrincipalBadge principal={logPrincipal(log, userNames)} />
                  </td>
                  <td className="px-4 py-3">
                    <SourceBadge source={log.source} />
                  </td>
                  <td className="px-4 py-3 text-[#e8eadb]/65">{timeAgo(log.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StatusDot outcome={log.outcome} />
                      <span className="capitalize text-[#e8eadb]/80">
                        {log.outcome ?? statusLabel(log.status_code)}
                      </span>
                      {log.duration_ms != null && (
                        <span className="text-xs text-[#e8eadb]/45">· {log.duration_ms}ms</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            {!isLoading &&
              !(filtering && isFetching && !isFetchingNextPage) &&
              logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[#e8eadb]/60">
                    {filtersActive
                      ? "No activity matches these filters."
                      : "No activity recorded yet."}
                  </td>
                </tr>
              )}
            {!isLoading &&
              !(filtering && isFetching && !isFetchingNextPage) &&
              isFetchingNextPage && <ActivityTableSkeletonRows />}
          </tbody>
        </table>
      </div>

      <div ref={loadMoreRef} className="grid min-h-8 place-items-center text-sm text-[#e8eadb]/55">
        {!isFetchingNextPage && hasNextPage && "Loading more activity..."}
      </div>

      <ActivityDetailDialog
        logId={selectedId}
        userNames={userNames}
        onOpenChange={(open) => !open && setSelectedId(null)}
        onApiError={onApiError}
      />
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs uppercase tracking-wide text-[#c4c8b0]/70">{label}</span>
      {children}
    </label>
  );
}

function SegmentedFilter<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  const activeIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value),
  );

  return (
    <div
      className="relative grid overflow-hidden rounded-full border border-white/10 bg-[#202318] p-0.5"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0.5 left-0.5 rounded-full bg-[#cfe09a] transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 4px) / ${options.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "relative z-10 min-w-20 rounded-full px-3 py-1 text-sm transition-colors duration-200",
            value === opt.value ? "text-[#1f2118]" : "text-[#e8eadb]/70 hover:text-[#e8eadb]",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ActivityTableSkeletonRows() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <tr key={index} aria-hidden="true" className="border-t border-white/5">
          <td className="px-4 py-3">
            <div className="space-y-2">
              <BrandSkeleton className="h-4 w-40 max-w-full" />
              <BrandSkeleton className="h-3 w-56 max-w-full" />
            </div>
          </td>
          <td className="px-4 py-3">
            <BrandSkeleton className="h-4 w-28" />
          </td>
          <td className="px-4 py-3">
            <BrandSkeleton className="h-6 w-20 rounded-full" />
          </td>
          <td className="px-4 py-3">
            <BrandSkeleton className="h-4 w-24" />
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <BrandSkeleton className="h-2.5 w-2.5 rounded-full" />
              <BrandSkeleton className="h-4 w-24" />
              {index % 2 === 0 && <BrandSkeleton className="h-3 w-10" />}
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

function ActivityDetailDialog({
  logId,
  userNames,
  onOpenChange,
  onApiError,
}: {
  logId: string | null;
  userNames: Map<string, string>;
  onOpenChange: (open: boolean) => void;
  onApiError: (err: unknown, fallback?: string) => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["brand-activity", logId],
    queryFn: () => apiRequest<RequestLogDetail>(`/api/v1/request-logs/${logId}`),
    enabled: Boolean(logId),
  });

  useEffect(() => {
    if (error) onApiError(error, "Could not load activity detail");
  }, [error, onApiError]);

  return (
    <Dialog open={Boolean(logId)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl bg-[#272a1f] text-[#e8eadb] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {data && <SourceBadge source={data.source} />}
            {data ? eventLabel(data) : "Activity detail"}
          </DialogTitle>
        </DialogHeader>
        {isLoading || !data ? (
          <div className="grid place-items-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-[#e8eadb]/60" />
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <Detail label="Source" value={data.source === "mcp" ? "MCP" : "Console"} />
              <Detail label="Principal" value={logPrincipal(data, userNames).label} />
              <Detail label="Status" value={data.outcome ?? statusLabel(data.status_code)} />
              <Detail label="When" value={new Date(data.created_at).toLocaleString()} />
              <Detail
                label="Duration"
                value={data.duration_ms != null ? `${data.duration_ms} ms` : "—"}
              />
              {data.method && <Detail label="Method" value={data.method} />}
              {data.status_code != null && (
                <Detail label="Status code" value={String(data.status_code)} />
              )}
              {data.tool_name && <Detail label="Tool" value={data.tool_name} />}
              {data.path && <Detail label="Path" value={data.path} />}
            </dl>
            <div>
              <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#c4c8b0]/70">
                Request
              </h3>
              <JsonBlock value={data.request_body} truncated={data.request_truncated} />
            </div>
            <div>
              <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#c4c8b0]/70">
                Response
              </h3>
              <JsonBlock value={data.response_body} truncated={data.response_truncated} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase text-[#c4c8b0]/70">{label}</dt>
      <dd className="mt-1 break-words text-[#e8eadb]">{value}</dd>
    </div>
  );
}

function JsonBlock({ value, truncated }: { value: unknown; truncated?: boolean }) {
  return (
    <div>
      <pre className="overflow-auto rounded-xl bg-[#202318] p-3 text-xs leading-relaxed text-[#e8eadb]/90 ring-1 ring-white/5">
        {value == null ? "—" : JSON.stringify(value, null, 2)}
      </pre>
      {truncated && <p className="mt-1 text-xs text-[#e8eadb]/45">Payload truncated.</p>}
    </div>
  );
}

function SourceBadge({ source }: { source: RequestLogSource }) {
  const mcp = source === "mcp";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        mcp ? "bg-violet-500/20 text-violet-200" : "bg-sky-500/20 text-sky-200",
      )}
    >
      {mcp ? <Plug className="h-3 w-3" /> : <MousePointerClick className="h-3 w-3" />}
      {mcp ? "MCP" : "Console"}
    </span>
  );
}

function StatusDot({ outcome }: { outcome: string | null }) {
  const ok = outcome == null || outcome === "success" || outcome === "ok";
  const blocked = outcome === "blocked";
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        ok ? "bg-emerald-400" : blocked ? "bg-amber-300" : "bg-rose-400",
      )}
    />
  );
}

function isBrandLog(log: RequestLogSummary) {
  if (log.tool_name) return log.tool_name.startsWith("brand_");
  return Boolean(log.path?.startsWith("/api/v1/brand"));
}

function eventLabel(log: RequestLogSummary) {
  if (log.tool_name) return log.tool_name;
  if (log.method && log.path) return `${log.method} ${log.path}`;
  return log.path ?? log.method ?? "request";
}

function statusLabel(statusCode: number | null) {
  if (statusCode == null) return "unknown";
  return statusCode < 400 ? "success" : "error";
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
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
  onChange,
}: {
  open: boolean;
  form: ProfileForm;
  mutating: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (form: ProfileForm) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl bg-[#272a1f] text-[#e8eadb] sm:max-w-2xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Brand profile</DialogTitle>
          </DialogHeader>
          <div className="mt-5 grid gap-4">
            <Field label="Name" htmlFor="brand-name">
              <Input
                id="brand-name"
                className={inputClass}
                value={form.name}
                onChange={(e) => onChange({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Website" htmlFor="brand-website">
              <Input
                id="brand-website"
                className={inputClass}
                value={form.website_url}
                placeholder="https://example.com"
                onChange={(e) => onChange({ ...form, website_url: e.target.value })}
              />
            </Field>
            <Field label="Industry" htmlFor="brand-industry">
              <Input
                id="brand-industry"
                className={inputClass}
                value={form.industry}
                onChange={(e) => onChange({ ...form, industry: e.target.value })}
              />
            </Field>
            <Field label="Value proposition" htmlFor="brand-value">
              <Textarea
                id="brand-value"
                className={textareaClass}
                value={form.value_proposition}
                onChange={(e) => onChange({ ...form, value_proposition: e.target.value })}
              />
            </Field>
            <Field label="Positioning" htmlFor="brand-positioning">
              <Textarea
                id="brand-positioning"
                className={textareaClass}
                value={form.positioning}
                onChange={(e) => onChange({ ...form, positioning: e.target.value })}
              />
            </Field>
            <Field label="Primary goal" htmlFor="brand-primary-goal">
              <Input
                id="brand-primary-goal"
                className={inputClass}
                value={form.primary_goal}
                onChange={(e) => onChange({ ...form, primary_goal: e.target.value })}
              />
            </Field>
            <Field label="Secondary goals" htmlFor="brand-secondary-goals">
              <Textarea
                id="brand-secondary-goals"
                className={textareaClass}
                placeholder="One per line"
                value={form.secondary_goals}
                onChange={(e) => onChange({ ...form, secondary_goals: e.target.value })}
              />
            </Field>
            <Field label="Target audience" htmlFor="brand-audience">
              <Textarea
                id="brand-audience"
                className={textareaClass}
                value={form.target_audience}
                onChange={(e) => onChange({ ...form, target_audience: e.target.value })}
              />
            </Field>
            <Field label="Product description" htmlFor="brand-product">
              <Textarea
                id="brand-product"
                className={textareaClass}
                value={form.product_description}
                onChange={(e) => onChange({ ...form, product_description: e.target.value })}
              />
            </Field>
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutating || !form.name.trim()}
              className="bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]"
            >
              {mutating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ToneDialog({
  open,
  form,
  mutating,
  onOpenChange,
  onSubmit,
  onChange,
}: {
  open: boolean;
  form: ToneForm;
  mutating: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (form: ToneForm) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl bg-[#272a1f] text-[#e8eadb] sm:max-w-2xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Tone of voice</DialogTitle>
          </DialogHeader>
          <div className="mt-5 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Style" htmlFor="tone-style">
                <Input
                  id="tone-style"
                  className={inputClass}
                  value={form.style}
                  onChange={(e) => onChange({ ...form, style: e.target.value })}
                />
              </Field>
              <Field label="Formality" htmlFor="tone-formality">
                <Input
                  id="tone-formality"
                  className={inputClass}
                  value={form.formality_level}
                  onChange={(e) => onChange({ ...form, formality_level: e.target.value })}
                />
              </Field>
              <Field label="Humor" htmlFor="tone-humor">
                <Input
                  id="tone-humor"
                  className={inputClass}
                  value={form.humor_level}
                  onChange={(e) => onChange({ ...form, humor_level: e.target.value })}
                />
              </Field>
              <Field label="Emotional tone" htmlFor="tone-emotional">
                <Input
                  id="tone-emotional"
                  className={inputClass}
                  value={form.emotional_tone}
                  onChange={(e) => onChange({ ...form, emotional_tone: e.target.value })}
                />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Point of view" htmlFor="tone-pov">
                <Input
                  id="tone-pov"
                  className={inputClass}
                  value={form.point_of_view}
                  onChange={(e) => onChange({ ...form, point_of_view: e.target.value })}
                />
              </Field>
              <Field label="Sentence length" htmlFor="tone-sentence">
                <Input
                  id="tone-sentence"
                  className={inputClass}
                  value={form.sentence_length}
                  onChange={(e) => onChange({ ...form, sentence_length: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Preferred terms" htmlFor="tone-preferred">
              <Textarea
                id="tone-preferred"
                className={textareaClass}
                placeholder="Comma or newline separated"
                value={form.preferred_terms}
                onChange={(e) => onChange({ ...form, preferred_terms: e.target.value })}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-2xl bg-[#33362a] p-4 text-sm">
                <input
                  type="checkbox"
                  checked={form.use_active_voice}
                  onChange={(e) => onChange({ ...form, use_active_voice: e.target.checked })}
                />
                Use active voice
              </label>
              <label className="flex items-center gap-3 rounded-2xl bg-[#33362a] p-4 text-sm">
                <input
                  type="checkbox"
                  checked={form.prefer_plain_language}
                  onChange={(e) => onChange({ ...form, prefer_plain_language: e.target.checked })}
                />
                Prefer plain language
              </label>
            </div>
            <Field label="Words to use" htmlFor="tone-use">
              <Textarea
                id="tone-use"
                className={textareaClass}
                placeholder="Comma or newline separated"
                value={form.words_to_use}
                onChange={(e) => onChange({ ...form, words_to_use: e.target.value })}
              />
            </Field>
            <Field label="Words to avoid" htmlFor="tone-avoid">
              <Textarea
                id="tone-avoid"
                className={textareaClass}
                placeholder="Comma or newline separated"
                value={form.words_to_avoid}
                onChange={(e) => onChange({ ...form, words_to_avoid: e.target.value })}
              />
            </Field>
            <Field label="Writing examples" htmlFor="tone-examples">
              <Textarea
                id="tone-examples"
                className={textareaClass}
                placeholder="One per line"
                value={form.writing_examples}
                onChange={(e) => onChange({ ...form, writing_examples: e.target.value })}
              />
            </Field>
            <Field label="Forbidden claims" htmlFor="tone-forbidden">
              <Textarea
                id="tone-forbidden"
                className={textareaClass}
                placeholder="One per line"
                value={form.forbidden_claims}
                onChange={(e) => onChange({ ...form, forbidden_claims: e.target.value })}
              />
            </Field>
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutating}
              className="bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]"
            >
              {mutating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function VisualDialog({
  open,
  form,
  mutating,
  onOpenChange,
  onSubmit,
  onChange,
}: {
  open: boolean;
  form: VisualForm;
  mutating: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (form: VisualForm) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl bg-[#272a1f] text-[#e8eadb] sm:max-w-2xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Visual identity</DialogTitle>
          </DialogHeader>
          <div className="mt-5 grid gap-4">
            <Field label="Logo URL" htmlFor="visual-logo">
              <Input
                id="visual-logo"
                className={inputClass}
                value={form.logo_url}
                placeholder="https://example.com/logo.png"
                onChange={(e) => onChange({ ...form, logo_url: e.target.value })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Primary font" htmlFor="visual-primary-font">
                <FontPicker
                  id="visual-primary-font"
                  value={form.primary_font}
                  placeholder="Select a primary font"
                  onChange={(font) => onChange({ ...form, primary_font: font })}
                />
              </Field>
              <Field label="Secondary font" htmlFor="visual-secondary-font">
                <FontPicker
                  id="visual-secondary-font"
                  value={form.secondary_font}
                  placeholder="Select a secondary font"
                  onChange={(font) => onChange({ ...form, secondary_font: font })}
                />
              </Field>
            </div>
            <Field label="Color palette" htmlFor="visual-colors">
              <Textarea
                id="visual-colors"
                className={textareaClass}
                placeholder="#1f2118, #cfe09a"
                value={form.color_palette}
                onChange={(e) => onChange({ ...form, color_palette: e.target.value })}
              />
            </Field>
            <p className="text-xs text-[#e8eadb]/55">
              Images are managed in Drive (System / Brand DNA) — upload them from the Images panel.
            </p>
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutating}
              className="bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]"
            >
              {mutating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CompetitorDialog({
  open,
  form,
  editing,
  mutating,
  onOpenChange,
  onSubmit,
  onChange,
}: {
  open: boolean;
  form: CompetitorForm;
  editing: CompetitorResponse | null;
  mutating: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (form: CompetitorForm) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl bg-[#272a1f] text-[#e8eadb]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit competitor" : "Add competitor"}</DialogTitle>
          </DialogHeader>
          <div className="mt-5 grid gap-4">
            <Field label="Name" htmlFor="competitor-name">
              <Input
                id="competitor-name"
                className={inputClass}
                value={form.name}
                onChange={(e) => onChange({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Website" htmlFor="competitor-website">
              <Input
                id="competitor-website"
                className={inputClass}
                value={form.website_url}
                placeholder="https://example.com"
                onChange={(e) => onChange({ ...form, website_url: e.target.value })}
              />
            </Field>
            <Field label="Notes" htmlFor="competitor-notes">
              <Textarea
                id="competitor-notes"
                className={textareaClass}
                value={form.notes}
                onChange={(e) => onChange({ ...form, notes: e.target.value })}
              />
            </Field>
          </div>
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={mutating || !form.name.trim()}
              className="bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]"
            >
              {mutating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EmptyBrand({ onSetup }: { onSetup: () => void }) {
  return (
    <div className={card}>
      <h1 className="text-3xl font-normal tracking-tight text-white">Not set up yet</h1>
      <p className={cn("mt-3 max-w-2xl", mutedText)}>
        Create the brand profile first. Tone of voice, visual identity, and competitors attach to
        that organization-level profile.
      </p>
      <Button className="mt-5 bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]" onClick={onSetup}>
        <Plus className="mr-2 h-4 w-4" /> Set up
      </Button>
    </div>
  );
}

function NeedsProfile({ onSetup }: { onSetup: () => void }) {
  return (
    <div className={card}>
      <h1 className="text-2xl font-normal tracking-tight text-white">Create the profile first</h1>
      <p className={cn("mt-2", mutedText)}>This view unlocks once the Brand DNA profile exists.</p>
      <Button className="mt-5 bg-[#cfe09a] text-[#1f2118] hover:bg-[#dcebab]" onClick={onSetup}>
        <Plus className="mr-2 h-4 w-4" /> Set up
      </Button>
    </div>
  );
}

function LoadingState({ view }: { view: BrandView }) {
  if (view === "activity") return <ActivityLoadingState />;
  if (view === "permissions") return <PermissionsMatrixLoading theme={darkPermissionsTheme} />;
  if (view === "competitors") return <CompetitorsLoadingState />;
  if (view === "tov") return <ToneLoadingState />;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]" aria-label="Loading Brand DNA">
      <div className="grid content-start gap-4">
        <div className={card}>
          <div className="flex items-start justify-between gap-4">
            <div className="w-full max-w-md space-y-4">
              <BrandSkeleton className="h-12 w-64 max-w-full" />
              <BrandSkeleton className="h-5 w-44" />
            </div>
            <BrandSkeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
          <div className="grid min-h-40 place-items-center rounded-3xl bg-[#f6f4ea]/90 p-6">
            <BrandSkeleton className="h-20 w-20 rounded-full bg-[#1f2118]/15" />
          </div>
          <div className={card}>
            <div className="flex items-center justify-between gap-3">
              <BrandSkeleton className="h-5 w-20" />
              <BrandSkeleton className="h-9 w-9 rounded-full" />
            </div>
            <div className="mt-6 flex gap-10">
              <div className="space-y-3">
                <BrandSkeleton className="h-10 w-14" />
                <BrandSkeleton className="h-4 w-24" />
              </div>
              <div className="space-y-3">
                <BrandSkeleton className="h-10 w-14" />
                <BrandSkeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between gap-3">
            <BrandSkeleton className="h-5 w-20" />
            <BrandSkeleton className="h-9 w-9 rounded-full" />
          </div>
          <div className="mt-5 flex flex-wrap gap-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <BrandSkeleton className="h-16 w-16 rounded-full" />
                <BrandSkeleton className="h-3 w-14" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SkeletonTextCard lines={3} />
          <SkeletonTextCard lines={2} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <SkeletonTextCard lines={4} />
          <SkeletonTextCard lines={3} />
        </div>
      </div>

      <div className="grid content-start gap-4">
        <div className={card}>
          <BrandSkeleton className="h-5 w-24" />
          <div className="mt-5 grid grid-cols-2 gap-3">
            <BrandSkeleton className="aspect-square rounded-2xl" />
            <BrandSkeleton className="aspect-square rounded-2xl" />
          </div>
        </div>
        <SkeletonTextCard lines={5} />
        <SkeletonTextCard lines={4} />
      </div>
    </div>
  );
}

function PageIntroSkeleton({
  titleWidth = "w-48",
  textWidth = "w-80",
}: {
  titleWidth?: string;
  textWidth?: string;
}) {
  return (
    <div className={card}>
      <BrandSkeleton className={cn("h-8 max-w-full", titleWidth)} />
      <BrandSkeleton className={cn("mt-4 h-4 max-w-full", textWidth)} />
    </div>
  );
}

function ToneLoadingState() {
  return (
    <div className="grid content-start gap-4" aria-label="Loading tone of voice">
      <PageIntroSkeleton titleWidth="w-52" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={card}>
            <BrandSkeleton className="h-5 w-24" />
            <div className="mt-4 space-y-3">
              <BrandSkeleton className="h-4 w-full" />
              <BrandSkeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
      <SkeletonTextCard lines={4} />
      <div className="grid gap-4 sm:grid-cols-2">
        <SkeletonTextCard lines={3} />
        <SkeletonTextCard lines={3} />
      </div>
    </div>
  );
}

function CompetitorsLoadingState() {
  return (
    <div className="grid content-start gap-4" aria-label="Loading competitors">
      <PageIntroSkeleton titleWidth="w-44" textWidth="w-72" />
      <div className="overflow-hidden rounded-3xl bg-[#33362a] ring-1 ring-white/5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="grid gap-3 border-b border-white/5 p-4 last:border-b-0 md:grid-cols-[1fr_1fr_1.4fr_auto]"
          >
            <BrandSkeleton className="h-5 w-36 max-w-full" />
            <BrandSkeleton className="h-5 w-44 max-w-full" />
            <div className="space-y-2">
              <BrandSkeleton className="h-4 w-full" />
              <BrandSkeleton className="h-4 w-2/3" />
            </div>
            <div className="flex gap-2 md:justify-end">
              <BrandSkeleton className="h-8 w-8 rounded-full" />
              <BrandSkeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityLoadingState() {
  return (
    <div className="grid content-start gap-4" aria-label="Loading activity">
      <PageIntroSkeleton titleWidth="w-32" textWidth="w-96" />
      <div className="overflow-hidden rounded-3xl bg-[#33362a] ring-1 ring-white/5">
        <table className="w-full text-sm">
          <thead className="bg-[#2d3024] text-xs uppercase tracking-wide text-[#c4c8b0]/70">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Event</th>
              <th className="px-4 py-3 text-left font-medium">Source</th>
              <th className="px-4 py-3 text-left font-medium">When</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <ActivityTableSkeletonRows />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SkeletonTextCard({ lines }: { lines: number }) {
  return (
    <div className={card}>
      <BrandSkeleton className="h-5 w-28" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <BrandSkeleton
            key={index}
            className={cn("h-4", index === lines - 1 ? "w-2/3" : "w-full")}
          />
        ))}
      </div>
    </div>
  );
}

function BrandSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("bg-[#c4c8b0]/12", className)} />;
}

function TextCard({
  title,
  value,
  italic = false,
}: {
  title: string;
  value?: string | null;
  italic?: boolean;
}) {
  return (
    <div className={card}>
      <h2 className={cardTitle}>{title}</h2>
      <p className={cn("mt-3", italic ? "font-serif text-lg italic text-[#e8eadb]" : mutedText)}>
        {value || "Not set up yet."}
      </p>
    </div>
  );
}

function ChipCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={card}>
      <h2 className={cardTitle}>{title}</h2>
      <ChipList className="mt-3" items={items} />
    </div>
  );
}

function ListCard({
  title,
  items,
  italic = false,
}: {
  title: string;
  items: string[];
  italic?: boolean;
}) {
  return (
    <div className={card}>
      <h2 className={cardTitle}>{title}</h2>
      <div className="mt-3 space-y-2">
        {items.length ? (
          items.map((item) => (
            <p
              key={item}
              className={italic ? "font-serif text-lg italic text-[#e8eadb]" : mutedText}
            >
              {item}
            </p>
          ))
        ) : (
          <p className={mutedText}>Not set up yet.</p>
        )}
      </div>
    </div>
  );
}

function Rule({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <div className="text-xs uppercase text-[#c4c8b0]/70">{label}</div>
      <div className="mt-1 text-sm text-[#e8eadb]">{value || "Not set up yet."}</div>
    </div>
  );
}

function ChipList({
  items,
  className,
}: {
  items: Array<string | null | undefined>;
  className?: string;
}) {
  const clean = items.filter((item): item is string => Boolean(item));
  if (!clean.length) return <p className={cn(mutedText, className)}>Not set up yet.</p>;
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {clean.map((item) => (
        <span key={item} className="rounded-xl bg-[#454935] px-3 py-1 text-xs text-[#e8eadb]">
          {item}
        </span>
      ))}
    </div>
  );
}

function Badge({ active, children }: { active: boolean; children: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs",
        active ? "bg-[#cfe09a] text-[#1f2118]" : "bg-[#454935] text-[#e8eadb]/65",
      )}
    >
      {children}
    </span>
  );
}

function IconButton({
  label,
  children,
  onClick,
  disabled,
  className,
}: {
  label: string;
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-9 w-9 rounded-full text-[#c4c8b0] hover:bg-white/10 hover:text-white",
        "opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100",
        className,
      )}
    >
      {children}
    </Button>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

function nullable(value: string) {
  return value.trim() || null;
}

function splitList(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinList(items?: string[]) {
  return (items ?? []).join("\n");
}

function profileToForm(profile: BrandProfileResponse | null): ProfileForm {
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
    secondary_goals: joinList(profile.secondary_goals),
  };
}

function profilePayload(form: ProfileForm): BrandProfileUpsert {
  return {
    name: form.name.trim(),
    website_url: nullable(form.website_url),
    industry: nullable(form.industry),
    target_audience: nullable(form.target_audience),
    product_description: nullable(form.product_description),
    value_proposition: nullable(form.value_proposition),
    positioning: nullable(form.positioning),
    primary_goal: nullable(form.primary_goal),
    secondary_goals: splitList(form.secondary_goals),
  };
}

function toneToForm(tone: ToneOfVoiceResponse | null): ToneForm {
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
    forbidden_claims: joinList(tone.forbidden_claims),
  };
}

function tonePayload(form: ToneForm): ToneOfVoiceUpsert {
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
      prefer_plain_language: form.prefer_plain_language,
    },
    words_to_use: splitList(form.words_to_use),
    words_to_avoid: splitList(form.words_to_avoid),
    writing_examples: splitList(form.writing_examples),
    forbidden_claims: splitList(form.forbidden_claims),
  };
}

function visualToForm(visual: VisualIdentityResponse | null): VisualForm {
  if (!visual) return EMPTY_VISUAL_FORM;
  return {
    logo_url: visual.logo_url ?? "",
    primary_font: visual.primary_font ?? "",
    secondary_font: visual.secondary_font ?? "",
    color_palette: joinList(visual.color_palette),
    image_urls: joinList(visual.image_urls),
  };
}

function visualPayload(form: VisualForm): VisualIdentityUpsert {
  return {
    logo_url: nullable(form.logo_url),
    primary_font: nullable(form.primary_font),
    secondary_font: nullable(form.secondary_font),
    color_palette: splitList(form.color_palette),
    image_urls: splitList(form.image_urls),
  };
}

function withProtocol(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

function trimProtocol(value?: string | null) {
  return value?.replace(/^https?:\/\//i, "").replace(/\/$/, "") ?? "";
}
