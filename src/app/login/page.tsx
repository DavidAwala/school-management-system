"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, LogIn, Users } from "lucide-react";
import { toast } from "sonner";
import { DEMO_USERS, DEMO_PASSWORD } from "@/lib/mock-data";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Login successful!");
      
      // Redirect based on role
      const user = DEMO_USERS.find(u => u.email === email);
      const dashboardRoutes = {
        admin: "/dashboard/admin",
        teacher: "/dashboard/teacher",
        parent: "/dashboard/parent",
        student: "/dashboard/student",
      };
      
      if (user) {
        router.push(dashboardRoutes[user.role]);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: string) => {
    const demoUser = DEMO_USERS.find(u => u.role === role);
    if (demoUser) {
      setEmail(demoUser.email);
      setPassword(DEMO_PASSWORD);
      setIsLoading(true);
      
      try {
        await login(demoUser.email, DEMO_PASSWORD);
        toast.success(`Logged in as ${role}!`);
        
        const dashboardRoutes = {
          admin: "/dashboard/admin",
          teacher: "/dashboard/teacher",
          parent: "/dashboard/parent",
          student: "/dashboard/student",
        };
        
        router.push(dashboardRoutes[demoUser.role]);
      } catch (error) {
        toast.error("Demo login failed");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-6">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="bg-primary p-3 rounded-xl group-hover:bg-primary/90 transition-colors">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-primary">EduFlow</span>
          </Link>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome Back to Your School Management Hub
            </h1>
            <p className="text-lg text-muted-foreground">
              Access your personalized dashboard to manage students, track attendance, view grades, and stay connected with your school community.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-secondary font-bold">✓</span>
              </div>
              <p className="text-foreground">Real-time attendance tracking</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-secondary font-bold">✓</span>
              </div>
              <p className="text-foreground">Comprehensive grade management</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-secondary font-bold">✓</span>
              </div>
              <p className="text-foreground">Seamless parent communication</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full space-y-6">
          <Card className="border-border shadow-xl">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
              </div>
              <CardDescription>
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@school.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or try demo mode</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Users className="h-4 w-4" />
                  <span>Quick Demo Login (Password: demo123)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("admin")}
                    disabled={isLoading}
                  >
                    Admin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("teacher")}
                    disabled={isLoading}
                  >
                    Teacher
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("parent")}
                    disabled={isLoading}
                  >
                    Parent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin("student")}
                    disabled={isLoading}
                  >
                    Student
                  </Button>
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                New to EduFlow?{" "}
                <Link href="/admissions" className="text-primary font-medium hover:underline">
                  Apply for admission
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials Card */}
          <Card className="border-secondary/20 bg-secondary/5">
            <CardContent className="pt-6">
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-foreground">Demo Credentials:</p>
                <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                  <div>
                    <p className="font-medium">Admin:</p>
                    <p className="text-xs">admin@demo.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Teacher:</p>
                    <p className="text-xs">teacher@demo.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Parent:</p>
                    <p className="text-xs">parent@demo.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Student:</p>
                    <p className="text-xs">student@demo.com</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground pt-2">All passwords: demo123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
