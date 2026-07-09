import { useMemo, useState, type CSSProperties } from "react";
import {
  BookOpenText,
  Grid2x2Plus,
  MessageSquare,
  Paperclip,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

/**
 * AgentNode — a faithful reproduction of Make.com's "Make AI Agent" canvas node.
 *
 * Make draws this on a <canvas>; here it is rebuilt with SVG + CSS so it is
 * accessible, themeable and interactive:
 *   - hover the hexagon  -> the radial "add" fan (Knowledge / Tool / MCP / Chat)
 *     springs out, the bottom "+" morphs into "×", the clock + label fade away.
 *   - the red badge       -> counts validation warnings; click opens a Messages popover.
 *   - the clock           -> animated trigger/schedule indicator (hands keep ticking).
 *   - the right "+"       -> the "add next module" connector; hover reveals a
 *     "Add module" / "Add AI module" flyout.
 */

// --- geometry -------------------------------------------------------------

// Reference frame: everything is positioned relative to the hexagon centre.
const CX = 190;
const CY = 120;

function centered(dx: number, dy: number, size: number) {
  return { left: CX + dx - size / 2, top: CY + dy - size / 2 };
}

/** Rounded flat-top hexagon path for an SVG viewBox of `box` px. */
function hexPath(box: number, rx: number, ry: number, corner: number) {
  const cx = box / 2;
  const cy = box / 2;
  const verts: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i);
    verts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  const along = (from: [number, number], to: [number, number], d: number) => {
    const vx = to[0] - from[0];
    const vy = to[1] - from[1];
    const len = Math.hypot(vx, vy) || 1;
    return [from[0] + (vx / len) * d, from[1] + (vy / len) * d] as [number, number];
  };
  let d = "";
  for (let i = 0; i < 6; i++) {
    const prev = verts[(i + 5) % 6];
    const cur = verts[i];
    const next = verts[(i + 1) % 6];
    const start = along(cur, prev, corner);
    const end = along(cur, next, corner);
    d += `${i === 0 ? "M" : "L"} ${start[0].toFixed(1)} ${start[1].toFixed(1)} `;
    d += `Q ${cur[0].toFixed(1)} ${cur[1].toFixed(1)} ${end[0].toFixed(1)} ${end[1].toFixed(1)} `;
  }
  return d + "Z";
}

