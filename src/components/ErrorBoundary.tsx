import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-stone-200 p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 mx-auto bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center text-amber-600">
              <AlertTriangle size={28} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-stone-900">Terjadi Kendala Memuat Halaman</h2>
              <p className="text-sm text-stone-600">
                Sistem mendeteksi kesalahan tampilan. Anda dapat mencoba memuat ulang halaman atau kembali ke beranda.
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 bg-stone-100 rounded-xl text-left border border-stone-200">
                <p className="text-[11px] font-mono text-stone-700 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center space-x-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors cursor-pointer"
              >
                <RefreshCw size={16} />
                <span>Muat Ulang</span>
              </button>
              <a
                href="/"
                className="flex-1 flex items-center justify-center space-x-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors"
              >
                <Home size={16} />
                <span>Beranda</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
