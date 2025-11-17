"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardCheck, FileText, TrendingUp } from "lucide-react";
import { MOCK_STUDENTS, MOCK_ASSIGNMENTS, MOCK_ATTENDANCE } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";

function TeacherDashboardContent() {
  const { user } = useAuth();
  const myClass = user?.metadata?.classId;
  const myStudents = MOCK_STUDENTS.filter((s) => s.classId === myClass);
  const todayAttendance = MOCK_ATTENDANCE.filter(
    (a) => a.date === new Date().toISOString().split("T")[0]
  );
  const presentToday = todayAttendance.filter((a) => a.status === "present").length;
  const attendanceRate = myStudents.length > 0
    ? ((presentToday / myStudents.length) * 100).toFixed(1)
    : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}! Here's your class overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="My Students"
            value={myStudents.length}
            icon={Users}
            iconColor="text-primary"
            iconBgColor="bg-primary/10"
          />
          <StatsCard
            title="Present Today"
            value={presentToday}
            icon={ClipboardCheck}
            iconColor="text-secondary"
            iconBgColor="bg-secondary/10"
          />
          <StatsCard
            title="Attendance Rate"
            value={`${attendanceRate}%`}
            icon={TrendingUp}
            iconColor="text-secondary"
            iconBgColor="bg-secondary/10"
          />
          <StatsCard
            title="Active Assignments"
            value={MOCK_ASSIGNMENTS.length}
            icon={FileText}
            iconColor="text-accent"
            iconBgColor="bg-accent/10"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayAttendance.length > 0 ? (
                  todayAttendance.slice(0, 5).map((record) => (
                    <div key={record.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{record.studentName}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          record.status === "present"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {record.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No attendance marked yet today</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_ASSIGNMENTS.slice(0, 5).map((assignment) => (
                  <div key={assignment.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{assignment.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {assignment.subject}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Students */}
        <Card>
          <CardHeader>
            <CardTitle>My Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myStudents.slice(0, 6).map((student) => (
                <div key={student.id} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.admissionNo}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{student.className}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function TeacherDashboard() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <TeacherDashboardContent />
    </ProtectedRoute>
  );
}
