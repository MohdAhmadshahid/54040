import React, { useState } from 'react';
import StudentCard from './StudentCard';
import EmptyState from './EmptyState';
import { DEPARTMENTS, ACADEMIC_YEARS } from '../data/initialStudents';

export default function StudentDirectory({
  students,
  searchQuery,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  selectedYear,
  onYearChange,
  onResetFilters,
  onEditStudent,
  onDeleteStudent,
  onOpenAddModal,
  totalStudents
}) {
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('auto'); // 'auto', 'table', 'cards'

  // Filter logic: search by student name OR student ID
  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q);

    const matchesDept = !selectedDepartment || s.department === selectedDepartment;
    const matchesYear = !selectedYear || s.academicYear === selectedYear;

    return matchesSearch && matchesDept && matchesYear;
  });

  // Sorting
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'id-asc':
        return a.id.localeCompare(b.id);
      case 'id-desc':
        return b.id.localeCompare(a.id);
      case 'dept':
        return a.department.localeCompare(b.department);
      case 'year':
        return a.academicYear.localeCompare(b.academicYear);
      default:
        return 0;
    }
  });

  const deptBadgeStyle = {
    AI: 'bg-purple-100 text-purple-800 border-purple-200',
    DS: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    CS: 'bg-violet-100 text-violet-800 border-violet-200',
    IT: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200'
  };

  const yearBadgeStyle = {
    FY: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    SY: 'bg-amber-50 text-amber-700 border-amber-200',
    TY: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  const isFiltered = Boolean(searchQuery || selectedDepartment || selectedYear);

  return (
    <section className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-100 shadow-sm space-y-4">
        
        {/* Top Controls: Search Input + Sort */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search by Name or ID */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-purple-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by student name or student ID (e.g. Aarav or CC-2024)..."
              className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[44px] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label="Clear search text"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Sort & View Mode Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
              <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500 hidden sm:inline">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[44px]"
              >
                <option value="name-asc">Name (A → Z)</option>
                <option value="name-desc">Name (Z → A)</option>
                <option value="id-asc">Student ID (Asc)</option>
                <option value="id-desc">Student ID (Desc)</option>
                <option value="dept">Department</option>
                <option value="year">Academic Year</option>
              </select>
            </div>

            {/* View Switcher (Desktop toggle) */}
            <div className="hidden md:flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 min-h-[44px]">
              <button
                onClick={() => setViewMode('table')}
                title="Table View"
                className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'table' || viewMode === 'auto'
                    ? 'bg-white text-purple-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                title="Grid Cards View"
                className={`p-2 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white text-purple-800 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Filter Pills: Department & Academic Year */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          
          {/* Department Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Dept:</span>
            <button
              onClick={() => onDepartmentChange('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] flex items-center ${
                !selectedDepartment
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              All
            </button>
            {DEPARTMENTS.map((dept) => {
              const active = selectedDepartment === dept.code;
              return (
                <button
                  key={dept.code}
                  onClick={() => onDepartmentChange(active ? '' : dept.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] flex items-center gap-1 ${
                    active
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <span>{dept.code}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${active ? 'bg-purple-800 text-purple-200' : 'bg-slate-200 text-slate-600'}`}>
                    {students.filter((s) => s.department === dept.code).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Academic Year Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Year:</span>
            <button
              onClick={() => onYearChange('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] flex items-center ${
                !selectedYear
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              All
            </button>
            {ACADEMIC_YEARS.map((yr) => {
              const active = selectedYear === yr.code;
              return (
                <button
                  key={yr.code}
                  onClick={() => onYearChange(active ? '' : yr.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] flex items-center gap-1 ${
                    active
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  <span>{yr.code}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${active ? 'bg-purple-800 text-purple-200' : 'bg-slate-200 text-slate-600'}`}>
                    {students.filter((s) => s.academicYear === yr.code).length}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Active Filters / Results info bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Showing <strong className="text-slate-800">{sortedStudents.length}</strong> of{' '}
              <strong className="text-slate-800">{totalStudents}</strong> students
            </span>
            {isFiltered && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-medium">
                Active filters applied
              </span>
            )}
          </div>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 underline flex items-center gap-1 focus:outline-none"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Reset all</span>
            </button>
          )}
        </div>

      </div>

      {/* Main Student Listing */}
      {sortedStudents.length === 0 ? (
        <EmptyState
          searchQuery={searchQuery}
          selectedDepartment={selectedDepartment}
          selectedYear={selectedYear}
          onResetFilters={onResetFilters}
          onOpenAddModal={onOpenAddModal}
          totalStudents={totalStudents}
        />
      ) : (
        <>
          {/* Mobile view (<768px): Card view is ALWAYS shown on small mobile screens to prevent cramped rows & horizontal overflow */}
          <div className={`grid grid-cols-1 gap-3.5 ${viewMode === 'cards' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:hidden'}`}>
            {sortedStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={onEditStudent}
                onDelete={onDeleteStudent}
              />
            ))}
          </div>

          {/* Desktop/Tablet Table view (>= 768px when viewMode !== 'cards') */}
          <div className={`hidden ${viewMode !== 'cards' ? 'md:block' : ''} bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-50/70 border-b border-purple-100 text-[11px] font-bold uppercase tracking-wider text-purple-900">
                    <th scope="col" className="py-3.5 px-4 sm:px-6">Student Details</th>
                    <th scope="col" className="py-3.5 px-4">Student ID</th>
                    <th scope="col" className="py-3.5 px-4">Email Address</th>
                    <th scope="col" className="py-3.5 px-4">Department</th>
                    <th scope="col" className="py-3.5 px-4">Academic Year</th>
                    <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-50 text-sm">
                  {sortedStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-purple-50/40 transition-colors group"
                    >
                      {/* Name + Avatar */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm shrink-0">
                            {student.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 group-hover:text-purple-900 transition-colors">
                              {student.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Student ID */}
                      <td className="py-4 px-4">
                        <span className="font-mono text-xs font-semibold text-purple-800 bg-purple-50 px-2 py-1 rounded-md border border-purple-100">
                          {student.id}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4">
                        <a
                          href={`mailto:${student.email}`}
                          className="text-xs text-slate-600 hover:text-purple-700 underline-offset-2 hover:underline"
                        >
                          {student.email}
                        </a>
                      </td>

                      {/* Department */}
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${deptBadgeStyle[student.department] || 'bg-slate-100 text-slate-700'}`}>
                          {student.department}
                        </span>
                      </td>

                      {/* Academic Year */}
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${yearBadgeStyle[student.academicYear] || 'bg-slate-100 text-slate-700'}`}>
                          {student.academicYear}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditStudent(student)}
                            className="p-2 rounded-lg text-purple-700 hover:text-purple-900 hover:bg-purple-100/70 transition-colors focus:outline-none min-h-[38px] min-w-[38px] flex items-center justify-center"
                            title={`Edit ${student.name}`}
                            aria-label={`Edit ${student.name}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          <button
                            onClick={() => onDeleteStudent(student)}
                            className="p-2 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors focus:outline-none min-h-[38px] min-w-[38px] flex items-center justify-center"
                            title={`Delete ${student.name}`}
                            aria-label={`Delete ${student.name}`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
