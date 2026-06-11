import { useCallback, useEffect, useState } from "react";
import { Eye, Loader2, Plus, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest, apiRequestText } from "@/lib/api-client";

type LlmsFullGenerationMode = "auto" | "manual" | "hybrid";

type DiscoverySettings = {
  id: string;
  robots_enabled: boolean;
  robots_content: string;
  allow_ai_crawlers: boolean;
  blocked_user_agents: string[];
  robots_sitemap_url: string;
  llms_enabled: boolean;
  llms_auto_generate: boolean;
  llms_manual_content: string;
  llms_include_business_profile: boolean;
  llms_include_content_types: boolean;
  llms_include_custom_urls: boolean;
  llms_full_enabled: boolean;
  llms_full_generation_mode: LlmsFullGenerationMode;
  llms_full_included_content_type_ids: string[];
  llms_full_excluded_entry_ids: string[];
  llms_full_max_items: number;
  llms_full_include_full_body: boolean;
  llms_full_include_metadata: boolean;
  llms_full_content: string;
  llms_full_generated_at: string | null;
};

export type DiscoveryContentTypeOption = {
  id: string;
  display_name: string;
};

const inputClass = "h-11 rounded-lg";
const selectClass =
  "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200";
const cardClass = "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5";
const textareaClass =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200";
const checkboxRowClass =
  "flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium";

type OnError = (err: unknown, fallback?: string) => void;

function useDiscoverySettings(onError: OnError) {
  const [settings, setSettings] = useState<DiscoverySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    apiRequest<DiscoverySettings>("/api/v1/cms/discovery/settings")
      .then((row) => {
        if (!cancelled) setSettings(row);
      })
      .catch((err) => {
        if (!cancelled) onError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [onError]);

  const save = useCallback(
    async (patch: Partial<DiscoverySettings>, successMessage: string) => {
      setSaving(true);
      setMessage("");
      try {
        const next = await apiRequest<DiscoverySettings>("/api/v1/cms/discovery/settings", {
          method: "PATCH",
          body: JSON.stringify(patch),
        });
        setSettings(next);
        setMessage(successMessage);
      } catch (err) {
        onError(err, "Unable to save settings");
      } finally {
        setSaving(false);
      }
    },
    [onError],
  );

  return { settings, setSettings, loading, saving, save, message };
}

function usePreview(path: string, onError: OnError) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setContent(await apiRequestText(path));
    } catch (err) {
      onError(err, "Unable to load preview");
    } finally {
      setLoading(false);
    }
  }, [onError, path]);

  return { content, loading, load };
}

function LoadingCard() {
  return (
    <section className="flex items-center gap-2 rounded-2xl bg-white p-6 text-muted-foreground shadow-sm ring-1 ring-black/5">
      <Loader2 className="h-4 w-4 animate-spin" />
      Loading...
    </section>
  );
}

function PageHeader({
  title,
  description,
  onPreview,
  previewLoading,
}: {
  title: string;
  description: string;
  onPreview: () => void;
  previewLoading: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
      <Button variant="outline" className="rounded-lg" onClick={onPreview}>
        {previewLoading ? (
          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
        ) : (
          <Eye className="mr-1.5 h-4 w-4" />
        )}
        Preview {title.toLowerCase()}
      </Button>
    </div>
  );
}

function PreviewCard({ content }: { content: string | null }) {
  if (content === null) return null;
  return (
    <div className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold">Preview</h2>
      <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-xs leading-relaxed ring-1 ring-black/5">
        {content || "(empty)"}
      </pre>
    </div>
  );
}

function SuccessMessage({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
      {message}
    </p>
  );
}

