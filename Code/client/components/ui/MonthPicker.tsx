import React from "react";
import { CalendarDays, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type MonthPickerProps = {
  id?: string;
  name?: string;
  value?: string | null; // format YYYY-MM
  onChange?: (value: string | null) => void;
  disabled?: boolean;
  ariaInvalid?: boolean;
  className?: string;
};

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

function parseValue(value?: string | null) {
  if (!value) return { year: "", month: "" };
  const [year, month] = value.split("-");
  return { year: year ?? "", month: month ?? "" };
}

export default function MonthPicker({ id, name, value, onChange, disabled, ariaInvalid, className }: MonthPickerProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 60 }, (_, i) => String(currentYear - 50 + i));

  const { year, month } = parseValue(value);

  const handleMonthChange = (nextMonth: string | null, _details?: unknown) => {
    const newMonth = nextMonth || "";
    if (!newMonth || !year) {
      onChange?.(null);
      return;
    }
    onChange?.(`${year}-${newMonth}`);
  };

  const handleYearChange = (nextYear: string | null, _details?: unknown) => {
    const newYear = nextYear || "";
    if (!newYear || !month) {
      onChange?.(null);
      return;
    }
    onChange?.(`${newYear}-${month}`);
  };

  const hasValue = Boolean(year && month);
  const selectedMonthLabel = month
    ? new Date(0, Number(month) - 1).toLocaleString(undefined, { month: "short" })
    : null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={month || undefined} onValueChange={handleMonthChange} disabled={disabled}>
          <SelectTrigger
            id={id ? `${id}-month` : undefined}
            data-field-name={name}
            aria-invalid={ariaInvalid}
            className="h-8 w-[7.5rem] bg-transparent px-2.5"
          >
            <CalendarDays className="size-3.5 text-muted-foreground" />
            <span className={cn("truncate text-left", !selectedMonthLabel && "text-muted-foreground")}>
              {selectedMonthLabel ?? "Month"}
            </span>
          </SelectTrigger>
          <SelectContent>
            {months.map((monthValue, index) => (
              <SelectItem key={monthValue} value={monthValue}>
                {new Date(0, index).toLocaleString(undefined, { month: "short" })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={year || undefined} onValueChange={handleYearChange} disabled={disabled}>
          <SelectTrigger
            id={id ? `${id}-year` : undefined}
            aria-invalid={ariaInvalid}
            className="h-8 w-[6rem] bg-transparent px-2.5"
          >
            <span className={cn("truncate text-left", !year && "text-muted-foreground")}>
              {year || "Year"}
            </span>
          </SelectTrigger>
          <SelectContent>
            {years.map((yearValue) => (
              <SelectItem key={yearValue} value={yearValue}>
                {yearValue}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasValue ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={disabled}
          onClick={() => onChange?.(null)}
          className="shrink-0 text-muted-foreground"
        >
          <RotateCcw className="size-3.5" />
        </Button>
      ) : null}
    </div>
  );
}
