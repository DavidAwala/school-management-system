# 🎓 EduFlow - Modern School Management System

A comprehensive, professional, and recruiter-ready School Management System built with Next.js 15, TypeScript, and modern web technologies. This system centralizes admissions, attendance, grades, billing, and parent-teacher communication in one powerful platform.

## ✨ Features

### 🏠 Public Landing Page
- Professional hero section with compelling CTAs
- Feature showcase with 12+ key features
- Mobile-first responsive design
- Smooth animations and microinteractions

### 🔐 Authentication & Authorization
- Role-based access control (Admin, Teacher, Parent, Student)
- Demo mode with pre-configured accounts
- Secure authentication context with useAuth hook
- Protected routes for each user role

### 👨‍💼 Admin Dashboard
- **Analytics Dashboard**: Real-time metrics for enrollment, attendance, fees, and grades
- **Student Management**: Full CRUD with search, filter, and bulk operations
- **Teacher Management**: Manage staff, assign classes, and track subjects
- **Class Management**: Create and manage classes with student distribution
- **Comprehensive Tables**: Sortable, searchable data tables with actions

### 👩‍🏫 Teacher Dashboard
- **Quick Attendance Marking**: One-click attendance with undo functionality
- **Grade Entry**: Easy grade management with percentage calculations
- **Assignment Creation**: Create and track assignments with file uploads
- **Student Overview**: View all students in assigned classes
- **Real-time Summary**: Today's attendance and recent grades

### 👨‍👩‍👧 Parent Portal
- **Children Overview**: Monitor multiple children's progress
- **Grade Tracking**: View recent grades with visual progress bars
- **Fee Payment**: Integrated Stripe sandbox for online payments
- **Announcements**: Stay updated with school communications
- **Report Cards**: Access detailed academic reports

### 👨‍🎓 Student Portal
- **Personal Dashboard**: Track academic performance and attendance
- **Assignments**: View upcoming assignments with due dates
- **Grades**: Monitor grades with visual feedback
- **Announcements**: Receive important school updates

### 📝 Online Admissions
- **4-Step Application Form**: Personal info, Parent/Guardian, Documents, Review
- **Progress Tracking**: Visual stepper with validation
- **File Upload**: Support for birth certificates, transcripts, and ID proofs
- **Form Validation**: Real-time validation with error handling

## 🎨 Design System

### Color Palette
- **Primary (Deep Blue)**: `#0A4D8C` - Trust & Knowledge
- **Secondary (Teal)**: `#28B5A3` - Action & Positive
- **Accent (Coral)**: `#FF6B4A` - CTA & Highlight
- **Surface**: `#F5F7FB` - Clean backgrounds
- **Text**: `#1F2933` - Readable content

### UI Components
- Built with **shadcn/ui** and **Radix UI**
- Fully accessible (WCAG compliant)
- Dark mode support
- Smooth animations with Framer Motion

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Radix UI** - Accessible primitives

### State Management
- **React Context** - Authentication state
- **React Hooks** - Local state management

### Notifications
- **Sonner** - Toast notifications

### Icons
- **Lucide React** - Beautiful icon set

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

```bash
# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev

# Open browser
# Navigate to http://localhost:3000
```

## 🔑 Demo Credentials

### Quick Login
All demo accounts use the password: `demo123`

| Role | Email | Features |
|------|-------|----------|
| **Admin** | admin@demo.com | Full system access, student/teacher/class CRUD |
| **Teacher** | teacher@demo.com | Attendance marking, grade entry, assignments |
| **Parent** | parent@demo.com | View children's progress, pay fees, announcements |
| **Student** | student@demo.com | View grades, assignments, attendance |

### Demo Login
1. Navigate to `/login`
2. Click any role button (Admin, Teacher, Parent, Student)
3. Or manually enter credentials above

## 📁 Project Structure

