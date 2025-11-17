"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Calendar,
  FileText,
  Bell,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { MOCK_GRADES, MOCK_ASSIGNMENTS, MOCK_ANNOUNCEMENTS, MOCK_ATTENDANCE } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";

function StudentDashboardContent() {
  const { user } = useAuth();
  const studentId = user?.metadata?.studentId;
  
  const myGrades = MOCK_GRADES.filter((g) => g.studentId === studentId);
  const myAnnouncements = MOCK_ANNOUNCEMENTS.filter((a) =>
    a.targetRoles.includes("student")
  );
  const myAttendance = MOCK_ATTENDANCE.filter((a) => a.studentId === studentId);
  const presentDays = myAttendance.filter((a) => a.status === "present").length;
  const attendanceRate = myAttendance.length > 0 
    ? ((presentDays / myAttendance.length) * 100).toFixed(1) 
    : 0;

  const calculateAverageGrade = () => {
    if (myGrades.length === 0) return 0;
    const avg = myGrades.reduce((acc, g) => acc + (g.score / g.maxScore) * 100, 0) / myGrades.length;
    return avg.toFixed(1);
  };

  const upcomingAssignments = MOCK_ASSIGNMENTS.filter(assignment => {
    const dueDate = new Date(assignment.dueDate);
    const today = new Date();
    return dueDate > today;
  }).slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your progress and stay on top of assignments
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateAverageGrade()}%</div>
              <p className="text-xs text-muted-foreground mt-1">Overall performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendanceRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">{presentDays} days present</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAssignments.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Due this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Announcements</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myAnnouncements.length}</div>
              <p className="text-xs text-muted-foreground mt-1">New updates</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myGrades.slice(0, 5).map((grade) => (
                  <div key={grade.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{grade.assignmentName}</p>
                        <p className="text-xs text-muted-foreground">{grade.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">
                          {grade.score}/{grade.maxScore}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {((grade.score / grade.maxScore) * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <Progress value={(grade.score / grade.maxScore) * 100} />
                    {grade.remarks && (
                      <p className="text-xs text-muted-foreground italic">"{grade.remarks}"</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAssignments.map((assignment) => {
                  const dueDate = new Date(assignment.dueDate);
                  const today = new Date();
                  const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={assignment.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{assignment.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {assignment.subject} • {assignment.className}
                          </p>
                        </div>
                        <Badge
                          variant={daysUntilDue <= 2 ? "destructive" : "secondary"}
                        >
                          {daysUntilDue === 0 ? "Today" : `${daysUntilDue}d`}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Due: {dueDate.toLocaleDateString()}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="h-3 w-3 mr-2" />
                        View Details
                      </Button>
                    </div>
                  );
                })}
                {upcomingAssignments.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No upcoming assignments
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myAnnouncements.slice(0, 3).map((announcement) => (
                  <div key={announcement.id} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold">{announcement.title}</h3>
                      </div>
                      <Badge
                        variant={
                          announcement.priority === "high"
                            ? "destructive"
                            : announcement.priority === "medium"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{announcement.content}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(announcement.createdAt).toLocaleDateString()} • By {announcement.author}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function StudentDashboard() {
  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}
