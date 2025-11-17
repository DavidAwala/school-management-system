"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCog,
  School,
  ClipboardCheck,
  FileText,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const getNavigationItems = () => {
    const commonItems = [
      { icon: LayoutDashboard, label: "Dashboard", href: `/dashboard/${user?.role}` },
    ];

    if (user?.role === "admin") {
      return [
        ...commonItems,
        { icon: Users, label: "Students", href: "/dashboard/admin/students" },
        { icon: UserCog, label: "Teachers", href: "/dashboard/admin/teachers" },
        { icon: School, label: "Classes", href: "/dashboard/admin/classes" },
        { icon: ClipboardCheck, label: "Attendance", href: "/dashboard/admin/attendance" },
        { icon: FileText, label: "Grades", href: "/dashboard/admin/grades" },
        { icon: CreditCard, label: "Billing", href: "/dashboard/admin/billing" },
        { icon: Bell, label: "Announcements", href: "/dashboard/admin/announcements" },
      ];
    }

    if (user?.role === "teacher") {
      return [
        ...commonItems,
        { icon: ClipboardCheck, label: "Attendance", href: "/dashboard/teacher/attendance" },
        { icon: FileText, label: "Grades", href: "/dashboard/teacher/grades" },
        { icon: FileText, label: "Assignments", href: "/dashboard/teacher/assignments" },
        { icon: Users, label: "Students", href: "/dashboard/teacher/students" },
      ];
    }

    if (user?.role === "parent") {
      return [
        ...commonItems,
        { icon: Users, label: "My Children", href: "/dashboard/parent/children" },
        { icon: FileText, label: "Report Cards", href: "/dashboard/parent/reports" },
        { icon: CreditCard, label: "Fee Payment", href: "/dashboard/parent/billing" },
        { icon: Bell, label: "Announcements", href: "/dashboard/parent/announcements" },
      ];
    }

    if (user?.role === "student") {
      return [
        ...commonItems,
        { icon: ClipboardCheck, label: "My Attendance", href: "/dashboard/student/attendance" },
        { icon: FileText, label: "My Grades", href: "/dashboard/student/grades" },
        { icon: FileText, label: "Assignments", href: "/dashboard/student/assignments" },
        { icon: Bell, label: "Announcements", href: "/dashboard/student/announcements" },
      ];
    }

    return commonItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary hidden sm:inline">EduFlow</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    <p className="text-xs leading-none text-muted-foreground capitalize mt-1">
                      Role: {user?.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card transition-transform duration-300 ease-in-out`}
        >
          <nav className="flex flex-col gap-1 p-4">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
