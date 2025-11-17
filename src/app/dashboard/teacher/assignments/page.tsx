"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, FileText, Upload } from "lucide-react";
import { MOCK_ASSIGNMENTS } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Assignment } from "@/lib/types";

function AssignmentManagementContent() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const subjects = user?.metadata?.subjects || [];

  const handleAddAssignment = () => {
    toast.success("Assignment created successfully");
    setIsAddDialogOpen(false);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueBadge = (dueDate: string) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return <Badge variant="destructive">Overdue</Badge>;
    if (days === 0) return <Badge className="bg-yellow-500">Due Today</Badge>;
    if (days <= 3) return <Badge className="bg-orange-500">Due Soon</Badge>;
    return <Badge variant="secondary">Due in {days} days</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage assignments for your students
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>
                  Fill in the assignment details
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input id="title" placeholder="Mid-term Project" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Detailed instructions for the assignment..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="maxScore">Max Score</Label>
                    <Input id="maxScore" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Attach File (optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input id="file" type="file" />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAssignment}>Create Assignment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Assignments Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{assignment.subject}</Badge>
                      <span>•</span>
                      <span>{assignment.className}</span>
                    </div>
                  </div>
                  {getDueBadge(assignment.dueDate)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {assignment.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Max Score:</span>
                    <span className="font-medium">{assignment.maxScore} points</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">
                      {new Date(assignment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="pt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    View Submissions
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {assignments.length === 0 && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No assignments yet</p>
                <p className="text-sm mt-1">Create your first assignment to get started</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function AssignmentManagement() {
  return (
    <ProtectedRoute allowedRoles={["teacher"]}>
      <AssignmentManagementContent />
    </ProtectedRoute>
  );
}
