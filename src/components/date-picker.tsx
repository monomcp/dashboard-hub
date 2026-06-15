import { useState } from "react";
import { format, parse, isValid } from "date-fns";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  /** Value as an ISO date string (yyyy-MM-dd), or "" when unset. */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

function toDate(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parse(value, "yyyy-MM-dd", new Date());
  return isValid(parsed) ? parsed : undefined;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const selected = toDate(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-10 w-full justify-start gap-2 rounded-lg bg-stone-100 px-3 font-normal hover:bg-stone-200/70",
            !selected && "text-muted-foreground",
            className,
          )}
        >
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          {selected ? format(selected, "EEE, MMM d, yyyy") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto rounded-2xl p-2 shadow-lg">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          onSelect={(date) => {
            if (date) onChange(format(date, "yyyy-MM-dd"));
            setOpen(false);
          }}
          autoFocus
          classNames={{
            today: "rounded-md font-medium text-sky-600",
          }}
          className="[--cell-size:2.25rem] [&_[data-selected-single=true]]:bg-sky-600 [&_[data-selected-single=true]]:text-white [&_[data-selected-single=true]]:hover:bg-sky-700"
        />
        <div className="flex items-center justify-between px-1 pb-1 pt-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-full px-3 text-sm text-sky-600 hover:bg-sky-50 hover:text-sky-700"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
          >
            Clear
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-full px-3 text-sm text-sky-600 hover:bg-sky-50 hover:text-sky-700"
            onClick={() => {
              onChange(format(new Date(), "yyyy-MM-dd"));
              setOpen(false);
            }}
          >
            Today
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
