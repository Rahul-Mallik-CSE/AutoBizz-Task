/** @format */

"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAuthorization } from "@/redux/slices/authSlice";
import { fetchSales } from "@/redux/slices/salesSlice";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

function DashboardContent() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const filters = useAppSelector((state) => state.filters.filters);
  const loading = useAppSelector((state) => state.sales.loading);
  const error = useAppSelector((state) => state.sales.error);
  const authError = useAppSelector((state) => state.auth.error);

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

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Sales Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Track and analyze your sales data with powerful filters
          </p>
        </div>

        {/* Error States */}
        {authError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Authorization Error: {authError}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading sales data: {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {!token || loading ? (
          <Card className="flex items-center justify-center h-64">
            <CardContent className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">
                {!token ? "Initializing..." : "Loading sales data..."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Filters Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>
                  Adjust filters to see updated sales data in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <DateRangeFilter />
                <OtherFilters />
              </CardContent>
            </Card>

            {/* Chart Section */}
            <div className="mb-8">
              <SalesChart />
            </div>

            {/* Table Section */}
            <div>
              <SalesTable />
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function Page() {
  return <DashboardContent />;
}
