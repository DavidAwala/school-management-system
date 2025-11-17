"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-medium text-secondary">
              <CheckCircle2 className="h-4 w-4" />
              <span>Trusted by 500+ Schools Worldwide</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Modern School Management{" "}
              <span className="text-primary">Made Simple</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Streamline admissions, attendance, grades, billing, and parent-teacher communication 
              in one powerful, mobile-first platform. Built for the future of education.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/admissions">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
                  Apply for Admission
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="group">
                  <Play className="mr-2 h-5 w-5" />
                  Try Demo
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Schools</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-secondary">50K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-accent">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary via-secondary to-accent/50 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=600&fit=crop"
                  alt="Students learning"
                  className="w-full h-full object-cover mix-blend-overlay opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-sm mx-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">Attendance Marked</div>
                        <div className="text-xs text-muted-foreground">Class 10-A • 28/30 Present</div>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: '93%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-lg p-4 shadow-lg hidden lg:block">
              <div className="text-2xl font-bold text-secondary">↑ 24%</div>
              <div className="text-xs text-muted-foreground">Enrollment Growth</div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg hidden lg:block">
              <div className="text-2xl font-bold text-primary">4.9★</div>
              <div className="text-xs text-muted-foreground">Parent Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