// 4-point sparkle centred at (cx,cy).
function sparklePath(cx: number, cy: number, r: number) {
  const k = r * 0.16; // control-point pull => concave sides
  return [
    `M ${cx} ${cy - r}`,
    `C ${cx + k} ${cy - k} ${cx + k} ${cy - k} ${cx + r} ${cy}`,
    `C ${cx + k} ${cy + k} ${cx + k} ${cy + k} ${cx} ${cy + r}`,
    `C ${cx - k} ${cy + k} ${cx - k} ${cy + k} ${cx - r} ${cy}`,
    `C ${cx - k} ${cy - k} ${cx - k} ${cy - k} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
}

// --- satellites -----------------------------------------------------------

type Satellite = {
  id: string;
  label: string;
  icon: typeof BookOpenText;
  dx: number;
  dy: number;
  delay: number;
};

const SATELLITES: Satellite[] = [
  { id: "knowledge", label: "Knowledge", icon: BookOpenText, dx: -138, dy: 108, delay: 0 },
  { id: "tool", label: "Add tool", icon: Grid2x2Plus, dx: -52, dy: 168, delay: 40 },
  { id: "mcp", label: "Add MCP", icon: Paperclip, dx: 52, dy: 168, delay: 80 },
  { id: "chat", label: "Chat", icon: MessageSquare, dx: 145, dy: 108, delay: 120 },
];

const SAT_SIZE = 56;

export type AgentWarning = { label: string; detail: string };

export type AgentNodeProps = {
  title?: string;
  subtitle?: string;
  /** Small grey chip next to the title (module index in Make). */
  count?: number;
  warnings?: AgentWarning[];
  onSatellite?: (id: string) => void;
  onAddModule?: (kind: "module" | "ai-module") => void;
  className?: string;
};

const DEFAULT_WARNINGS: AgentWarning[] = [
  { label: "Connection", detail: "Value must not be empty." },
  { label: "Input", detail: "Value must not be empty." },
];

export function AgentNode({
  title = "Make AI Agent",
  subtitle = "Run an agent",
  count = 2,
  warnings = DEFAULT_WARNINGS,
  onSatellite,
  onAddModule,
  className,
}: AgentNodeProps) {
  const [ignoreWarnings, setIgnoreWarnings] = useState(false);
  const HEX = 184; // svg box for the hexagon core
  const path = useMemo(() => hexPath(HEX, 84, 76, 17), []);
  const sparkle = useMemo(() => sparklePath(HEX / 2, HEX / 2 - 4, 26), []);

  return (
    <div className={cn("agent-node group relative select-none", className)}>
      <style>{AGENT_NODE_CSS}</style>

      {/* fan satellites — hidden until the node is hovered */}
      {SATELLITES.map((s) => {
        const pos = centered(s.dx, s.dy, SAT_SIZE);
        // collapse toward the hexagon centre when at rest
        const rest = `translate(${CX - (pos.left + SAT_SIZE / 2)}px, ${
          CY - (pos.top + SAT_SIZE / 2)
        }px) scale(0.3)`;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSatellite?.(s.id)}
            className="agent-sat absolute flex flex-col items-center gap-1.5"
            style={
              {
                left: pos.left,
                top: pos.top,
                width: SAT_SIZE,
                "--rest": rest,
                "--delay": `${s.delay}ms`,
              } as CSSProperties
            }
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-violet-200/70 text-violet-700 shadow-sm ring-1 ring-white/60 transition group-hover:bg-violet-200">
              <s.icon className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <span className="whitespace-nowrap text-sm font-semibold text-violet-700">
              {s.label}
            </span>
          </button>
        );
      })}

      {/* right connector: "add next module" */}
      <div
        className="agent-conn group/conn absolute"
        style={{ ...centered(86, 0, 52), width: 52, height: 52 }}
      >
        <button
          type="button"
          aria-label="Add module"
          className="grid h-[52px] w-[52px] place-items-center rounded-full text-white shadow-md transition-colors"
        >
          <Plus className="h-6 w-6" strokeWidth={2.4} />
        </button>
        {/* flyout */}
        <div className="agent-flyout absolute left-[68px] top-1/2 -translate-y-1/2 flex-col gap-2">
          {[
            { kind: "module" as const, label: "Add module", icon: Plus },
            { kind: "ai-module" as const, label: "Add AI module", icon: Sparkles },
          ].map((o) => (
            <button
              key={o.kind}
              type="button"
              onClick={() => onAddModule?.(o.kind)}
              className="flex items-center gap-3 whitespace-nowrap rounded-2xl bg-white py-2 pl-2 pr-5 text-base font-semibold text-foreground shadow-lg ring-1 ring-black/5 transition hover:bg-neutral-50"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700">
                <o.icon className="h-5 w-5" strokeWidth={2.4} />
              </span>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* hexagon core */}
      <div
        className="agent-hex absolute"
        style={{ left: CX - HEX / 2, top: CY - HEX / 2, width: HEX, height: HEX }}
      >
        <svg viewBox={`0 0 ${HEX} ${HEX}`} className="h-full w-full overflow-visible">
          <defs>
            <linearGradient id="agentHexGrad" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#a25cf4" />
              <stop offset="52%" stopColor="#8b2be6" />
              <stop offset="100%" stopColor="#a12fd0" />
            </linearGradient>
            <filter id="agentHexShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="10"
                floodColor="#7c1fd0"
                floodOpacity="0.28"
              />
            </filter>
          </defs>
          {/* lifted halo (grows on hover) */}
          <path className="agent-halo" d={path} fill="#c9a6f5" />
          <path d={path} fill="url(#agentHexGrad)" filter="url(#agentHexShadow)" />
          {/* thinking ring */}
          <g className="agent-ring" style={{ transformOrigin: `${HEX / 2}px ${HEX / 2 - 4}px` }}>
            <circle
              cx={HEX / 2}
              cy={HEX / 2 - 4}
              r={52}
              fill="none"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth={9}
            />
            <circle
              cx={HEX / 2}
              cy={HEX / 2 - 4}
              r={52}
              fill="none"
              stroke="rgba(255,255,255,0.92)"
              strokeWidth={9}
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 52 * 0.28} ${2 * Math.PI * 52}`}
            />
          </g>
          {/* sparkle */}
          <path d={sparkle} fill="#ffffff" />
        </svg>
      </div>

      {/* warning badge */}
      {warnings.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="agent-badge absolute z-20 grid place-items-center rounded-full bg-[#ce1512] text-sm font-bold text-white shadow-md ring-4 ring-[#f0f0f0] transition-transform hover:scale-105"
              style={{ ...centered(63, -73, 40), width: 40, height: 40 }}
              aria-label={`${warnings.length} warnings`}
            >
              {warnings.length}
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" side="top" className="w-80 rounded-2xl p-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <h4 className="text-sm font-semibold">Messages</h4>
              <span className="rounded-md bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700">
                Beta
              </span>
            </div>
            <p className="pt-3 text-sm font-semibold">{title}</p>
            <ul className="mt-2 space-y-2">
              {warnings.map((w) => (
                <li key={w.label} className="flex items-start gap-2 text-sm text-[#b3261e]">
                  <span aria-hidden className="mt-0.5">
                    ⚠
                  </span>
                  <span>
                    <span className="font-medium">{w.label}:</span> {w.detail}
                  </span>
                </li>
              ))}
            </ul>
            <label className="mt-4 flex items-center gap-2 border-t border-border/60 pt-3 text-sm text-muted-foreground">
              <Checkbox
                checked={ignoreWarnings}
                onCheckedChange={(v) => setIgnoreWarnings(v === true)}
              />
              Ignore warnings
            </label>
          </PopoverContent>
        </Popover>
      )}

      {/* animated clock (trigger / schedule indicator) — fades out on hover */}
      <div
        className="agent-clock absolute z-10"
        style={{ ...centered(-67, 65, 86), width: 86, height: 86 }}
        aria-hidden
      >
        <svg viewBox="0 0 86 86" className="h-full w-full">
          <defs>
            <linearGradient id="agentClockRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b761ea" />
              <stop offset="100%" stopColor="#8a2fce" />
            </linearGradient>
          </defs>
          <circle cx="43" cy="43" r="41" fill="#ffffff" />
          <circle
            cx="43"
            cy="43"
            r="38"
            fill="none"
            stroke="url(#agentClockRing)"
            strokeWidth="9"
          />
          <circle cx="43" cy="43" r="33" fill="#faf5ff" />
          {[0, 90, 180, 270].map((a) => {
            const rad = (Math.PI / 180) * a;
            return (
              <circle
                key={a}
                cx={43 + Math.cos(rad) * 25}
                cy={43 + Math.sin(rad) * 25}
                r="1.8"
                fill="#c79fe4"
              />
            );
          })}
          <g className="agent-clock-hour" style={{ transformOrigin: "43px 43px" }}>
            <rect x="41" y="26" width="4.2" height="19" rx="2.1" fill="#b153dd" />
          </g>
          <g className="agent-clock-min" style={{ transformOrigin: "43px 43px" }}>
            <rect x="41.4" y="20" width="3.4" height="25" rx="1.7" fill="#c45de0" />
          </g>
          <circle cx="43" cy="43" r="2.6" fill="#a03fd0" />
        </svg>
      </div>

      {/* bottom "+" that morphs into "×" while the fan is open */}
      <button
        type="button"
        aria-label="Add capability"
        className="agent-toggle absolute z-20 grid place-items-center rounded-full bg-[#8b3cf5] text-white shadow-md"
        style={{ ...centered(0, 97, 46), width: 46, height: 46 }}
      >
        <Plus className="agent-toggle-plus h-6 w-6" strokeWidth={2.6} />
        <X className="agent-toggle-x h-6 w-6" strokeWidth={2.6} />
      </button>

      {/* label — fades out on hover, like Make */}
      <div className="agent-label absolute left-0 right-0 text-center" style={{ top: CY + 122 }}>
        <div className="flex items-center justify-center gap-2">
          <span className="text-xl font-bold tracking-tight text-foreground">{title}</span>
          <span className="rounded-md bg-neutral-200/80 px-1.5 py-0.5 text-xs font-semibold text-neutral-600">
            {count}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

