/** @format */

"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchSales } from "@/redux/slices/salesSlice";
import { setSorting } from "@/redux/slices/filtersSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

export function SalesTable() {
  const dispatch = useAppDispatch();
  const sales = useAppSelector((state) => state.sales.sales);
  const pagination = useAppSelector((state) => state.sales.pagination);
  const loading = useAppSelector((state) => state.sales.loading);
  const filters = useAppSelector((state) => state.filters.filters);
  const token = useAppSelector((state) => state.auth.token);

  const handleSort = (column: "date" | "price") => {
    const newOrder =
      filters.sortBy === column && filters.sortOrder === "asc" ? "desc" : "asc";
    dispatch(
      setSorting({ sortBy: column, sortOrder: newOrder as "asc" | "desc" })
    );
  };

  const handlePaginationChange = (direction: "next" | "prev") => {
    if (!token) return;

    const paginationToken =
      direction === "next" ? pagination.after : pagination.before;
    if (!paginationToken) return;

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
        [direction === "next" ? "after" : "before"]: paginationToken,
      })
    );
  };

  const renderSortIcon = (column: "date" | "price") => {
    if (filters.sortBy !== column)
      return <ArrowUpDown className="w-4 h-4 ml-1 opacity-40" />;
    return (
      <ArrowUpDown
        className={`w-4 h-4 ml-1 ${
          filters.sortOrder === "asc" ? "rotate-0" : "rotate-180"
        }`}
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Data</CardTitle>
        <CardDescription>Showing up to 50 items per page</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">ID</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("date")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Date
                  {renderSortIcon("date")}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort("price")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Price
                  {renderSortIcon("price")}
                </Button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading sales data...
                </TableCell>
              </TableRow>
            ) : sales.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No sales data found
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale) => (
                <TableRow key={sale._id}>
                  <TableCell className="font-mono text-xs text-muted-foreground truncate max-w-[180px]">
                    {sale._id}
                  </TableCell>
                  <TableCell>
                    {new Date(sale.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${sale.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {sale.customerEmail}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {sale.customerPhone}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading..." : `${sales.length} items displayed`}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePaginationChange("prev")}
              disabled={!pagination.before || loading}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePaginationChange("next")}
              disabled={!pagination.after || loading}
              className="gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
