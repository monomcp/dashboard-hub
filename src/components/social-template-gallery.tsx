import { AtSign, Instagram, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

type Template = {
  id: string;
  name: string;
  size: string;
  aspectClass: string;
  Icon: typeof Instagram;
  accentClass: string;
};

const TEMPLATES: Template[] = [
  {
    id: "instagram",
    name: "Instagram",
    size: "Square",
    aspectClass: "aspect-square",
    Icon: Instagram,
    accentClass: "from-rose-500 to-amber-400",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    size: "Feed",
    aspectClass: "aspect-[1.91/1]",
    Icon: Linkedin,
    accentClass: "from-sky-600 to-cyan-500",
  },
  {
    id: "threads",
    name: "Threads",
    size: "Portrait",
    aspectClass: "aspect-[4/5]",
    Icon: AtSign,
    accentClass: "from-zinc-900 to-zinc-600",
  },
  {
    id: "twitter",
    name: "Twitter",
    size: "Landscape",
    aspectClass: "aspect-video",
    Icon: Twitter,
    accentClass: "from-blue-500 to-sky-400",
  },
];

function ClaudeMark() {
  return (
    <div className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-[#dd6846] shadow-sm sm:size-16">
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="absolute h-1.5 w-8 rounded-full bg-white sm:w-9"
          style={{ transform: `rotate(${index * 15}deg)` }}
        />
      ))}
      <span className="relative size-3 rounded-full bg-white" />
    </div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-black/5 px-3 py-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "grid size-7 place-items-center rounded-md bg-gradient-to-br text-white",
              template.accentClass,
            )}
          >
            <template.Icon className="size-4" />
          </span>
          <div>
            <h3 className="text-sm font-medium leading-tight">{template.name}</h3>
            <p className="text-xs text-muted-foreground">{template.size}</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">/monomcp</span>
      </div>

      <div className="bg-[hsl(220,33%,97%)] p-3">
        <div
          className={cn(
            "relative mx-auto w-full max-w-[360px] overflow-hidden rounded-lg border border-black/10 bg-[#fbf7f1] shadow-[0_14px_35px_rgba(15,23,42,0.12)]",
            template.aspectClass,
          )}
        >
          <div className="absolute left-3 top-3 flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="flex h-full items-center justify-center gap-4 px-6 pt-5">
            <ClaudeMark />
            <span className="min-w-0 text-[clamp(1.75rem,7vw,3.25rem)] font-semibold leading-none tracking-normal text-black">
              /monomcp
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function SocialTemplateGallery() {
  return (
    <section className="mb-6">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-medium">Social templates</h2>
          <p className="text-sm text-muted-foreground">
            Claude icon lockup with /monomcp for each channel format.
          </p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {TEMPLATES.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}