// Scoped animations + hover choreography. Kept in one place so the JSX above
// stays declarative; class names are prefixed `agent-` to avoid collisions.
const AGENT_NODE_CSS = `
.agent-node { width: 380px; height: 345px; }

/* hexagon lift on hover */
.agent-hex { transition: transform .3s cubic-bezier(.2,.8,.2,1); }
.agent-node:hover .agent-hex { transform: scale(1.03); }
.agent-halo { opacity: 0; transform-box: fill-box; transform-origin: center;
  transition: opacity .3s ease, transform .3s ease; }
.agent-node:hover .agent-halo { opacity: .55; transform: scale(1.06); }

/* thinking ring + clock hands keep animating */
.agent-ring { animation: agent-spin 3.2s linear infinite; }
.agent-clock-min { animation: agent-spin 4s linear infinite; }
.agent-clock-hour { animation: agent-spin 48s linear infinite; }
@keyframes agent-spin { to { transform: rotate(360deg); } }

/* clock + label recede while the fan is open */
.agent-clock, .agent-label {
  transition: opacity .25s ease, transform .25s ease; }
.agent-node:hover .agent-clock { opacity: 0; transform: scale(.6); }
.agent-node:hover .agent-label { opacity: 0; }

/* bottom +/× cross-fade */
.agent-toggle-plus, .agent-toggle-x {
  grid-area: 1 / 1; transition: opacity .2s ease, transform .25s ease; }
.agent-toggle-x { opacity: 0; transform: rotate(-90deg); }
.agent-node:hover .agent-toggle-plus { opacity: 0; transform: rotate(90deg); }
.agent-node:hover .agent-toggle-x { opacity: 1; transform: rotate(0deg); }

/* fan satellites spring out on hover */
.agent-sat {
  opacity: 0; transform: var(--rest);
  transform-origin: center;
  transition: opacity .28s ease, transform .34s cubic-bezier(.34,1.4,.5,1);
  transition-delay: 0ms; pointer-events: none; }
.agent-node:hover .agent-sat {
  opacity: 1; transform: none; transition-delay: var(--delay); pointer-events: auto; }

/* right connector: half-tucked behind the hexagon at rest, slides out + brightens on node hover */
.agent-conn > button { background: #c8a7f2; transform: translateX(0); opacity: .5;
  transition: background .25s ease, transform .3s ease, opacity .25s ease; }
.agent-node:hover .agent-conn > button { transform: translateX(20px); opacity: 1; background: #a855f7; }
.agent-conn:hover > button { background: #9333ea; }
.agent-flyout { display: none; }
.agent-conn:hover .agent-flyout { display: flex; }
`;

export default AgentNode;
