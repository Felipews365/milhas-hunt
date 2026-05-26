"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import {
  format, parseISO, isValid, startOfMonth, addMonths, subMonths,
  getDaysInMonth, getDay, isBefore, startOfDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  id?: string;
  className?: string;
  placeholder?: string;
};

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function DatePickerInput({ value, onChange, min, id, className, placeholder = "Selecione a data" }: Props) {
  const [open, setOpen] = useState(false);
  const parsed = value && isValid(parseISO(value)) ? parseISO(value) : undefined;
  const minDate = startOfDay(min ? parseISO(min) : new Date());
  const [viewMonth, setViewMonth] = useState<Date>(() => parsed ?? minDate);

  function handleSelect(day: Date) {
    onChange(format(day, "yyyy-MM-dd"));
    setOpen(false);
  }

  const firstOfMonth = startOfMonth(viewMonth);
  const startWeekday = getDay(firstOfMonth);
  const daysInMonth = getDaysInMonth(viewMonth);

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          id={id}
          type="button"
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-md border bg-white px-3 text-sm transition focus:outline-none",
            open ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-200 hover:border-slate-300",
            parsed ? "text-slate-900" : "text-slate-400",
            className
          )}
        >
          <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="flex-1 text-left">
            {parsed
              ? format(parsed, "dd 'de' MMM 'de' yyyy", { locale: ptBR })
              : placeholder}
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          align="start"
          className="z-50 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xl outline-none text-slate-900"
        >
          {/* Month nav */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewMonth((m) => subMonths(m, 1))}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold text-slate-900 capitalize">
              {format(viewMonth, "MMMM yyyy", { locale: ptBR })}
            </span>
            <button
              type="button"
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="mb-1 grid grid-cols-7 text-center">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-1 text-xs font-medium text-slate-400">{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, i) => {
              if (!day) return <div key={`e-${i}`} />;

              const dateStr = format(day, "yyyy-MM-dd");
              const isSelected = parsed && dateStr === format(parsed, "yyyy-MM-dd");
              const isDisabled = isBefore(day, minDate);
              const isToday = dateStr === format(new Date(), "yyyy-MM-dd");

              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelect(day)}
                  className={cn(
                    "mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                    isSelected
                      ? "bg-blue-600 text-white font-semibold"
                      : isToday
                      ? "font-bold text-blue-600 hover:bg-blue-50"
                      : isDisabled
                      ? "cursor-not-allowed text-slate-300"
                      : "text-slate-800 hover:bg-blue-50 hover:text-blue-700"
                  )}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
