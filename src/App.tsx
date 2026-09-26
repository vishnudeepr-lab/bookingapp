import React, { useState, useMemo, useEffect } from 'react';
import {
  ServiceCategory,
  Service,
  TimeSlot,
  CustomerInfo,
  FormErrors,
  BookingConfirmation,
  IndianCity,
} from './types/booking';
import {
  CATEGORIES,
  SERVICES,
  ADD_ONS,
  CITIES,
  generateTimeSlotsForDate,
  calculateBreakdown,
  formatINR,
} from './data/mockData';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ServiceCard } from './components/ServiceCard';
import { DatePicker } from './components/DatePicker';
import { TimeSlotPicker } from './components/TimeSlotPicker';
import { AddOnsSelector } from './components/AddOnsSelector';
import { CustomerForm } from './components/CustomerForm';
import { StickyOrderSummary } from './components/StickyOrderSummary';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { ManageBookingsModal } from './components/ManageBookingsModal';
import { HelpModal } from './components/HelpModal';
import { Sparkles, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';

const STORAGE_KEY = 'samaya_indian_reservations_v1';

export default function App() {
  const initialDateStr = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  // Primary State
  const [currentCity, setCurrentCity] = useState<IndianCity>('bengaluru');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('ayurveda');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(SERVICES[0]);
  const [selectedDate, setSelectedDate] = useState<string>(initialDateStr);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Customer Form State
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
    whatsappUpdates: true,
    paymentMethod: 'upi',
    upiId: '',
  });

  const [touchedFields, setTouchedFields] = useState({
    fullName: false,
    email: false,
    phone: false,
    upiId: false,
  });

  // Flow State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeConfirmation, setActiveConfirmation] = useState<BookingConfirmation | null>(null);
  const [allBookings, setAllBookings] = useState<BookingConfirmation[]>([]);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved bookings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAllBookings(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  const saveBookings = (updated: BookingConfirmation[]) => {
    setAllBookings(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const currentCityInfo = useMemo(() => {
    return CITIES.find((c) => c.id === currentCity) || CITIES[0];
  }, [currentCity]);

  // Filtered Services based on Category & Search
  const filteredServices = useMemo(() => {
    let list = SERVICES.filter((s) => s.categoryId === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = SERVICES.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          (s.hindiTitle && s.hindiTitle.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCategory, searchQuery]);

  // Dynamic Time Slots for the selected date
  const availableSlots = useMemo(() => {
    return generateTimeSlotsForDate(selectedDate);
  }, [selectedDate]);

  // Auto-select first available slot when date changes
  useEffect(() => {
    if (selectedSlot) {
      const exists = availableSlots.find((s) => s.id === selectedSlot.id && s.status !== 'booked');
      if (!exists) {
        const firstOpen = availableSlots.find((s) => s.status !== 'booked');
        setSelectedSlot(firstOpen || null);
      }
    } else {
      const firstOpen = availableSlots.find((s) => s.status !== 'booked');
      if (firstOpen) {
        setSelectedSlot(firstOpen);
      }
    }
  }, [selectedDate, availableSlots]);

  // Form Validation Logic (Tailored for Indian format)
  const errors: FormErrors = useMemo(() => {
    const errs: FormErrors = {};

    // Full name
    if (!customerInfo.fullName.trim()) {
      errs.fullName = 'Full name is required';
    } else if (customerInfo.fullName.trim().length < 2) {
      errs.fullName = 'Please enter at least 2 characters';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerInfo.email.trim()) {
      errs.email = 'Email address is required for GST receipt';
    } else if (!emailRegex.test(customerInfo.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    // Indian Mobile Phone Validation (10 digits)
    const phoneDigits = customerInfo.phone.replace(/\D/g, '');
    if (!customerInfo.phone.trim()) {
      errs.phone = '10-digit mobile number is required';
    } else if (phoneDigits.length < 10) {
      errs.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    // UPI Validation if UPI chosen
    if (customerInfo.paymentMethod === 'upi' && customerInfo.upiId) {
      const trimmedUpi = customerInfo.upiId.trim();
      if (trimmedUpi.length > 0 && !trimmedUpi.includes('@')) {
        errs.upiId = 'UPI ID should contain @ (e.g. mobile@upi)';
      }
    }

    return errs;
  }, [customerInfo]);

  const isFormValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  // Price Breakdown (Service + Addons + 18% GST)
  const breakdown = useMemo(() => {
    return calculateBreakdown(selectedService, selectedAddOnIds);
  }, [selectedService, selectedAddOnIds]);

  // Handlers
  const handleToggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFieldChange = (field: keyof CustomerInfo, value: any) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldBlur = (field: keyof CustomerInfo) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleCityChange = (city: IndianCity) => {
    setCurrentCity(city);
    const c = CITIES.find((item) => item.id === city);
    if (c) {
      showToast(`Sanctuary venue set to ${c.hubName}, ${c.name}`);
    }
  };

  // Submit Booking
  const handleConfirmBooking = () => {
    setTouchedFields({
      fullName: true,
      email: true,
      phone: true,
      upiId: true,
    });

    if (!selectedService || !selectedSlot || !isFormValid) {
      showToast('Please check guest details and select an IST time slot');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const cityCode =
        currentCity === 'bengaluru' ? 'BLR' : currentCity === 'mumbai' ? 'BOM' : 'DEL';
      const refId = `SMY-${Math.floor(1000 + Math.random() * 9000)}-${cityCode}`;

      const selectedAddOnObjs = selectedAddOnIds
        .map((id) => ADD_ONS.find((a) => a.id === id))
        .filter((a): a is any => !!a);

      const confirmation: BookingConfirmation = {
        referenceId: refId,
        createdAt: new Date().toISOString(),
        service: selectedService,
        city: currentCityInfo,
        date: selectedDate,
        slot: selectedSlot,
        addOns: selectedAddOnObjs,
        customer: { ...customerInfo },
        breakdown,
        status: 'confirmed',
      };

      const updatedList = [confirmation, ...allBookings];
      saveBookings(updatedList);
      setActiveConfirmation(confirmation);
      setIsSubmitting(false);
      showToast(`Appointment reserved! Booking Ref: ${refId}`);
    }, 700);
  };

  const handleResetBooking = () => {
    setActiveConfirmation(null);
    setSelectedAddOnIds([]);
    setCustomerInfo({
      fullName: '',
      email: '',
      phone: '',
      notes: '',
      whatsappUpdates: true,
      paymentMethod: 'upi',
      upiId: '',
    });
    setTouchedFields({
      fullName: false,
      email: false,
      phone: false,
      upiId: false,
    });
  };

  const handleCancelBooking = (refId: string) => {
    const updated = allBookings.filter((b) => b.referenceId !== refId);
    saveBookings(updated);
    showToast(`Reservation ${refId} has been cancelled.`);
  };

  return (
    <div className="min-h-screen bg-stone-50/60 font-sans text-stone-900 pb-24 lg:pb-16 selection:bg-stone-900 selection:text-white">
      {/* Top Bar Navigation */}
      <Header
        currentCity={currentCity}
        onSelectCity={handleCityChange}
        activeBookingCount={allBookings.length}
        onOpenAppointments={() => setIsManageModalOpen(true)}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Editorial Hero Header */}
        <section className="mb-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                समय · Private Appointments & Studios
              </span>
              <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                {currentCityInfo.hubName}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
              Bespoke Ayurveda, Tech Advisory & Private Studio Spaces
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
              Experience therapeutic Ayurvedic rejuvenation, strategic cloud advisory, and broadcast-grade media studios in Bengaluru, Mumbai, and Delhi NCR. Transparent INR pricing with full GST tax invoice.
            </p>
          </div>
        </section>

        {/* 2-Column Responsive Desktop Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column: Booking Steps */}
          <div className="w-full lg:flex-1 space-y-8">
            {/* Step 1: Category & Experience Picker */}
            <section id="services" className="space-y-4">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setSearchQuery('');
                  const firstOfCat = SERVICES.find((s) => s.categoryId === cat);
                  if (firstOfCat) setSelectedService(firstOfCat);
                }}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {filteredServices.length === 0 ? (
                <div className="rounded-xl border border-stone-200 bg-white p-8 text-center text-xs text-stone-500">
                  No treatments or suites matched "{searchQuery}". Try a different keyword or reset filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isSelected={selectedService?.id === service.id}
                      onSelect={(s) => setSelectedService(s)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Step 2: Date & IST Time Slot Scheduling */}
            <section id="schedule" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  selectedDate={selectedDate}
                  onSelectDate={(newDate) => setSelectedDate(newDate)}
                />
                <TimeSlotPicker
                  slots={availableSlots}
                  selectedSlot={selectedSlot}
                  onSelectSlot={(slot) => setSelectedSlot(slot)}
                  selectedDateStr={selectedDate}
                />
              </div>
            </section>

            {/* Step 3: Vedic Extras & Add-ons */}
            <section id="addons">
              <AddOnsSelector
                selectedAddOnIds={selectedAddOnIds}
                onToggleAddOn={handleToggleAddOn}
              />
            </section>

            {/* Step 4: Customer Information & Payment Mode */}
            <section id="contact">
              <CustomerForm
                formData={customerInfo}
                errors={errors}
                touched={touchedFields}
                onChangeField={handleFieldChange}
                onBlurField={handleFieldBlur}
              />
            </section>
          </div>

          {/* Right Column: Sticky Summary & GST Breakdown */}
          <StickyOrderSummary
            selectedService={selectedService}
            selectedCity={currentCityInfo}
            selectedDateStr={selectedDate}
            selectedSlot={selectedSlot}
            selectedAddOnIds={selectedAddOnIds}
            breakdown={breakdown}
            customerInfo={customerInfo}
            isFormValid={isFormValid}
            onConfirmBooking={handleConfirmBooking}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>

      {/* Confirmation Modal */}
      {activeConfirmation && (
        <BookingConfirmationModal
          confirmation={activeConfirmation}
          onResetBooking={handleResetBooking}
        />
      )}

      {/* Manage Bookings Modal */}
      <ManageBookingsModal
        bookings={allBookings}
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        onCancelBooking={handleCancelBooking}
      />

      {/* Sanctuary Guidelines Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-xs font-medium text-white shadow-xl border border-stone-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
