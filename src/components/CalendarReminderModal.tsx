import React from 'react';
import { Calendar, Download, ExternalLink, X, MapPin, Clock } from 'lucide-react';
import { CalendarEventData, getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface CalendarReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEventData;
  themeStyle?: 'maroon' | 'gold' | 'rose' | 'vintage' | 'dark' | 'default';
}

export const CalendarReminderModal: React.FC<CalendarReminderModalProps> = ({
  isOpen,
  onClose,
  event,
  themeStyle = 'default',
}) => {
  if (!isOpen) return null;

  const handleOpenGoogle = () => {
    const url = getGoogleCalendarUrl(event);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadIcs = () => {
    downloadIcsFile(event, event.title || 'undangan-pernikahan');
  };

  // Format date display for Indonesia
  const formatDateDisplay = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-[#fffdfa] text-stone-800 rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200/80 overflow-hidden transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Tutup"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors duration-200 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="w-13 h-13 mx-auto mb-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shadow-xs">
            <Calendar size={26} />
          </div>
          <h3 
            className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Pengingat Kalender
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Simpan tanggal pernikahan ke kalender perangkat Anda
          </p>
        </div>

        {/* Event Card Summary */}
        <div className="bg-stone-50/90 rounded-2xl p-4 border border-stone-200/70 mb-6 space-y-2.5 text-xs text-stone-700">
          <div className="font-semibold text-sm text-stone-900 font-serif leading-snug">
            {event.title}
          </div>

          <div className="flex items-center gap-2 text-stone-600">
            <Calendar size={14} className="text-amber-600 shrink-0" />
            <span>{formatDateDisplay(event.eventDate)}</span>
          </div>

          {(event.startTime || event.endTime) && (
            <div className="flex items-center gap-2 text-stone-600">
              <Clock size={14} className="text-amber-600 shrink-0" />
              <span>
                {event.startTime ? `Pukul ${event.startTime}` : ''}
                {event.endTime ? ` - ${event.endTime}` : ''}
              </span>
            </div>
          )}

          {event.location && (
            <div className="flex items-start gap-2 text-stone-600">
              <MapPin size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <span className="leading-tight">{event.location}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Google Calendar Option */}
          <button
            type="button"
            onClick={handleOpenGoogle}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Calendar size={15} className="text-white" />
              </div>
              <div className="text-left">
                <div className="leading-tight font-semibold">Google Calendar</div>
                <div className="text-[10px] text-blue-100 font-normal">Buka di Android, Web, & Gmail</div>
              </div>
            </div>
            <ExternalLink size={15} className="text-white/80" />
          </button>

          {/* Apple / iCal (.ics) Option */}
          <button
            type="button"
            onClick={handleDownloadIcs}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-stone-900 hover:bg-black text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                <Download size={15} className="text-white" />
              </div>
              <div className="text-left">
                <div className="leading-tight font-semibold">Apple / iCal / Outlook</div>
                <div className="text-[10px] text-stone-300 font-normal">Unduh file .ics untuk iPhone & Mac</div>
              </div>
            </div>
            <Download size={15} className="text-stone-300" />
          </button>
        </div>

        {/* Footer info */}
        <p className="text-[11px] text-center text-stone-400 mt-5">
          Notifikasi pengingat otomatis akan diatur 1 hari & 2 jam sebelum acara.
        </p>
      </div>
    </div>
  );
};
