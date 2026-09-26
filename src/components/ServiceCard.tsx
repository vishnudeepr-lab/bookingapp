import React, { useState } from 'react';
import { Service } from '../types/booking';
import { formatINR } from '../data/mockData';
import { Star, Clock, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isSelected,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => onSelect(service)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(service);
        }
      }}
      className={`group relative flex flex-col justify-between rounded-xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 ${
        isSelected
          ? 'border-stone-900 bg-amber-50/20 shadow-sm ring-1 ring-stone-900'
          : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-xs'
      }`}
    >
      <div>
        {/* Top metadata: Rating, review count, badge & checkmark */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
            <span className="flex items-center text-amber-500">
              <Star className="h-3.5 w-3.5 fill-current" />
            </span>
            <span className="font-semibold text-stone-900 tabular-nums">
              {service.rating.toFixed(2)}
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500 tabular-nums">
              {service.reviewCount} verified reviews
            </span>
          </div>

          <div className="flex items-center gap-2">
            {service.badgeText && (
              <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-200/80 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                {service.badgeText}
              </span>
            )}
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                isSelected
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-300 bg-white group-hover:border-stone-400'
              }`}
            >
              {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
            </div>
          </div>
        </div>

        {/* Title & Hindi Title */}
        <div className="mt-1">
          <h3 className="text-base font-semibold text-stone-900 tracking-tight group-hover:text-stone-800 transition-colors">
            {service.name}
          </h3>
          {service.hindiTitle && (
            <p className="text-[11px] font-serif text-amber-800/80 mt-0.5">
              {service.hindiTitle}
            </p>
          )}
        </div>

        {/* Tagline */}
        <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
          {service.tagline}
        </p>

        {/* Expandable description */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-stone-100 text-xs text-stone-600 leading-relaxed space-y-2.5">
            <p>{service.description}</p>
            <div>
              <span className="font-semibold text-stone-800 text-[11px] uppercase tracking-wider">
                Signature Inclusions:
              </span>
              <ul className="mt-1.5 space-y-1 list-disc list-inside text-stone-600">
                {service.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Duration, Price in ₹ & Details Toggle */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-1 font-medium">
            <Clock className="h-3.5 w-3.5 text-stone-400" />
            <span className="tabular-nums">{service.durationMinutes} mins</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-[11px] text-stone-400 hover:text-stone-800 flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>Less</span>
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                <span>Inclusions</span>
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </button>
        </div>

        <div className="text-right">
          <span className="text-[11px] text-stone-400 font-normal">from </span>
          <span className="text-base font-bold text-stone-900 tabular-nums font-mono">
            {formatINR(service.basePrice)}
          </span>
        </div>
      </div>
    </div>
  );
};
