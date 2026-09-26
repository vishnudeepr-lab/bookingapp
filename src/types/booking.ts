/**
 * Types & Interfaces for Samaya (समय) Indian Luxury Booking System
 */

export type ServiceCategory = 'ayurveda' | 'consulting' | 'grooming' | 'rentals';
export type IndianCity = 'bengaluru' | 'mumbai' | 'delhi';
export type PaymentMethod = 'upi' | 'card' | 'netbanking';

export interface CityInfo {
  id: IndianCity;
  name: string;
  hubName: string;
  address: string;
}

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  hindiName: string;
  tagline: string;
  iconName: string;
}

export interface Service {
  id: string;
  name: string;
  hindiTitle?: string;
  categoryId: ServiceCategory;
  tagline: string;
  description: string;
  durationMinutes: number;
  basePrice: number; // in INR (₹)
  rating: number;
  reviewCount: number;
  highlights: string[];
  badgeText?: string;
  cityAvailability?: IndianCity[];
}

export type SlotPeriod = 'morning' | 'afternoon' | 'evening';
export type SlotStatus = 'available' | 'scarce' | 'booked';

export interface TimeSlot {
  id: string;
  time: string; // e.g., "09:30 AM"
  period: SlotPeriod;
  status: SlotStatus;
  availableCount: number; // 1 means "Only 1 spot left"
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  additionalPrice: number; // in INR (₹)
  additionalDurationMinutes: number;
  popular?: boolean;
  icon: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  whatsappUpdates: boolean;
  paymentMethod: PaymentMethod;
  upiId?: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  upiId?: string;
}

export interface PriceBreakdown {
  serviceBasePrice: number;
  addOnsPrice: number;
  subtotal: number;
  cgst: number; // 9%
  sgst: number; // 9%
  totalGst: number; // 18%
  grandTotal: number;
  totalDurationMinutes: number;
}

export interface BookingConfirmation {
  referenceId: string;
  createdAt: string;
  service: Service;
  city: CityInfo;
  date: string;
  slot: TimeSlot;
  addOns: AddOn[];
  customer: CustomerInfo;
  breakdown: PriceBreakdown;
  status: 'confirmed' | 'cancelled';
}
