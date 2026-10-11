import React from 'react';
import { DEPARTMENTS, ACADEMIC_YEARS } from '../data/initialStudents';

export default function Dashboard({ students, selectedDepartment, onSelectDepartment, selectedYear, onSelectYear }) {
  const total = students.length;

  const getDeptCount = (code) => students.filter((s) => s.department === code).length;
  const getYearCount = (code) => students.filter((s) => s.academicYear === code).length;

  const deptMeta = {
    AI: {
      fullName: 'Artificial Intelligence',
      badge: 'bg-purple-100 text-purple-800 border-purple-200',
      iconBg: 'bg-purple-600',
      activeBorder: 'ring-2 ring-purple-600 bg-purple-50/70',
      desc: 'Neural Networks & ML'
    },
    DS: {
      fullName: 'Data Science',
      badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      iconBg: 'bg-indigo-600',
      activeBorder: 'ring-2 ring-indigo-600 bg-indigo-50/70',
      desc: 'Analytics & Big Data'
    },
    CS: {
      fullName: 'Computer Science',
      badge: 'bg-violet-100 text-violet-800 border-violet-200',
      iconBg: 'bg-violet-600',
      activeBorder: 'ring-2 ring-violet-600 bg-violet-50/70',
      desc: 'Systems & Algorithms'
    },
    IT: {
      fullName: 'Information Technology',
      badge: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
      iconBg: 'bg-fuchsia-600',
      activeBorder: 'ring-2 ring-fuchsia-600 bg-fuchsia-50/70',
      desc: 'Networks & Cloud Ops'
    }
  };

  return (
    <section className="space-y-6">
      {/* Top Banner / Welcome & Quick Overview */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-950/10 relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold backdrop-blur-md mb-3 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-300"></span>
              Live Academic Session 2024–2025
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              CampusConnect Overview
            </h1>
            <p className="text-purple-200/90 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Real-time monitoring and directory management across all four specialized engineering departments.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-purple-400/20 flex items-center justify-center text-purple-200">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-purple-200 font-medium">Total Enrolled</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white">{total}</span>
                <span className="text-xs text-purple-200 font-semibold">Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Department Statistics Cards */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>Department Breakdown</span>
            <span className="text-xs font-normal text-slate-500">(Click a card to filter)</span>
          </h2>
          {selectedDepartment && (
            <button
              onClick={() => onSelectDepartment('')}
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 underline"
            >
              Reset department filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEPARTMENTS.map((dept) => {
            const count = getDeptCount(dept.code);
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            const meta = deptMeta[dept.code];
            const isSelected = selectedDepartment === dept.code;

            return (
              <button
                key={dept.code}
                onClick={() => onSelectDepartment(isSelected ? '' : dept.code)}
                className={`text-left p-5 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all duration-200 relative group overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  isSelected ? meta.activeBorder : 'hover:border-purple-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      {dept.code}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 mt-0.5 line-clamp-1">
                      {meta.fullName}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{meta.desc}</p>
                  </div>
                  <span className={`w-8 h-8 rounded-xl ${meta.iconBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm`}>
                    {dept.code}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-800">{count}</span>
                    <span className="text-xs text-slate-500 font-medium">students</span>
                  </div>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                    {percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Academic Year Distribution */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-purple-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800">
              Academic Year Distribution
            </h3>
            <p className="text-xs text-slate-500">Distribution across First Year (FY), Second Year (SY), and Third Year (TY)</p>
          </div>
          {selectedYear && (
            <button
              onClick={() => onSelectYear('')}
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 underline self-start sm:self-auto"
            >
              Reset year filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {ACADEMIC_YEARS.map((yr) => {
            const count = getYearCount(yr.code);
            const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
            const isSelected = selectedYear === yr.code;

            return (
              <button
                key={yr.code}
                onClick={() => onSelectYear(isSelected ? '' : yr.code)}
                className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50/70 shadow-sm'
                    : 'border-slate-100 hover:border-purple-200 bg-slate-50/50 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-purple-900 text-sm">{yr.code}</span>
                    <span className="text-xs text-slate-600 font-medium">({yr.name})</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-lg font-black text-slate-800">{count}</span>
                    <span className="text-[11px] text-slate-500">students</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-purple-700">{percentage}%</span>
                  <div className="w-16 bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
