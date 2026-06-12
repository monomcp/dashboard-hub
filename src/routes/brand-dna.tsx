import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Settings,
  Dna,
  Link2,
  Upload,
  Pencil,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppsMenu } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/brand-dna")({
  head: () => ({
    meta: [
      { title: "Brand DNA — My Business" },
      {
        name: "description",
        content: "Your brand identity: logo, fonts, colors, voice and imagery.",
      },
      { property: "og:title", content: "Brand DNA — My Business" },
      {
        property: "og:description",
        content: "Your brand identity: logo, fonts, colors, voice and imagery.",
      },
    ],
    links: [{ rel: "canonical", href: "/brand-dna" }],
  }),
  component: BrandDnaPage,
});

type BrandView = "dna" | "tov";

const NAV = [
  { id: "dna", label: "Brand DNA", icon: Dna },
  { id: "tov", label: "ToV", icon: MessageSquareQuote },
] satisfies { id: BrandView; label: string; icon: typeof Dna }[];

const BRAND = {
  name: "Banza",
  website: "eatbanza.com",
  fonts: [
    { name: "Mozza", className: "font-extrabold" },
    { name: "Rotini Regular", className: "font-normal" },
  ],
  colors: ["#E5542E", "#1F6949", "#A6A6A6", "#000000", "#FFFFFF"],
  oneLiner: "All your favorite comfort foods, made from chickpeas.",
  values: ["Health conscious", "Performance", "Comfort food", "Accessible nutrition"],
  audience: [
    "Health-minded home cooks",
    "Busy parents upgrading family staples",
    "Athletes seeking high-protein swaps",
    "Gluten-free eaters",
  ],
  about:
    "Banza makes beloved comfort foods — pasta, rice, mac & cheese, and pizza — out of chickpeas, delivering more protein and fiber with fewer net carbs. The brand pairs playful, food-first energy with a mission to make nutritious eating easy and delicious.",
  toneTraits: [
    {
      name: "Playful",
      description: "Light, witty and food-pun friendly. Never takes itself too seriously.",
    },
    {
      name: "Confident",
      description: "States benefits plainly — more protein, more fiber — without hedging.",
    },
    {
      name: "Warm & inclusive",
      description: "Talks like a friend at the dinner table. Everyone is invited, no diet guilt.",
    },
    {
      name: "Simple & direct",
      description: "Short sentences, everyday words, zero nutrition jargon.",
    },
  ],
  examplePhrases: [
    "Pasta night, upgraded.",
    "All the comfort. More of the good stuff.",
    "Chickpeas, but make it dinner.",
  ],
};

const IMAGE_TILES = [
  { label: "Banza", tone: "bg-[#4a5138]" },
  { label: "Fusilli plate", tone: "bg-[#7a4a32]" },
  { label: "Blue plate", tone: "bg-[#3c5a6e]" },
  { label: "Penne box", tone: "bg-[#b1502e]" },
  { label: "Rotini bowl", tone: "bg-[#5d6442]" },
  { label: "Penne plate", tone: "bg-[#6e5a3c]" },
];

const card = "rounded-3xl bg-[#33362a] p-6 ring-1 ring-white/5";
const cardTitle = "text-sm font-medium text-[#e8eadb]";

function BrandDnaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [view, setView] = useState<BrandView>("dna");

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

        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
          <section className="rounded-[2rem] bg-[#272a1f] p-4 shadow-sm ring-1 ring-white/5 sm:p-6">
            {view === "dna" ? <DnaBoard /> : <ToneOfVoice />}
          </section>
        </main>
      </div>
    </div>
  );
}

