import { User, Student, Teacher, Class, AttendanceRecord, Grade, Assignment, Invoice, Announcement } from "./types";

// Demo users for quick login
export const DEMO_USERS: User[] = [
  {
    id: "admin-1",
    name: "Sarah Johnson",
    email: "admin@demo.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "teacher-1",
    name: "Michael Brown",
    email: "teacher@demo.com",
    role: "teacher",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    metadata: {
      teacherId: "t-001",
      subjects: ["Mathematics", "Physics"],
      classId: "class-10a",
    },
  },
  {
    id: "parent-1",
    name: "Emily Davis",
    email: "parent@demo.com",
    role: "parent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    metadata: {
      parentId: "p-001",
      children: ["s-001"],
    },
  },
  {
    id: "student-1",
    name: "Alex Davis",
    email: "student@demo.com",
    role: "student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    metadata: {
      studentId: "s-001",
      classId: "class-10a",
    },
  },
];

export const DEMO_PASSWORD = "demo123";

// Mock Students
export const MOCK_STUDENTS: Student[] = [
  {
    id: "s-001",
    name: "Alex Davis",
    email: "alex.davis@school.com",
    admissionNo: "2024001",
    classId: "class-10a",
    className: "Class 10-A",
    parentContact: "+1 (555) 100-0001",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    dateOfBirth: "2009-03-15",
    address: "123 Main St, City",
  },
  {
    id: "s-002",
    name: "Emma Wilson",
    email: "emma.wilson@school.com",
    admissionNo: "2024002",
    classId: "class-10a",
    className: "Class 10-A",
    parentContact: "+1 (555) 100-0002",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    dateOfBirth: "2009-05-22",
    address: "456 Oak Ave, City",
  },
  {
    id: "s-003",
    name: "Noah Martinez",
    email: "noah.martinez@school.com",
    admissionNo: "2024003",
    classId: "class-10a",
    className: "Class 10-A",
    parentContact: "+1 (555) 100-0003",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
    dateOfBirth: "2009-07-10",
    address: "789 Pine Rd, City",
  },
  {
    id: "s-004",
    name: "Olivia Taylor",
    email: "olivia.taylor@school.com",
    admissionNo: "2024004",
    classId: "class-10b",
    className: "Class 10-B",
    parentContact: "+1 (555) 100-0004",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    dateOfBirth: "2009-01-28",
    address: "321 Elm St, City",
  },
  {
    id: "s-005",
    name: "Liam Anderson",
    email: "liam.anderson@school.com",
    admissionNo: "2024005",
    classId: "class-10b",
    className: "Class 10-B",
    parentContact: "+1 (555) 100-0005",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    dateOfBirth: "2009-11-05",
    address: "654 Maple Dr, City",
  },
];

// Mock Teachers
export const MOCK_TEACHERS: Teacher[] = [
  {
    id: "t-001",
    name: "Michael Brown",
    email: "michael.brown@school.com",
    subjects: ["Mathematics", "Physics"],
    classId: "class-10a",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    phone: "+1 (555) 200-0001",
  },
  {
    id: "t-002",
    name: "Jennifer Lee",
    email: "jennifer.lee@school.com",
    subjects: ["English", "Literature"],
    classId: "class-10b",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    phone: "+1 (555) 200-0002",
  },
  {
    id: "t-003",
    name: "David Rodriguez",
    email: "david.rodriguez@school.com",
    subjects: ["Chemistry", "Biology"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    phone: "+1 (555) 200-0003",
  },
];

// Mock Classes
export const MOCK_CLASSES: Class[] = [
  {
    id: "class-10a",
    name: "Class 10-A",
    grade: "10",
    section: "A",
    teacherId: "t-001",
    teacherName: "Michael Brown",
    studentCount: 30,
  },
  {
    id: "class-10b",
    name: "Class 10-B",
    grade: "10",
    section: "B",
    teacherId: "t-002",
    teacherName: "Jennifer Lee",
    studentCount: 28,
  },
  {
    id: "class-9a",
    name: "Class 9-A",
    grade: "9",
    section: "A",
    teacherId: "t-003",
    teacherName: "David Rodriguez",
    studentCount: 32,
  },
];

// Mock Attendance
export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "att-001",
    studentId: "s-001",
    studentName: "Alex Davis",
    date: new Date().toISOString().split("T")[0],
    status: "present",
    recordedBy: "Michael Brown",
  },
  {
    id: "att-002",
    studentId: "s-002",
    studentName: "Emma Wilson",
    date: new Date().toISOString().split("T")[0],
    status: "present",
    recordedBy: "Michael Brown",
  },
  {
    id: "att-003",
    studentId: "s-003",
    studentName: "Noah Martinez",
    date: new Date().toISOString().split("T")[0],
    status: "absent",
    recordedBy: "Michael Brown",
    notes: "Sick leave",
  },
];

