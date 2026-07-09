import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HelpCircle, Menu, Search, Settings, Sparkles } from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AgentNode } from "@/components/agent-node";

export const Route = createFileRoute("/agent")({
  head: () => ({
    meta: [
      { title: "Agent" },
      {
        name: "description",
        content: "Design and run your AI agent on the canvas.",
      },
      { property: "og:title", content: "Agent" },
      { property: "og:description", content: "Design and run your AI agent on the canvas." },
    ],
    links: [{ rel: "canonical", href: "/agent" }],
  }),
  component: AgentPage,
});

function AgentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[hsl(0,0%,94%)] text-foreground">
      <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Toggle menu"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/agent" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Agent</span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Settings">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>
          <PlaygroundHeaderButton />
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <div className="mb-1 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Canvas
            </div>
            <nav className="space-y-1">
              <span className="flex w-full items-center gap-3 rounded-full bg-violet-100 px-3 py-2 text-sm text-violet-900">
                <Sparkles className="h-5 w-5 shrink-0" />
                <span className="flex-1 truncate text-left">Agent</span>
              </span>
            </nav>
          </aside>
        )}

        <main className="grid min-w-0 flex-1 place-items-center px-4 pb-16">
          {/* Make-style dotted canvas */}
          <div
            className="grid min-h-[calc(100vh-140px)] w-full place-items-center rounded-3xl"
            style={{
              backgroundColor: "hsl(0,0%,94%)",
              backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1.4px, transparent 1.4px)",
              backgroundSize: "22px 22px",
            }}
          >
            <AgentNode
              title="Make AI Agent"
              subtitle="Run an agent"
              count={2}
              onSatellite={(id) => toast.info(`Open: ${id}`)}
              onAddModule={(kind) =>
                toast.info(kind === "ai-module" ? "Add AI module" : "Add module")
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
}
