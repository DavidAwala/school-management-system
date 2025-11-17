export type UserRole = "admin" | "teacher" | "parent" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  metadata?: {
    studentId?: string;
    teacherId?: string;
    parentId?: string;
    classId?: string;
    subjects?: string[];
    children?: string[]; // For parents
  };
}

export interface Student {
  id: string;
  name: string;
  email: string;
  admissionNo: string;
  classId: string;
  className: string;
  parentContact: string;
  avatar?: string;
  dateOfBirth: string;
  address: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  classId?: string;
  avatar?: string;
  phone: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  teacherId: string;
  teacherName: string;
  studentCount: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  recordedBy: string;
  notes?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  assignmentName: string;
  score: number;
  maxScore: number;
  date: string;
  remarks?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subject: string;
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  createdAt: string;
  fileUrl?: string;
  maxScore: number;
}

export interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  description: string;
  paidDate?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  priority: "high" | "medium" | "low";
  targetRoles: UserRole[];
}
