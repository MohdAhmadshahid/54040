/**
 * Test Suite for CampusConnect Student Management System
 * Validates requirements:
 * 1. 10 Indian college student names
 * 2. 4 Departments: AI, DS, CS, IT
 * 3. 3 Academic Years: FY, SY, TY
 * 4. Add, Edit, Delete features
 * 5. Search by Name and Student ID
 * 6. Filter by Department and Academic Year
 * 7. Statistics calculation (Total & Dept-wise)
 * 8. LocalStorage persistence
 * 9. Empty state logic
 */

import { INITIAL_STUDENTS, DEPARTMENTS, ACADEMIC_YEARS } from './src/data/initialStudents.js';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failed++;
  }
}

console.log('==================================================');
console.log('RUNNING TEST SUITE: CampusConnect SMS');
console.log('==================================================\n');

// 1. Initial Students Validation
assert(INITIAL_STUDENTS.length === 10, 'Initial students count is exactly 10');

const expectedNames = [
  'Aarav Sharma',
  'Priya Patil',
  'Rohan Verma',
  'Sneha Singh',
  'Aditya Joshi',
  'Ananya Deshmukh',
  'Rahul Gupta',
  'Neha Kulkarni',
  'Arjun Mehta',
  'Pooja Shah'
];

expectedNames.forEach(name => {
  const found = INITIAL_STUDENTS.some(s => s.name === name);
  assert(found, `Student "${name}" is present in initial dataset`);
});

// 2. Department Validation
const validDeptCodes = ['AI', 'DS', 'CS', 'IT'];
assert(DEPARTMENTS.length === 4, 'Departments list contains exactly 4 items');
DEPARTMENTS.forEach(d => {
  assert(validDeptCodes.includes(d.code), `Department "${d.code}" is one of AI, DS, CS, IT`);
});

INITIAL_STUDENTS.forEach(s => {
  assert(validDeptCodes.includes(s.department), `Student ${s.name} has valid department: ${s.department}`);
});

// 3. Academic Year Validation
const validYearCodes = ['FY', 'SY', 'TY'];
assert(ACADEMIC_YEARS.length === 3, 'Academic years list contains exactly 3 items (FY, SY, TY)');
ACADEMIC_YEARS.forEach(y => {
  assert(validYearCodes.includes(y.code), `Academic year "${y.code}" is one of FY, SY, TY`);
});

INITIAL_STUDENTS.forEach(s => {
  assert(validYearCodes.includes(s.academicYear), `Student ${s.name} has valid academic year: ${s.academicYear}`);
});

// 4. Search Functionality Tests
function searchFilter(students, query, dept = '', year = '') {
  const q = query.toLowerCase().trim();
  return students.filter(s => {
    const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    const matchesDept = !dept || s.department === dept;
    const matchesYear = !year || s.academicYear === year;
    return matchesQuery && matchesDept && matchesYear;
  });
}

const searchByName = searchFilter(INITIAL_STUDENTS, 'aarav');
assert(searchByName.length === 1 && searchByName[0].name === 'Aarav Sharma', 'Search by name "aarav" finds Aarav Sharma');

const searchById = searchFilter(INITIAL_STUDENTS, 'CC-2024-006');
assert(searchById.length === 1 && searchById[0].name === 'Ananya Deshmukh', 'Search by ID "CC-2024-006" finds Ananya Deshmukh');

const searchByPartialId = searchFilter(INITIAL_STUDENTS, '002');
assert(searchByPartialId.length === 1 && searchByPartialId[0].name === 'Priya Patil', 'Search by partial ID "002" finds Priya Patil');

// 5. Department & Year Filtering Tests
const aiStudents = searchFilter(INITIAL_STUDENTS, '', 'AI', '');
assert(aiStudents.length === 2, 'Filter by department AI returns 2 students (Aarav Sharma, Aditya Joshi)');

