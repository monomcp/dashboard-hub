import { useCallback, useEffect, useState } from "react";
import { Edit3, Eye, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiRequest, apiRequestText } from "@/lib/api-client";

type SitemapChangefreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
type SitemapLastmodSource = "last_published_at" | "updated_at" | "none";

type SitemapSettings = {
  id: string;
  base_url: string;
  enabled: boolean;
  default_changefreq: SitemapChangefreq;
  default_priority: number;
};

type SitemapContentTypeConfig = {
  id: string;
  content_type_id: string;
  url_pattern: string;
  changefreq: SitemapChangefreq | null;
  priority: number | null;
  lastmod_source: SitemapLastmodSource;
  enabled: boolean;
};

type SitemapCustomUrl = {
  id: string;
  url: string;
  changefreq: SitemapChangefreq | null;
  priority: number | null;
};

type SitemapExclusion = {
  id: string;
  path: string;
};

export type SitemapContentTypeOption = {
  id: string;
  display_name: string;
};

const CHANGEFREQS: SitemapChangefreq[] = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
];
const LASTMOD_SOURCES: { value: SitemapLastmodSource; label: string }[] = [
  { value: "last_published_at", label: "Last published" },
  { value: "updated_at", label: "Last updated" },
  { value: "none", label: "None" },
];

const inputClass = "h-11 rounded-lg";
const selectClass =
  "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200";
const cardClass = "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5";

