"use client";

import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCog, School, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { MOCK_ANALYTICS, MOCK_STUDENTS, MOCK_TEACHERS, MOCK_CLASSES } from "@/lib/mock-data";

function AdminDashboardContent() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your school's performance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Students"
            value={MOCK_ANALYTICS.enrollment.total}
            change={MOCK_ANALYTICS.enrollment.change}
            trend={MOCK_ANALYTICS.enrollment.trend}
            icon={Users}
            iconColor="text-primary"
            iconBgColor="bg-primary/10"
          />
          <StatsCard
            title="Attendance Rate"
            value={`${MOCK_ANALYTICS.attendance.percentage}%`}
            change={MOCK_ANALYTICS.attendance.change}
            trend={MOCK_ANALYTICS.attendance.trend}
            icon={TrendingUp}
            iconColor="text-secondary"
            iconBgColor="bg-secondary/10"
          />
          <StatsCard
            title="Fees Collected"
            value={`$${(MOCK_ANALYTICS.fees.collected / 1000).toFixed(0)}K`}
            change={MOCK_ANALYTICS.fees.change}
            trend={MOCK_ANALYTICS.fees.trend}
            icon={DollarSign}
            iconColor="text-accent"
            iconBgColor="bg-accent/10"
          />
          <StatsCard
            title="Average Grade"
            value={`${MOCK_ANALYTICS.grades.average}%`}
            change={MOCK_ANALYTICS.grades.change}
            trend={MOCK_ANALYTICS.grades.trend}
            icon={TrendingUp}
            iconColor="text-secondary"
            iconBgColor="bg-secondary/10"
          />
        </div>

        {/* Quick Stats Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_TEACHERS.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active teaching staff</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <School className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_CLASSES.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Active classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(MOCK_ANALYTICS.fees.pending / 1000).toFixed(0)}K
              </div>
              <p className="text-xs text-muted-foreground mt-1">Outstanding payments</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Students */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_STUDENTS.slice(0, 5).map((student) => (
                <div key={student.id} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.className}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{student.admissionNo}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Class Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Class Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_CLASSES.map((classItem) => (
                <div key={classItem.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{classItem.name}</span>
                    <span className="text-muted-foreground">
                      {classItem.studentCount} students
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(classItem.studentCount / 35) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
