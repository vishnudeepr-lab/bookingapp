import React, { useState } from 'react';
import { BookingConfirmation } from '../types/booking';
import { generateGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { formatINR } from '../data/mockData';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Download,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Building,
} from 'lucide-react';

interface BookingConfirmationModalProps {
  confirmation: BookingConfirmation;
  onResetBooking: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  confirmation,
  onResetBooking,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(confirmation.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleGoogleCalendar = () => {
    const url = generateGoogleCalendarUrl(
      confirmation.service,
      confirmation.city,
      confirmation.date,
      confirmation.slot,
      confirmation.breakdown.totalDurationMinutes,
      confirmation.addOns,
      confirmation.referenceId
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadIcs = () => {
    downloadIcsFile(
      confirmation.service,
      confirmation.city,
      confirmation.date,
      confirmation.slot,
      confirmation.breakdown.totalDurationMinutes,
      confirmation.addOns,
      confirmation.referenceId
    );
  };

  const readableDate = React.useMemo(() => {
    const [y, m, d] = confirmation.date.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [confirmation.date]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-xl rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-2xl transition-all">
        {/* Success Header */}
        <div className="text-center pb-5 border-b border-stone-100">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3 border border-emerald-200">
            <CheckCircle2 className="h-8 w-8 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">
            Appointment Confirmed · स्वागतम्
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Your appointment has been reserved at {confirmation.city.hubName}. Tax invoice & QR entry key generated.
          </p>

          {/* Reference ID Pill */}
          <div className="mt-3.5 inline-flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-1.5 border border-stone-200">
            <span className="text-[11px] font-medium text-stone-500">
              Booking Ref:
            </span>
            <span className="font-mono text-xs font-bold text-stone-900">
              {confirmation.referenceId}
            </span>
            <button
              type="button"
              onClick={handleCopyRef}
              className="text-stone-500 hover:text-stone-900 p-0.5 rounded transition-colors cursor-pointer"
              title="Copy Reference ID"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* WhatsApp Notification Banner */}
        {confirmation.customer.whatsappUpdates && (
          <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-900 border border-emerald-200/80">
            <MessageSquare className="h-4 w-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-semibold">WhatsApp Pass Dispatched:</span> Confirmation and directions sent to +91 {confirmation.customer.phone}.
            </div>
          </div>
        )}

        {/* Appointment Card */}
        <div className="my-4 space-y-3.5 rounded-xl border border-stone-200 bg-stone-50/60 p-4 sm:p-5">
          {/* Service Title */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                Confirmed Treatment / Suite
              </span>
              <h3 className="text-base font-bold text-stone-900 mt-0.5">
                {confirmation.service.name}
              </h3>
              {confirmation.service.hindiTitle && (
                <p className="text-[11px] font-serif text-amber-800">
                  {confirmation.service.hindiTitle}
                </p>
              )}
            </div>
            <div className="text-right shrink-0">
              <span className="text-base font-bold text-stone-900 font-mono tabular-nums">
                {formatINR(confirmation.breakdown.grandTotal)}
              </span>
              <span className="block text-[10px] text-stone-400">Total (GST Inc.)</span>
            </div>
          </div>

          {/* Schedule & Venue Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-200/70 text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <Calendar className="h-4 w-4 text-stone-400 shrink-0" />
              <div>
                <span className="block text-[10px] text-stone-400 uppercase font-medium">Date</span>
                <span className="font-medium">{readableDate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-stone-700">
              <Clock className="h-4 w-4 text-stone-400 shrink-0" />
              <div>
                <span className="block text-[10px] text-stone-400 uppercase font-medium">Time (IST) & Duration</span>
                <span className="font-medium tabular-nums font-mono">
                  {confirmation.slot.time} ({confirmation.breakdown.totalDurationMinutes} mins)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-stone-700 sm:col-span-2">
              <MapPin className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-[10px] text-stone-400 uppercase font-medium">Sanctuary Address</span>
                <span className="font-medium">{confirmation.city.hubName}</span>
                <span className="block text-stone-500 text-[11px]">{confirmation.city.address}</span>
              </div>
            </div>
          </div>

          {/* Guest Details */}
          <div className="pt-3 border-t border-stone-200/70 text-xs space-y-1">
            <span className="block text-[10px] text-stone-400 uppercase font-semibold">Guest & Payment</span>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-stone-600">
              <span className="font-semibold text-stone-900">{confirmation.customer.fullName}</span>
              <span className="text-stone-300">·</span>
              <span>{confirmation.customer.email}</span>
              <span className="text-stone-300">·</span>
              <span>+91 {confirmation.customer.phone}</span>
              <span className="text-stone-300">·</span>
              <span className="uppercase text-[11px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60">
                {confirmation.customer.paymentMethod}
              </span>
            </div>
            {confirmation.customer.notes && (
              <p className="text-[11px] text-stone-500 italic mt-1 pt-1 border-t border-dashed border-stone-200">
                "{confirmation.customer.notes}"
              </p>
            )}
          </div>

          {/* Included Upgrades */}
          {confirmation.addOns.length > 0 && (
            <div className="pt-3 border-t border-stone-200/70 text-xs">
              <span className="block text-[10px] text-stone-400 uppercase font-semibold mb-1">
                Included Enhancements
              </span>
              <div className="flex flex-wrap gap-1.5">
                {confirmation.addOns.map((a) => (
                  <span
                    key={a.id}
                    className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 text-[11px] font-medium text-stone-700 border border-stone-200"
                  >
                    <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                    {a.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleGoogleCalendar}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors cursor-pointer shadow-xs"
            >
              <ExternalLink className="h-3.5 w-3.5 text-stone-500" />
              <span>Add to Google Calendar</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadIcs}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="h-3.5 w-3.5 text-stone-500" />
              <span>Download (.ics) Calendar</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onResetBooking}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Book Another Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
