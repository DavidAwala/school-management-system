"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary p-1">
          <div className="bg-card rounded-3xl p-12 sm:p-16">
            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Ready to Transform Your School?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of schools that have modernized their operations with EduFlow. 
                Start your journey today with our easy online admission process.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/admissions">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
                    Apply for Admission
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Try Demo Account
                  </Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 pt-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">Quick Setup</div>
                    <div className="text-sm text-muted-foreground">Get started in minutes</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">24/7 Support</div>
                    <div className="text-sm text-muted-foreground">We're here to help</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">Free Training</div>
                    <div className="text-sm text-muted-foreground">Comprehensive onboarding</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
