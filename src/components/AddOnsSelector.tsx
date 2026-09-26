import React from 'react';
import { ADD_ONS, formatINR } from '../data/mockData';
import { Zap, Clock, UserCheck, Video, Coffee, Check, Plus, Layers, Sparkles } from 'lucide-react';

interface AddOnsSelectorProps {
  selectedAddOnIds: string[];
  onToggleAddOn: (id: string) => void;
}

const ADDON_ICONS: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-4 w-4" />,
  Clock: <Clock className="h-4 w-4" />,
  UserCheck: <UserCheck className="h-4 w-4" />,
  Video: <Video className="h-4 w-4" />,
  Coffee: <Coffee className="h-4 w-4" />,
  Sparkles: <Sparkles className="h-4 w-4" />,
};

export const AddOnsSelector: React.FC<AddOnsSelectorProps> = ({
  selectedAddOnIds,
  onToggleAddOn,
}) => {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-stone-800" />
            <h3 className="text-base font-semibold text-stone-900 tracking-tight">
              Curated Add-ons & Ayurvedic Enhancements
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Elevate your appointment with botanicals, duration upgrades, or archival media
          </p>
        </div>

        {selectedAddOnIds.length > 0 && (
          <span className="text-xs font-semibold text-stone-900 bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
            {selectedAddOnIds.length} upgrade{selectedAddOnIds.length > 1 ? 's' : ''} added
          </span>
        )}
      </div>

      <div className="space-y-2.5">
        {ADD_ONS.map((addon) => {
          const isSelected = selectedAddOnIds.includes(addon.id);

          return (
            <div
              key={addon.id}
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => onToggleAddOn(addon.id)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  onToggleAddOn(addon.id);
                }
              }}
              className={`group flex items-center justify-between gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
                isSelected
                  ? 'border-stone-900 bg-amber-50/25 shadow-xs ring-1 ring-stone-900'
                  : 'border-stone-200 bg-white hover:border-amber-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors ${
                    isSelected
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-300 bg-white group-hover:border-stone-400'
                  }`}
                >
                  {isSelected ? (
                    <Check className="h-3 w-3 stroke-[3]" />
                  ) : (
                    <Plus className="h-2.5 w-2.5 text-stone-400 group-hover:text-stone-700" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-stone-900">
                      {addon.name}
                    </span>
                    {addon.popular && (
                      <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/70">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              </div>

              {/* Price & Duration */}
              <div className="shrink-0 text-right">
                <div className="text-xs font-bold text-stone-900 tabular-nums font-mono">
                  +{formatINR(addon.additionalPrice)}
                </div>
                {addon.additionalDurationMinutes > 0 ? (
                  <div className="text-[11px] text-stone-500 font-medium tabular-nums mt-0.5">
                    +{addon.additionalDurationMinutes} min
                  </div>
                ) : (
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    Included in slot
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
