import React, { useState } from 'react';
import {
  Service,
  TimeSlot,
  AddOn,
  PriceBreakdown,
  CustomerInfo,
  CityInfo,
} from '../types/booking';
import { ADD_ONS, formatINR } from '../data/mockData';
import {
  ShieldCheck,
  Calendar,
  Clock,
  ArrowRight,
  Receipt,
  MapPin,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  QrCode,
  Lock,
} from 'lucide-react';

interface StickyOrderSummaryProps {
  selectedService: Service | null;
  selectedCity: CityInfo;
  selectedDateStr: string;
  selectedSlot: TimeSlot | null;
  selectedAddOnIds: string[];
  breakdown: PriceBreakdown;
  customerInfo: CustomerInfo;
  isFormValid: boolean;
  onConfirmBooking: () => void;
  isSubmitting: boolean;
}

export const StickyOrderSummary: React.FC<StickyOrderSummaryProps> = ({
  selectedService,
  selectedCity,
  selectedDateStr,
  selectedSlot,
  selectedAddOnIds,
  breakdown,
  customerInfo,
  isFormValid,
  onConfirmBooking,
  isSubmitting,
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const selectedAddOns: AddOn[] = selectedAddOnIds
    .map((id) => ADD_ONS.find((a) => a.id === id))
    .filter((a): a is AddOn => !!a);

  const formattedDate = React.useMemo(() => {
    if (!selectedDateStr) return 'Not chosen';
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }, [selectedDateStr]);

  const missingItems: string[] = [];
  if (!selectedService) missingItems.push('Service');
  if (!selectedSlot) missingItems.push('IST Time slot');
  if (
    !customerInfo.fullName.trim() ||
    !customerInfo.email.trim() ||
    !customerInfo.phone.trim()
  ) {
    missingItems.push('Guest details');
  }

  const canSubmit = isFormValid && selectedService && selectedSlot && !isSubmitting;

  const paymentLabel =
    customerInfo.paymentMethod === 'upi'
      ? 'Pay via UPI'
      : customerInfo.paymentMethod === 'card'
      ? 'Pay via Card'
      : 'Pay via NetBanking';

  return (
    <>
      {/* Desktop Sticky Summary Sidebar */}
      <aside className="hidden lg:block lg:w-96 shrink-0">
        <div className="sticky top-20 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-stone-800" />
              <h3 className="text-base font-bold text-stone-900 tracking-tight">
                Tax Invoice & Summary
              </h3>
            </div>
            <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
              {selectedCity.name}
            </span>
          </div>

          {/* Location details */}
          <div className="py-2.5 border-b border-stone-100 flex items-center gap-2 text-xs text-stone-600">
            <MapPin className="h-3.5 w-3.5 text-stone-400 shrink-0" />
            <span className="truncate">{selectedCity.hubName}</span>
          </div>

          {/* Service snippet */}
          <div className="py-3.5 border-b border-stone-100">
            {selectedService ? (
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                  Reserved Experience
                </span>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 leading-snug">
                      {selectedService.name}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {selectedService.tagline}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-stone-900 tabular-nums font-mono shrink-0">
                    {formatINR(selectedService.basePrice)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-stone-400 italic">
                Please select a treatment or suite
              </div>
            )}
          </div>

          {/* Date & Time slot */}
          <div className="py-3 border-b border-stone-100 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-stone-400" />
                Date
              </span>
              <span className="font-medium text-stone-800">{formattedDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-stone-400" />
                Time (IST) & Duration
              </span>
              <span className="font-medium text-stone-800 tabular-nums">
                {selectedSlot ? selectedSlot.time : 'Choose slot'} · {breakdown.totalDurationMinutes} mins
              </span>
            </div>
          </div>

          {/* Upgrades Breakdown */}
          {selectedAddOns.length > 0 && (
            <div className="py-3 border-b border-stone-100 space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-stone-400 uppercase tracking-wider">
                  Vedic Add-ons ({selectedAddOns.length})
                </span>
                <span className="text-stone-700 font-mono tabular-nums">
                  +{formatINR(breakdown.addOnsPrice)}
                </span>
              </div>
              <ul className="space-y-1 text-xs">
                {selectedAddOns.map((addon) => (
                  <li key={addon.id} className="flex items-center justify-between text-stone-600">
                    <span className="truncate pr-2 text-[11px]">• {addon.name}</span>
                    <span className="tabular-nums font-mono text-stone-800 shrink-0 text-xs">
                      +{formatINR(addon.additionalPrice)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed GST calculation */}
          <div className="py-3.5 border-b border-stone-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="tabular-nums font-mono text-stone-800">
                {formatINR(breakdown.subtotal)}
              </span>
            </div>

            {/* Indian GST Breakdown */}
            <div className="space-y-1 pl-2 border-l border-stone-200 text-[11px] text-stone-500">
              <div className="flex items-center justify-between">
                <span>CGST (9%)</span>
                <span className="font-mono tabular-nums">{formatINR(breakdown.cgst)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>SGST (9%)</span>
                <span className="font-mono tabular-nums">{formatINR(breakdown.sgst)}</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-bold text-stone-900 block">
                  Grand Total
                </span>
                <span className="text-[10px] text-stone-400">
                  Incl. 18% GST & Sanctuary fees
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold tracking-tight text-stone-900 tabular-nums font-mono">
                  {formatINR(breakdown.grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Missing items helper */}
          {!canSubmit && (
            <div className="my-3 rounded-lg bg-stone-50 p-2.5 text-xs text-stone-600 border border-stone-200">
              <div className="flex items-center gap-1.5 text-stone-800 font-semibold mb-1">
                <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                <span>Next steps to complete:</span>
              </div>
              <ul className="space-y-0.5 text-[11px] text-stone-500 list-disc list-inside">
                {missingItems.map((item, idx) => (
                  <li key={idx}>Select or fill {item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Primary CTA */}
          <button
            type="button"
            disabled={!canSubmit}
            onClick={onConfirmBooking}
            className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-stone-800 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs focus-visible:outline-none"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Securing appointment...</span>
              </span>
            ) : (
              <>
                <span>
                  {paymentLabel} ({formatINR(breakdown.grandTotal)})
                </span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {/* Trust Guarantee */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
            <Lock className="h-3.5 w-3.5 text-stone-400" />
            <span>Zero cancellation fee up to 24 hrs prior</span>
          </div>
        </div>
      </aside>

      {/* Mobile Sticky Bar & Drawer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur-md p-3 sm:px-6 shadow-lg">
        {mobileExpanded && (
          <div className="pb-3 border-b border-stone-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-800">
              <span className="font-semibold">{selectedService?.name || 'No service'}</span>
              <span className="font-mono tabular-nums">{formatINR(breakdown.serviceBasePrice)}</span>
            </div>
            {breakdown.addOnsPrice > 0 && (
              <div className="flex items-center justify-between text-stone-600 text-[11px]">
                <span>Add-ons ({selectedAddOns.length})</span>
                <span className="font-mono tabular-nums">+{formatINR(breakdown.addOnsPrice)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-stone-500 text-[11px]">
              <span>GST (18%)</span>
              <span className="font-mono tabular-nums">{formatINR(breakdown.totalGst)}</span>
            </div>
            <div className="text-[11px] text-stone-500">
              {selectedCity.name} · {formattedDate} · {selectedSlot ? selectedSlot.time : 'No slot'} ({breakdown.totalDurationMinutes} mins)
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="text-left cursor-pointer flex items-center gap-1.5 focus:outline-none"
          >
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                Total (GST Inc.)
              </span>
              <span className="text-base font-bold text-stone-900 tabular-nums font-mono">
                {formatINR(breakdown.grandTotal)}
              </span>
            </div>
            {mobileExpanded ? (
              <ChevronDown className="h-4 w-4 text-stone-500" />
            ) : (
              <ChevronUp className="h-4 w-4 text-stone-500" />
            )}
          </button>

          <button
            type="button"
            disabled={!canSubmit}
            onClick={onConfirmBooking}
            className="flex-1 max-w-[240px] inline-flex items-center justify-center gap-1.5 rounded-xl bg-stone-900 px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-stone-800 disabled:opacity-40 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Confirming...</span>
            ) : (
              <>
                <span>{paymentLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
