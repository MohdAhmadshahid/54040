import React, { useEffect } from 'react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  const bgColor = isSuccess ? 'bg-purple-900 text-white' : isError ? 'bg-red-800 text-white' : 'bg-slate-800 text-white';
  const iconColor = isSuccess ? 'text-purple-300' : isError ? 'text-red-300' : 'text-blue-300';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)] animate-slide-up">
      <div className={`flex items-start gap-3 p-4 rounded-xl shadow-xl border border-purple-500/20 ${bgColor} backdrop-blur-md`}>
        <div className={`mt-0.5 p-1 rounded-full bg-white/10 ${iconColor}`}>
          {isSuccess && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {isError && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {isInfo && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-purple-100">{toast.title || 'Notification'}</p>
          <p className="text-xs text-purple-200/90 mt-0.5 break-words">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="text-purple-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
