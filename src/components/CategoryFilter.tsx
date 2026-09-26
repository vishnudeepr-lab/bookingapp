import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { ServiceCategory } from '../types/booking';
import { Sparkles, Briefcase, Scissors, Home, Search } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: ServiceCategory;
  onSelectCategory: (cat: ServiceCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const ICONS: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-4 w-4" />,
  Briefcase: <Briefcase className="h-4 w-4" />,
  Scissors: <Scissors className="h-4 w-4" />,
  Home: <Home className="h-4 w-4" />,
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-stone-900">
              Select an Experience
            </h2>
            <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 font-medium">
              Curated in India
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Choose from authentic Ayurvedic therapies, executive tech sprints, bespoke grooming, or Dolby creative studios
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search Shirodhara, Cloud Audit, Shave..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-white py-1.5 pl-8 pr-3 text-xs text-stone-800 placeholder-stone-400 transition-colors focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Segmented category tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-stone-100 rounded-xl border border-stone-200 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white text-stone-900 shadow-xs border border-stone-200 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <span className={isActive ? 'text-amber-600' : 'text-stone-400'}>
                {ICONS[cat.iconName]}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span>{cat.name}</span>
                <span className="text-[10px] text-stone-400 font-normal hidden md:inline">
                  · {cat.hindiName}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
