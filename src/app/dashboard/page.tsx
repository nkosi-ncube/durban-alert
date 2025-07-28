'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShieldAlert, CheckCircle, BarChartBig } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, BarChart, Bar, XAxis, YAxis } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "January", alerts: 186 },
  { month: "February", alerts: 305 },
  { month: "March", alerts: 237 },
  { month: "April", alerts: 73 },
  { month: "May", alerts: 209 },
  { month: "June", alerts: 214 },
]

const chartConfig = {
  alerts: {
    label: "Alerts",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function DashboardPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">15,847</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Areas Today</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">3</div>
            <p className="text-xs text-muted-foreground">Pinetown, Umlazi, Chatsworth</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delivery Success</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">94.2%</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts Sent (24h)</CardTitle>
            <BarChartBig className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">12,032</div>
            <p className="text-xs text-muted-foreground">+19% from last 24h</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Alerts Overview</CardTitle>
        </CardHeader>
        <CardContent>
           <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="alerts" fill="var(--color-alerts)" radius={4} />
              </BarChart>
            </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