function normalizePath(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export function SitemapView({
  contentTypes,
  onError,
}: {
  contentTypes: SitemapContentTypeOption[];
  onError: (err: unknown, fallback?: string) => void;
}) {
  const [settings, setSettings] = useState<SitemapSettings | null>(null);
  const [configs, setConfigs] = useState<SitemapContentTypeConfig[]>([]);
  const [customUrls, setCustomUrls] = useState<SitemapCustomUrl[]>([]);
  const [exclusions, setExclusions] = useState<SitemapExclusion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // settings form
  const [baseUrl, setBaseUrl] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [defaultChangefreq, setDefaultChangefreq] = useState<SitemapChangefreq>("weekly");
  const [defaultPriority, setDefaultPriority] = useState("0.5");

  // config dialog
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<SitemapContentTypeConfig | null>(null);
  const [configContentTypeId, setConfigContentTypeId] = useState("");
  const [configPattern, setConfigPattern] = useState("");
  const [configChangefreq, setConfigChangefreq] = useState("");
  const [configPriority, setConfigPriority] = useState("");
  const [configLastmod, setConfigLastmod] = useState<SitemapLastmodSource>("last_published_at");
  const [configEnabled, setConfigEnabled] = useState(true);

  // custom URL dialog
  const [urlDialogOpen, setUrlDialogOpen] = useState(false);
  const [editingUrl, setEditingUrl] = useState<SitemapCustomUrl | null>(null);
  const [urlValue, setUrlValue] = useState("");
  const [urlChangefreq, setUrlChangefreq] = useState("");
  const [urlPriority, setUrlPriority] = useState("");

  // exclusion dialog
  const [exclusionDialogOpen, setExclusionDialogOpen] = useState(false);
  const [exclusionPath, setExclusionPath] = useState("");

  // preview
  const [previewXml, setPreviewXml] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const contentTypeName = useCallback(
    (id: string) => contentTypes.find((type) => type.id === id)?.display_name ?? "Unknown",
    [contentTypes],
  );

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [settingsRow, configRows, urlRows, exclusionRows] = await Promise.all([
        apiRequest<SitemapSettings>("/api/v1/cms/sitemap/settings"),
        apiRequest<SitemapContentTypeConfig[]>("/api/v1/cms/sitemap/content-type-configs"),
        apiRequest<SitemapCustomUrl[]>("/api/v1/cms/sitemap/custom-urls"),
        apiRequest<SitemapExclusion[]>("/api/v1/cms/sitemap/exclusions"),
      ]);
      setSettings(settingsRow);
      setBaseUrl(settingsRow.base_url);
      setEnabled(settingsRow.enabled);
      setDefaultChangefreq(settingsRow.default_changefreq);
      setDefaultPriority(String(settingsRow.default_priority));
      setConfigs(configRows);
      setCustomUrls(urlRows);
      setExclusions(exclusionRows);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const saveSettings = async () => {
    const priority = Number(defaultPriority);
    if (Number.isNaN(priority) || priority < 0 || priority > 1) return;
    setSaving(true);
    setMessage("");
    try {
      const next = await apiRequest<SitemapSettings>("/api/v1/cms/sitemap/settings", {
        method: "PATCH",
        body: JSON.stringify({
          base_url: baseUrl.trim(),
          enabled,
          default_changefreq: defaultChangefreq,
          default_priority: priority,
        }),
      });
      setSettings(next);
      setMessage("Sitemap settings saved.");
    } catch (err) {
      onError(err, "Unable to save sitemap settings");
    } finally {
      setSaving(false);
    }
  };

  const openConfigDialog = (config: SitemapContentTypeConfig | null) => {
    setEditingConfig(config);
    setConfigContentTypeId(config?.content_type_id ?? contentTypes[0]?.id ?? "");
    setConfigPattern(config?.url_pattern ?? "/[slug]");
    setConfigChangefreq(config?.changefreq ?? "");
    setConfigPriority(config?.priority != null ? String(config.priority) : "");
    setConfigLastmod(config?.lastmod_source ?? "last_published_at");
    setConfigEnabled(config?.enabled ?? true);
    setConfigDialogOpen(true);
  };

  const saveConfig = async () => {
    const pattern = normalizePath(configPattern);
    if (!pattern || (!editingConfig && !configContentTypeId)) return;
    const priority = configPriority.trim() === "" ? null : Number(configPriority);
    if (priority !== null && (Number.isNaN(priority) || priority < 0 || priority > 1)) return;
    setSaving(true);
    try {
      const payload = {
        url_pattern: pattern,
        changefreq: configChangefreq || null,
        priority,
        lastmod_source: configLastmod,
        enabled: configEnabled,
      };
      if (editingConfig) {
        const next = await apiRequest<SitemapContentTypeConfig>(
          `/api/v1/cms/sitemap/content-type-configs/${editingConfig.id}`,
          { method: "PATCH", body: JSON.stringify(payload) },
        );
        setConfigs((current) => current.map((row) => (row.id === next.id ? next : row)));
      } else {
        const next = await apiRequest<SitemapContentTypeConfig>(
          "/api/v1/cms/sitemap/content-type-configs",
          {
            method: "POST",
            body: JSON.stringify({ ...payload, content_type_id: configContentTypeId }),
          },
        );
        setConfigs((current) => [...current, next]);
      }
      setConfigDialogOpen(false);
    } catch (err) {
      onError(err, "Unable to save sitemap config");
    } finally {
      setSaving(false);
    }
  };

  const deleteConfig = async (id: string) => {
    try {
      await apiRequest<void>(`/api/v1/cms/sitemap/content-type-configs/${id}`, {
        method: "DELETE",
      });
      setConfigs((current) => current.filter((row) => row.id !== id));
    } catch (err) {
      onError(err, "Unable to delete sitemap config");
    }
  };

  const openUrlDialog = (row: SitemapCustomUrl | null) => {
    setEditingUrl(row);
    setUrlValue(row?.url ?? "/");
    setUrlChangefreq(row?.changefreq ?? "");
    setUrlPriority(row?.priority != null ? String(row.priority) : "");
    setUrlDialogOpen(true);
  };

  const saveCustomUrl = async () => {
    const url = normalizePath(urlValue);
    if (!url) return;
    const priority = urlPriority.trim() === "" ? null : Number(urlPriority);
    if (priority !== null && (Number.isNaN(priority) || priority < 0 || priority > 1)) return;
    setSaving(true);
    try {
      const payload = { url, changefreq: urlChangefreq || null, priority };
      if (editingUrl) {
        const next = await apiRequest<SitemapCustomUrl>(
          `/api/v1/cms/sitemap/custom-urls/${editingUrl.id}`,
          { method: "PATCH", body: JSON.stringify(payload) },
        );
        setCustomUrls((current) => current.map((row) => (row.id === next.id ? next : row)));
      } else {
        const next = await apiRequest<SitemapCustomUrl>("/api/v1/cms/sitemap/custom-urls", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setCustomUrls((current) => [...current, next]);
      }
      setUrlDialogOpen(false);
    } catch (err) {
      onError(err, "Unable to save custom URL");
    } finally {
      setSaving(false);
    }
  };

  const deleteCustomUrl = async (id: string) => {
    try {
      await apiRequest<void>(`/api/v1/cms/sitemap/custom-urls/${id}`, { method: "DELETE" });
      setCustomUrls((current) => current.filter((row) => row.id !== id));
    } catch (err) {
      onError(err, "Unable to delete custom URL");
    }
  };

  const addExclusion = async () => {
    const path = normalizePath(exclusionPath);
    if (!path) return;
    setSaving(true);
    try {
      const next = await apiRequest<SitemapExclusion>("/api/v1/cms/sitemap/exclusions", {
        method: "POST",
        body: JSON.stringify({ path }),
      });
      setExclusions((current) => [...current, next]);
      setExclusionDialogOpen(false);
    } catch (err) {
      onError(err, "Unable to add exclusion");
    } finally {
      setSaving(false);
    }
  };

  const deleteExclusion = async (id: string) => {
    try {
      await apiRequest<void>(`/api/v1/cms/sitemap/exclusions/${id}`, { method: "DELETE" });
      setExclusions((current) => current.filter((row) => row.id !== id));
    } catch (err) {
      onError(err, "Unable to delete exclusion");
    }
  };

  const loadPreview = async () => {
    setPreviewLoading(true);
    try {
      const xml = await apiRequestText("/api/v1/cms/sitemap/sitemap.xml");
      setPreviewXml(xml);
    } catch (err) {
      onError(err, "Unable to load sitemap preview");
    } finally {
      setPreviewLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="flex items-center gap-2 rounded-2xl bg-white p-6 text-muted-foreground shadow-sm ring-1 ring-black/5">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading sitemap...
      </section>
    );
  }

  const previewUrlCount = previewXml ? (previewXml.match(/<loc>/g) ?? []).length : 0;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Sitemap</h1>
          <p className="mt-1 text-muted-foreground">
            Configure how your sitemap.xml is generated from published content.
          </p>
        </div>
        <Button variant="outline" className="rounded-lg" onClick={loadPreview}>
          {previewLoading ? (
            <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
          ) : (
            <Eye className="mr-1.5 h-4 w-4" />
          )}
          Preview sitemap.xml
        </Button>
      </div>

      {message && (
        <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
          {message}
        </p>
      )}

      <div className={cardClass}>
        <h2 className="mb-4 text-lg font-semibold">Settings</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">Base URL</label>
            <Input
              value={baseUrl}
              onChange={(event) => setBaseUrl(event.target.value)}
              placeholder="https://example.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Default change frequency</label>
            <select
              value={defaultChangefreq}
              onChange={(event) => setDefaultChangefreq(event.target.value as SitemapChangefreq)}
              className={selectClass}
            >
              {CHANGEFREQS.map((freq) => (
                <option key={freq} value={freq}>
                  {freq}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Default priority (0.0–1.0)</label>
            <Input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={defaultPriority}
              onChange={(event) => setDefaultPriority(event.target.value)}
              className={inputClass}
            />
          </div>
          <label className="flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium md:col-span-2">
            <Checkbox
              checked={enabled}
              onCheckedChange={(checked) => setEnabled(checked === true)}
            />
            Sitemap enabled
          </label>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
            disabled={saving || !settings}
            onClick={saveSettings}
          >
            {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
            Save settings
          </Button>
        </div>
      </div>

      <div className={cardClass}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Content types</h2>
            <p className="text-sm text-muted-foreground">
              Published entries of these types are included using the URL pattern. Tokens:{" "}
              <code className="rounded bg-indigo-50 px-1 font-mono text-xs text-indigo-700">
                [slug] [locale] [document_key] [id]
              </code>
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-lg text-indigo-600"
            onClick={() => openConfigDialog(null)}
          >
            <Plus className="mr-1.5 h-4 w-4" /> Add content type
          </Button>
        </div>
        {configs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No content types configured.</p>
        ) : (
          <ul className="divide-y divide-black/5">
            {configs.map((config) => (
              <li key={config.id} className="flex items-center gap-4 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{contentTypeName(config.content_type_id)}</span>
                    {!config.enabled && (
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        Disabled
                      </span>
                    )}
                  </div>
                  <div className="truncate font-mono text-sm text-muted-foreground">
                    {config.url_pattern}
                  </div>
                </div>
                <div className="hidden text-sm text-muted-foreground md:block">
                  {config.changefreq ?? "default"} · {config.priority ?? "default"}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  aria-label="Edit config"
                  onClick={() => openConfigDialog(config)}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-rose-600"
                  aria-label="Delete config"
                  onClick={() => void deleteConfig(config.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={cardClass}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Custom URLs</h2>
            <p className="text-sm text-muted-foreground">
              Manually added paths included in the sitemap.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-lg text-indigo-600"
            onClick={() => openUrlDialog(null)}
          >
            <Plus className="mr-1.5 h-4 w-4" /> Add custom URL
          </Button>
        </div>
        {customUrls.length === 0 ? (
          <p className="text-sm text-muted-foreground">No custom URLs.</p>
        ) : (
          <ul className="divide-y divide-black/5">
            {customUrls.map((row) => (
              <li key={row.id} className="flex items-center gap-4 py-3">
                <div className="min-w-0 flex-1 truncate font-mono text-sm">{row.url}</div>
                <div className="hidden text-sm text-muted-foreground md:block">
                  {row.changefreq ?? "default"} · {row.priority ?? "default"}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  aria-label="Edit custom URL"
                  onClick={() => openUrlDialog(row)}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-rose-600"
                  aria-label="Delete custom URL"
                  onClick={() => void deleteCustomUrl(row.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={cardClass}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Exclusions</h2>
            <p className="text-sm text-muted-foreground">
              Paths excluded from the sitemap. Globs are supported, e.g.{" "}
              <code className="rounded bg-indigo-50 px-1 font-mono text-xs text-indigo-700">
                /private/*
              </code>
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-lg text-indigo-600"
            onClick={() => {
              setExclusionPath("/");
              setExclusionDialogOpen(true);
            }}
          >
            <Plus className="mr-1.5 h-4 w-4" /> Add exclusion
          </Button>
        </div>
        {exclusions.length === 0 ? (
          <p className="text-sm text-muted-foreground">No exclusions.</p>
        ) : (
          <ul className="divide-y divide-black/5">
            {exclusions.map((row) => (
              <li key={row.id} className="flex items-center gap-4 py-3">
                <div className="min-w-0 flex-1 truncate font-mono text-sm">{row.path}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-rose-600"
                  aria-label="Delete exclusion"
                  onClick={() => void deleteExclusion(row.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {previewXml !== null && (
        <div className={cardClass}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Preview</h2>
            <span className="text-sm text-muted-foreground">{previewUrlCount} URLs</span>
          </div>
          <pre className="max-h-96 overflow-auto rounded-lg bg-slate-50 p-4 text-xs leading-relaxed ring-1 ring-black/5">
            {previewXml}
          </pre>
        </div>
      )}

      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingConfig ? "Edit content type" : "Add content type"}</DialogTitle>
            <DialogDescription>
              Include published entries of a content type in the sitemap.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {!editingConfig && (
              <div>
                <label className="mb-1.5 block text-sm font-medium">Content type</label>
                <select
                  value={configContentTypeId}
                  onChange={(event) => setConfigContentTypeId(event.target.value)}
                  className={selectClass}
                >
                  {contentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.display_name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium">URL pattern</label>
              <Input
                value={configPattern}
                onChange={(event) => setConfigPattern(event.target.value)}
                placeholder="/blog/[slug]"
                className={`${inputClass} font-mono`}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Tokens: [slug], [locale], [document_key], [id]
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Change frequency</label>
                <select
                  value={configChangefreq}
                  onChange={(event) => setConfigChangefreq(event.target.value)}
                  className={selectClass}
                >
                  <option value="">Default</option>
                  {CHANGEFREQS.map((freq) => (
                    <option key={freq} value={freq}>
                      {freq}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Priority</label>
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={configPriority}
                  onChange={(event) => setConfigPriority(event.target.value)}
                  placeholder="Default"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Last modified source</label>
              <select
                value={configLastmod}
                onChange={(event) => setConfigLastmod(event.target.value as SitemapLastmodSource)}
                className={selectClass}
              >
                {LASTMOD_SOURCES.map((source) => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium">
              <Checkbox
                checked={configEnabled}
                onCheckedChange={(checked) => setConfigEnabled(checked === true)}
              />
              Enabled
            </label>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={saving}
              onClick={() => setConfigDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={saving || !configPattern.trim() || (!editingConfig && !configContentTypeId)}
              onClick={saveConfig}
            >
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              {editingConfig ? "Save changes" : "Add content type"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={urlDialogOpen} onOpenChange={setUrlDialogOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUrl ? "Edit custom URL" : "Add custom URL"}</DialogTitle>
            <DialogDescription>A manually curated path for the sitemap.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Path</label>
              <Input
                value={urlValue}
                onChange={(event) => setUrlValue(event.target.value)}
                placeholder="/about"
                className={`${inputClass} font-mono`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Change frequency</label>
                <select
                  value={urlChangefreq}
                  onChange={(event) => setUrlChangefreq(event.target.value)}
                  className={selectClass}
                >
                  <option value="">Default</option>
                  {CHANGEFREQS.map((freq) => (
                    <option key={freq} value={freq}>
                      {freq}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Priority</label>
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={urlPriority}
                  onChange={(event) => setUrlPriority(event.target.value)}
                  placeholder="Default"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={saving}
              onClick={() => setUrlDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={saving || !urlValue.trim()}
              onClick={saveCustomUrl}
            >
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              {editingUrl ? "Save changes" : "Add URL"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={exclusionDialogOpen} onOpenChange={setExclusionDialogOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add exclusion</DialogTitle>
            <DialogDescription>
              Paths matching this pattern are removed from the sitemap.
            </DialogDescription>
          </DialogHeader>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Path or glob</label>
            <Input
              value={exclusionPath}
              onChange={(event) => setExclusionPath(event.target.value)}
              placeholder="/private/*"
              className={`${inputClass} font-mono`}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={saving}
              onClick={() => setExclusionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={saving || !exclusionPath.trim()}
              onClick={addExclusion}
            >
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Add exclusion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
