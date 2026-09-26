import React from 'react';
import { CustomerInfo, FormErrors, PaymentMethod } from '../types/booking';
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CreditCard,
  QrCode,
  Landmark,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface CustomerFormProps {
  formData: CustomerInfo;
  errors: FormErrors;
  touched: {
    fullName: boolean;
    email: boolean;
    phone: boolean;
    upiId?: boolean;
  };
  onChangeField: (field: keyof CustomerInfo, value: any) => void;
  onBlurField: (field: keyof CustomerInfo) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  formData,
  errors,
  touched,
  onChangeField,
  onBlurField,
}) => {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-stone-800" />
          <h3 className="text-base font-semibold text-stone-900 tracking-tight">
            Guest Information & Payment
          </h3>
        </div>
        <span className="text-[11px] text-stone-500 font-medium flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          100% Encrypted
        </span>
      </div>
      <p className="text-xs text-stone-500 mb-4">
        Your booking confirmation, entrance door pin, and GST invoice will be generated for these details
      </p>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-stone-800 mb-1.5">
            Full Name <span className="text-stone-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="e.g. Aarav Sharma"
              value={formData.fullName}
              onChange={(e) => onChangeField('fullName', e.target.value)}
              onBlur={() => onBlurField('fullName')}
              className={`w-full rounded-lg border py-2 pl-9 pr-9 text-xs transition-colors focus:outline-none focus:ring-1 ${
                touched.fullName && errors.fullName
                  ? 'border-red-300 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-500'
                  : touched.fullName && !errors.fullName && formData.fullName.trim().length > 0
                  ? 'border-emerald-300 bg-emerald-50/10 text-stone-900 focus:border-stone-900 focus:ring-stone-900'
                  : 'border-stone-200 bg-white text-stone-900 focus:border-stone-900 focus:ring-stone-900'
              }`}
            />
            {touched.fullName && errors.fullName ? (
              <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
            ) : touched.fullName && !errors.fullName && formData.fullName.trim().length > 0 ? (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
            ) : null}
          </div>
          {touched.fullName && errors.fullName && (
            <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
              <span>•</span> {errors.fullName}
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1.5">
              Email Address <span className="text-stone-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="aarav@company.in"
                value={formData.email}
                onChange={(e) => onChangeField('email', e.target.value)}
                onBlur={() => onBlurField('email')}
                className={`w-full rounded-lg border py-2 pl-9 pr-9 text-xs transition-colors focus:outline-none focus:ring-1 ${
                  touched.email && errors.email
                    ? 'border-red-300 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-500'
                    : touched.email && !errors.email && formData.email.trim().length > 0
                    ? 'border-emerald-300 bg-emerald-50/10 text-stone-900 focus:border-stone-900 focus:ring-stone-900'
                    : 'border-stone-200 bg-white text-stone-900 focus:border-stone-900 focus:ring-stone-900'
                }`}
              />
              {touched.email && errors.email ? (
                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
              ) : touched.email && !errors.email && formData.email.trim().length > 0 ? (
                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
              ) : null}
            </div>
            {touched.email && errors.email && (
              <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <span>•</span> {errors.email}
              </p>
            )}
          </div>

          {/* Indian Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1.5">
              Mobile Number (India) <span className="text-stone-400">*</span>
            </label>
            <div className="relative flex">
              <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-stone-200 bg-stone-50 text-xs font-medium text-stone-600 select-none">
                +91
              </span>
              <div className="relative flex-1">
                <input
                  type="tel"
                  name="tel"
                  autoComplete="tel"
                  maxLength={13}
                  placeholder="98765 43210"
                  value={formData.phone}
                  onChange={(e) => onChangeField('phone', e.target.value)}
                  onBlur={() => onBlurField('phone')}
                  className={`w-full rounded-r-lg border py-2 pl-3 pr-9 text-xs transition-colors focus:outline-none focus:ring-1 ${
                    touched.phone && errors.phone
                      ? 'border-red-300 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-500'
                      : touched.phone && !errors.phone && formData.phone.trim().length > 0
                      ? 'border-emerald-300 bg-emerald-50/10 text-stone-900 focus:border-stone-900 focus:ring-stone-900'
                      : 'border-stone-200 bg-white text-stone-900 focus:border-stone-900 focus:ring-stone-900'
                  }`}
                />
                {touched.phone && errors.phone ? (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                ) : touched.phone && !errors.phone && formData.phone.trim().length > 0 ? (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                ) : null}
              </div>
            </div>
            {touched.phone && errors.phone && (
              <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                <span>•</span> {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* WhatsApp Notification Opt-in */}
        <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-stone-200/90 bg-stone-50/70 hover:bg-stone-50 transition-colors cursor-pointer select-none">
          <input
            type="checkbox"
            checked={formData.whatsappUpdates}
            onChange={(e) => onChangeField('whatsappUpdates', e.target.checked)}
            className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 h-4 w-4"
          />
          <MessageSquare className="h-4 w-4 text-emerald-600 shrink-0" />
          <div className="text-xs text-stone-700">
            <span className="font-semibold">Send booking pass on WhatsApp</span>
            <span className="text-stone-400 block text-[11px]">
              Instant door code, suite directions, and calendar reminders on WhatsApp
            </span>
          </div>
        </label>

        {/* Payment Method Selector */}
        <div className="pt-2 border-t border-stone-100">
          <label className="block text-xs font-semibold text-stone-800 mb-2">
            Payment Mode (Instant Booking)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                id: 'upi' as PaymentMethod,
                label: 'UPI',
                sub: 'GPay, PhonePe, Paytm',
                icon: <QrCode className="h-4 w-4 text-amber-600" />,
              },
              {
                id: 'card' as PaymentMethod,
                label: 'Cards',
                sub: 'Visa, Master, RuPay',
                icon: <CreditCard className="h-4 w-4 text-stone-600" />,
              },
              {
                id: 'netbanking' as PaymentMethod,
                label: 'NetBanking',
                sub: 'HDFC, ICICI, SBI',
                icon: <Landmark className="h-4 w-4 text-stone-600" />,
              },
            ].map((p) => {
              const isActive = formData.paymentMethod === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onChangeField('paymentMethod', p.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {p.icon}
                    <span className="text-xs font-bold">{p.label}</span>
                  </div>
                  <span
                    className={`block text-[10px] mt-0.5 truncate ${
                      isActive ? 'text-stone-300' : 'text-stone-400'
                    }`}
                  >
                    {p.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Conditional UPI input */}
          {formData.paymentMethod === 'upi' && (
            <div className="mt-3">
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Enter UPI VPA / ID <span className="text-stone-400 font-normal">(e.g. mobile@upi or username@okhdfcbank)</span>
              </label>
              <input
                type="text"
                placeholder="aarav@okhdfcbank"
                value={formData.upiId || ''}
                onChange={(e) => onChangeField('upiId', e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white py-1.5 px-3 text-xs text-stone-800 placeholder-stone-400 transition-colors focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-mono"
              />
            </div>
          )}
        </div>

        {/* Special Notes / Instructions */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-stone-800">
              Special Requests & Dietary / Dosha Notes <span className="text-stone-400 font-normal">(Optional)</span>
            </label>
            <span className="text-[11px] text-stone-400 tabular-nums">
              {formData.notes.length}/400
            </span>
          </div>
          <textarea
            rows={2}
            maxLength={400}
            placeholder="e.g. Specific oil allergy, focus areas for consultation, podcast equipment preference, or valet parking requirement."
            value={formData.notes}
            onChange={(e) => onChangeField('notes', e.target.value)}
            className="w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs text-stone-900 placeholder-stone-400 transition-colors focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 resize-none"
          />
        </div>
      </div>
    </div>
  );
};
