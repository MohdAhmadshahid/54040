import React from 'react';

export default function StudentCard({ student, onEdit, onDelete }) {
  // Department styling
  const deptColors = {
    AI: 'bg-purple-100 text-purple-800 border-purple-200',
    DS: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    CS: 'bg-violet-100 text-violet-800 border-violet-200',
    IT: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200'
  };

  const yearColors = {
    FY: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    SY: 'bg-amber-50 text-amber-700 border-amber-200',
    TY: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
      
      {/* Top row: Avatar + Name + ID + Badges */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-purple-200 shrink-0">
              {getInitials(student.name)}
            </div>
            <div className="min-w-0">
              <h4 className="text-base font-bold text-slate-800 tracking-tight truncate">
                {student.name}
              </h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                  {student.id}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${deptColors[student.department] || 'bg-slate-100 text-slate-700'}`}>
              {student.department}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${yearColors[student.academicYear] || 'bg-slate-100 text-slate-700'}`}>
              {student.academicYear}
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 truncate">
          <svg className="w-4 h-4 text-purple-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a
            href={`mailto:${student.email}`}
            className="hover:text-purple-700 truncate underline-offset-2 hover:underline"
            title={student.email}
          >
            {student.email}
          </a>
        </div>
      </div>

      {/* Action Buttons: min 44px height for mobile tapping */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => onEdit(student)}
          className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-semibold border border-purple-200 transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-purple-400 active:bg-purple-200"
          aria-label={`Edit ${student.name}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit</span>
        </button>

        <button
          onClick={() => onDelete(student)}
          className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-red-400 active:bg-red-200"
          aria-label={`Delete ${student.name}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Delete</span>
        </button>
      </div>

    </div>
  );
}