function DnaBoard() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
      <div className="grid content-start gap-4">
        {/* Name + website */}
        <div className={card}>
          <h1 className="text-4xl font-normal tracking-tight text-white">{BRAND.name}</h1>
          <a
            href={`https://${BRAND.website}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-[#c4c8b0] hover:text-white hover:underline"
          >
            <Link2 className="h-4 w-4" /> {BRAND.website}
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
          {/* Logo */}
          <div className="grid place-items-center rounded-3xl bg-[#f6f4ea] p-6">
            <span className="text-3xl font-black tracking-tight text-[#1f2118]">Banza</span>
          </div>
          {/* Fonts */}
          <div className={card}>
            <h2 className={cardTitle}>Fonts</h2>
            <div className="mt-4 flex items-end gap-12">
              {BRAND.fonts.map((font) => (
                <div key={font.name} className="text-center">
                  <div className={cn("text-4xl text-[#cfe09a]", font.className)}>Aa</div>
                  <div className="mt-2 text-sm text-[#e8eadb]/80">{font.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className={card}>
          <h2 className={cardTitle}>Colors</h2>
          <div className="mt-4 flex flex-wrap gap-8">
            {BRAND.colors.map((hex) => (
              <div key={hex} className="text-center">
                <div
                  className="h-16 w-16 rounded-full ring-1 ring-white/10"
                  style={{ backgroundColor: hex }}
                />
                <div className="mt-2 text-xs text-[#c4c8b0]">{hex}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* One liner */}
          <div className={card}>
            <div className="flex items-center justify-between">
              <h2 className={cardTitle}>One liner</h2>
              <Pencil className="h-4 w-4 text-[#c4c8b0]/60" />
            </div>
            <p className="mt-3 font-serif text-lg italic text-[#e8eadb]">{BRAND.oneLiner}</p>
          </div>
          {/* Brand values */}
          <div className={card}>
            <h2 className={cardTitle}>Brand values</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {BRAND.values.map((value) => (
                <span
                  key={value}
                  className="rounded-full bg-[#454935] px-3 py-1 text-xs text-[#e8eadb]"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Tone of voice */}
          <div className={card}>
            <h2 className={cardTitle}>Tone of voice</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {BRAND.toneTraits.map((trait) => (
                <span
                  key={trait.name}
                  className="rounded-full bg-[#454935] px-3 py-1 text-xs text-[#e8eadb]"
                >
                  {trait.name}
                </span>
              ))}
            </div>
          </div>
          {/* Target audience */}
          <div className={card}>
            <h2 className={cardTitle}>Target audience</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-[#e8eadb]/85">
              {BRAND.audience.map((segment) => (
                <li key={segment} className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#cfe09a]" />
                  {segment}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* About */}
        <div className={card}>
          <h2 className={cardTitle}>About the business</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#e8eadb]/85">{BRAND.about}</p>
        </div>
      </div>

      {/* Images */}
      <div className="rounded-3xl bg-[#2d3024] p-5 ring-1 ring-white/5">
        <h2 className={cardTitle}>Images</h2>
        <button className="mt-4 grid w-full place-items-center gap-2 rounded-2xl bg-[#4d5538] py-12 text-sm text-[#e8eadb] transition hover:bg-[#586141]">
          <Upload className="h-5 w-5" />
          Upload an image
        </button>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {IMAGE_TILES.map((tile) => (
            <div
              key={tile.label}
              className={cn(
                "grid aspect-square place-items-center rounded-2xl text-center text-xs text-white/80",
                tile.tone,
              )}
            >
              {tile.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToneOfVoice() {
  return (
    <div className="grid content-start gap-4">
      <div className={card}>
        <h1 className="text-2xl font-normal tracking-tight text-white">Tone of voice</h1>
        <p className="mt-2 text-sm text-[#c4c8b0]">
          How {BRAND.name} sounds across every channel.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {BRAND.toneTraits.map((trait) => (
          <div key={trait.name} className={card}>
            <h2 className="text-base font-medium text-[#cfe09a]">{trait.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#e8eadb]/85">{trait.description}</p>
          </div>
        ))}
      </div>
      <div className={card}>
        <h2 className={cardTitle}>Example phrases</h2>
        <div className="mt-3 space-y-2">
          {BRAND.examplePhrases.map((phrase) => (
            <p key={phrase} className="font-serif text-lg italic text-[#e8eadb]">
              “{phrase}”
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
