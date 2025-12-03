/** @format */

"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAuthorization } from "@/redux/slices/authSlice";
import { fetchSales, fetchChartData } from "@/redux/slices/salesSlice";
import { DateRangeFilter } from "@/components/AllComponents/filters/date-range-filter";
import { OtherFilters } from "@/components/AllComponents/filters/other-filters";
import { SalesChart } from "@/components/AllComponents/sales-chart";
import { SalesTable } from "@/components/AllComponents/sales-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


function DashboardContent() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const filters = useAppSelector((state) => state.filters.filters);


  useEffect(() => {
    if (!token) {
      dispatch(getAuthorization());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(
        fetchSales({
          token,
          startDate: filters.startDate,
          endDate: filters.endDate,
          priceMin: filters.priceMin,
          email: filters.email,
          phone: filters.phone,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
        })
      );
    }
  }, [token, filters, dispatch]);

  // Separate effect for chart data - only depends on date range, not other filters
  useEffect(() => {
    if (token) {
      dispatch(
        fetchChartData({
          token,
          startDate: filters.startDate,
          endDate: filters.endDate,
        })
      );
    }
  }, [token, filters.startDate, filters.endDate, dispatch]);

  return (
    <main className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-4 ">
          <h1 className="text-2xl font-bold text-foreground">
            Track and analyze your sales data with powerful filters
          </h1>
        </div>

        {/* Sticky Filters Section */}
        <div className="sticky top-12 z-40 ">
          <div className=" py-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>
                  Adjust filters to see updated sales data in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <DateRangeFilter />
                <OtherFilters />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content Section */}
        <div className="">
          {/* Chart Section */}
          <div className="mb-8 mt-8">
            <SalesChart />
          </div>

          {/* Table Section */}
          <div>
            <SalesTable />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return <DashboardContent />;
}
