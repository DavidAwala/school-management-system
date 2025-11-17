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
import { Search, Plus, Edit, Trash2, Users } from "lucide-react";
import { MOCK_CLASSES, MOCK_TEACHERS } from "@/lib/mock-data";
import { Class } from "@/lib/types";
import { toast } from "sonner";

function ClassManagementContent() {
  const [classes, setClasses] = useState<Class[]>(MOCK_CLASSES);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
    toast.success("Class deleted successfully");
  };

  const handleAddClass = () => {
    toast.success("Class added successfully");
    setIsAddDialogOpen(false);
  };

  const handleEditClass = () => {
    toast.success("Class updated successfully");
    setEditingClass(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Class Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage classes and their assignments
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Create a new class and assign a teacher
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Input id="grade" placeholder="10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section">Section</Label>
                    <Input id="section" placeholder="A" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacher">Assign Teacher</Label>
                  <Select>
                    <SelectTrigger id="teacher">
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_TEACHERS.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Student Capacity</Label>
                  <Input id="capacity" type="number" placeholder="30" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddClass}>Add Class</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by class name or teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Classes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{classItem.name}</span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingClass(classItem)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClass(classItem.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Class Teacher</span>
                    <span className="font-medium">{classItem.teacherName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Grade</span>
                    <span className="font-medium">{classItem.grade}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Section</span>
                    <span className="font-medium">{classItem.section}</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {classItem.studentCount} students
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(classItem.studentCount / 35) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={!!editingClass} onOpenChange={() => setEditingClass(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Class</DialogTitle>
              <DialogDescription>Update class information</DialogDescription>
            </DialogHeader>
            {editingClass && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-grade">Grade</Label>
                    <Input id="edit-grade" defaultValue={editingClass.grade} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-section">Section</Label>
                    <Input id="edit-section" defaultValue={editingClass.section} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-teacher">Assign Teacher</Label>
                  <Select defaultValue={editingClass.teacherId}>
                    <SelectTrigger id="edit-teacher">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_TEACHERS.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-count">Current Student Count</Label>
                  <Input
                    id="edit-count"
                    type="number"
                    defaultValue={editingClass.studentCount}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingClass(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditClass}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default function ClassManagement() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <ClassManagementContent />
    </ProtectedRoute>
  );
}
