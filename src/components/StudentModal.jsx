import React, { useState, useEffect } from 'react';
import { DEPARTMENTS, ACADEMIC_YEARS } from '../data/initialStudents';

export default function StudentModal({ isOpen, onClose, onSave, studentToEdit, existingStudents }) {
  const isEditing = Boolean(studentToEdit);

  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    department: 'AI',
    academicYear: 'FY'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        id: studentToEdit.id || '',
        email: studentToEdit.email || '',
        department: studentToEdit.department || 'AI',
        academicYear: studentToEdit.academicYear || 'FY'
      });
    } else {
      // Suggest next sequential ID
      const count = existingStudents.length;
      const nextNum = String(count + 1).padStart(3, '0');
      setFormData({
        name: '',
        id: `CC-2024-${nextNum}`,
        email: '',
        department: 'AI',
        academicYear: 'FY'
      });
    }
    setErrors({});
  }, [studentToEdit, isOpen, existingStudents]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.id.trim()) {
      newErrors.id = 'Student ID is required';
    } else {
      const cleanId = formData.id.trim().toUpperCase();
      // Check ID uniqueness
      const duplicate = existingStudents.find(
        (s) => s.id.toUpperCase() === cleanId && (!isEditing || s.id !== studentToEdit.id)
      );
      if (duplicate) {
        newErrors.id = 'Student ID already exists for another student';
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.department) {
      newErrors.department = 'Please select a department';
    }

    if (!formData.academicYear) {
      newErrors.academicYear = 'Please select an academic year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      id: formData.id.trim().toUpperCase(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      department: formData.department,
      academicYear: formData.academicYear
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-purple-100 my-auto transform transition-all animate-scale-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              {isEditing ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              )}
            </div>
            <div>
              <h2 id="modal-title" className="text-lg font-bold text-slate-800 tracking-tight">
                {isEditing ? 'Edit Student Details' : 'Add New Student'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEditing ? 'Update student records in CampusConnect' : 'Enroll a student into the system'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close dialog"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-purple-600">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Aarav Sharma"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 min-h-[44px] transition-colors ${
                errors.name
                  ? 'border-red-300 focus:ring-red-400 bg-red-50/30'
                  : 'border-slate-200 focus:ring-purple-500 focus:border-purple-500'
              }`}
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          {/* Student ID & Email Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Student ID <span className="text-purple-600">*</span>
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="CC-2024-001"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 min-h-[44px] transition-colors ${
                  errors.id
                    ? 'border-red-300 focus:ring-red-400 bg-red-50/30'
                    : 'border-slate-200 focus:ring-purple-500 focus:border-purple-500'
                }`}
              />
              {errors.id && <p className="text-xs text-red-600 mt-1">{errors.id}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address <span className="text-purple-600">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@campusconnect.edu"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 min-h-[44px] transition-colors ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-400 bg-red-50/30'
                    : 'border-slate-200 focus:ring-purple-500 focus:border-purple-500'
                }`}
              />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Department & Academic Year Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Department <span className="text-purple-600">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[44px]"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.code} value={dept.code}>
                    {dept.code} - {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Academic Year <span className="text-purple-600">*</span>
              </label>
              <select
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 min-h-[44px]"
              >
                {ACADEMIC_YEARS.map((yr) => (
                  <option key={yr.code} value={yr.code}>
                    {yr.code} ({yr.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-purple-50 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm transition-colors min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-purple-300/50 transition-all min-h-[44px] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>{isEditing ? 'Save Changes' : 'Add Student'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
