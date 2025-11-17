"use client";

import {
  UserPlus,
  ClipboardCheck,
  GraduationCap,
  CreditCard,
  Bell,
  Shield,
  BarChart3,
  Users,
  Calendar,
  FileText,
  Smartphone,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: UserPlus,
    title: "Online Admissions",
    description: "Streamlined application process with document upload and automated workflows.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: ClipboardCheck,
    title: "Smart Attendance",
    description: "One-click attendance marking with real-time notifications and analytics.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: GraduationCap,
    title: "Grade Management",
    description: "Digital report cards, grade entry, and progress tracking for every student.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: CreditCard,
    title: "Billing & Payments",
    description: "Automated invoicing with online payment integration and fee reminders.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Email & SMS alerts for attendance, fees, announcements, and important updates.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Secure permissions for admins, teachers, parents, and students.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Calendar,
    title: "Timetable Management",
    description: "Dynamic scheduling with automatic conflict detection and updates.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: FileText,
    title: "Assignment Tracking",
    description: "Create, submit, and grade assignments with file attachments and deadlines.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Real-time insights on enrollment, attendance trends, and financial metrics.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Users,
    title: "Parent Portal",
    description: "Keep parents informed with student progress, events, and direct messaging.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Responsive interface that works perfectly on all devices and screen sizes.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed with modern technology ensuring instant responses.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            Everything You Need
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful Features for Modern Schools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of tools to manage every aspect of your educational institution efficiently.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <CardContent className="p-6 space-y-4">
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
