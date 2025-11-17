"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  FileText,
  Bell,
  CreditCard,
} from "lucide-react";
import { MOCK_STUDENTS, MOCK_GRADES, MOCK_INVOICES, MOCK_ANNOUNCEMENTS } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

function ParentDashboardContent() {
  const { user } = useAuth();
  const childrenIds = user?.metadata?.children || [];
  const children = MOCK_STUDENTS.filter((s) => childrenIds.includes(s.id));
  
  // Get data for first child (in real app, would show for all children)
  const firstChild = children[0];
  const childGrades = MOCK_GRADES.filter((g) => g.studentId === firstChild?.id);
  const childInvoices = MOCK_INVOICES.filter((i) => i.studentId === firstChild?.id);
  const pendingInvoices = childInvoices.filter((i) => i.status === "pending");
  const parentAnnouncements = MOCK_ANNOUNCEMENTS.filter((a) =>
    a.targetRoles.includes("parent")
  );

  const calculateAverageGrade = () => {
    if (childGrades.length === 0) return 0;
    const avg = childGrades.reduce((acc, g) => acc + (g.score / g.maxScore) * 100, 0) / childGrades.length;
    return avg.toFixed(1);
  };

  const getTotalPendingFees = () => {
    return pendingInvoices.reduce((acc, inv) => acc + inv.amount, 0);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Parent Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your child's progress and stay connected
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Children</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{children.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateAverageGrade()}%</div>
              <p className="text-xs text-muted-foreground mt-1">Academic performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${getTotalPendingFees()}</div>
              <p className="text-xs text-muted-foreground mt-1">{pendingInvoices.length} invoice(s)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Announcements</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{parentAnnouncements.length}</div>
              <p className="text-xs text-muted-foreground mt-1">New updates</p>
            </CardContent>
          </Card>
        </div>

        {/* My Children */}
        <Card>
          <CardHeader>
            <CardTitle>My Children</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {children.map((child) => (
                <div key={child.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {child.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{child.name}</p>
                      <p className="text-sm text-muted-foreground">{child.className}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{child.admissionNo}</Badge>
                    <Link href="/dashboard/parent/reports">
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {childGrades.slice(0, 5).map((grade) => (
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Fees */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Fees</CardTitle>
              <Link href="/dashboard/parent/billing">
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Now
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingInvoices.slice(0, 5).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{invoice.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${invoice.amount}</p>
                      <Badge variant="destructive" className="text-xs">Pending</Badge>
                    </div>
                  </div>
                ))}
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
                {parentAnnouncements.slice(0, 3).map((announcement) => (
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

export default function ParentDashboard() {
  return (
    <ProtectedRoute allowedRoles={["parent"]}>
      <ParentDashboardContent />
    </ProtectedRoute>
  );
}
