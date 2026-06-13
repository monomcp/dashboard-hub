import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type BrandFont, ensureGoogleFonts, fontStack, loadFontCatalog } from "@/lib/fonts";
import { cn } from "@/lib/utils";

// A searchable font dropdown for the Brand DNA visual identity. Options come
// from the backend font catalog and each one is rendered in its own typeface.
export function FontPicker({
  id,
  value,
  onChange,
  placeholder = "Select a font",
}: {
  id?: string;
  value: string;
  onChange: (family: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [catalog, setCatalog] = useState<BrandFont[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Lazily fetch the catalog the first time the picker is opened.
  useEffect(() => {
    if (!open || catalog.length || loading) return;
    setLoading(true);
    setError(false);
    loadFontCatalog()
      .then(setCatalog)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [open, catalog.length, loading]);

  // Render every option in its own typeface: pull all families in one request.
  useEffect(() => {
    if (catalog.length)
      ensureGoogleFonts(
        catalog.map((f) => f.family),
        "catalog",
      );
  }, [catalog]);

  // Keep the current value in its own font even before the catalog loads
  // (e.g. a family persisted from a previous session).
  useEffect(() => {
    if (value) ensureGoogleFonts([value], "selected");
  }, [value]);

  const select = (family: string) => {
    onChange(family);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          className="flex h-10 w-full items-center justify-between gap-2 rounded-md border border-white/10 bg-[#202318] px-3 text-sm text-[#e8eadb] transition hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cfe09a]/40"
        >
          <span
            className={cn("truncate", !value && "text-[#c4c8b0]/45")}
            style={value ? { fontFamily: fontStack(value) } : undefined}
          >
            {value || placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] border-white/10 bg-[#202318] p-0 text-[#e8eadb]"
      >
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search fonts…"
            className="text-[#e8eadb] placeholder:text-[#c4c8b0]/45"
          />
          <CommandList>
            {loading && (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-[#c4c8b0]">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading fonts…
              </div>
            )}
            {error && (
              <div className="py-6 text-center text-sm text-rose-200">Could not load fonts.</div>
            )}
            {!loading && !error && <CommandEmpty>No fonts found.</CommandEmpty>}
            {value && !loading && (
              <CommandItem
                value="clear current font selection none"
                onSelect={() => select("")}
                className="gap-2 text-[#c4c8b0] data-[selected=true]:bg-white/10"
              >
                <X className="h-4 w-4" /> Clear selection
              </CommandItem>
            )}
            {catalog.map((font) => (
              <CommandItem
                key={font.id}
                value={font.family}
                onSelect={() => select(font.family)}
                className="flex items-center justify-between gap-3 text-[#e8eadb] data-[selected=true]:bg-white/10"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Check
                    className={cn(
                      "h-4 w-4 shrink-0 text-[#cfe09a]",
                      value === font.family ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span
                    className="truncate text-base"
                    style={{ fontFamily: fontStack(font.family) }}
                  >
                    {font.family}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-[#c4c8b0]/70">{font.category}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
