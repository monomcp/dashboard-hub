import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as cn, B as Button } from "./button-BXrfXN_b.mjs";
import { I as Input } from "./input-DwaGuH4D.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-DmhbdlCS.mjs";
import { L as Label } from "./label-Brw405F4.mjs";
import { T as Textarea } from "./textarea-BBisE2jS.mjs";
import { C as Checkbox } from "./checkbox-BZriyKV4.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CUtVLkR1.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dn_c42EA.mjs";
import { A as ApiError, c as clearAuthTokens, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { R as Root2, L as List$1, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { a7 as Lightbulb, a8 as CalendarDays, a9 as Compass, Y as List, a3 as LayoutGrid, M as Menu, aa as PenLine, f as Search, g as CircleQuestionMark, h as Settings, ab as Hash, G as Globe, ac as Linkedin, ad as Twitter, ae as Youtube, af as Facebook, ag as Instagram, ah as AtSign, z as Plus, s as Star, a6 as Check, ai as ThumbsDown, aj as CalendarPlus, v as Trash2, ak as LoaderCircle, al as ChevronLeft, K as FileText, o as Pencil, am as CalendarClock, an as History, Q as ChevronRight, ao as Undo2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
const SCORE_FIELDS = [
  ["seo_score", "SEO"],
  ["business_score", "Business"],
  ["funnel_relevance_score", "Funnel"],
  ["difficulty_score", "Difficulty"],
  ["product_relevance_score", "Product"],
  ["conversion_score", "Conversion"],
  ["freshness_score", "Freshness"]
];
const CALENDAR_FORMATS = [
  "blog_post",
  "landing_page",
  "comparison_page",
  "case_study",
  "tutorial",
  "seo_glossary",
  "product_update",
  "thought_leadership"
];
const CALENDAR_STATUSES = [
  "planned",
  "brief_ready",
  "drafting",
  "draft_ready",
  "in_review",
  "needs_revision",
  "approved",
  "scheduled",
  "published",
  "failed",
  "archived"
];
const BRIEF_STATUSES = ["draft", "approved", "needs_revision"];
const DRAFT_STATUSES = [
  "draft_created",
  "seo_checked",
  "brand_checked",
  "fact_checked",
  "human_review",
  "needs_revision",
  "approved",
  "rejected",
  "ready_to_publish"
];
function statusLabel(value) {
  return value.replace(/_/g, " ");
}
const STATUS_BADGES = {
  // ideas
  idea: "bg-slate-100 text-slate-700",
  rejected: "bg-rose-100 text-rose-700",
  // shared
  approved: "bg-emerald-100 text-emerald-700",
  planned: "bg-sky-100 text-sky-700",
  drafting: "bg-amber-100 text-amber-700",
  // calendar
  brief_ready: "bg-indigo-100 text-indigo-700",
  draft_ready: "bg-violet-100 text-violet-700",
  in_review: "bg-amber-100 text-amber-700",
  needs_revision: "bg-orange-100 text-orange-700",
  scheduled: "bg-cyan-100 text-cyan-700",
  published: "bg-emerald-100 text-emerald-700",
  failed: "bg-rose-100 text-rose-700",
  archived: "bg-slate-200 text-slate-600",
  // briefs / drafts
  draft: "bg-amber-100 text-amber-700",
  draft_created: "bg-slate-100 text-slate-700",
  seo_checked: "bg-sky-100 text-sky-700",
  brand_checked: "bg-indigo-100 text-indigo-700",
  fact_checked: "bg-violet-100 text-violet-700",
  human_review: "bg-amber-100 text-amber-700",
  ready_to_publish: "bg-emerald-100 text-emerald-700"
};
function badgeClass(status) {
  return STATUS_BADGES[status] ?? "bg-slate-100 text-slate-700";
}
function linesToList(value) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}
function listToLines(value) {
  return (value ?? []).map((item) => typeof item === "string" ? item : JSON.stringify(item)).join("\n");
}
const STATUS_TABS$1 = [
  { id: "all", label: "All" },
  { id: "idea", label: "New" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "planned", label: "Planned" },
  { id: "drafting", label: "Drafting" }
];
const EMPTY_IDEA_FORM$1 = {
  title: "",
  angle: "",
  target_keyword: "",
  secondary_keywords: "",
  funnel_stage: "",
  intent: "",
  pillar_id: ""
};
const EMPTY_SCORES$1 = Object.fromEntries(SCORE_FIELDS.map(([key]) => [key, ""]));
function ContentIdeasBoard({ businessId, query, onError }) {
  const [ideas, setIdeas] = reactExports.useState([]);
  const [pillars, setPillars] = reactExports.useState([]);
  const [tab, setTab] = reactExports.useState("all");
  const [loading, setLoading] = reactExports.useState(true);
  const [mutating, setMutating] = reactExports.useState(false);
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [ideaForm, setIdeaForm] = reactExports.useState(EMPTY_IDEA_FORM$1);
  const [scoring, setScoring] = reactExports.useState(null);
  const [scoreForm, setScoreForm] = reactExports.useState(EMPTY_SCORES$1);
  const [scoreRecommendation, setScoreRecommendation] = reactExports.useState("");
  const [autoApprove, setAutoApprove] = reactExports.useState(true);
  const [approveThreshold, setApproveThreshold] = reactExports.useState(75);
  const [rejecting, setRejecting] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [planning, setPlanning] = reactExports.useState(null);
  const [planForm, setPlanForm] = reactExports.useState({
    format: "blog_post",
    channel: "",
    planned_publish_date: "",
    assigned_agent: ""
  });
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        business_id: businessId,
        sort: "created_at",
        direction: "desc",
        limit: "100"
      });
      if (tab !== "all") params.set("status", tab);
      if (query.trim()) params.set("q", query.trim());
      const page = await apiRequest(`/api/v1/content/ideas?${params}`);
      setIdeas(page.items);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [businessId, tab, query, onError]);
  reactExports.useEffect(() => {
    void load();
  }, [load]);
  reactExports.useEffect(() => {
    void (async () => {
      try {
        const page = await apiRequest(
          `/api/v1/content/strategies?business_id=${businessId}&limit=1`
        );
        const strategy = page.items[0];
        if (strategy?.auto_approve_threshold != null) {
          setApproveThreshold(Number(strategy.auto_approve_threshold));
        }
        setPillars(
          strategy ? await apiRequest(
            `/api/v1/content/strategies/${strategy.id}/pillars`
          ) : []
        );
      } catch {
        setPillars([]);
      }
    })();
  }, [businessId]);
  const run = async (fn) => {
    setMutating(true);
    try {
      await fn();
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const submitCreate = async (event) => {
    event.preventDefault();
    if (!ideaForm.title.trim()) return;
    await run(
      () => apiRequest("/api/v1/content/ideas", {
        method: "POST",
        body: JSON.stringify({
          business_id: businessId,
          pillar_id: ideaForm.pillar_id || null,
          title: ideaForm.title.trim(),
          angle: ideaForm.angle.trim() || null,
          target_keyword: ideaForm.target_keyword.trim() || null,
          secondary_keywords: linesToList(ideaForm.secondary_keywords),
          funnel_stage: ideaForm.funnel_stage.trim() || null,
          intent: ideaForm.intent.trim() || null
        })
      })
    );
    setCreateOpen(false);
    setIdeaForm(EMPTY_IDEA_FORM$1);
  };
  const openScore = (idea) => {
    setScoring(idea);
    setScoreForm(
      Object.fromEntries(
        SCORE_FIELDS.map(([key]) => [key, idea[key]?.toString() ?? ""])
      )
    );
    setScoreRecommendation(idea.recommendation ?? "");
    setAutoApprove(true);
  };
  const submitScore = async (event) => {
    event.preventDefault();
    if (!scoring) return;
    await run(
      () => apiRequest(`/api/v1/content/ideas/${scoring.id}/score?auto_approve=${autoApprove}`, {
        method: "POST",
        body: JSON.stringify({ recommendation: scoreRecommendation.trim() || null })
      })
    );
    setScoring(null);
  };
  const submitReject = async (event) => {
    event.preventDefault();
    if (!rejecting || !rejectReason.trim()) return;
    await run(
      () => apiRequest(`/api/v1/content/ideas/${rejecting.id}/reject`, {
        method: "POST",
        body: JSON.stringify({ rejection_reason: rejectReason.trim() })
      })
    );
    setRejecting(null);
    setRejectReason("");
  };
  const submitPlan = async (event) => {
    event.preventDefault();
    if (!planning) return;
    await run(
      () => apiRequest("/api/v1/content/calendar-items", {
        method: "POST",
        body: JSON.stringify({
          content_idea_id: planning.id,
          format: planForm.format,
          channel: planForm.channel.trim() || null,
          planned_publish_date: planForm.planned_publish_date || null,
          assigned_agent: planForm.assigned_agent.trim() || null
        })
      })
    );
    setPlanning(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: STATUS_TABS$1.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setTab(t.id),
          className: cn(
            "rounded-full px-3 py-1.5 text-sm transition",
            tab === t.id ? "bg-sky-100 text-sky-900" : "text-foreground/70 hover:bg-white/60"
          ),
          children: t.label
        },
        t.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "rounded-lg", onClick: () => setCreateOpen(true), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
        " New idea"
      ] })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 py-3", children: [1, 2, 3, 4].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" }, item)) }),
    !loading && ideas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No ideas here yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Create one or change the filter." })
    ] }),
    !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2", children: ideas.map((idea) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "rounded-xl border border-black/5 px-3 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: idea.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                      badgeClass(idea.status)
                    ),
                    children: statusLabel(idea.status)
                  }
                ),
                idea.total_score != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => openScore(idea),
                    disabled: mutating,
                    title: "View score",
                    className: "inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 transition hover:bg-violet-200 disabled:opacity-60",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3" }),
                      " ",
                      Number(idea.total_score)
                    ]
                  }
                )
              ] }),
              (idea.target_keyword || idea.funnel_stage || idea.intent) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: [idea.target_keyword, idea.funnel_stage, idea.intent].filter(Boolean).join(" · ") }),
              idea.rejection_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-rose-600", children: [
                "Rejected: ",
                idea.rejection_reason
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-wrap gap-1", children: [
              idea.status !== "approved" && idea.status !== "planned" && idea.status !== "drafting" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 rounded-lg text-emerald-700",
                  disabled: mutating,
                  onClick: () => run(
                    () => apiRequest(`/api/v1/content/ideas/${idea.id}/approve`, {
                      method: "POST"
                    })
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-3.5 w-3.5" }),
                    " Approve"
                  ]
                }
              ),
              idea.status !== "rejected" && idea.status !== "planned" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 rounded-lg text-rose-700",
                  disabled: mutating,
                  onClick: () => {
                    setRejecting(idea);
                    setRejectReason("");
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "mr-1 h-3.5 w-3.5" }),
                    " Reject"
                  ]
                }
              ),
              idea.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "h-8 rounded-lg",
                  disabled: mutating,
                  onClick: () => setPlanning(idea),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "mr-1 h-3.5 w-3.5" }),
                    " Plan"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-full text-destructive",
                  disabled: mutating,
                  onClick: () => run(
                    () => apiRequest(`/api/v1/content/ideas/${idea.id}`, {
                      method: "DELETE"
                    })
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          SCORE_FIELDS.some(([key]) => idea[key] != null) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: SCORE_FIELDS.map(([key, label]) => {
            const value = idea[key];
            if (value == null) return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600",
                children: [
                  label,
                  " ",
                  Number(value)
                ]
              },
              key
            );
          }) })
        ]
      },
      idea.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitCreate, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "New content idea" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "idea-title", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "idea-title",
              value: ideaForm.title,
              onChange: (e) => setIdeaForm((prev) => ({ ...prev, title: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "idea-angle", children: "Angle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "idea-angle",
              rows: 2,
              value: ideaForm.angle,
              onChange: (e) => setIdeaForm((prev) => ({ ...prev, angle: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "idea-keyword", children: "Target keyword" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "idea-keyword",
                value: ideaForm.target_keyword,
                onChange: (e) => setIdeaForm((prev) => ({ ...prev, target_keyword: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pillar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: ideaForm.pillar_id || "none",
                onValueChange: (value) => setIdeaForm((prev) => ({
                  ...prev,
                  pillar_id: value === "none" ? "" : value
                })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "No pillar" }),
                    pillars.map((pillar) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: pillar.id, children: pillar.name }, pillar.id))
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "idea-secondary", children: "Secondary keywords (one per line)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "idea-secondary",
              rows: 2,
              value: ideaForm.secondary_keywords,
              onChange: (e) => setIdeaForm((prev) => ({ ...prev, secondary_keywords: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "idea-funnel", children: "Funnel stage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "idea-funnel",
                placeholder: "tofu / mofu / bofu",
                value: ideaForm.funnel_stage,
                onChange: (e) => setIdeaForm((prev) => ({ ...prev, funnel_stage: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "idea-intent", children: "Intent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "idea-intent",
                placeholder: "informational / commercial",
                value: ideaForm.intent,
                onChange: (e) => setIdeaForm((prev) => ({ ...prev, intent: e.target.value }))
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setCreateOpen(false),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !ideaForm.title.trim(), children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Create"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: scoring !== null, onOpenChange: (open) => !open && setScoring(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitScore, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Score idea" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: SCORE_FIELDS.map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `score-${key}`, children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: `score-${key}`,
              type: "number",
              value: scoreForm[key],
              readOnly: true,
              disabled: true,
              className: "bg-muted/50"
            }
          )
        ] }, key)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "score-recommendation", children: "Recommendation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "score-recommendation",
              rows: 2,
              value: scoreRecommendation,
              readOnly: true,
              disabled: true,
              className: "bg-muted/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: autoApprove,
              onCheckedChange: (checked) => setAutoApprove(checked === true)
            }
          ),
          "Auto-approve when total score is ",
          approveThreshold,
          " or higher"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setScoring(null),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating, children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Save"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: rejecting !== null, onOpenChange: (open) => !open && setRejecting(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitReject, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reject idea" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reject-reason", children: "Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "reject-reason",
            rows: 3,
            value: rejectReason,
            onChange: (e) => setRejectReason(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setRejecting(null),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            variant: "destructive",
            disabled: mutating || !rejectReason.trim(),
            children: [
              mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
              "Reject"
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: planning !== null, onOpenChange: (open) => !open && setPlanning(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitPlan, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Schedule on calendar" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Format" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: planForm.format,
              onValueChange: (value) => setPlanForm((prev) => ({ ...prev, format: value })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CALENDAR_FORMATS.map((format) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: format, className: "capitalize", children: statusLabel(format) }, format)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "plan-date", children: "Publish date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "plan-date",
                type: "date",
                value: planForm.planned_publish_date,
                onChange: (e) => setPlanForm((prev) => ({ ...prev, planned_publish_date: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "plan-channel", children: "Channel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "plan-channel",
                placeholder: "blog",
                value: planForm.channel,
                onChange: (e) => setPlanForm((prev) => ({ ...prev, channel: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "plan-agent", children: "Assigned agent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "plan-agent",
              value: planForm.assigned_agent,
              onChange: (e) => setPlanForm((prev) => ({ ...prev, assigned_agent: e.target.value }))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setPlanning(null),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating, children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Schedule"
        ] })
      ] })
    ] }) }) })
  ] });
}
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List$1,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List$1.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const LIST_FIELDS$2 = [
  ["outline", "Outline"],
  ["external_references", "External references"],
  ["product_mentions", "Product mentions"],
  ["required_sections", "Required sections"],
  ["forbidden_topics", "Forbidden topics"]
];
const EMPTY_FORM$3 = {
  title: "",
  target_keyword: "",
  search_intent: "",
  audience: "",
  angle: "",
  cta: "",
  language: "",
  outline: "",
  external_references: "",
  product_mentions: "",
  required_sections: "",
  forbidden_topics: ""
};
function ContentBriefDetail({ calendarItemId, briefs, onChanged, onError }) {
  const [mutating, setMutating] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM$3);
  const openDialog = (brief) => {
    setEditing(brief);
    setForm(
      brief ? {
        title: brief.title,
        target_keyword: brief.target_keyword ?? "",
        search_intent: brief.search_intent ?? "",
        audience: brief.audience ?? "",
        angle: brief.angle ?? "",
        cta: brief.cta ?? "",
        language: brief.language ?? "",
        outline: listToLines(brief.outline),
        external_references: listToLines(brief.external_references),
        product_mentions: listToLines(brief.product_mentions),
        required_sections: listToLines(brief.required_sections),
        forbidden_topics: listToLines(brief.forbidden_topics)
      } : EMPTY_FORM$3
    );
    setDialogOpen(true);
  };
  const run = async (fn) => {
    setMutating(true);
    try {
      await fn();
      await onChanged();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    const payload = {
      title: form.title.trim(),
      target_keyword: form.target_keyword.trim() || null,
      search_intent: form.search_intent.trim() || null,
      audience: form.audience.trim() || null,
      angle: form.angle.trim() || null,
      cta: form.cta.trim() || null,
      language: form.language.trim() || null,
      outline: linesToList(form.outline),
      external_references: linesToList(form.external_references),
      product_mentions: linesToList(form.product_mentions),
      required_sections: linesToList(form.required_sections),
      forbidden_topics: linesToList(form.forbidden_topics)
    };
    await run(
      () => editing ? apiRequest(`/api/v1/content/briefs/${editing.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
      }) : apiRequest(`/api/v1/content/calendar-items/${calendarItemId}/briefs`, {
        method: "POST",
        body: JSON.stringify(payload)
      })
    );
    setDialogOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium uppercase tracking-wide text-muted-foreground", children: "Briefs" }) }),
    briefs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No briefs for this calendar item yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2", children: briefs.map((brief) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl border border-black/5 px-3 py-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium", children: brief.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                badgeClass(brief.status)
              ),
              children: statusLabel(brief.status)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: brief.status,
              onValueChange: (value) => run(
                () => apiRequest(`/api/v1/content/briefs/${brief.id}/status`, {
                  method: "POST",
                  body: JSON.stringify({ status: value })
                })
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-[160px] rounded-lg text-xs capitalize", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BRIEF_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, className: "capitalize", children: statusLabel(status) }, status)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 rounded-lg",
              disabled: mutating,
              onClick: () => openDialog(brief),
              children: "Edit"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: [brief.target_keyword, brief.search_intent, brief.language].filter(Boolean).join(" · ") || "No SEO targeting set" }),
      brief.outline.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-2 list-inside list-decimal text-xs text-foreground/80", children: brief.outline.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: typeof item === "string" ? item : JSON.stringify(item) }, index)) })
    ] }, brief.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit brief" : "New brief" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brief-title", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "brief-title",
              value: form.title,
              onChange: (e) => setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brief-keyword", children: "Target keyword" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "brief-keyword",
                value: form.target_keyword,
                onChange: (e) => setForm((prev) => ({ ...prev, target_keyword: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brief-intent", children: "Search intent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "brief-intent",
                value: form.search_intent,
                onChange: (e) => setForm((prev) => ({ ...prev, search_intent: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brief-language", children: "Language" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "brief-language",
                placeholder: "en",
                value: form.language,
                onChange: (e) => setForm((prev) => ({ ...prev, language: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brief-audience", children: "Audience" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "brief-audience",
              rows: 2,
              value: form.audience,
              onChange: (e) => setForm((prev) => ({ ...prev, audience: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brief-angle", children: "Angle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "brief-angle",
              rows: 2,
              value: form.angle,
              onChange: (e) => setForm((prev) => ({ ...prev, angle: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brief-cta", children: "CTA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "brief-cta",
              value: form.cta,
              onChange: (e) => setForm((prev) => ({ ...prev, cta: e.target.value }))
            }
          )
        ] }),
        LIST_FIELDS$2.map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `brief-${key}`, children: [
            label,
            " (one per line)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: `brief-${key}`,
              rows: 3,
              value: form[key],
              onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
            }
          )
        ] }, key))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setDialogOpen(false),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !form.title.trim(), children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          editing ? "Save" : "Create"
        ] })
      ] })
    ] }) }) })
  ] });
}
const EMPTY_FORM$2 = {
  brief_id: "",
  title: "",
  slug: "",
  meta_title: "",
  meta_description: "",
  body_markdown: "",
  excerpt: "",
  featured_image_prompt: "",
  author: ""
};
function ContentDraftEditor({
  calendarItemId,
  drafts,
  briefs,
  onChanged,
  onError
}) {
  const [mutating, setMutating] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM$2);
  const [expanded, setExpanded] = reactExports.useState(null);
  const openDialog = (draft) => {
    setEditing(draft);
    setForm(
      draft ? {
        brief_id: draft.brief_id ?? "",
        title: draft.title,
        slug: draft.slug ?? "",
        meta_title: draft.meta_title ?? "",
        meta_description: draft.meta_description ?? "",
        body_markdown: draft.body_markdown ?? "",
        excerpt: draft.excerpt ?? "",
        featured_image_prompt: draft.featured_image_prompt ?? "",
        author: draft.author ?? ""
      } : { ...EMPTY_FORM$2, brief_id: briefs[0]?.id ?? "" }
    );
    setDialogOpen(true);
  };
  const run = async (fn) => {
    setMutating(true);
    try {
      await fn();
      await onChanged();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || null,
      meta_title: form.meta_title.trim() || null,
      meta_description: form.meta_description.trim() || null,
      body_markdown: form.body_markdown || null,
      excerpt: form.excerpt.trim() || null,
      featured_image_prompt: form.featured_image_prompt.trim() || null,
      author: form.author.trim() || null
    };
    await run(
      () => editing ? apiRequest(`/api/v1/content/drafts/${editing.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
      }) : apiRequest(`/api/v1/content/calendar-items/${calendarItemId}/drafts`, {
        method: "POST",
        body: JSON.stringify({ ...payload, brief_id: form.brief_id || null })
      })
    );
    setDialogOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium uppercase tracking-wide text-muted-foreground", children: "Drafts" }) }),
    drafts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No drafts for this calendar item yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2", children: drafts.map((draft) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl border border-black/5 px-3 py-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "flex min-w-0 items-center gap-2 text-left",
            onClick: () => setExpanded(expanded === draft.id ? null : draft.id),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600", children: [
                "v",
                draft.version
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium", children: draft.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                    badgeClass(draft.status)
                  ),
                  children: statusLabel(draft.status)
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: draft.status,
              onValueChange: (value) => run(
                () => apiRequest(`/api/v1/content/drafts/${draft.id}/status`, {
                  method: "POST",
                  body: JSON.stringify({ status: value })
                })
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-[170px] rounded-lg text-xs capitalize", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DRAFT_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, className: "capitalize", children: statusLabel(status) }, status)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 rounded-lg",
              disabled: mutating,
              onClick: () => openDialog(draft),
              children: "Edit"
            }
          )
        ] })
      ] }),
      expanded === draft.id && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid gap-2 border-t border-black/5 pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: [draft.slug && `/${draft.slug}`, draft.author, draft.meta_title].filter(Boolean).join(" · ") || "No metadata" }),
        draft.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic", children: draft.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "max-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-[hsl(220,33%,97%)] p-3 font-mono text-xs", children: draft.body_markdown || "(empty body)" })
      ] })
    ] }, draft.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl sm:max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? `Edit draft v${editing.version}` : "New draft" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        !editing && briefs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Brief" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.brief_id || "none",
              onValueChange: (value) => setForm((prev) => ({ ...prev, brief_id: value === "none" ? "" : value })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "No brief" }),
                  briefs.map((brief) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: brief.id, children: brief.title }, brief.id))
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "draft-title", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "draft-title",
              value: form.title,
              onChange: (e) => setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "draft-slug", children: "Slug" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "draft-slug",
                value: form.slug,
                onChange: (e) => setForm((prev) => ({ ...prev, slug: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "draft-author", children: "Author" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "draft-author",
                value: form.author,
                onChange: (e) => setForm((prev) => ({ ...prev, author: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "draft-meta-title", children: "Meta title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "draft-meta-title",
              value: form.meta_title,
              onChange: (e) => setForm((prev) => ({ ...prev, meta_title: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "draft-meta-description", children: "Meta description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "draft-meta-description",
              rows: 2,
              value: form.meta_description,
              onChange: (e) => setForm((prev) => ({ ...prev, meta_description: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "draft-body", children: "Body (markdown)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "draft-body",
              rows: 12,
              className: "font-mono text-xs",
              value: form.body_markdown,
              onChange: (e) => setForm((prev) => ({ ...prev, body_markdown: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "draft-excerpt", children: "Excerpt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "draft-excerpt",
              rows: 2,
              value: form.excerpt,
              onChange: (e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "draft-image-prompt", children: "Featured image prompt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "draft-image-prompt",
              rows: 2,
              value: form.featured_image_prompt,
              onChange: (e) => setForm((prev) => ({ ...prev, featured_image_prompt: e.target.value }))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setDialogOpen(false),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !form.title.trim(), children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          editing ? "Save" : "Create draft"
        ] })
      ] })
    ] }) }) })
  ] });
}
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function fmt(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function getMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}
function CalendarMonthView({ events, onSelect, loading }) {
  const [cursor, setCursor] = reactExports.useState(/* @__PURE__ */ new Date());
  const today = /* @__PURE__ */ new Date();
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const days = reactExports.useMemo(() => getMonthGrid(year, month), [year, month]);
  const eventsByDate = reactExports.useMemo(() => {
    const map = {};
    for (const event of events) {
      if (!event.date) continue;
      const key = event.date.slice(0, 10);
      (map[key] ||= []).push(event);
    }
    return map;
  }, [events]);
  const shiftMonth = (delta) => setCursor(new Date(year, month + delta, 1));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "h-9 rounded-full border-black/10 bg-white px-5 text-sm font-medium",
          onClick: () => setCursor(/* @__PURE__ */ new Date()),
          children: "Today"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "rounded-full",
          onClick: () => shiftMonth(-1),
          "aria-label": "Previous month",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "rounded-full",
          onClick: () => shiftMonth(1),
          "aria-label": "Next month",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "ml-1 text-lg font-normal tracking-tight", children: [
        MONTH_NAMES[month],
        " ",
        year
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-2xl ring-1 ring-black/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 border-b border-black/5 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: WEEKDAYS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: w }, w)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 grid-rows-6", children: days.map((d, idx) => {
        const inMonth = d.getMonth() === month;
        const isToday = fmt(d) === fmt(today);
        const evs = eventsByDate[fmt(d)] || [];
        const showMonth = d.getDate() === 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "min-h-[110px] border-b border-r border-black/5 p-2",
              idx % 7 === 6 && "border-r-0",
              idx >= 35 && "border-b-0",
              !inMonth && "bg-[hsl(220,33%,99%)]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs",
                    isToday && "bg-sky-500 font-medium text-white",
                    !isToday && !inMonth && "text-muted-foreground/50",
                    !isToday && inMonth && "text-foreground"
                  ),
                  children: showMonth ? `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}` : d.getDate()
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                loading && idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-0.5 text-[11px] text-muted-foreground", children: "Loading..." }),
                evs.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onSelect(e.id),
                    title: e.title,
                    className: cn(
                      "block w-full truncate rounded px-2 py-0.5 text-left text-[11px] font-medium transition hover:opacity-80",
                      e.colorClass || "bg-slate-100 text-slate-700"
                    ),
                    children: e.title
                  },
                  e.id
                ))
              ] })
            ]
          },
          idx
        );
      }) })
    ] })
  ] });
}
function ContentCalendarList({ businessId, view = "list", onError }) {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [mutating, setMutating] = reactExports.useState(false);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(null);
  const [briefs, setBriefs] = reactExports.useState([]);
  const [drafts, setDrafts] = reactExports.useState([]);
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ business_id: businessId, limit: "100" });
      if (statusFilter !== "all") params.set("status", statusFilter);
      const page = await apiRequest(
        `/api/v1/content/calendar-items?${params}`
      );
      setItems(page.items);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [businessId, statusFilter, onError]);
  reactExports.useEffect(() => {
    void load();
  }, [load]);
  const loadDetail = reactExports.useCallback(
    async (item) => {
      try {
        const [briefList, draftList] = await Promise.all([
          apiRequest(`/api/v1/content/calendar-items/${item.id}/briefs`),
          apiRequest(`/api/v1/content/calendar-items/${item.id}/drafts`)
        ]);
        setBriefs(briefList);
        setDrafts(draftList);
      } catch (err) {
        onError(err);
      }
    },
    [onError]
  );
  const openDetail = async (item) => {
    setSelected(item);
    setBriefs([]);
    setDrafts([]);
    await loadDetail(item);
  };
  const updateStatus = async (item, status) => {
    setMutating(true);
    try {
      const updated = await apiRequest(
        `/api/v1/content/calendar-items/${item.id}/status`,
        { method: "POST", body: JSON.stringify({ status }) }
      );
      if (selected?.id === item.id) setSelected(updated);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const deleteItem = async (item) => {
    setMutating(true);
    try {
      await apiRequest(`/api/v1/content/calendar-items/${item.id}`, { method: "DELETE" });
      if (selected?.id === item.id) setSelected(null);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  if (selected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "rounded-full",
              onClick: () => setSelected(null),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate text-lg font-medium", children: selected.title || "Untitled" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: [
              statusLabel(selected.format),
              selected.channel,
              selected.planned_publish_date,
              selected.assigned_agent
            ].filter(Boolean).join(" · ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: selected.status,
            onValueChange: (value) => updateStatus(selected, value),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-[180px] rounded-lg capitalize", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CALENDAR_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, className: "capitalize", children: statusLabel(status) }, status)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "briefs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "briefs", className: "rounded-full", children: [
            "Briefs (",
            briefs.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "drafts", className: "rounded-full", children: [
            "Drafts (",
            drafts.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "briefs", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ContentBriefDetail,
          {
            calendarItemId: selected.id,
            briefs,
            onChanged: () => loadDetail(selected),
            onError
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "drafts", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ContentDraftEditor,
          {
            calendarItemId: selected.id,
            drafts,
            briefs,
            onChanged: () => loadDetail(selected),
            onError
          }
        ) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: statusFilter,
        onValueChange: (value) => setStatusFilter(value),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-[180px] rounded-lg capitalize", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All statuses" }),
            CALENDAR_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, className: "capitalize", children: statusLabel(status) }, status))
          ] })
        ]
      }
    ) }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 py-3", children: [1, 2, 3, 4].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" }, item)) }),
    !loading && items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mb-3 h-8 w-8 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Nothing scheduled" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Approve an idea and plan it to see it here." })
    ] }),
    !loading && items.length > 0 && view === "calendar" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CalendarMonthView,
      {
        events: items.filter((item) => item.planned_publish_date).map((item) => ({
          id: item.id,
          date: item.planned_publish_date,
          title: item.title || "Untitled",
          colorClass: badgeClass(item.status)
        })),
        onSelect: (id) => {
          const item = items.find((i) => i.id === id);
          if (item) void openDetail(item);
        }
      }
    ),
    !loading && items.length > 0 && view === "list" && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "hidden grid-cols-[1.4fr_1fr_120px_150px_44px] items-center gap-4 border-b border-black/5 px-2 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Format" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Publish date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
      ] }),
      items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "group grid cursor-pointer grid-cols-[1fr_auto] items-center gap-3 rounded-xl border-b border-black/5 px-2 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)] md:grid-cols-[1.4fr_1fr_120px_150px_44px] md:gap-4",
          onClick: () => openDetail(item),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-medium", children: item.title || "Untitled" }),
              item.channel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground", children: item.channel })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden capitalize text-foreground/80 md:block", children: statusLabel(item.format) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden text-muted-foreground md:block", children: item.planned_publish_date || "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: item.status,
                onValueChange: (value) => updateStatus(item, value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: cn(
                        "h-7 w-[140px] rounded-full border-none text-xs font-medium capitalize",
                        badgeClass(item.status)
                      ),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CALENDAR_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, className: "capitalize", children: statusLabel(status) }, status)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: (e) => e.stopPropagation(), className: "hidden justify-end md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 rounded-full text-destructive",
                disabled: mutating,
                onClick: () => deleteItem(item),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            ) })
          ]
        },
        item.id
      ))
    ] })
  ] });
}
const EMPTY_STRATEGY_FORM = {
  target_personas: "",
  funnel_stages: "",
  seo_clusters: "",
  distribution_channels: "",
  success_metrics: "",
  publishing_frequency: ""
};
const EMPTY_PILLAR_FORM = {
  name: "",
  description: "",
  target_persona: "",
  funnel_stage: "",
  example_topics: "",
  priority: "0"
};
function ContentStrategyPanel({ businessId, onError }) {
  const [strategy, setStrategy] = reactExports.useState(null);
  const [pillars, setPillars] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [mutating, setMutating] = reactExports.useState(false);
  const [strategyDialog, setStrategyDialog] = reactExports.useState(false);
  const [strategyForm, setStrategyForm] = reactExports.useState(EMPTY_STRATEGY_FORM);
  const [pillarDialog, setPillarDialog] = reactExports.useState(false);
  const [editingPillar, setEditingPillar] = reactExports.useState(null);
  const [pillarForm, setPillarForm] = reactExports.useState(EMPTY_PILLAR_FORM);
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const page = await apiRequest(
        `/api/v1/content/strategies?business_id=${businessId}&limit=1`
      );
      const current = page.items[0] ?? null;
      setStrategy(current);
      if (current) {
        setPillars(
          await apiRequest(`/api/v1/content/strategies/${current.id}/pillars`)
        );
      } else {
        setPillars([]);
      }
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [businessId, onError]);
  reactExports.useEffect(() => {
    void load();
  }, [load]);
  const openStrategyDialog = () => {
    setStrategyForm(
      strategy ? {
        target_personas: listToLines(strategy.target_personas),
        funnel_stages: listToLines(strategy.funnel_stages),
        seo_clusters: listToLines(strategy.seo_clusters),
        distribution_channels: listToLines(strategy.distribution_channels),
        success_metrics: listToLines(strategy.success_metrics),
        publishing_frequency: strategy.publishing_frequency ?? ""
      } : EMPTY_STRATEGY_FORM
    );
    setStrategyDialog(true);
  };
  const submitStrategy = async (event) => {
    event.preventDefault();
    setMutating(true);
    const payload = {
      target_personas: linesToList(strategyForm.target_personas),
      funnel_stages: linesToList(strategyForm.funnel_stages),
      seo_clusters: linesToList(strategyForm.seo_clusters),
      distribution_channels: linesToList(strategyForm.distribution_channels),
      success_metrics: linesToList(strategyForm.success_metrics),
      publishing_frequency: strategyForm.publishing_frequency.trim() || null
    };
    try {
      if (strategy) {
        await apiRequest(`/api/v1/content/strategies/${strategy.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      } else {
        await apiRequest("/api/v1/content/strategies", {
          method: "POST",
          body: JSON.stringify({ ...payload, business_id: businessId })
        });
      }
      setStrategyDialog(false);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const openPillarDialog = (pillar) => {
    setEditingPillar(pillar);
    setPillarForm(
      pillar ? {
        name: pillar.name,
        description: pillar.description ?? "",
        target_persona: pillar.target_persona ?? "",
        funnel_stage: pillar.funnel_stage ?? "",
        example_topics: listToLines(pillar.example_topics),
        priority: String(pillar.priority)
      } : EMPTY_PILLAR_FORM
    );
    setPillarDialog(true);
  };
  const submitPillar = async (event) => {
    event.preventDefault();
    if (!strategy || !pillarForm.name.trim()) return;
    setMutating(true);
    const payload = {
      name: pillarForm.name.trim(),
      description: pillarForm.description.trim() || null,
      target_persona: pillarForm.target_persona.trim() || null,
      funnel_stage: pillarForm.funnel_stage.trim() || null,
      example_topics: linesToList(pillarForm.example_topics),
      priority: Number(pillarForm.priority) || 0
    };
    try {
      if (editingPillar) {
        await apiRequest(`/api/v1/content/pillars/${editingPillar.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      } else {
        await apiRequest(`/api/v1/content/strategies/${strategy.id}/pillars`, {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }
      setPillarDialog(false);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const deletePillar = async (pillar) => {
    setMutating(true);
    try {
      await apiRequest(`/api/v1/content/pillars/${pillar.id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 py-3", children: [1, 2, 3].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" }, item)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-black/5 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium", children: "Strategy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "rounded-lg", onClick: openStrategyDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-1 h-4 w-4" }),
          " ",
          strategy ? "Edit" : "Create strategy"
        ] })
      ] }),
      strategy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid gap-3 text-sm sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StrategyList, { label: "Target personas", items: strategy.target_personas }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StrategyList, { label: "Funnel stages", items: strategy.funnel_stages }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StrategyList, { label: "SEO clusters", items: strategy.seo_clusters }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StrategyList, { label: "Channels", items: strategy.distribution_channels }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StrategyList, { label: "Success metrics", items: strategy.success_metrics }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Publishing frequency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: strategy.publishing_frequency || "—" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No content strategy yet for this company." })
    ] }),
    strategy && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-black/5 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium", children: "Pillars" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "rounded-lg",
            onClick: () => openPillarDialog(null),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
              " Add pillar"
            ]
          }
        )
      ] }),
      pillars.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No pillars yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2", children: pillars.map((pillar) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-start justify-between gap-3 rounded-xl border border-black/5 px-3 py-2 text-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
                pillar.name,
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs text-muted-foreground", children: [
                  "priority ",
                  pillar.priority
                ] })
              ] }),
              pillar.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: pillar.description }),
              (pillar.target_persona || pillar.funnel_stage) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: [pillar.target_persona, pillar.funnel_stage].filter(Boolean).join(" · ") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-full",
                  disabled: mutating,
                  onClick: () => openPillarDialog(pillar),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-full text-destructive",
                  disabled: mutating,
                  onClick: () => deletePillar(pillar),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ]
        },
        pillar.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: strategyDialog, onOpenChange: setStrategyDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitStrategy, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: strategy ? "Edit strategy" : "Create strategy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        [
          ["target_personas", "Target personas"],
          ["funnel_stages", "Funnel stages"],
          ["seo_clusters", "SEO clusters"],
          ["distribution_channels", "Distribution channels"],
          ["success_metrics", "Success metrics"]
        ].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `strategy-${key}`, children: [
            label,
            " (one per line)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: `strategy-${key}`,
              rows: 3,
              value: strategyForm[key],
              onChange: (e) => setStrategyForm((prev) => ({ ...prev, [key]: e.target.value }))
            }
          )
        ] }, key)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "strategy-frequency", children: "Publishing frequency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "strategy-frequency",
              placeholder: "e.g. 2 posts per week",
              value: strategyForm.publishing_frequency,
              onChange: (e) => setStrategyForm((prev) => ({ ...prev, publishing_frequency: e.target.value }))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setStrategyDialog(false),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating, children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Save"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: pillarDialog, onOpenChange: setPillarDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitPillar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingPillar ? "Edit pillar" : "Add pillar" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pillar-name", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "pillar-name",
              value: pillarForm.name,
              onChange: (e) => setPillarForm((prev) => ({ ...prev, name: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pillar-description", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "pillar-description",
              rows: 2,
              value: pillarForm.description,
              onChange: (e) => setPillarForm((prev) => ({ ...prev, description: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pillar-persona", children: "Target persona" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pillar-persona",
                value: pillarForm.target_persona,
                onChange: (e) => setPillarForm((prev) => ({ ...prev, target_persona: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pillar-funnel", children: "Funnel stage" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "pillar-funnel",
                placeholder: "tofu / mofu / bofu",
                value: pillarForm.funnel_stage,
                onChange: (e) => setPillarForm((prev) => ({ ...prev, funnel_stage: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pillar-topics", children: "Example topics (one per line)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "pillar-topics",
              rows: 3,
              value: pillarForm.example_topics,
              onChange: (e) => setPillarForm((prev) => ({ ...prev, example_topics: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pillar-priority", children: "Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "pillar-priority",
              type: "number",
              value: pillarForm.priority,
              onChange: (e) => setPillarForm((prev) => ({ ...prev, priority: e.target.value }))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setPillarDialog(false),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !pillarForm.name.trim(), children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          editingPillar ? "Save" : "Add"
        ] })
      ] })
    ] }) }) })
  ] });
}
function StrategyList({ label, items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: items.length ? items.join(", ") : "—" })
  ] });
}
const SOCIAL_SCORE_FIELDS = [
  ["viral_potential_score", "Viral potential"],
  ["brand_fit_score", "Brand fit"],
  ["effort_score", "Effort"]
];
const SOCIAL_IDEA_FORMATS = [
  "reel",
  "story",
  "carousel",
  "meme",
  "single_post",
  "thread",
  "short",
  "pin"
];
const SOCIAL_SOURCE_TYPES = [
  "manual",
  "competitor",
  "ugc",
  "blog",
  "event",
  "trend"
];
const SOCIAL_CALENDAR_STATUSES = [
  "planned",
  "brief_ready",
  "drafting",
  "creative_ready",
  "qa_pending",
  "needs_revision",
  "approved",
  "scheduled",
  "published",
  "failed",
  "archived"
];
const SOCIAL_DRAFT_STATUSES = [
  "draft_created",
  "variant_selected",
  "qa_pending",
  "needs_revision",
  "approved",
  "rejected",
  "scheduled",
  "published"
];
const SOCIAL_STATUS_BADGES = {
  creative_ready: "bg-violet-100 text-violet-700",
  qa_pending: "bg-amber-100 text-amber-700",
  variant_selected: "bg-indigo-100 text-indigo-700"
};
function socialBadgeClass(status) {
  return SOCIAL_STATUS_BADGES[status] ?? badgeClass(status);
}
const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "idea", label: "New" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "planned", label: "Planned" }
];
const EMPTY_IDEA_FORM = {
  title: "",
  hook: "",
  angle: "",
  format: "single_post",
  source_type: "manual",
  platform_id: "",
  pillar_id: ""
};
const EMPTY_SCORES = Object.fromEntries(
  SOCIAL_SCORE_FIELDS.map(([key]) => [key, ""])
);
function SocialIdeasBoard({ businessId, platformId, platforms, query, onError }) {
  const [ideas, setIdeas] = reactExports.useState([]);
  const [pillars, setPillars] = reactExports.useState([]);
  const [tab, setTab] = reactExports.useState("all");
  const [loading, setLoading] = reactExports.useState(true);
  const [mutating, setMutating] = reactExports.useState(false);
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [ideaForm, setIdeaForm] = reactExports.useState(EMPTY_IDEA_FORM);
  const [scoring, setScoring] = reactExports.useState(null);
  const [scoreForm, setScoreForm] = reactExports.useState(EMPTY_SCORES);
  const [rejecting, setRejecting] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [planning, setPlanning] = reactExports.useState(null);
  const [planForm, setPlanForm] = reactExports.useState({
    planned_publish_at: "",
    timezone: "",
    assigned_agent: "",
    campaign_id: ""
  });
  const platformName = (id) => platforms.find((p) => p.id === id)?.name ?? "Unknown";
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        business_id: businessId,
        sort: "created_at",
        direction: "desc",
        limit: "100"
      });
      if (platformId) params.set("platform_id", platformId);
      if (tab !== "all") params.set("status", tab);
      if (query.trim()) params.set("q", query.trim());
      const page = await apiRequest(`/api/v1/social/ideas?${params}`);
      setIdeas(page.items);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [businessId, platformId, tab, query, onError]);
  reactExports.useEffect(() => {
    void load();
  }, [load]);
  reactExports.useEffect(() => {
    void (async () => {
      try {
        const page = await apiRequest(
          `/api/v1/content/strategies?business_id=${businessId}&limit=1`
        );
        const strategy = page.items[0];
        setPillars(
          strategy ? await apiRequest(
            `/api/v1/content/strategies/${strategy.id}/pillars`
          ) : []
        );
      } catch {
        setPillars([]);
      }
    })();
  }, [businessId]);
  const run = async (fn) => {
    setMutating(true);
    try {
      await fn();
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const openCreate = () => {
    setIdeaForm({
      ...EMPTY_IDEA_FORM,
      platform_id: platformId || platforms[0]?.id || ""
    });
    setCreateOpen(true);
  };
  const submitCreate = async (event) => {
    event.preventDefault();
    if (!ideaForm.title.trim() || !ideaForm.platform_id) return;
    await run(
      () => apiRequest("/api/v1/social/ideas", {
        method: "POST",
        body: JSON.stringify({
          business_id: businessId,
          platform_id: ideaForm.platform_id,
          pillar_id: ideaForm.pillar_id || null,
          format: ideaForm.format,
          title: ideaForm.title.trim(),
          hook: ideaForm.hook.trim() || null,
          angle: ideaForm.angle.trim() || null,
          source_type: ideaForm.source_type
        })
      })
    );
    setCreateOpen(false);
    setIdeaForm(EMPTY_IDEA_FORM);
  };
  const openScore = (idea) => {
    setScoring(idea);
    setScoreForm(
      Object.fromEntries(
        SOCIAL_SCORE_FIELDS.map(([key]) => [
          key,
          idea[key]?.toString() ?? ""
        ])
      )
    );
  };
  const submitScore = async (event) => {
    event.preventDefault();
    if (!scoring) return;
    const payload = {};
    for (const [key] of SOCIAL_SCORE_FIELDS) {
      if (scoreForm[key] !== "") payload[key] = Number(scoreForm[key]);
    }
    await run(
      () => apiRequest(`/api/v1/social/ideas/${scoring.id}/score`, {
        method: "POST",
        body: JSON.stringify(payload)
      })
    );
    setScoring(null);
  };
  const submitReject = async (event) => {
    event.preventDefault();
    if (!rejecting || !rejectReason.trim()) return;
    await run(
      () => apiRequest(`/api/v1/social/ideas/${rejecting.id}/reject`, {
        method: "POST",
        body: JSON.stringify({ rejection_reason: rejectReason.trim() })
      })
    );
    setRejecting(null);
    setRejectReason("");
  };
  const submitPlan = async (event) => {
    event.preventDefault();
    if (!planning) return;
    await run(
      () => apiRequest("/api/v1/social/calendar-items", {
        method: "POST",
        body: JSON.stringify({
          social_idea_id: planning.id,
          planned_publish_at: planForm.planned_publish_at ? new Date(planForm.planned_publish_at).toISOString() : null,
          timezone: planForm.timezone.trim() || null,
          assigned_agent: planForm.assigned_agent.trim() || null,
          campaign_id: planForm.campaign_id.trim() || null
        })
      })
    );
    setPlanning(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: STATUS_TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setTab(t.id),
          className: cn(
            "rounded-full px-3 py-1.5 text-sm transition",
            tab === t.id ? "bg-sky-100 text-sky-900" : "text-foreground/70 hover:bg-white/60"
          ),
          children: t.label
        },
        t.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "rounded-lg", onClick: openCreate, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
        " New idea"
      ] })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 py-3", children: [1, 2, 3, 4].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" }, item)) }),
    !loading && ideas.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No social ideas here yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Create one or change the filter." })
    ] }),
    !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2", children: ideas.map((idea) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "rounded-xl border border-black/5 px-3 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: idea.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                      socialBadgeClass(idea.status)
                    ),
                    children: statusLabel(idea.status)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-full bg-fuchsia-100 px-2 py-0.5 text-xs font-medium text-fuchsia-700", children: platformName(idea.platform_id) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600", children: statusLabel(idea.format) })
              ] }),
              idea.hook && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground", children: idea.hook }),
              idea.rejection_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-rose-600", children: [
                "Rejected: ",
                idea.rejection_reason
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-wrap gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 rounded-lg",
                  disabled: mutating,
                  onClick: () => openScore(idea),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "mr-1 h-3.5 w-3.5" }),
                    " Score"
                  ]
                }
              ),
              idea.status !== "approved" && idea.status !== "planned" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 rounded-lg text-emerald-700",
                  disabled: mutating,
                  onClick: () => run(
                    () => apiRequest(`/api/v1/social/ideas/${idea.id}/approve`, {
                      method: "POST"
                    })
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-3.5 w-3.5" }),
                    " Approve"
                  ]
                }
              ),
              idea.status !== "rejected" && idea.status !== "planned" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-8 rounded-lg text-rose-700",
                  disabled: mutating,
                  onClick: () => {
                    setRejecting(idea);
                    setRejectReason("");
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "mr-1 h-3.5 w-3.5" }),
                    " Reject"
                  ]
                }
              ),
              idea.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "h-8 rounded-lg",
                  disabled: mutating,
                  onClick: () => {
                    setPlanning(idea);
                    setPlanForm({
                      planned_publish_at: "",
                      timezone: "",
                      assigned_agent: "",
                      campaign_id: ""
                    });
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "mr-1 h-3.5 w-3.5" }),
                    " Plan"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 rounded-full text-destructive",
                  disabled: mutating,
                  onClick: () => run(
                    () => apiRequest(`/api/v1/social/ideas/${idea.id}`, {
                      method: "DELETE"
                    })
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          SOCIAL_SCORE_FIELDS.some(
            ([key]) => idea[key] != null
          ) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: SOCIAL_SCORE_FIELDS.map(([key, label]) => {
            const value = idea[key];
            if (value == null) return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600",
                children: [
                  label,
                  " ",
                  Number(value)
                ]
              },
              key
            );
          }) })
        ]
      },
      idea.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitCreate, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "New social idea" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-idea-title", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "social-idea-title",
              value: ideaForm.title,
              onChange: (e) => setIdeaForm((prev) => ({ ...prev, title: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Platform" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: ideaForm.platform_id || void 0,
                onValueChange: (value) => setIdeaForm((prev) => ({ ...prev, platform_id: value })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pick a platform" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: platforms.map((platform) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: platform.id, children: platform.name }, platform.id)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Format" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: ideaForm.format,
                onValueChange: (value) => setIdeaForm((prev) => ({ ...prev, format: value })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SOCIAL_IDEA_FORMATS.map((format) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: format, className: "capitalize", children: statusLabel(format) }, format)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-idea-hook", children: "Hook" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "social-idea-hook",
              rows: 2,
              value: ideaForm.hook,
              onChange: (e) => setIdeaForm((prev) => ({ ...prev, hook: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-idea-angle", children: "Angle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "social-idea-angle",
              rows: 2,
              value: ideaForm.angle,
              onChange: (e) => setIdeaForm((prev) => ({ ...prev, angle: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Source" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: ideaForm.source_type,
                onValueChange: (value) => setIdeaForm((prev) => ({ ...prev, source_type: value })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SOCIAL_SOURCE_TYPES.map((source) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: source, className: "capitalize", children: statusLabel(source) }, source)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Pillar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: ideaForm.pillar_id || "none",
                onValueChange: (value) => setIdeaForm((prev) => ({
                  ...prev,
                  pillar_id: value === "none" ? "" : value
                })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "No pillar" }),
                    pillars.map((pillar) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: pillar.id, children: pillar.name }, pillar.id))
                  ] })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setCreateOpen(false),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            disabled: mutating || !ideaForm.title.trim() || !ideaForm.platform_id,
            children: [
              mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
              "Create"
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: scoring !== null, onOpenChange: (open) => !open && setScoring(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitScore, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Score idea" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-3 sm:grid-cols-3", children: SOCIAL_SCORE_FIELDS.map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: `social-score-${key}`, children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: `social-score-${key}`,
            type: "number",
            min: 0,
            max: 100,
            value: scoreForm[key],
            onChange: (e) => setScoreForm((prev) => ({ ...prev, [key]: e.target.value }))
          }
        )
      ] }, key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setScoring(null),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating, children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Save scores"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: rejecting !== null, onOpenChange: (open) => !open && setRejecting(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitReject, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reject idea" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-reject-reason", children: "Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "social-reject-reason",
            rows: 3,
            value: rejectReason,
            onChange: (e) => setRejectReason(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setRejecting(null),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            variant: "destructive",
            disabled: mutating || !rejectReason.trim(),
            children: [
              mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
              "Reject"
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: planning !== null, onOpenChange: (open) => !open && setPlanning(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitPlan, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Schedule on calendar" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-plan-date", children: "Publish at" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "social-plan-date",
                type: "datetime-local",
                value: planForm.planned_publish_at,
                onChange: (e) => setPlanForm((prev) => ({ ...prev, planned_publish_at: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-plan-timezone", children: "Timezone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "social-plan-timezone",
                placeholder: "Europe/Kyiv",
                value: planForm.timezone,
                onChange: (e) => setPlanForm((prev) => ({ ...prev, timezone: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-plan-agent", children: "Assigned agent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "social-plan-agent",
                value: planForm.assigned_agent,
                onChange: (e) => setPlanForm((prev) => ({ ...prev, assigned_agent: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-plan-campaign", children: "Campaign" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "social-plan-campaign",
                value: planForm.campaign_id,
                onChange: (e) => setPlanForm((prev) => ({ ...prev, campaign_id: e.target.value }))
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setPlanning(null),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating, children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Schedule"
        ] })
      ] })
    ] }) }) })
  ] });
}
const EMPTY_FORM$1 = {
  caption: "",
  hook: "",
  hashtags: "",
  mentions: "",
  cta: ""
};
function SocialDraftEditor({ briefId, onError }) {
  const [drafts, setDrafts] = reactExports.useState([]);
  const [variants, setVariants] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  const [mutating, setMutating] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM$1);
  const [variantFor, setVariantFor] = reactExports.useState(null);
  const [variantCaption, setVariantCaption] = reactExports.useState("");
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const list = await apiRequest(
        `/api/v1/social/briefs/${briefId}/drafts`
      );
      setDrafts(list);
      const entries = await Promise.all(
        list.map(async (draft) => {
          const draftVariants = await apiRequest(
            `/api/v1/social/drafts/${draft.id}/variants`
          );
          return [draft.id, draftVariants];
        })
      );
      setVariants(Object.fromEntries(entries));
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [briefId, onError]);
  reactExports.useEffect(() => {
    void load();
  }, [load]);
  const run = async (fn) => {
    setMutating(true);
    try {
      await fn();
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const openDialog = (draft) => {
    setEditing(draft);
    setForm(
      draft ? {
        caption: draft.caption,
        hook: draft.hook ?? "",
        hashtags: listToLines(draft.hashtags),
        mentions: listToLines(draft.mentions),
        cta: draft.cta ?? ""
      } : EMPTY_FORM$1
    );
    setDialogOpen(true);
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!form.caption.trim()) return;
    const payload = {
      caption: form.caption.trim(),
      hook: form.hook.trim() || null,
      hashtags: linesToList(form.hashtags),
      mentions: linesToList(form.mentions),
      cta: form.cta.trim() || null
    };
    await run(
      () => editing ? apiRequest(`/api/v1/social/drafts/${editing.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
      }) : apiRequest(`/api/v1/social/briefs/${briefId}/drafts`, {
        method: "POST",
        body: JSON.stringify(payload)
      })
    );
    setDialogOpen(false);
  };
  const submitVariant = async (event) => {
    event.preventDefault();
    if (!variantFor || !variantCaption.trim()) return;
    await run(
      () => apiRequest(`/api/v1/social/drafts/${variantFor.id}/variants`, {
        method: "POST",
        body: JSON.stringify({ variants: [{ caption: variantCaption.trim() }] })
      })
    );
    setVariantFor(null);
    setVariantCaption("");
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 py-2", children: [1, 2].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" }, item)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium uppercase tracking-wide text-muted-foreground", children: "Post drafts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "rounded-lg", onClick: () => openDialog(null), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
        " New draft"
      ] })
    ] }),
    drafts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No drafts for this brief yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2", children: drafts.map((draft) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl border border-black/5 px-3 py-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                  socialBadgeClass(draft.status)
                ),
                children: statusLabel(draft.status)
              }
            ),
            draft.hashtags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: draft.hashtags.join(" ") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-foreground/90", children: draft.caption }),
          draft.selected_variant_reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
            "Variant choice: ",
            draft.selected_variant_reason
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-wrap items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: draft.status,
              onValueChange: (value) => run(
                () => apiRequest(`/api/v1/social/drafts/${draft.id}/status`, {
                  method: "POST",
                  body: JSON.stringify({ status: value })
                })
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-[160px] rounded-lg text-xs capitalize", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SOCIAL_DRAFT_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, className: "capitalize", children: statusLabel(status) }, status)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8 rounded-full",
              disabled: mutating,
              onClick: () => openDialog(draft),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8 rounded-full text-destructive",
              disabled: mutating,
              onClick: () => run(
                () => apiRequest(`/api/v1/social/drafts/${draft.id}`, {
                  method: "DELETE"
                })
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 border-t border-black/5 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: [
            "Variants (",
            variants[draft.id]?.length ?? 0,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "h-7 rounded-lg text-xs",
              onClick: () => {
                setVariantFor(draft);
                setVariantCaption("");
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-3 w-3" }),
                " Add variant"
              ]
            }
          )
        ] }),
        (variants[draft.id] ?? []).map((variant) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "mt-1 flex items-start justify-between gap-2 rounded-lg px-2 py-1.5 text-xs",
              draft.selected_variant_id === variant.id ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-[hsl(220,33%,97%)]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-pre-wrap", children: variant.caption }),
              draft.selected_variant_id === variant.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex shrink-0 items-center gap-1 text-emerald-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
                " Selected"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "h-6 shrink-0 rounded-md text-xs",
                  disabled: mutating,
                  onClick: () => run(
                    () => apiRequest(`/api/v1/social/drafts/${draft.id}/select-variant`, {
                      method: "POST",
                      body: JSON.stringify({ variant_id: variant.id })
                    })
                  ),
                  children: "Select"
                }
              )
            ]
          },
          variant.id
        ))
      ] })
    ] }, draft.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit draft" : "New draft" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-draft-caption", children: "Caption" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "social-draft-caption",
              rows: 4,
              value: form.caption,
              onChange: (e) => setForm((prev) => ({ ...prev, caption: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-draft-hook", children: "Hook" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "social-draft-hook",
              value: form.hook,
              onChange: (e) => setForm((prev) => ({ ...prev, hook: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-draft-hashtags", children: "Hashtags (one per line)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "social-draft-hashtags",
                rows: 3,
                value: form.hashtags,
                onChange: (e) => setForm((prev) => ({ ...prev, hashtags: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-draft-mentions", children: "Mentions (one per line)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "social-draft-mentions",
                rows: 3,
                value: form.mentions,
                onChange: (e) => setForm((prev) => ({ ...prev, mentions: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-draft-cta", children: "CTA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "social-draft-cta",
              value: form.cta,
              onChange: (e) => setForm((prev) => ({ ...prev, cta: e.target.value }))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setDialogOpen(false),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !form.caption.trim(), children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          editing ? "Save" : "Create"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: variantFor !== null, onOpenChange: (open) => !open && setVariantFor(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitVariant, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add variant" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-variant-caption", children: "Caption" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "social-variant-caption",
            rows: 4,
            value: variantCaption,
            onChange: (e) => setVariantCaption(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setVariantFor(null),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !variantCaption.trim(), children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Add"
        ] })
      ] })
    ] }) }) })
  ] });
}
const LIST_FIELDS$1 = [
  ["references", "References"],
  ["assets_needed", "Assets needed"],
  ["forbidden_topics", "Forbidden topics"]
];
const EMPTY_FORM = {
  title: "",
  objective: "",
  audience: "",
  hook: "",
  key_message: "",
  caption_direction: "",
  cta: "",
  references: "",
  assets_needed: "",
  forbidden_topics: ""
};
function SocialBriefDetail({ calendarItemId, briefs, onChanged, onError }) {
  const [mutating, setMutating] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [revising, setRevising] = reactExports.useState(null);
  const [feedback, setFeedback] = reactExports.useState("");
  const [reviewsFor, setReviewsFor] = reactExports.useState(null);
  const [reviews, setReviews] = reactExports.useState([]);
  const [expandedBrief, setExpandedBrief] = reactExports.useState(null);
  const openDialog = (brief) => {
    setEditing(brief);
    setForm(
      brief ? {
        title: brief.title,
        objective: brief.objective ?? "",
        audience: brief.audience ?? "",
        hook: brief.hook ?? "",
        key_message: brief.key_message ?? "",
        caption_direction: brief.caption_direction ?? "",
        cta: brief.cta ?? "",
        references: listToLines(brief.references),
        assets_needed: listToLines(brief.assets_needed),
        forbidden_topics: listToLines(brief.forbidden_topics)
      } : EMPTY_FORM
    );
    setDialogOpen(true);
  };
  const run = async (fn) => {
    setMutating(true);
    try {
      await fn();
      await onChanged();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    const payload = {
      title: form.title.trim(),
      objective: form.objective.trim() || null,
      audience: form.audience.trim() || null,
      hook: form.hook.trim() || null,
      key_message: form.key_message.trim() || null,
      caption_direction: form.caption_direction.trim() || null,
      cta: form.cta.trim() || null,
      references: linesToList(form.references),
      assets_needed: linesToList(form.assets_needed),
      forbidden_topics: linesToList(form.forbidden_topics)
    };
    await run(
      () => editing ? apiRequest(`/api/v1/social/briefs/${editing.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
      }) : apiRequest(`/api/v1/social/calendar-items/${calendarItemId}/briefs`, {
        method: "POST",
        body: JSON.stringify(payload)
      })
    );
    setDialogOpen(false);
  };
  const submitRevision = async (event) => {
    event.preventDefault();
    if (!revising || !feedback.trim()) return;
    await run(
      () => apiRequest(`/api/v1/social/briefs/${revising.id}/request-revision`, {
        method: "POST",
        body: JSON.stringify({ feedback: feedback.trim() })
      })
    );
    setRevising(null);
    setFeedback("");
  };
  const openReviews = async (brief) => {
    setReviewsFor(brief);
    setReviews([]);
    try {
      setReviews(
        await apiRequest(
          `/api/v1/social/briefs/${brief.id}/reviews`
        )
      );
    } catch (err) {
      onError(err);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium uppercase tracking-wide text-muted-foreground", children: "Briefs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "rounded-lg", onClick: () => openDialog(null), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-4 w-4" }),
        " New brief"
      ] })
    ] }),
    briefs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No briefs for this calendar item yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2", children: briefs.map((brief) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl border border-black/5 px-3 py-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium", children: brief.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                socialBadgeClass(brief.status)
              ),
              children: statusLabel(brief.status)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-wrap items-center gap-1", children: [
          brief.status !== "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 rounded-lg text-emerald-700",
              disabled: mutating,
              onClick: () => run(
                () => apiRequest(`/api/v1/social/briefs/${brief.id}/approve`, {
                  method: "POST",
                  body: JSON.stringify({})
                })
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1 h-3.5 w-3.5" }),
                " Approve"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 rounded-lg text-orange-700",
              disabled: mutating,
              onClick: () => {
                setRevising(brief);
                setFeedback("");
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, { className: "mr-1 h-3.5 w-3.5" }),
                " Revision"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 rounded-lg",
              onClick: () => openReviews(brief),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "mr-1 h-3.5 w-3.5" }),
                " Reviews"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 rounded-lg",
              disabled: mutating,
              onClick: () => openDialog(brief),
              children: "Edit"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-8 rounded-lg",
              onClick: () => setExpandedBrief((prev) => prev === brief.id ? null : brief.id),
              children: expandedBrief === brief.id ? "Hide drafts" : "Drafts"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: [brief.objective, brief.audience].filter(Boolean).join(" · ") || "No objective set" }),
      brief.hook && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-foreground/80", children: [
        "Hook: ",
        brief.hook
      ] }),
      expandedBrief === brief.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 border-t border-black/5 pt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocialDraftEditor, { briefId: brief.id, onError }) })
    ] }, brief.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit brief" : "New brief" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-brief-title", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "social-brief-title",
              value: form.title,
              onChange: (e) => setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-brief-objective", children: "Objective" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "social-brief-objective",
              rows: 2,
              value: form.objective,
              onChange: (e) => setForm((prev) => ({ ...prev, objective: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-brief-audience", children: "Audience" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "social-brief-audience",
              rows: 2,
              value: form.audience,
              onChange: (e) => setForm((prev) => ({ ...prev, audience: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-brief-hook", children: "Hook" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "social-brief-hook",
              rows: 2,
              value: form.hook,
              onChange: (e) => setForm((prev) => ({ ...prev, hook: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-brief-message", children: "Key message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "social-brief-message",
              rows: 2,
              value: form.key_message,
              onChange: (e) => setForm((prev) => ({ ...prev, key_message: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-brief-caption", children: "Caption direction" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "social-brief-caption",
              rows: 2,
              value: form.caption_direction,
              onChange: (e) => setForm((prev) => ({ ...prev, caption_direction: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-brief-cta", children: "CTA" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "social-brief-cta",
              value: form.cta,
              onChange: (e) => setForm((prev) => ({ ...prev, cta: e.target.value }))
            }
          )
        ] }),
        LIST_FIELDS$1.map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `social-brief-${key}`, children: [
            label,
            " (one per line)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: `social-brief-${key}`,
              rows: 3,
              value: form[key],
              onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
            }
          )
        ] }, key))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setDialogOpen(false),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !form.title.trim(), children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          editing ? "Save" : "Create"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: revising !== null, onOpenChange: (open) => !open && setRevising(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitRevision, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Request revision" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-brief-feedback", children: "Feedback" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "social-brief-feedback",
            rows: 3,
            value: feedback,
            onChange: (e) => setFeedback(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setRevising(null),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !feedback.trim(), children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Send"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: reviewsFor !== null, onOpenChange: (open) => !open && setReviewsFor(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Review history" }) }),
      reviews.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "No reviews yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid gap-2", children: reviews.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl border border-black/5 px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                socialBadgeClass(review.decision)
              ),
              children: statusLabel(review.decision)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            review.reviewer,
            " · ",
            new Date(review.created_at).toLocaleString()
          ] })
        ] }),
        review.feedback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-foreground/80", children: review.feedback })
      ] }, review.id)) })
    ] }) })
  ] });
}
function formatDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString(void 0, {
    dateStyle: "medium",
    timeStyle: "short"
  });
}
function SocialCalendarList({ businessId, platformId, view = "list", onError }) {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [mutating, setMutating] = reactExports.useState(false);
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [selected, setSelected] = reactExports.useState(null);
  const [briefs, setBriefs] = reactExports.useState([]);
  const [rescheduling, setRescheduling] = reactExports.useState(null);
  const [rescheduleForm, setRescheduleForm] = reactExports.useState({ planned_publish_at: "", reason: "" });
  const [historyFor, setHistoryFor] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ business_id: businessId, limit: "100" });
      if (platformId) params.set("platform_id", platformId);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const page = await apiRequest(
        `/api/v1/social/calendar-items?${params}`
      );
      setItems(page.items);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [businessId, platformId, statusFilter, onError]);
  reactExports.useEffect(() => {
    void load();
  }, [load]);
  const loadBriefs = reactExports.useCallback(
    async (item) => {
      try {
        setBriefs(
          await apiRequest(
            `/api/v1/social/calendar-items/${item.id}/briefs`
          )
        );
      } catch (err) {
        onError(err);
      }
    },
    [onError]
  );
  const openDetail = async (item) => {
    setSelected(item);
    setBriefs([]);
    await loadBriefs(item);
  };
  const updateStatus = async (item, status) => {
    setMutating(true);
    try {
      const updated = await apiRequest(
        `/api/v1/social/calendar-items/${item.id}/status`,
        { method: "POST", body: JSON.stringify({ status }) }
      );
      if (selected?.id === item.id) setSelected(updated);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const deleteItem = async (item) => {
    setMutating(true);
    try {
      await apiRequest(`/api/v1/social/calendar-items/${item.id}`, { method: "DELETE" });
      if (selected?.id === item.id) setSelected(null);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const submitReschedule = async (event) => {
    event.preventDefault();
    if (!rescheduling || !rescheduleForm.planned_publish_at) return;
    setMutating(true);
    try {
      const updated = await apiRequest(
        `/api/v1/social/calendar-items/${rescheduling.id}/reschedule`,
        {
          method: "POST",
          body: JSON.stringify({
            planned_publish_at: new Date(rescheduleForm.planned_publish_at).toISOString(),
            reason: rescheduleForm.reason.trim() || null
          })
        }
      );
      if (selected?.id === rescheduling.id) setSelected(updated);
      setRescheduling(null);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  const openHistory = async (item) => {
    setHistoryFor(item);
    setHistory([]);
    try {
      setHistory(
        await apiRequest(
          `/api/v1/social/calendar-items/${item.id}/reschedules`
        )
      );
    } catch (err) {
      onError(err);
    }
  };
  if (selected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "rounded-full",
              onClick: () => setSelected(null),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate text-lg font-medium", children: selected.title || "Untitled" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: [
              formatDateTime(selected.planned_publish_at),
              selected.timezone,
              selected.assigned_agent,
              selected.campaign_id
            ].filter(Boolean).join(" · ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-9 rounded-lg",
              onClick: () => {
                setRescheduling(selected);
                setRescheduleForm({ planned_publish_at: "", reason: "" });
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "mr-1 h-4 w-4" }),
                " Reschedule"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "h-9 rounded-lg",
              onClick: () => openHistory(selected),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "mr-1 h-4 w-4" }),
                " History"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selected.status,
              onValueChange: (value) => updateStatus(selected, value),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-[180px] rounded-lg capitalize", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SOCIAL_CALENDAR_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, className: "capitalize", children: statusLabel(status) }, status)) })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SocialBriefDetail,
        {
          calendarItemId: selected.id,
          briefs,
          onChanged: () => loadBriefs(selected),
          onError
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        RescheduleDialog,
        {
          rescheduling,
          form: rescheduleForm,
          setForm: setRescheduleForm,
          mutating,
          onClose: () => setRescheduling(null),
          onSubmit: submitReschedule
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HistoryDialog,
        {
          historyFor,
          history,
          onClose: () => setHistoryFor(null)
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Select,
      {
        value: statusFilter,
        onValueChange: (value) => setStatusFilter(value),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-9 w-[180px] rounded-lg capitalize", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All statuses" }),
            SOCIAL_CALENDAR_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, className: "capitalize", children: statusLabel(status) }, status))
          ] })
        ]
      }
    ) }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 py-3", children: [1, 2, 3, 4].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" }, item)) }),
    !loading && items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mb-3 h-8 w-8 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Nothing scheduled" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Approve a social idea and plan it to see it here." })
    ] }),
    !loading && items.length > 0 && view === "calendar" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CalendarMonthView,
      {
        events: items.filter((item) => item.planned_publish_at).map((item) => ({
          id: item.id,
          date: item.planned_publish_at,
          title: item.title || "Untitled",
          colorClass: socialBadgeClass(item.status)
        })),
        onSelect: (id) => {
          const item = items.find((i) => i.id === id);
          if (item) void openDetail(item);
        }
      }
    ),
    !loading && items.length > 0 && view === "list" && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "hidden grid-cols-[1.4fr_180px_150px_44px_44px] items-center gap-4 border-b border-black/5 px-2 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Publish at" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
      ] }),
      items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "group grid cursor-pointer grid-cols-[1fr_auto] items-center gap-3 rounded-xl border-b border-black/5 px-2 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)] md:grid-cols-[1.4fr_180px_150px_44px_44px] md:gap-4",
          onClick: () => openDetail(item),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-medium", children: item.title || "Untitled" }),
              (item.assigned_agent || item.campaign_id) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground", children: [item.assigned_agent, item.campaign_id].filter(Boolean).join(" · ") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden text-muted-foreground md:block", children: formatDateTime(item.planned_publish_at) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: item.status,
                onValueChange: (value) => updateStatus(item, value),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: cn(
                        "h-7 w-[140px] rounded-full border-none text-xs font-medium capitalize",
                        socialBadgeClass(item.status)
                      ),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SOCIAL_CALENDAR_STATUSES.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: status, className: "capitalize", children: statusLabel(status) }, status)) })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: (e) => e.stopPropagation(), className: "hidden justify-end md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 rounded-full",
                disabled: mutating,
                onClick: () => {
                  setRescheduling(item);
                  setRescheduleForm({ planned_publish_at: "", reason: "" });
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "h-4 w-4" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: (e) => e.stopPropagation(), className: "hidden justify-end md:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 rounded-full text-destructive",
                disabled: mutating,
                onClick: () => deleteItem(item),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            ) })
          ]
        },
        item.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RescheduleDialog,
      {
        rescheduling,
        form: rescheduleForm,
        setForm: setRescheduleForm,
        mutating,
        onClose: () => setRescheduling(null),
        onSubmit: submitReschedule
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      HistoryDialog,
      {
        historyFor,
        history,
        onClose: () => setHistoryFor(null)
      }
    )
  ] });
}
function RescheduleDialog({
  rescheduling,
  form,
  setForm,
  mutating,
  onClose,
  onSubmit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: rescheduling !== null, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reschedule" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-reschedule-date", children: "New publish time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "social-reschedule-date",
            type: "datetime-local",
            value: form.planned_publish_at,
            onChange: (e) => setForm((prev) => ({ ...prev, planned_publish_at: e.target.value }))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "social-reschedule-reason", children: "Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "social-reschedule-reason",
            rows: 2,
            value: form.reason,
            onChange: (e) => setForm((prev) => ({ ...prev, reason: e.target.value }))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onClose, disabled: mutating, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !form.planned_publish_at, children: [
        mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
        "Reschedule"
      ] })
    ] })
  ] }) }) });
}
function HistoryDialog({
  historyFor,
  history,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: historyFor !== null, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Reschedule history" }) }),
    history.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "No reschedules yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid gap-2", children: history.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl border border-black/5 px-3 py-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        formatDateTime(entry.previous_planned_publish_at),
        " →",
        " ",
        formatDateTime(entry.planned_publish_at)
      ] }),
      entry.reason && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs", children: entry.reason })
    ] }, entry.id)) })
  ] }) });
}
const LIST_FIELDS = [
  ["target_audiences", "Target audiences"],
  ["platforms", "Platforms"],
  ["content_mix", "Content mix"],
  ["kpis", "KPIs"]
];
const DICT_FIELDS = [
  ["goals", "Goals"],
  ["posting_frequency", "Posting frequency"],
  ["engagement_strategy", "Engagement strategy"],
  ["growth_strategy", "Growth strategy"],
  ["constraints", "Constraints"]
];
function dictToText(value) {
  if (!value || Object.keys(value).length === 0) return "";
  return JSON.stringify(value, null, 2);
}
function textToDict(value) {
  const trimmed = value.trim();
  if (!trimmed) return {};
  const parsed = JSON.parse(trimmed);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Expected a JSON object");
  }
  return parsed;
}
function SocialStrategyPanel({ businessId, onError }) {
  const [strategy, setStrategy] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [mutating, setMutating] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({});
  const [formError, setFormError] = reactExports.useState("");
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const page = await apiRequest(
        `/api/v1/social/strategies?business_id=${businessId}&limit=1`
      );
      setStrategy(page.items[0] ?? null);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [businessId, onError]);
  reactExports.useEffect(() => {
    void load();
  }, [load]);
  const openDialog = () => {
    const next = {};
    for (const [key] of LIST_FIELDS) {
      next[key] = listToLines(strategy?.[key] ?? []);
    }
    for (const [key] of DICT_FIELDS) {
      next[key] = dictToText(
        strategy?.[key] ?? null
      );
    }
    setForm(next);
    setFormError("");
    setDialogOpen(true);
  };
  const submit = async (event) => {
    event.preventDefault();
    let payload;
    try {
      payload = {
        target_audiences: linesToList(form.target_audiences ?? ""),
        platforms: linesToList(form.platforms ?? ""),
        content_mix: linesToList(form.content_mix ?? ""),
        kpis: linesToList(form.kpis ?? ""),
        goals: textToDict(form.goals ?? ""),
        posting_frequency: textToDict(form.posting_frequency ?? ""),
        engagement_strategy: textToDict(form.engagement_strategy ?? ""),
        growth_strategy: textToDict(form.growth_strategy ?? ""),
        constraints: form.constraints?.trim() ? textToDict(form.constraints) : null
      };
    } catch {
      setFormError('One of the JSON fields is invalid — use a JSON object like {"key": "value"}.');
      return;
    }
    setMutating(true);
    try {
      if (strategy) {
        await apiRequest(`/api/v1/social/strategies/${strategy.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      } else {
        await apiRequest("/api/v1/social/strategies", {
          method: "POST",
          body: JSON.stringify({ ...payload, business_id: businessId })
        });
      }
      setDialogOpen(false);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 py-3", children: [1, 2, 3].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" }, item)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-black/5 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium", children: "Social strategy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "rounded-lg", onClick: openDialog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "mr-1 h-4 w-4" }),
          " ",
          strategy ? "Edit" : "Create strategy"
        ] })
      ] }),
      strategy ? /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid gap-3 text-sm sm:grid-cols-2", children: [
        LIST_FIELDS.map(([key, label]) => {
          const items = strategy[key] ?? [];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: items.length ? items.map(
              (item) => typeof item === "string" ? item : JSON.stringify(item)
            ).join(", ") : "—" })
          ] }, key);
        }),
        DICT_FIELDS.map(([key, label]) => {
          const value = strategy[key];
          const text = dictToText(value);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: text ? /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-1 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-[hsl(220,33%,97%)] p-2 text-xs", children: text }) : "—" })
          ] }, key);
        })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No social strategy yet for this company." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: strategy ? "Edit social strategy" : "Create social strategy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        LIST_FIELDS.map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `social-strategy-${key}`, children: [
            label,
            " (one per line)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: `social-strategy-${key}`,
              rows: 3,
              value: form[key] ?? "",
              onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
            }
          )
        ] }, key)),
        DICT_FIELDS.map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: `social-strategy-${key}`, children: [
            label,
            " (JSON object)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: `social-strategy-${key}`,
              rows: 3,
              placeholder: '{"key": "value"}',
              value: form[key] ?? "",
              onChange: (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))
            }
          )
        ] }, key)),
        formError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: formError })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setDialogOpen(false),
            disabled: mutating,
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating, children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Save"
        ] })
      ] })
    ] }) }) })
  ] });
}
const TEMPLATES = [
  {
    id: "instagram",
    name: "Instagram",
    size: "Square",
    aspectClass: "aspect-square",
    Icon: Instagram,
    accentClass: "from-rose-500 to-amber-400"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    size: "Feed",
    aspectClass: "aspect-[1.91/1]",
    Icon: Linkedin,
    accentClass: "from-sky-600 to-cyan-500"
  },
  {
    id: "threads",
    name: "Threads",
    size: "Portrait",
    aspectClass: "aspect-[4/5]",
    Icon: AtSign,
    accentClass: "from-zinc-900 to-zinc-600"
  },
  {
    id: "twitter",
    name: "Twitter",
    size: "Landscape",
    aspectClass: "aspect-video",
    Icon: Twitter,
    accentClass: "from-blue-500 to-sky-400"
  }
];
function ClaudeMark() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid size-14 shrink-0 place-items-center rounded-2xl bg-[#dd6846] shadow-sm sm:size-16", children: [
    Array.from({ length: 12 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "absolute h-1.5 w-8 rounded-full bg-white sm:w-9",
        style: { transform: `rotate(${index * 15}deg)` }
      },
      index
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative size-3 rounded-full bg-white" })
  ] });
}
function TemplateCard({ template }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-black/5 px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "grid size-7 place-items-center rounded-md bg-gradient-to-br text-white",
              template.accentClass
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(template.Icon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium leading-tight", children: template.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: template.size })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "/monomcp" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[hsl(220,33%,97%)] p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "relative mx-auto w-full max-w-[360px] overflow-hidden rounded-lg border border-black/10 bg-[#fbf7f1] shadow-[0_14px_35px_rgba(15,23,42,0.12)]",
          template.aspectClass
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-3 top-3 flex gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full bg-red-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full bg-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full bg-emerald-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full items-center justify-center gap-4 px-6 pt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ClaudeMark, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 text-[clamp(1.75rem,7vw,3.25rem)] font-semibold leading-none tracking-normal text-black", children: "/monomcp" })
          ] })
        ]
      }
    ) })
  ] });
}
function SocialTemplateGallery() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex flex-wrap items-end justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium", children: "Social templates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Claude icon lockup with /monomcp for each channel format." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4", children: TEMPLATES.map((template) => /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateCard, { template }, template.id)) })
  ] });
}
const CONTENT_NAV = [{
  id: "ideas",
  label: "Ideas",
  icon: Lightbulb
}, {
  id: "calendar",
  label: "Calendar",
  icon: CalendarDays
}, {
  id: "strategy",
  label: "Strategy",
  icon: Compass
}];
const BUSINESS_STORAGE_KEY = "content_business_id";
const MODE_STORAGE_KEY = "content_mode";
const PLATFORM_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  x: Twitter,
  linkedin: Linkedin,
  website: Globe,
  blog: Globe
};
function ContentPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const [section, setSection] = reactExports.useState("ideas");
  const [calendarView, setCalendarView] = reactExports.useState("list");
  const [mode, setMode] = reactExports.useState(() => localStorage.getItem(MODE_STORAGE_KEY) === "social" ? "social" : "content");
  const [platforms, setPlatforms] = reactExports.useState([]);
  const [platformId, setPlatformId] = reactExports.useState("");
  const [businessId, setBusinessId] = reactExports.useState(() => localStorage.getItem(BUSINESS_STORAGE_KEY) ?? "");
  const [loadingBusinesses, setLoadingBusinesses] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const handleApiError = reactExports.useCallback((err, fallback = "Content request failed") => {
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
  reactExports.useEffect(() => {
    void (async () => {
      try {
        const page = await apiRequest("/api/v1/business?sort=name&direction=asc&limit=200&offset=0");
        const stored = localStorage.getItem(BUSINESS_STORAGE_KEY);
        const valid = page.items.some((b) => b.id === stored);
        const fallback = page.items[0]?.id ?? "";
        const next = valid && stored ? stored : fallback;
        setBusinessId(next);
        if (next) localStorage.setItem(BUSINESS_STORAGE_KEY, next);
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoadingBusinesses(false);
      }
    })();
  }, [handleApiError]);
  reactExports.useEffect(() => {
    if (mode !== "social" || platforms.length > 0) return;
    void (async () => {
      try {
        setPlatforms(await apiRequest("/api/v1/social/platforms"));
      } catch (err) {
        handleApiError(err);
      }
    })();
  }, [mode, platforms.length, handleApiError]);
  const selectMode = (next) => {
    setMode(next);
    localStorage.setItem(MODE_STORAGE_KEY, next);
    setError("");
  };
  const activeTitle = reactExports.useMemo(() => {
    const label = CONTENT_NAV.find((n) => n.id === section)?.label ?? "Content";
    return mode === "social" ? `Social ${label.toLowerCase()}` : label;
  }, [section, mode]);
  const modeToggle = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center rounded-full bg-[hsl(220,33%,95%)] p-1", children: ["content", "social"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => selectMode(m), className: cn("rounded-full px-5 py-1.5 text-sm capitalize transition", mode === m ? "bg-white text-foreground shadow-sm" : "text-foreground/60 hover:text-foreground"), children: m }, m)) });
  const viewToggle = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center rounded-full bg-[hsl(220,33%,95%)] p-1", children: [{
    id: "list",
    label: "List",
    icon: List
  }, {
    id: "calendar",
    label: "Calendar",
    icon: LayoutGrid
  }].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCalendarView(v.id), "aria-label": v.label, title: v.label, className: cn("grid h-7 w-9 place-items-center rounded-full transition", calendarView === v.id ? "bg-white text-foreground shadow-sm" : "text-foreground/60 hover:text-foreground"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "h-4 w-4" }) }, v.id)) });
  const searchField = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 w-full items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search ideas", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 md:w-[244px] md:shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Content" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden flex-1 items-center gap-3 md:flex", children: [
        modeToggle,
        section === "calendar" && viewToggle,
        searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 max-w-2xl flex-1", children: searchField })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Search", onClick: () => setSearchOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 md:hidden", children: searchField }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-[260px] shrink-0 px-3 md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: CONTENT_NAV.map((n) => {
          const active = section === n.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSection(n.id), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-5 w-5 text-foreground/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: n.label })
          ] }, n.id);
        }) }),
        mode === "social" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Platforms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPlatformId(""), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", platformId === "" ? "bg-fuchsia-100 text-fuchsia-900" : "text-foreground/80 hover:bg-white/60"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-5 w-5 text-foreground/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: "All platforms" })
            ] }),
            platforms.map((platform) => {
              const Icon = PLATFORM_ICONS[platform.slug] ?? Hash;
              const active = platformId === platform.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPlatformId(platform.id), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", active ? "bg-fuchsia-100 text-fuchsia-900" : "text-foreground/80 hover:bg-white/60"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-foreground/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: platform.name })
              ] }, platform.id);
            })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal capitalize tracking-tight", children: activeTitle }) }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-col gap-3 rounded-2xl border border-destructive/20 bg-white px-4 py-3 text-sm text-destructive shadow-sm sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "rounded-lg", onClick: () => setError(""), children: "Dismiss" })
        ] }),
        !loadingBusinesses && !businessId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "No companies yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Create a company first, then plan its content here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", className: "mt-3 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/company", children: "Go to Company" }) })
        ] }),
        businessId && mode === "social" && /* @__PURE__ */ jsxRuntimeExports.jsx(SocialTemplateGallery, {}),
        businessId && mode === "content" && section === "ideas" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContentIdeasBoard, { businessId, query, onError: handleApiError }, businessId),
        businessId && mode === "content" && section === "calendar" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContentCalendarList, { businessId, view: calendarView, onError: handleApiError }, businessId),
        businessId && mode === "content" && section === "strategy" && /* @__PURE__ */ jsxRuntimeExports.jsx(ContentStrategyPanel, { businessId, onError: handleApiError }, businessId),
        businessId && mode === "social" && section === "ideas" && /* @__PURE__ */ jsxRuntimeExports.jsx(SocialIdeasBoard, { businessId, platformId, platforms, query, onError: handleApiError }, `${businessId}:${platformId}`),
        businessId && mode === "social" && section === "calendar" && /* @__PURE__ */ jsxRuntimeExports.jsx(SocialCalendarList, { businessId, platformId, view: calendarView, onError: handleApiError }, `${businessId}:${platformId}`),
        businessId && mode === "social" && section === "strategy" && /* @__PURE__ */ jsxRuntimeExports.jsx(SocialStrategyPanel, { businessId, onError: handleApiError }, businessId)
      ] }) })
    ] })
  ] });
}
export {
  ContentPage as component
};
