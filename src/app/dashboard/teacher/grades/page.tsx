"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Edit } from "lucide-react";
import { MOCK_STUDENTS, MOCK_GRADES } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Grade } from "@/lib/types";

function GradeManagementContent() {
  const { user } = useAuth();
  const [grades, setGrades] = useState<Grade[]>(MOCK_GRADES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);

  const myStudents = MOCK_STUDENTS.filter((s) => s.classId === user?.metadata?.classId);
  const subjects = user?.metadata?.subjects || [];

  const filteredGrades = grades.filter(
    (grade) =>
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.assignmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGrade = () => {
    toast.success("Grade added successfully");
    setIsAddDialogOpen(false);
  };

  const handleEditGrade = () => {
    toast.success("Grade updated successfully");
    setEditingGrade(null);
  };

  const getGradePercentage = (score: number, maxScore: number) => {
    return ((score / maxScore) * 100).toFixed(1);
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-secondary";
    if (percentage >= 75) return "text-primary";
    if (percentage >= 60) return "text-yellow-600";
    return "text-destructive";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Grade Management</h1>
            <p className="text-muted-foreground mt-1">
              Enter and manage student grades
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Grade
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Grade</DialogTitle>
                <DialogDescription>
                  Enter grade information for a student
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="student">Student</Label>
                    <Select>
                      <SelectTrigger id="student">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {myStudents.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignment">Assignment Name</Label>
                  <Input id="assignment" placeholder="Mid-term Exam" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="score">Score</Label>
                    <Input id="score" type="number" placeholder="85" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxScore">Max Score</Label>
                    <Input id="maxScore" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks (optional)</Label>
                  <Textarea id="remarks" placeholder="Excellent work!" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGrade}>Add Grade</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student, subject, or assignment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Grades ({filteredGrades.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.map((grade) => {
                    const percentage = parseFloat(getGradePercentage(grade.score, grade.maxScore));
                    return (
                      <TableRow key={grade.id}>
                        <TableCell className="font-medium">{grade.studentName}</TableCell>
                        <TableCell>{grade.subject}</TableCell>
                        <TableCell>{grade.assignmentName}</TableCell>
                        <TableCell>
                          {grade.score}/{grade.maxScore}
                        </TableCell>
                        <TableCell>
                          <span className={`font-semibold ${getGradeColor(percentage)}`}>
                            {percentage}%
                          </span>
                        </TableCell>
                        <TableCell>{new Date(grade.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingGrade(grade)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingGrade} onOpenChange={() => setEditingGrade(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Grade</DialogTitle>
              <DialogDescription>Update grade information</DialogDescription>
            </DialogHeader>
            {editingGrade && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Student</Label>
                    <Input value={editingGrade.studentName} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input value={editingGrade.subject} disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-assignment">Assignment Name</Label>
                  <Input id="edit-assignment" defaultValue={editingGrade.assignmentName} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-score">Score</Label>
                    <Input id="edit-score" type="number" defaultValue={editingGrade.score} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-maxScore">Max Score</Label>
                    <Input id="edit-maxScore" type="number" defaultValue={editingGrade.maxScore} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-remarks">Remarks</Label>
                  <Textarea id="edit-remarks" defaultValue={editingGrade.remarks} />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingGrade(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditGrade}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default function GradeManagement() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <GradeManagementContent />
    </ProtectedRoute>
  );
}
