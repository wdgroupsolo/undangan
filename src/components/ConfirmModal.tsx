import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, HelpCircle, X, PauseCircle } from 'lucide-react';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  variant = 'danger',
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          icon: PauseCircle,
          iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
          btnConfirm: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20',
          accentBorder: 'border-amber-100',
        };
      case 'info':
        return {
          icon: HelpCircle,
          iconBg: 'bg-blue-50 text-blue-700 border-blue-200',
          btnConfirm: 'bg-primary-800 hover:bg-primary-900 text-white shadow-primary-900/20',
          accentBorder: 'border-stone-100',
        };
      case 'danger':
      default:
        return {
          icon: Trash2,
          iconBg: 'bg-red-50 text-red-600 border-red-200',
          btnConfirm: 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20',
          accentBorder: 'border-red-100',
        };
    }
  };

  const style = getVariantStyles();
  const IconComponent = style.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 cursor-pointer" 
        onClick={onCancel}
        aria-hidden="true" 
      />

      {/* Modal Dialog Card */}
      <div className={`relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border ${style.accentBorder} animate-in zoom-in-95 duration-200`}>
        
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors flex items-center justify-center cursor-pointer"
          title="Tutup"
        >
          <X size={16} />
        </button>

        {/* Header with Icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${style.iconBg} shadow-2xs`}>
            <IconComponent size={24} />
          </div>
          <div className="pt-1 pr-6">
            <h3 className="text-lg font-bold text-stone-900 leading-snug">
              {title}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">Konfirmasi Tindakan</p>
          </div>
        </div>

        {/* Body Message */}
        <div className="text-sm text-stone-600 leading-relaxed pl-0 sm:pl-16 mb-6">
          {message}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 ${style.btnConfirm}`}
          >
            {isLoading && (
              <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            <span>{confirmText}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