export function RobotsView({ onError }: { onError: OnError }) {
  const { settings, loading, saving, save, message } = useDiscoverySettings(onError);
  const preview = usePreview("/api/v1/cms/discovery/robots.txt", onError);

  const [enabled, setEnabled] = useState(true);
  const [allowAi, setAllowAi] = useState(true);
  const [blockedAgents, setBlockedAgents] = useState<string[]>([]);
  const [agentInput, setAgentInput] = useState("");
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [manualContent, setManualContent] = useState("");

  useEffect(() => {
    if (!settings) return;
    setEnabled(settings.robots_enabled);
    setAllowAi(settings.allow_ai_crawlers);
    setBlockedAgents(settings.blocked_user_agents);
    setSitemapUrl(settings.robots_sitemap_url);
    setManualContent(settings.robots_content);
  }, [settings]);

  if (loading) return <LoadingCard />;

  const addAgent = () => {
    const agent = agentInput.trim();
    if (!agent || blockedAgents.includes(agent)) return;
    setBlockedAgents((current) => [...current, agent]);
    setAgentInput("");
  };

  return (
    <section className="space-y-6">
      <PageHeader
        title="Robots.txt"
        description="Control how search engines and AI crawlers access your site."
        onPreview={() => void preview.load()}
        previewLoading={preview.loading}
      />
      <SuccessMessage message={message} />

      <div className={cardClass}>
        <div className="space-y-4">
          <label className={checkboxRowClass}>
            <Checkbox
              checked={enabled}
              onCheckedChange={(checked) => setEnabled(checked === true)}
            />
            Robots.txt enabled (disabled blocks all crawlers)
          </label>
          <label className={checkboxRowClass}>
            <Checkbox
              checked={allowAi}
              onCheckedChange={(checked) => setAllowAi(checked === true)}
            />
            Allow AI crawlers (GPTBot, ClaudeBot, PerplexityBot, ...)
          </label>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Blocked user agents</label>
            <div className="flex gap-2">
              <Input
                value={agentInput}
                onChange={(event) => setAgentInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addAgent();
                  }
                }}
                placeholder="BadBot"
                className={inputClass}
              />
              <Button variant="outline" className="h-11 rounded-lg" onClick={addAgent}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {blockedAgents.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {blockedAgents.map((agent) => (
                  <span
                    key={agent}
                    className="flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200"
                  >
                    {agent}
                    <button
                      aria-label={`Remove ${agent}`}
                      onClick={() =>
                        setBlockedAgents((current) => current.filter((a) => a !== agent))
                      }
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Sitemap URL</label>
            <Input
              value={sitemapUrl}
              onChange={(event) => setSitemapUrl(event.target.value)}
              placeholder="Derived from sitemap base URL when empty"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Manual content <span className="text-muted-foreground">(optional)</span>
            </label>
            <textarea
              value={manualContent}
              onChange={(event) => setManualContent(event.target.value)}
              rows={6}
              placeholder={"Leave empty to auto-generate.\nUser-agent: *\nDisallow: /admin"}
              className={textareaClass}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
            disabled={saving}
            onClick={() =>
              void save(
                {
                  robots_enabled: enabled,
                  allow_ai_crawlers: allowAi,
                  blocked_user_agents: blockedAgents,
                  robots_sitemap_url: sitemapUrl.trim(),
                  robots_content: manualContent,
                },
                "Robots.txt settings saved.",
              )
            }
          >
            {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
            Save settings
          </Button>
        </div>
      </div>

      <PreviewCard content={preview.content} />
    </section>
  );
}

export function LlmsView({ onError }: { onError: OnError }) {
  const { settings, loading, saving, save, message } = useDiscoverySettings(onError);
  const preview = usePreview("/api/v1/cms/discovery/llms.txt", onError);

  const [enabled, setEnabled] = useState(true);
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [includeBusiness, setIncludeBusiness] = useState(true);
  const [includeContentTypes, setIncludeContentTypes] = useState(true);
  const [includeCustomUrls, setIncludeCustomUrls] = useState(true);
  const [manualContent, setManualContent] = useState("");

  useEffect(() => {
    if (!settings) return;
    setEnabled(settings.llms_enabled);
    setAutoGenerate(settings.llms_auto_generate);
    setIncludeBusiness(settings.llms_include_business_profile);
    setIncludeContentTypes(settings.llms_include_content_types);
    setIncludeCustomUrls(settings.llms_include_custom_urls);
    setManualContent(settings.llms_manual_content);
  }, [settings]);

  if (loading) return <LoadingCard />;

  return (
    <section className="space-y-6">
      <PageHeader
        title="LLMs.txt"
        description="A short agent-readable summary of your site for AI systems."
        onPreview={() => void preview.load()}
        previewLoading={preview.loading}
      />
      <SuccessMessage message={message} />

      <div className={cardClass}>
        <div className="space-y-4">
          <label className={checkboxRowClass}>
            <Checkbox
              checked={enabled}
              onCheckedChange={(checked) => setEnabled(checked === true)}
            />
            LLMs.txt enabled
          </label>
          <label className={checkboxRowClass}>
            <Checkbox
              checked={autoGenerate}
              onCheckedChange={(checked) => setAutoGenerate(checked === true)}
            />
            Auto-generate from published content
          </label>
          {autoGenerate && (
            <div className="space-y-2 rounded-lg border border-black/10 bg-slate-50/50 p-3">
              <p className="text-sm font-medium">Include sections</p>
              <label className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={includeBusiness}
                  onCheckedChange={(checked) => setIncludeBusiness(checked === true)}
                />
                Business profile (name and description)
              </label>
              <label className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={includeCustomUrls}
                  onCheckedChange={(checked) => setIncludeCustomUrls(checked === true)}
                />
                Important pages (sitemap custom URLs)
              </label>
              <label className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={includeContentTypes}
                  onCheckedChange={(checked) => setIncludeContentTypes(checked === true)}
                />
                Content types (published entries)
              </label>
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              {autoGenerate ? "Extra content (appended)" : "Manual content"}
            </label>
            <textarea
              value={manualContent}
              onChange={(event) => setManualContent(event.target.value)}
              rows={8}
              placeholder={"# My Site\n\n> What this site is about.\n\n## Important Pages\n- ..."}
              className={textareaClass}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
            disabled={saving}
            onClick={() =>
              void save(
                {
                  llms_enabled: enabled,
                  llms_auto_generate: autoGenerate,
                  llms_include_business_profile: includeBusiness,
                  llms_include_content_types: includeContentTypes,
                  llms_include_custom_urls: includeCustomUrls,
                  llms_manual_content: manualContent,
                },
                "LLMs.txt settings saved.",
              )
            }
          >
            {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
            Save settings
          </Button>
        </div>
      </div>

      <PreviewCard content={preview.content} />
    </section>
  );
}

export function LlmsFullView({
  contentTypes,
  onError,
}: {
  contentTypes: DiscoveryContentTypeOption[];
  onError: OnError;
}) {
  const { settings, setSettings, loading, saving, save, message } = useDiscoverySettings(onError);
  const preview = usePreview("/api/v1/cms/discovery/llms-full.txt", onError);
  const [regenerating, setRegenerating] = useState(false);

  const [enabled, setEnabled] = useState(true);
  const [mode, setMode] = useState<LlmsFullGenerationMode>("auto");
  const [includedTypeIds, setIncludedTypeIds] = useState<string[]>([]);
  const [maxItems, setMaxItems] = useState("200");
  const [includeFullBody, setIncludeFullBody] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [manualContent, setManualContent] = useState("");

  useEffect(() => {
    if (!settings) return;
    setEnabled(settings.llms_full_enabled);
    setMode(settings.llms_full_generation_mode);
    setIncludedTypeIds(settings.llms_full_included_content_type_ids);
    setMaxItems(String(settings.llms_full_max_items));
    setIncludeFullBody(settings.llms_full_include_full_body);
    setIncludeMetadata(settings.llms_full_include_metadata);
    setManualContent(settings.llms_full_content);
  }, [settings]);

  if (loading) return <LoadingCard />;

  const toggleType = (id: string) => {
    setIncludedTypeIds((current) =>
      current.includes(id) ? current.filter((t) => t !== id) : [...current, id],
    );
  };

  const saveAll = () => {
    const items = Number(maxItems);
    if (Number.isNaN(items) || items < 1 || items > 5000) return;
    void save(
      {
        llms_full_enabled: enabled,
        llms_full_generation_mode: mode,
        llms_full_included_content_type_ids: includedTypeIds,
        llms_full_max_items: items,
        llms_full_include_full_body: includeFullBody,
        llms_full_include_metadata: includeMetadata,
        ...(mode === "manual" ? { llms_full_content: manualContent } : {}),
      },
      "LLMs Full settings saved.",
    );
  };

  const regenerate = async () => {
    setRegenerating(true);
    try {
      const next = await apiRequest<DiscoverySettings>(
        "/api/v1/cms/discovery/llms-full/regenerate",
        { method: "POST" },
      );
      setSettings(next);
      await preview.load();
    } catch (err) {
      onError(err, "Unable to regenerate llms-full.txt");
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">LLMs Full</h1>
          <p className="mt-1 text-muted-foreground">
            Full machine-readable export of your published content (llms-full.txt).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="rounded-lg" onClick={() => void preview.load()}>
            {preview.loading ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : (
              <Eye className="mr-1.5 h-4 w-4" />
            )}
            Preview
          </Button>
          {mode !== "manual" && (
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={regenerating}
              onClick={() => void regenerate()}
            >
              {regenerating ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-1.5 h-4 w-4" />
              )}
              Regenerate
            </Button>
          )}
        </div>
      </div>
      <SuccessMessage message={message} />
      {settings?.llms_full_generated_at && (
        <p className="text-sm text-muted-foreground">
          Last generated: {new Date(settings.llms_full_generated_at).toLocaleString()}
        </p>
      )}

      <div className={cardClass}>
        <div className="space-y-4">
          <label className={checkboxRowClass}>
            <Checkbox
              checked={enabled}
              onCheckedChange={(checked) => setEnabled(checked === true)}
            />
            LLMs-full.txt enabled
          </label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Generation mode</label>
              <select
                value={mode}
                onChange={(event) => setMode(event.target.value as LlmsFullGenerationMode)}
                className={selectClass}
              >
                <option value="auto">Auto (generated from content)</option>
                <option value="hybrid">Hybrid</option>
                <option value="manual">Manual (hand-written)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Max items</label>
              <Input
                type="number"
                min="1"
                max="5000"
                value={maxItems}
                onChange={(event) => setMaxItems(event.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          {mode !== "manual" && (
            <>
              <label className={checkboxRowClass}>
                <Checkbox
                  checked={includeFullBody}
                  onCheckedChange={(checked) => setIncludeFullBody(checked === true)}
                />
                Include full page body
              </label>
              <label className={checkboxRowClass}>
                <Checkbox
                  checked={includeMetadata}
                  onCheckedChange={(checked) => setIncludeMetadata(checked === true)}
                />
                Include metadata (locale, publish date)
              </label>
              <div>
                <p className="mb-2 text-sm font-medium">
                  Content types{" "}
                  <span className="font-normal text-muted-foreground">
                    (none selected = all configured in the sitemap)
                  </span>
                </p>
                {contentTypes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No content types found.</p>
                ) : (
                  <div className="space-y-2 rounded-lg border border-black/10 bg-slate-50/50 p-3">
                    {contentTypes.map((type) => (
                      <label key={type.id} className="flex items-center gap-3 text-sm">
                        <Checkbox
                          checked={includedTypeIds.includes(type.id)}
                          onCheckedChange={() => toggleType(type.id)}
                        />
                        {type.display_name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
          {mode === "manual" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium">Content</label>
              <textarea
                value={manualContent}
                onChange={(event) => setManualContent(event.target.value)}
                rows={12}
                className={textareaClass}
              />
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
            disabled={saving}
            onClick={saveAll}
          >
            {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
            Save settings
          </Button>
        </div>
      </div>

      <PreviewCard content={preview.content} />
    </section>
  );
}