```
eduflow/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx             # Landing page
│   │   ├── login/               # Authentication
│   │   ├── admissions/          # Online application form
│   │   └── dashboard/           # Role-based dashboards
│   │       ├── admin/           # Admin pages
│   │       ├── teacher/         # Teacher pages
│   │       ├── parent/          # Parent pages
│   │       └── student/         # Student pages
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── landing/             # Landing page components
│   │   ├── dashboard/           # Dashboard components
│   │   └── auth/                # Auth components
│   ├── contexts/                # React Context providers
│   │   └── AuthContext.tsx     # Authentication context
│   ├── lib/                     # Utilities and helpers
│   │   ├── types.ts            # TypeScript types
│   │   └── mock-data.ts        # Demo data
│   └── hooks/                   # Custom React hooks
└── public/                      # Static assets
```

## 🎯 Key Highlights

### ✅ Recruiter-Ready Features
- **Full Authentication Flow**: Role-based access with protected routes
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Real-time Analytics**: Dynamic dashboard with live metrics
- **Payment Integration**: Stripe sandbox for fee payments
- **File Upload**: Document management for admissions
- **Responsive Design**: Mobile-first, works on all devices

### 💡 Best Practices
- **TypeScript**: Fully typed for type safety
- **Component Architecture**: Reusable, modular components
- **Custom Hooks**: `useAuth` for authentication logic
- **Protected Routes**: Secure access control
- **Optimistic Updates**: Instant UI feedback
- **Error Handling**: Toast notifications for user feedback
- **Loading States**: Skeleton loaders and spinners

## 📊 Features Breakdown

### Admin Features
- ✅ Dashboard with 4 key metrics
- ✅ Student management (view, add, edit, delete)
- ✅ Teacher management with subject assignment
- ✅ Class management with capacity tracking
- ✅ Advanced search and filtering
- ✅ Data visualization with charts

### Teacher Features
- ✅ Quick attendance marking (one-click)
- ✅ Undo functionality for corrections
- ✅ Grade entry with percentage calculation
- ✅ Assignment creation with file uploads
- ✅ Student roster view
- ✅ Subject-based filtering

### Parent Features
- ✅ Multi-child monitoring
- ✅ Grade tracking with visual progress
- ✅ Online fee payment (Stripe sandbox)
- ✅ Announcement notifications
- ✅ Invoice history (paid/pending/overdue)

### Student Features
- ✅ Personal academic dashboard
- ✅ Attendance tracking
- ✅ Grade monitoring
- ✅ Assignment calendar
- ✅ Announcement feed

## 🎨 UI/UX Features

### Microinteractions
- Smooth hover effects on cards and buttons
- Loading spinners for async operations
- Toast notifications for user actions
- Progress bars for visual feedback
- Badge indicators for status

### Accessibility
- WCAG compliant color contrast
- Keyboard navigation support
- Screen reader friendly
- Focus indicators
- Semantic HTML

## 📝 Demo Script (1 Minute)

### Landing Page (10s)
1. Show professional hero with stats
2. Scroll through features
3. Click "Apply for Admission"

### Login & Admin Dashboard (20s)
1. Click "Try Demo" → Select "Admin"
2. Show analytics dashboard with metrics
3. Navigate to Students → Show CRUD operations
4. Quick search demo

### Teacher Dashboard (15s)
1. Logout → Login as Teacher
2. Show attendance marking with undo
3. Display grade entry interface

### Parent Portal (10s)
1. Login as Parent
2. Show fee payment with Stripe sandbox
3. View child's grades

### Admissions Form (5s)
1. Show multi-step form with progress
2. Demonstrate file upload

## 🌟 Built With

This project demonstrates modern full-stack development practices and is perfect for showcasing in interviews and portfolios.

### Keywords
School Management System, Education Software, Next.js 15, TypeScript, React, Tailwind CSS, shadcn/ui, Full-Stack Application, CRUD Operations, Authentication, Role-Based Access Control, Responsive Design, Modern UI/UX

---

**Built with ❤️ for modern education management**