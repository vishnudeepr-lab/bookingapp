import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (dateStr: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initialDate = selectedDate ? new Date(`${selectedDate}T00:00:00`) : new Date();
  const [currentYear, setCurrentYear] = useState<number>(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(initialDate.getMonth());

  const formatYmd = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const todayStr = formatYmd(today);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const isPastMonth =
    currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth <= today.getMonth());

  const handleQuickJump = (daysAhead: number) => {
    const target = new Date(today);
    target.setDate(today.getDate() + daysAhead);
    setCurrentYear(target.getFullYear());
    setCurrentMonth(target.getMonth());
    onSelectDate(formatYmd(target));
  };

  const handleJumpToWeekend = () => {
    const target = new Date(today);
    const dayOfWeek = target.getDay();
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    const addDays = daysUntilSaturday === 0 ? 7 : daysUntilSaturday;
    target.setDate(today.getDate() + addDays);
    setCurrentYear(target.getFullYear());
    setCurrentMonth(target.getMonth());
    onSelectDate(formatYmd(target));
  };

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-stone-800" />
            <h3 className="text-base font-semibold text-stone-900 tracking-tight">
              Select Appointment Date
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Reservations open up to 60 days ahead
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => handleQuickJump(0)}
            className="px-2.5 py-1 text-[11px] font-medium rounded-md border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => handleQuickJump(1)}
            className="px-2.5 py-1 text-[11px] font-medium rounded-md border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            Tomorrow
          </button>
          <button
            type="button"
            onClick={handleJumpToWeekend}
            className="px-2.5 py-1 text-[11px] font-medium rounded-md border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            This Weekend
          </button>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between py-2 border-b border-stone-100">
        <h4 className="text-sm font-semibold text-stone-900">
          {monthNames[currentMonth]} {currentYear}
        </h4>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            disabled={isPastMonth}
            aria-label="Previous month"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center py-2 text-xs font-medium text-stone-400">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-9 w-full" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const dayNumber = index + 1;
          const dayDate = new Date(currentYear, currentMonth, dayNumber);
          dayDate.setHours(0, 0, 0, 0);

          const dayStr = formatYmd(dayDate);
          const isPast = dayDate < today;
          const isSelected = selectedDate === dayStr;
          const isToday = dayStr === todayStr;

          return (
            <button
              key={dayStr}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(dayStr)}
              className={`group relative flex h-9 w-full items-center justify-center rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-stone-900 text-white font-semibold shadow-xs ring-1 ring-stone-900'
                  : isPast
                  ? 'text-stone-300 cursor-not-allowed hover:bg-transparent'
                  : 'text-stone-800 hover:bg-amber-50/70 hover:text-stone-900'
              }`}
            >
              <span className="tabular-nums">{dayNumber}</span>
              {isToday && !isSelected && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-amber-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
