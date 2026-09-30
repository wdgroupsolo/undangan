export interface CalendarEventData {
  title: string;
  description?: string;
  location?: string;
  eventDate: string; // 'YYYY-MM-DD' or ISO string
  startTime?: string; // '09:00', '09.00', '10:00 WIB'
  endTime?: string; // '12:00', '13.00', 'Selesai'
}

/**
 * Format Date & Time into ISO strings for Google Calendar & iCal.
 * Defaults to Asia/Jakarta (WIB, UTC+7) if raw date is parsed without offset.
 */
export const parseEventTimes = (event: CalendarEventData) => {
  const rawDate = event.eventDate || new Date().toISOString().split('T')[0];
  const dateOnly = rawDate.includes('T') ? rawDate.split('T')[0] : rawDate;

  // Clean time strings (e.g. "09.00 WIB" -> "09:00")
  const parseHourMin = (timeStr?: string): { hour: number; minute: number } | null => {
    if (!timeStr) return null;
    const clean = timeStr.toLowerCase().replace('wib', '').trim().replace('.', ':');
    const parts = clean.split(':');
    if (parts.length >= 2) {
      const h = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      if (!isNaN(h) && !isNaN(m)) {
        return { hour: h, minute: m };
      }
    }
    return null;
  };

  const startHM = parseHourMin(event.startTime);
  const endHM = parseHourMin(event.endTime);

  // If no specific hour is given, treat as all-day event
  if (!startHM) {
    const d = new Date(dateOnly);
    const startStr = d.toISOString().replace(/-/g, '').split('T')[0];
    d.setDate(d.getDate() + 1);
    const endStr = d.toISOString().replace(/-/g, '').split('T')[0];
    return {
      allDay: true,
      googleDates: `${startStr}/${endStr}`,
      startIsoIcs: `${startStr}`,
      endIsoIcs: `${endStr}`,
    };
  }

  // Construct start date in UTC assuming WIB (UTC+7)
  const [yearStr, monthStr, dayStr] = dateOnly.split('-');
  const y = parseInt(yearStr, 10);
  const m = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  // Local WIB Date: UTC = WIB - 7 hours
  const startDate = new Date(Date.UTC(y, m, day, startHM.hour - 7, startHM.minute, 0));

  let endDate: Date;
  if (endHM) {
    endDate = new Date(Date.UTC(y, m, day, endHM.hour - 7, endHM.minute, 0));
    // If end is before or equal to start, add 3 hours
    if (endDate <= startDate) {
      endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
    }
  } else {
    // Default duration: 3 hours for wedding event
    endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);
  }

  const formatIcsDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startIso = formatIcsDate(startDate);
  const endIso = formatIcsDate(endDate);

  return {
    allDay: false,
    googleDates: `${startIso}/${endIso}`,
    startIsoIcs: startIso,
    endIsoIcs: endIso,
  };
};

/**
 * Generates an instant URL to create an event in Google Calendar
 */
export const getGoogleCalendarUrl = (event: CalendarEventData): string => {
  const { googleDates } = parseEventTimes(event);
  const title = encodeURIComponent(event.title || 'Undangan Pernikahan');
  const details = encodeURIComponent(
    event.description || 'Undangan Pernikahan. Mohon doa restu atas pernikahan kami.'
  );
  const location = encodeURIComponent(event.location || 'Lokasi Acara');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${googleDates}`;
};

/**
 * Generates valid iCalendar (.ics) content for Apple Calendar, iOS, Outlook, etc.
 */
export const generateIcsContent = (event: CalendarEventData): string => {
  const { allDay, startIsoIcs, endIsoIcs } = parseEventTimes(event);
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `wedding-${Date.now()}@undanganpernikahan.com`;
  const cleanTitle = (event.title || 'Undangan Pernikahan').replace(/,/g, '\\,');
  const cleanLocation = (event.location || '').replace(/,/g, '\\,');
  const cleanDescription = (event.description || 'Undangan Pernikahan. Mohon doa restu atas pernikahan kami.').replace(/\n/g, '\\n').replace(/,/g, '\\,');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WD Group//Undangan Pernikahan//ID',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    allDay ? `DTSTART;VALUE=DATE:${startIsoIcs}` : `DTSTART:${startIsoIcs}`,
    allDay ? `DTEND;VALUE=DATE:${endIsoIcs}` : `DTEND:${endIsoIcs}`,
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${cleanDescription}`,
    cleanLocation ? `LOCATION:${cleanLocation}` : '',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Pengingat Acara Pernikahan Besok',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Pengingat Acara Pernikahan Segera Dimulai',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
};

/**
 * Triggers a download of a .ics file on the client (compatible with iOS, Mac, Windows, Android)
 */
export const downloadIcsFile = (event: CalendarEventData, filename?: string) => {
  const safeFilename = (filename || event.title || 'undangan-pernikahan')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-');
  
  const icsData = generateIcsContent(event);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${safeFilename}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => window.URL.revokeObjectURL(url), 2000);
};
