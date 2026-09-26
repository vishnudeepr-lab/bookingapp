import React from 'react';
import { X, ShieldCheck, Clock, MapPin, Sparkles, Coffee } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3.5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-amber-700" />
            <h3 className="text-base font-bold text-stone-900">
              Samaya Sanctuary Code & Guarantees
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs text-stone-600 leading-relaxed">
          <div>
            <h4 className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-stone-500" />
              Free Rescheduling & Cancellation
            </h4>
            <p className="text-stone-500">
              Plans shift. Modify or cancel your reservation up to 24 hours prior without penalty. 100% refund is credited back to your original UPI or Card account within 2 hours.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-stone-500" />
              Arrival & Valet Parking
            </h4>
            <p className="text-stone-500">
              Complimentary valet parking is available at our Indiranagar (Bengaluru), Pali Hill (Mumbai), and Horizon Center (Gurugram) sanctuaries. Please arrive 10 minutes prior for initial consultations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-stone-500" />
              Vedic Purity & Botanical Integrity
            </h4>
            <p className="text-stone-500">
              All therapeutic oils, single-batch Bhringraj infusions, and Kashmiri Grade-A saffron are ethically sourced from certified organic smallholders across Kerala and Kashmir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
              <Coffee className="h-3.5 w-3.5 text-stone-500" />
              Beverage & Hospitality Bar
            </h4>
            <p className="text-stone-500">
              Every guest is welcomed with single-estate Darjeeling First Flush, traditional Kashmiri Kahwa, or artisanal Blue Tokai pour-over coffee.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-100 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
