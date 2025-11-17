"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change !== undefined && (
              <div className="flex items-center gap-1 text-sm">
                {trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-secondary" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span className={trend === "up" ? "text-secondary" : "text-destructive"}>
                  {change > 0 ? "+" : ""}
                  {change}%
                </span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            )}
          </div>
          <div className={`h-14 w-14 rounded-xl ${iconBgColor} flex items-center justify-center`}>
            <Icon className={`h-7 w-7 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
