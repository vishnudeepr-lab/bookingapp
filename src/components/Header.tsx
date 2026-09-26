import React from 'react';
import { Calendar, HelpCircle, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { IndianCity, CityInfo } from '../types/booking';
import { CITIES } from '../data/mockData';

interface HeaderProps {
  currentCity: IndianCity;
  onSelectCity: (city: IndianCity) => void;
  onOpenAppointments: () => void;
  onOpenHelp: () => void;
  activeBookingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  onSelectCity,
  onOpenAppointments,
  onOpenHelp,
  activeBookingCount,
}) => {
  const activeCityInfo = CITIES.find((c) => c.id === currentCity) || CITIES[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark with subtle Devanagari glyph */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="group flex items-center gap-2.5 text-base font-semibold tracking-tight text-stone-900 focus-visible:outline-none rounded-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-amber-400 transition-transform duration-200 group-hover:scale-105 shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-stone-900">
                SAMAYA
              </span>
              <span className="text-xs font-serif text-amber-700 font-medium">
                समय
              </span>
            </div>
          </a>

          {/* City Selector Segmented Switch */}
          <div className="hidden sm:flex items-center gap-1 ml-3 pl-3 border-l border-stone-200">
            <MapPin className="h-3.5 w-3.5 text-stone-400" />
            <div className="flex items-center gap-0.5 bg-stone-100 p-0.5 rounded-lg border border-stone-200/70">
              {CITIES.map((c) => {
                const isSelected = c.id === currentCity;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onSelectCity(c.id)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-stone-900 font-semibold shadow-xs'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-stone-600">
          <a href="#services" className="hover:text-stone-900 transition-colors py-1">
            Treatments & Suites
          </a>
          <a href="#schedule" className="hover:text-stone-900 transition-colors py-1">
            Date & IST Slots
          </a>
          <a href="#addons" className="hover:text-stone-900 transition-colors py-1">
            Vedic Extras
          </a>
          <a href="#contact" className="hover:text-stone-900 transition-colors py-1">
            Guest Details
          </a>
          <button
            type="button"
            onClick={onOpenHelp}
            className="hover:text-stone-900 transition-colors py-1 flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="h-3.5 w-3.5 text-stone-400" />
            <span>Sanctuary Guidelines</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Mobile city picker trigger */}
          <div className="sm:hidden">
            <select
              value={currentCity}
              onChange={(e) => onSelectCity(e.target.value as IndianCity)}
              aria-label="Select City"
              className="rounded-lg border border-stone-200 bg-white py-1.5 px-2 text-xs font-medium text-stone-800"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onOpenAppointments}
            className="relative inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all duration-200 focus-visible:outline-none cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5 text-stone-500" />
            <span>Bookings</span>
            {activeBookingCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-semibold text-white tabular-nums">
                {activeBookingCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
