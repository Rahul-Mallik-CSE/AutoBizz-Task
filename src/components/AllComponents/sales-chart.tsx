/** @format */

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function SalesChart() {
  const totalSales = useSelector((state: RootState) => state.sales.totalSales);

  if (!totalSales || totalSales.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Total Sales Over Time</CardTitle>
          <CardDescription>
            No data available for the selected date range
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
          No sales data to display
        </CardContent>
      </Card>
    );
  }

  const chartData = totalSales.map((item) => ({
    day: new Date(item.day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    totalSale: item.totalSale,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Sales Over Time</CardTitle>
        <CardDescription>
          Daily sales trend for the selected period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="day" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
            />
            <Line
              type="monotone"
              dataKey="totalSale"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
