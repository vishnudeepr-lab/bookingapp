import React from 'react';
import { TimeSlot, SlotPeriod } from '../types/booking';
import { Clock, Sun, Sunrise, Sunset, Flame } from 'lucide-react';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
  selectedDateStr: string;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  slots,
  selectedSlot,
  onSelectSlot,
  selectedDateStr,
}) => {
  const formattedDate = React.useMemo(() => {
    if (!selectedDateStr) return '';
    const [year, month, day] = selectedDateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }, [selectedDateStr]);

  const periods: Array<{
    period: SlotPeriod;
    label: string;
    hindiLabel: string;
    sublabel: string;
    icon: React.ReactNode;
  }> = [
    {
      period: 'morning',
      label: 'Morning',
      hindiLabel: 'प्रातः',
      sublabel: '08:30 AM – 12:00 PM',
      icon: <Sunrise className="h-4 w-4 text-amber-500" />,
    },
    {
      period: 'afternoon',
      label: 'Afternoon',
      hindiLabel: 'मध्याह्न',
      sublabel: '01:30 PM – 05:30 PM',
      icon: <Sun className="h-4 w-4 text-orange-500" />,
    },
    {
      period: 'evening',
      label: 'Evening',
      hindiLabel: 'संध्या',
      sublabel: '06:00 PM – 09:00 PM',
      icon: <Sunset className="h-4 w-4 text-rose-500" />,
    },
  ];

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-stone-800" />
            <h3 className="text-base font-semibold text-stone-900 tracking-tight">
              Select Time Slot
            </h3>
            <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
              IST (GMT+5:30)
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time availability for <span className="font-semibold text-stone-800">{formattedDate}</span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {periods.map(({ period, label, hindiLabel, sublabel, icon }) => {
          const periodSlots = slots.filter((s) => s.period === period);
          if (periodSlots.length === 0) return null;

          return (
            <div key={period} className="space-y-2">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-stone-100">
                <div className="flex items-center gap-1.5 font-medium text-stone-800">
                  {icon}
                  <span>{label}</span>
                  <span className="text-[10px] text-stone-400 font-serif">({hindiLabel})</span>
                </div>
                <span className="text-[11px] text-stone-400 font-mono">
                  {sublabel}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {periodSlots.map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;
                  const isBooked = slot.status === 'booked';
                  const isScarce = slot.status === 'scarce';

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={isBooked}
                      onClick={() => onSelectSlot(slot)}
                      className={`group relative flex flex-col items-center justify-center rounded-lg border px-3 py-2 text-xs transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-xs ring-1 ring-stone-900'
                          : isBooked
                          ? 'border-dashed border-stone-200 bg-stone-50/70 text-stone-300 cursor-not-allowed line-through'
                          : 'border-stone-200 bg-white text-stone-800 hover:border-amber-400/80 hover:bg-amber-50/30'
                      }`}
                    >
                      <span className="tabular-nums font-mono text-[12px]">
                        {slot.time}
                      </span>

                      {/* Urgency Badge */}
                      {isScarce && !isSelected && (
                        <span className="mt-1 inline-flex items-center gap-0.5 text-[9px] font-semibold text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200/70">
                          <Flame className="h-2.5 w-2.5 text-amber-600" />
                          Only 1 spot left
                        </span>
                      )}
                      {isSelected && isScarce && (
                        <span className="mt-1 text-[9px] text-amber-200 font-medium">
                          1 spot left
                        </span>
                      )}
                      {isBooked && (
                        <span className="mt-0.5 text-[9px] text-stone-400 font-normal no-underline">
                          Reserved
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
