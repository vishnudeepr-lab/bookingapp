import React from 'react';
import { BookingConfirmation } from '../types/booking';
import { downloadIcsFile } from '../utils/calendar';
import { formatINR } from '../data/mockData';
import { Calendar, Clock, MapPin, Download, Trash2, X } from 'lucide-react';

interface ManageBookingsModalProps {
  bookings: BookingConfirmation[];
  isOpen: boolean;
  onClose: () => void;
  onCancelBooking: (refId: string) => void;
}

export const ManageBookingsModal: React.FC<ManageBookingsModalProps> = ({
  bookings,
  isOpen,
  onClose,
  onCancelBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Your Reserved Appointments
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Review details, download ICS calendar files, or cancel reservations
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="my-4 max-h-[60vh] overflow-y-auto space-y-3 pr-1">
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              No active reservations found. Select a treatment or suite to book your appointment.
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.referenceId}
                className="rounded-xl border border-stone-200 p-4 transition-colors hover:border-stone-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-stone-900">
                        {booking.referenceId}
                      </span>
                      <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-medium">
                        {booking.city?.name || 'Sanctuary'}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 mt-1">
                      {booking.service.name}
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                    {formatINR(booking.breakdown.grandTotal)}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-stone-400" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-stone-400" />
                    <span className="tabular-nums font-mono">
                      {booking.slot.time} IST ({booking.breakdown.totalDurationMinutes} mins)
                    </span>
                  </div>
                </div>

                {booking.addOns.length > 0 && (
                  <div className="mt-2 text-[11px] text-stone-500">
                    <span className="font-medium text-stone-700">Add-ons:</span>{' '}
                    {booking.addOns.map((a) => a.name).join(', ')}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      downloadIcsFile(
                        booking.service,
                        booking.city,
                        booking.date,
                        booking.slot,
                        booking.breakdown.totalDurationMinutes,
                        booking.addOns,
                        booking.referenceId
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-900 transition-colors font-medium cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 text-stone-400" />
                    <span>Download .ics</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onCancelBooking(booking.referenceId)}
                    className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Cancel Reservation</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-stone-100 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
