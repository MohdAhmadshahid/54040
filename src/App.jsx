import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentDirectory from './components/StudentDirectory';
import StudentModal from './components/StudentModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { INITIAL_STUDENTS } from './data/initialStudents';

const LOCAL_STORAGE_KEY = 'campusconnect_students_v1';

export default function App() {
  // Load students from localStorage or fallback to INITIAL_STUDENTS
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    }
    return INITIAL_STUDENTS;
  });

  // Persist to localStorage whenever students state updates
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [students]);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Modals & Popups
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  // Add / Edit Handlers
  const handleOpenAddModal = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setStudentToEdit(null);
  };

  const handleSaveStudent = (studentData) => {
    if (studentToEdit) {
      // Edit
      setStudents((prev) =>
        prev.map((s) => (s.id === studentToEdit.id ? { ...s, ...studentData } : s))
      );
      showToast(
        'Student Updated',
        `Successfully updated details for ${studentData.name} (${studentData.id}).`,
        'success'
      );
    } else {
      // Add
      const newEntry = {
        ...studentData,
        createdAt: new Date().toISOString()
      };
      setStudents((prev) => [newEntry, ...prev]);
      showToast(
        'Student Enrolled',
        `Successfully added ${studentData.name} (${studentData.id}) to ${studentData.department}.`,
        'success'
      );
    }
    handleCloseModal();
  };

  // Delete Handlers
  const handleOpenDeleteModal = (student) => {
    setStudentToDelete(student);
  };

  const handleCloseDeleteModal = () => {
    setStudentToDelete(null);
  };

  const handleConfirmDelete = (id) => {
    const student = students.find((s) => s.id === id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast(
      'Student Removed',
      `Record for ${student ? student.name : id} was removed from CampusConnect.`,
      'info'
    );
    handleCloseDeleteModal();
  };

  // Reset Data to sample Indian students
  const handleResetData = () => {
    if (window.confirm('Reset all student records to the original 10 sample Indian college students?')) {
      setStudents(INITIAL_STUDENTS);
      setSearchQuery('');
      setSelectedDepartment('');
      setSelectedYear('');
      showToast(
        'Data Reset',
        'CampusConnect restored to the 10 initial sample college students.',
        'info'
      );
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('');
    setSelectedYear('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900">
      
      {/* Navigation */}
      <Navbar
        onOpenAddModal={handleOpenAddModal}
        onResetData={handleResetData}
        totalCount={students.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Interactive Dashboard with dynamic statistics */}
        <Dashboard
          students={students}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={setSelectedDepartment}
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
        />

        {/* Student Directory with Search, Filter & Actions */}
        <StudentDirectory
          students={students}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          onResetFilters={handleResetFilters}
          onEditStudent={handleOpenEditModal}
          onDeleteStudent={handleOpenDeleteModal}
          onOpenAddModal={handleOpenAddModal}
          totalStudents={students.length}
        />

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-100 py-6 sm:py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            <span className="font-bold text-slate-700">CampusConnect Student Management System</span>
          </div>
          <p>© 2026 CampusConnect. Real-time LocalStorage Persistence • Departments: AI, DS, CS, IT • Years: FY, SY, TY</p>
        </div>
      </footer>

      {/* Floating Action Button on mobile for easy tapping */}
      <div className="sm:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={handleOpenAddModal}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-lg shadow-purple-500/50 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-purple-300 active:scale-95 transition-all"
          aria-label="Add Student"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Add / Edit Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
        existingStudents={students}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(studentToDelete)}
        student={studentToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
