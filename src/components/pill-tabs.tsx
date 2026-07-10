import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PillTabItem {
  id: string;
  label: string;
  badge?: string;
  disabled?: boolean;
}

type PillTabsProps<T extends PillTabItem> = {
  tabs: T[];
  activeId: string;
  className?: string;
  variant?: "default" | "raised";
  ariaLabel?: string;
} & (
  | { onSelect: (id: string) => void; renderTab?: never }
  | { renderTab: (tab: T, active: boolean) => ReactNode; onSelect?: never }
);

export function PillTabs<T extends PillTabItem>({
  tabs,
  activeId,
  className,
  onSelect,
  renderTab,
  variant = "default",
  ariaLabel,
}: PillTabsProps<T>) {
  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeId),
  );
  const isRaised = variant === "raised";

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentId: string) => {
    if (!onSelect) return;

    const enabledTabs = tabs.filter((tab) => !tab.disabled);
    const currentIndex = enabledTabs.findIndex((tab) => tab.id === currentId);
    let nextIndex: number | undefined;

    if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
    } else if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % enabledTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = enabledTabs.length - 1;
    }

    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextTab = enabledTabs[nextIndex];
    onSelect(nextTab.id);

    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      "button[data-pill-tab-id]",
    );
    Array.from(buttons ?? [])
      .find((button) => button.dataset.pillTabId === nextTab.id)
      ?.focus();
  };

  const indicatorWidth = isRaised
    ? `calc((100% / ${tabs.length}) + 8px)`
    : `calc((100% - 8px) / ${tabs.length})`;
  const indicatorLeft =
    isRaised && tabs.length > 1
      ? `calc(${(activeIndex * 100) / tabs.length}% - ${(activeIndex * 8) / (tabs.length - 1)}px)`
      : undefined;

  return (
    <div
      className={cn(
        "relative inline-grid rounded-full",
        isRaised ? "h-9 bg-[#f4f4f4]" : "overflow-hidden bg-muted/70 p-1",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      role={onSelect ? "tablist" : undefined}
      aria-label={onSelect ? ariaLabel : undefined}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute rounded-full bg-white transition-[left,transform,width] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none",
          isRaised
            ? "-inset-y-0.5 border border-[#e5e5e5] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_4px_14px_rgb(0_0_0/0.06)]"
            : "inset-y-1 left-1 shadow-sm",
        )}
        style={{
          width: indicatorWidth,
          ...(isRaised
            ? { left: indicatorLeft }
            : { transform: `translateX(${activeIndex * 100}%)` }),
        }}
      />
      {tabs.map((tab, tabIndex) =>
        renderTab ? (
          <div key={tab.id} className="relative z-10">
            {renderTab(tab, tab.id === activeId)}
          </div>
        ) : (
          <button
            key={tab.id}
            type="button"
            onClick={() => !tab.disabled && onSelect(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, tab.id)}
            data-pill-tab-id={tab.id}
            role="tab"
            aria-selected={tab.id === activeId}
            aria-disabled={tab.disabled || undefined}
            disabled={tab.disabled}
            tabIndex={tab.id === activeId ? 0 : -1}
            style={
              isRaised && tabs.length > 1
                ? {
                    transform: `translateX(${((tabs.length - 1 - tabIndex * 2) * 4) / (tabs.length - 1)}px)`,
                  }
                : undefined
            }
            className={cn(
              "relative z-10 flex items-center justify-center gap-1.5 rounded-full text-sm transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2",
              isRaised ? "px-4 py-1 font-normal" : "px-5 py-1.5",
              tab.id === activeId ? "text-foreground" : "text-foreground/60 hover:text-foreground",
              tab.disabled && "cursor-not-allowed hover:text-foreground/60",
            )}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[10px] font-medium leading-none text-foreground/50 shadow-sm">
                {tab.badge}
              </span>
            )}
          </button>
        ),
      )}
    </div>
  );
}