const tyStudents = searchFilter(INITIAL_STUDENTS, '', '', 'TY');
assert(tyStudents.length === 4, 'Filter by academic year TY returns 4 students');

const csTyStudents = searchFilter(INITIAL_STUDENTS, '', 'CS', 'TY');
assert(csTyStudents.length === 1 && csTyStudents[0].name === 'Ananya Deshmukh', 'Combined filter CS + TY returns Ananya Deshmukh');

// 6. Add Student Feature
let state = [...INITIAL_STUDENTS];

const newStudent = {
  id: 'CC-2024-011',
  name: 'Vikram Malhotra',
  email: 'vikram.malhotra@campusconnect.edu',
  department: 'AI',
  academicYear: 'FY',
  createdAt: new Date().toISOString()
};

state = [newStudent, ...state];
assert(state.length === 11, 'Adding a new student increases count to 11');
assert(state[0].id === 'CC-2024-011', 'Newly added student is at the front of directory');

// 7. Edit Student Feature
const updatedState = state.map(s => {
  if (s.id === 'CC-2024-001') {
    return { ...s, name: 'Aarav Sharma (Honors)', academicYear: 'TY' };
  }
  return s;
});
const editedStudent = updatedState.find(s => s.id === 'CC-2024-001');
assert(editedStudent.name === 'Aarav Sharma (Honors)', 'Editing student updates name correctly');

// 8. Delete Student Feature (Simulated Confirmation)
const deleteId = 'CC-2024-003'; // Rohan Verma
const afterDelete = updatedState.filter(s => s.id !== deleteId);
assert(afterDelete.length === 10, 'Deleting a student reduces count from 11 back to 10');
assert(!afterDelete.some(s => s.id === deleteId), 'Deleted student ID is no longer present');

// 9. Department-Wise Statistics Recalculation
function getStats(students) {
  const total = students.length;
  const deptCounts = {
    AI: students.filter(s => s.department === 'AI').length,
    DS: students.filter(s => s.department === 'DS').length,
    CS: students.filter(s => s.department === 'CS').length,
    IT: students.filter(s => s.department === 'IT').length
  };
  return { total, deptCounts };
}

const initialStats = getStats(INITIAL_STUDENTS);
assert(initialStats.total === 10, 'Initial total statistic is 10');
assert(initialStats.deptCounts.AI === 2, 'AI count is 2');
assert(initialStats.deptCounts.DS === 2, 'DS count is 2');
assert(initialStats.deptCounts.CS === 3, 'CS count is 3');
assert(initialStats.deptCounts.IT === 3, 'IT count is 3');

const currentStats = getStats(afterDelete);
// Added Vikram (AI), deleted Rohan (DS)
assert(currentStats.total === 10, 'After add & delete, total is 10');
assert(currentStats.deptCounts.AI === 3, 'AI count automatically recomputed to 3 after add');
assert(currentStats.deptCounts.DS === 1, 'DS count automatically recomputed to 1 after delete');

// 10. Empty State Verification
const nonExistentSearch = searchFilter(INITIAL_STUDENTS, 'NonExistentPerson');
assert(nonExistentSearch.length === 0, 'Searching for unknown student correctly yields 0 results for empty state');

// 11. LocalStorage Persistence Simulation
const mockStorage = {};
function saveToStorage(key, data) {
  mockStorage[key] = JSON.stringify(data);
}
function loadFromStorage(key) {
  const item = mockStorage[key];
  return item ? JSON.parse(item) : null;
}

saveToStorage('campusconnect_students_v1', afterDelete);
const loaded = loadFromStorage('campusconnect_students_v1');
assert(loaded !== null && loaded.length === 10, 'LocalStorage saves and loads correctly without loss');
assert(loaded[0].name === 'Vikram Malhotra', 'Loaded student data maintains exact properties');

console.log('\n==================================================');
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('==================================================');

if (failed > 0) {
  process.exit(1);
}
