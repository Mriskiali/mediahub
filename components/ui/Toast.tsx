'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getToastColors = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-[#4ade80] text-black border-black'; // Green
      case 'error':
        return 'bg-[#f87171] text-black border-black'; // Red
      case 'info':
      default:
        return 'bg-[#60a5fa] text-black border-black'; // Blue
    }
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return '[V]';
      case 'error':
        return '[X]';
      case 'info':
      default:
        return '[i]';
    }
  };

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 border-4 brutal-shadow animate-in slide-in-from-bottom-5 fade-in duration-300 ${getToastColors(
              t.type
            )}`}
          >
            <span className="font-mono text-xl font-black leading-none bg-white px-2 py-1 border-2 border-black">
              {getToastIcon(t.type)}
            </span>
            <span className="font-bold uppercase tracking-wider text-sm pr-4">
              {t.message}
            </span>
            <button
              onClick={() => removeToast(t.id)}
              className="ml-auto bg-white hover:bg-black hover:text-white px-2 py-1 text-xs font-black border-2 border-black transition-colors"
            >
              [X]
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
