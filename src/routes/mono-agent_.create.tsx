import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, HelpCircle, Settings, Bot, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mono-agent_/create")({
  head: () => ({
    meta: [
      { title: "Create automation — Mono Agent" },
      {
        name: "description",
        content: "Create a recurring or event-triggered automation for the Mono Agent.",
      },
      { property: "og:title", content: "Create automation — Mono Agent" },
      {
        property: "og:description",
        content: "Create a recurring or event-triggered automation for the Mono Agent.",
      },
    ],
    links: [{ rel: "canonical", href: "/mono-agent/create" }],
  }),
  component: CreateAutomationPage,
});

type WhenToRun = "once" | "schedule" | "event";
type Frequency = "Hourly" | "Daily" | "Weekly" | "Monthly";
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
type Day = (typeof DAYS)[number];

function CreateAutomationPage() {
  const navigate = useNavigate();

  const [instructions, setInstructions] = useState("");
  const [when, setWhen] = useState<WhenToRun>("schedule");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("Weekly");
  const [every, setEvery] = useState(1);
  const [day, setDay] = useState<Day>("Mon");
  const [time, setTime] = useState("08:00");
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");
  const [tz, setTz] = useState("Europe/Kiev (UTC+03:00)");
  const [priority, setPriority] = useState<"Low" | "Normal" | "High">("Normal");

  const canSubmit = instructions.trim().length > 0 && name.trim().length > 0;

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/mono-agent" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-600 via-indigo-500 to-sky-500 shadow-sm">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Mono Agent</span>
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
          <PlaygroundHeaderButton /><AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 pb-16 md:px-6">
        <nav className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
          <Link to="/mono-agent/automations" className="text-violet-700 hover:underline">
            Automations
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>Create automation</span>
        </nav>
        <h1 className="mb-6 text-3xl font-semibold tracking-tight">Create automation</h1>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canSubmit) return;
            navigate({ to: "/mono-agent/automations" });
          }}
        >
          <Section title="Instructions">
            <p className="mb-2 text-sm text-muted-foreground">
              Describe in detail what you want the Mono Agent to do. Be specific about scope,
              inputs, time ranges, and desired output format.
            </p>
            <Textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Analyze my top 3 cost drivers for the past 7 days across all linked accounts. Include a breakdown by service and highlight any anomalies compared to the previous period."
              className="min-h-32 resize-y bg-background"
            />
          </Section>

          <Section title="When to run">
            <div className="space-y-3">
              {(
                [
                  {
                    id: "once",
                    title: "Run once",
                    desc: "Execute immediately as a one-time task",
                  },
                  {
                    id: "schedule",
                    title: "Run on a schedule",
                    desc: "Repeat on a recurring schedule (e.g. every Monday at 8 AM)",
                  },
                  {
                    id: "event",
                    title: "Run when an event occurs",
                    desc: "Trigger automatically when a matching event is detected",
                  },
                ] as { id: WhenToRun; title: string; desc: string }[]
              ).map((o) => (
                <label
                  key={o.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition",
                    when === o.id
                      ? "border-violet-400 bg-violet-50/60"
                      : "border-transparent hover:bg-[hsl(220,33%,97%)]",
                  )}
                >
                  <input
                    type="radio"
                    name="when"
                    checked={when === o.id}
                    onChange={() => setWhen(o.id)}
                    className="mt-1 h-4 w-4 accent-violet-600"
                  />
                  <div>
                    <div className="text-sm font-medium">{o.title}</div>
                    <div className="text-sm text-muted-foreground">{o.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-5 grid gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Weekly cost report for VP of Engineering"
                />
                <p className="text-xs text-muted-foreground">
                  A short descriptive name for this automation
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description"
                />
              </div>
            </div>
          </Section>

          {when === "schedule" && (
            <Section title="Schedule">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Frequency</Label>
                  <Select value={frequency} onValueChange={(v) => setFrequency(v as Frequency)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(["Hourly", "Daily", "Weekly", "Monthly"] as Frequency[]).map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="every">Every</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="every"
                      type="number"
                      min={1}
                      value={every}
                      onChange={(e) => setEvery(Math.max(1, Number(e.target.value) || 1))}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">
                      {frequency === "Hourly"
                        ? "hour(s)"
                        : frequency === "Daily"
                          ? "day(s)"
                          : frequency === "Weekly"
                            ? "week(s)"
                            : "month(s)"}
                    </span>
                  </div>
                </div>
              </div>

              {frequency === "Weekly" && (
                <div className="mt-4 space-y-2">
                  <Label>Delivery day</Label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((d) => {
                      const active = d === day;
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDay(d)}
                          className={cn(
                            "rounded-full border px-4 py-1.5 text-sm font-medium transition",
                            active
                              ? "border-violet-500 bg-violet-600 text-white"
                              : "border-violet-300 text-violet-700 hover:bg-violet-50",
                          )}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <Label>Delivery time</Label>
                <p className="text-xs text-muted-foreground">
                  Time is converted to UTC before scheduling. Schedules may shift by one hour during
                  daylight saving transitions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-32"
                  />
                  <Select value={ampm} onValueChange={(v) => setAmpm(v as "AM" | "PM")}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={tz} onValueChange={setTz}>
                    <SelectTrigger className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Europe/Kiev (UTC+03:00)",
                        "Europe/London (UTC+00:00)",
                        "America/New_York (UTC-05:00)",
                        "America/Los_Angeles (UTC-08:00)",
                        "Asia/Tokyo (UTC+09:00)",
                      ].map((z) => (
                        <SelectItem key={z} value={z}>
                          {z}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Section>
          )}

          <Section title="Additional settings">
            <div className="max-w-sm space-y-1.5">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Section>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => navigate({ to: "/mono-agent/automations" })}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full bg-violet-600 hover:bg-violet-700"
              disabled={!canSubmit}
            >
              Create automation
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}
