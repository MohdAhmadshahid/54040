# CampusConnect - Student Management System

A modern, responsive, and mobile-friendly Student Management System (SMS) built with **React** and styled in an elegant **purple-and-white** theme.

---

## 🌟 Key Features

1. **Branding & Theme**:
   - Branded as **CampusConnect** throughout the interface.
   - Polished purple-and-white visual design with smooth hover transitions, glassmorphic headers, and clear contrast.

2. **Realistic Indian Student Records**:
   - Initialized with 10 sample Indian college students:
     1. **Aarav Sharma** (CC-2024-001, AI, TY)
     2. **Priya Patil** (CC-2024-002, CS, SY)
     3. **Rohan Verma** (CC-2024-003, DS, TY)
     4. **Sneha Singh** (CC-2024-004, IT, FY)
     5. **Aditya Joshi** (CC-2024-005, AI, SY)
     6. **Ananya Deshmukh** (CC-2024-006, CS, TY)
     7. **Rahul Gupta** (CC-2024-007, IT, SY)
     8. **Neha Kulkarni** (CC-2024-008, DS, FY)
     9. **Arjun Mehta** (CC-2024-009, CS, FY)
     10. **Pooja Shah** (CC-2024-010, IT, TY)

3. **Specialized Departments**:
   - **AI** (Artificial Intelligence)
   - **DS** (Data Science)
   - **CS** (Computer Science)
   - **IT** (Information Technology)

4. **Academic Years**:
   - **FY** (First Year)
   - **SY** (Second Year)
   - **TY** (Third Year)

5. **Full Interactivity**:
   - **Add Student**: Enroll new students with validation (Full Name, unique Student ID, valid Email, Department, and Academic Year).
   - **Edit Student**: Update student details in real time.
   - **Delete Student with Confirmation Dialog**: Prevents accidental deletions with a modal popup.
   - **Instant Search**: Search dynamically across student names and student IDs.
   - **Department & Academic Year Filters**: Clickable filter chips with active student count counters.
   - **Dynamic Live Statistics**: Total student count and department-wise percentages recompute automatically.
   - **Success Feedback**: Polished toast alerts appear whenever a student is enrolled, edited, or removed.
   - **Helpful Empty State**: Displays friendly guidance and a "Clear Search & Filters" button when no results match.

6. **Local Persistence**:
   - All student records are saved in the browser's `localStorage` (`campusconnect_students_v1`).
   - Changes persist across page refreshes.
   - Includes a "Reset Sample Data" button to restore the initial 10 students anytime.

7. **Mobile-First Responsive Layout**:
   - Tap-friendly buttons (minimum 44px tap targets).
   - Responsive layout preventing horizontal overflow.
   - Renders touch-optimized card layout on mobile and expansive table layout on desktop/tablets.
   - Mobile Floating Action Button (FAB) for quick enrollment.

---

## 🚀 How to Run

### Method 1: Instant Browser Launch (Zero Installation Required)
Double-click `index.html` in file explorer or run:
```bash
start index.html
```

### Method 2: Local HTTP Server
Double-click `run_app.bat` or run:
```bash
python -m http.server 3000
```
Then open `http://localhost:3000` in any web browser.

### Method 3: Standard Vite / Node Development
```bash
npm install
npm run dev
```

---

## 🧪 Running Automated Tests
Run the comprehensive test suite:
```bash
node test_campus_connect.js
```
All 62 tests validate initial data, departments, years, search, filtering, add, edit, delete, stats recomputation, and localStorage persistence.
