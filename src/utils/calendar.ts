/**
 * Calendar utilities: Google Calendar URL & .ics iCalendar file generator for Samaya (IST)
 */

import { Service, TimeSlot, AddOn, CityInfo } from '../types/booking';

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [time, modifier] = timeStr.split(' ');
  let [hoursStr, minutesStr] = time.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
}

export function getAppointmentDates(
  dateStr: string,
  slot: TimeSlot,
  totalDurationMinutes: number
): {
  startDate: Date;
  endDate: Date;
} {
  const [year, month, day] = dateStr.split('-').map(Number);
  const { hours, minutes } = parseTime(slot.time);

  const startDate = new Date(year, month - 1, day, hours, minutes, 0);
  const endDate = new Date(startDate.getTime() + totalDurationMinutes * 60 * 1000);

  return { startDate, endDate };
}

function toUtcCalendarString(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

export function generateGoogleCalendarUrl(
  service: Service,
  city: CityInfo,
  dateStr: string,
  slot: TimeSlot,
  totalDurationMinutes: number,
  addOns: AddOn[],
  bookingRef: string
): string {
  const { startDate, endDate } = getAppointmentDates(dateStr, slot, totalDurationMinutes);
  const startIso = toUtcCalendarString(startDate);
  const endIso = toUtcCalendarString(endDate);

  const title = encodeURIComponent(`${service.name} | Samaya ${city.name}`);
  const details = encodeURIComponent(
    `Booking Reference: ${bookingRef}\n` +
    `Service: ${service.name} (${totalDurationMinutes} mins)\n` +
    `Upgrades: ${addOns.length > 0 ? addOns.map((a) => a.name).join(', ') : 'None'}\n\n` +
    `Venue: ${city.hubName}\n` +
    `Address: ${city.address}\n\n` +
    `Please arrive 10 minutes prior to your appointment. Valet available.`
  );
  const location = encodeURIComponent(`${city.hubName}, ${city.address}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
}

export function downloadIcsFile(
  service: Service,
  city: CityInfo,
  dateStr: string,
  slot: TimeSlot,
  totalDurationMinutes: number,
  addOns: AddOn[],
  bookingRef: string
): void {
  const { startDate, endDate } = getAppointmentDates(dateStr, slot, totalDurationMinutes);
  const startStr = toUtcCalendarString(startDate);
  const endStr = toUtcCalendarString(endDate);
  const nowStr = toUtcCalendarString(new Date());

  const summary = `${service.name} - Samaya (${city.name})`;
  const description = `Booking Reference: ${bookingRef}\\nService: ${service.name}\\nDuration: ${totalDurationMinutes} mins\\nVenue: ${city.hubName}\\nAddress: ${city.address}`;
  const location = `${city.hubName}, ${city.address}`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Samaya Luxury Sanctuary//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${bookingRef}@samayaspace.in`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `samaya-booking-${bookingRef}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
