import React from 'react';

export default function EmptyState({ searchQuery, selectedDepartment, selectedYear, onResetFilters, onOpenAddModal, totalStudents }) {
  const isFiltered = Boolean(searchQuery || selectedDepartment || selectedYear);

  return (
    <div className="bg-white rounded-2xl border border-purple-100 p-8 sm:p-12 text-center shadow-sm my-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4 shadow-inner">
        {totalStudents === 0 ? (
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
        {totalStudents === 0 ? 'No Students in System' : 'No Matching Students Found'}
      </h3>

      <p className="text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
        {totalStudents === 0
          ? 'You currently have zero students registered in CampusConnect. You can add a new student or restore default sample data.'
          : isFiltered
          ? `We couldn't find any student matching ${
              searchQuery ? `"${searchQuery}"` : ''
            } with current filters. Try tweaking your search keywords or resetting active filters.`
          : 'No student records available.'}
      </p>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-purple-200 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[44px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Clear Search & Filters</span>
          </button>
        )}

        <button
          onClick={onOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[44px]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add New Student</span>
        </button>
      </div>
    </div>
  );
}
