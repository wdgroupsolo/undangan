import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface ToastMethods {
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

export interface ToastContextType extends ToastMethods {
  toast: ToastMethods;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string, title?: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastItem = { id, type, message, title };

    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  }, [removeToast]);

  const toastMethods: ToastMethods = {
    success: (message: string, title?: string) => addToast('success', message, title || 'Berhasil'),
    error: (message: string, title?: string) => addToast('error', message, title || 'Gagal'),
    info: (message: string, title?: string) => addToast('info', message, title || 'Informasi'),
  };

  const contextValue: ToastContextType = {
    ...toastMethods,
    toast: toastMethods,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {/* Floating Modern Toast Notification Container */}
      <div 
        aria-live="polite" 
        className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            className={`pointer-events-auto w-full p-4 rounded-2xl backdrop-blur-xl border shadow-[0_12px_36px_rgba(0,0,0,0.18)] flex items-start gap-3.5 transition-all duration-300 animate-in slide-in-from-top-4 fade-in select-none ${
              item.type === 'success'
                ? 'bg-white/95 border-emerald-200/80 text-gray-900'
                : item.type === 'error'
                ? 'bg-white/95 border-rose-200/80 text-gray-900'
                : 'bg-white/95 border-blue-200/80 text-gray-900'
            }`}
          >
            {/* Type Icon with Soft Background Badge */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                item.type === 'success'
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  : item.type === 'error'
                  ? 'bg-rose-50 text-rose-600 border border-rose-100'
                  : 'bg-blue-50 text-blue-600 border border-blue-100'
              }`}
            >
              {item.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {item.type === 'error' && <AlertCircle className="w-5 h-5" />}
              {item.type === 'info' && <Info className="w-5 h-5" />}
            </div>

            {/* Text Content */}
            <div className="flex-1 pt-0.5">
              {item.title && (
                <h4 className="text-sm font-bold text-gray-900 tracking-tight leading-none mb-1">
                  {item.title}
                </h4>
              )}
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {item.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(item.id)}
              className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    const fallbackMethods: ToastMethods = {
      success: (msg: string) => console.log('Toast success:', msg),
      error: (msg: string) => console.error('Toast error:', msg),
      info: (msg: string) => console.info('Toast info:', msg),
    };
    return {
      ...fallbackMethods,
      toast: fallbackMethods,
    };
  }
  return context;
};
