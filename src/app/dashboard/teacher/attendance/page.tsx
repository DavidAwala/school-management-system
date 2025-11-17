"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, X, Clock, Undo2, Save } from "lucide-react";
import { MOCK_STUDENTS, MOCK_CLASSES } from "@/lib/mock-data";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

type AttendanceStatus = "present" | "absent" | "late" | "excused" | null;

interface StudentAttendance {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
}

function AttendanceMarkingContent() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState(user?.metadata?.classId || "");
  const [attendance, setAttendance] = useState<StudentAttendance[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [lastAction, setLastAction] = useState<{ studentId: string; prevStatus: AttendanceStatus } | null>(null);

  const classStudents = MOCK_STUDENTS.filter((s) => s.classId === selectedClass);

  // Initialize attendance when class changes
  const initializeAttendance = () => {
    const initialAttendance = classStudents.map((student) => ({
      studentId: student.id,
      studentName: student.name,
      status: null as AttendanceStatus,
    }));
    setAttendance(initialAttendance);
    setHasChanges(false);
  };

  const markAttendance = (studentId: string, status: AttendanceStatus) => {
    const currentStudent = attendance.find((a) => a.studentId === studentId);
    setLastAction({
      studentId,
      prevStatus: currentStudent?.status || null,
    });
    
    setAttendance((prev) =>
      prev.map((item) =>
        item.studentId === studentId ? { ...item, status } : item
      )
    );
    setHasChanges(true);
  };

  const undoLastAction = () => {
    if (lastAction) {
      setAttendance((prev) =>
        prev.map((item) =>
          item.studentId === lastAction.studentId
            ? { ...item, status: lastAction.prevStatus }
            : item
        )
      );
      toast.success("Last action undone");
      setLastAction(null);
    }
  };

  const markAllPresent = () => {
    setAttendance((prev) =>
      prev.map((item) => ({ ...item, status: "present" as AttendanceStatus }))
    );
    setHasChanges(true);
    toast.success("All students marked present");
  };

  const saveAttendance = () => {
    // In production, this would save to the backend
    toast.success("Attendance saved successfully");
    setHasChanges(false);
    setLastAction(null);
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return "bg-secondary text-secondary-foreground";
      case "absent":
        return "bg-destructive text-destructive-foreground";
      case "late":
        return "bg-yellow-500 text-white";
      case "excused":
        return "bg-blue-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPresentCount = () => attendance.filter((a) => a.status === "present").length;
  const getAbsentCount = () => attendance.filter((a) => a.status === "absent").length;
  const getAttendanceRate = () => {
    const total = attendance.length;
    const present = getPresentCount();
    return total > 0 ? ((present / total) * 100).toFixed(1) : 0;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mark Attendance</h1>
            <p className="text-muted-foreground mt-1">
              Quick and easy attendance marking with undo support
            </p>
          </div>
          <div className="flex gap-2">
            {lastAction && (
              <Button variant="outline" onClick={undoLastAction}>
                <Undo2 className="h-4 w-4 mr-2" />
                Undo
              </Button>
            )}
            {hasChanges && (
              <Button onClick={saveAttendance} className="bg-secondary hover:bg-secondary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Attendance
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Date and Class Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_CLASSES.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedClass && (
                  <Button onClick={initializeAttendance} className="w-full">
                    Load Students
                  </Button>
                )}
              </CardContent>
            </Card>

            {attendance.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Students:</span>
                    <span className="font-semibold">{attendance.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Present:</span>
                    <span className="font-semibold text-secondary">{getPresentCount()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Absent:</span>
                    <span className="font-semibold text-destructive">{getAbsentCount()}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Attendance Rate:</span>
                      <span className="text-primary">{getAttendanceRate()}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Student List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Students</CardTitle>
                  {attendance.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={markAllPresent}
                    >
                      Mark All Present
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {attendance.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>Select a class and click "Load Students" to begin</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {attendance.map((student) => (
                      <div
                        key={student.studentId}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{student.studentName}</p>
                          <p className="text-sm text-muted-foreground">
                            {MOCK_STUDENTS.find((s) => s.id === student.studentId)?.admissionNo}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={student.status === "present" ? "default" : "outline"}
                            className={
                              student.status === "present"
                                ? "bg-secondary hover:bg-secondary/90"
                                : ""
                            }
                            onClick={() => markAttendance(student.studentId, "present")}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={student.status === "absent" ? "default" : "outline"}
                            className={
                              student.status === "absent"
                                ? "bg-destructive hover:bg-destructive/90"
                                : ""
                            }
                            onClick={() => markAttendance(student.studentId, "absent")}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Absent
                          </Button>
                          <Button
                            size="sm"
                            variant={student.status === "late" ? "default" : "outline"}
                            className={
                              student.status === "late"
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : ""
                            }
                            onClick={() => markAttendance(student.studentId, "late")}
                          >
                            <Clock className="h-4 w-4 mr-1" />
                            Late
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function AttendanceMarking() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AttendanceMarkingContent />
    </ProtectedRoute>
  );
}