// Mock Grades
export const MOCK_GRADES: Grade[] = [
  {
    id: "grade-001",
    studentId: "s-001",
    studentName: "Alex Davis",
    subject: "Mathematics",
    assignmentName: "Mid-term Exam",
    score: 92,
    maxScore: 100,
    date: "2024-02-15",
    remarks: "Excellent work!",
  },
  {
    id: "grade-002",
    studentId: "s-001",
    studentName: "Alex Davis",
    subject: "Physics",
    assignmentName: "Lab Report",
    score: 88,
    maxScore: 100,
    date: "2024-02-20",
    remarks: "Good analysis",
  },
  {
    id: "grade-003",
    studentId: "s-002",
    studentName: "Emma Wilson",
    subject: "Mathematics",
    assignmentName: "Mid-term Exam",
    score: 95,
    maxScore: 100,
    date: "2024-02-15",
    remarks: "Outstanding!",
  },
];

// Mock Assignments
export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: "assign-001",
    title: "Quadratic Equations Worksheet",
    description: "Complete all problems from chapter 4. Show your work for full credit.",
    subject: "Mathematics",
    classId: "class-10a",
    className: "Class 10-A",
    teacherId: "t-001",
    teacherName: "Michael Brown",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
    maxScore: 100,
  },
  {
    id: "assign-002",
    title: "Newton's Laws Lab Report",
    description: "Write a detailed lab report on the experiment conducted in class.",
    subject: "Physics",
    classId: "class-10a",
    className: "Class 10-A",
    teacherId: "t-001",
    teacherName: "Michael Brown",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    createdAt: new Date().toISOString(),
    maxScore: 50,
  },
];

// Mock Invoices
export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-001",
    studentId: "s-001",
    studentName: "Alex Davis",
    amount: 2500,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "pending",
    description: "Tuition Fee - March 2024",
  },
  {
    id: "inv-002",
    studentId: "s-001",
    studentName: "Alex Davis",
    amount: 2500,
    dueDate: "2024-02-01",
    status: "paid",
    description: "Tuition Fee - February 2024",
    paidDate: "2024-01-28",
  },
  {
    id: "inv-003",
    studentId: "s-001",
    studentName: "Alex Davis",
    amount: 150,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "pending",
    description: "Lab Equipment Fee",
  },
];

// Mock Announcements
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-001",
    title: "Parent-Teacher Meeting Scheduled",
    content: "The parent-teacher meeting for all classes will be held on March 15th from 2 PM to 5 PM. Please confirm your attendance.",
    author: "Sarah Johnson",
    createdAt: new Date().toISOString(),
    priority: "high",
    targetRoles: ["parent", "teacher"],
  },
  {
    id: "ann-002",
    title: "Sports Day Registration Open",
    content: "Registration for the annual sports day is now open. Students can register through the portal until March 10th.",
    author: "Sarah Johnson",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    targetRoles: ["student", "parent", "teacher"],
  },
  {
    id: "ann-003",
    title: "Library Books Due",
    content: "All library books borrowed in February must be returned by March 5th to avoid late fees.",
    author: "Library Staff",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    priority: "low",
    targetRoles: ["student"],
  },
];

// Analytics Data
export const MOCK_ANALYTICS = {
  enrollment: {
    total: 856,
    change: 12.5,
    trend: "up" as const,
  },
  attendance: {
    percentage: 94.2,
    change: 2.1,
    trend: "up" as const,
  },
  fees: {
    collected: 234500,
    pending: 45200,
    change: 8.3,
    trend: "up" as const,
  },
  grades: {
    average: 87.5,
    change: 3.2,
    trend: "up" as const,
  },
};
