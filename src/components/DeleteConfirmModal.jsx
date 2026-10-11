import React, { useEffect } from 'react';

export default function DeleteConfirmModal({ student, isOpen, onClose, onConfirm }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-purple-100 transform transition-all animate-scale-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h3 id="delete-dialog-title" className="text-lg font-bold text-slate-800 tracking-tight">
              Delete Student Record?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              Are you sure you want to permanently remove <span className="font-semibold text-slate-800">{student.name}</span> (<span className="font-mono text-purple-700">{student.id}</span>) from the CampusConnect database?
            </p>
          </div>
        </div>

        {/* Student card summary snippet */}
        <div className="mt-4 p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-slate-600 flex items-center justify-between">
          <div>
            <p className="font-semibold text-purple-900">{student.name}</p>
            <p className="text-slate-500 text-[11px] font-mono mt-0.5">{student.email}</p>
          </div>
          <div className="flex gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-purple-200 text-purple-800 font-bold text-[10px]">
              {student.department}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 font-bold text-[10px]">
              {student.academicYear}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition-colors min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(student.id)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-red-200 transition-all min-h-[44px] flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" />
            </svg>
            <span>Delete Student</span>
          </button>
        </div>
      </div>
    </div>
  );
}
