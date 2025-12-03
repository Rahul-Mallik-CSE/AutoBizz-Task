/** @format */

"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDateRange } from "@/redux/slices/filtersSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DateRangeFilter() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters.filters);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <Label htmlFor="start-date" className="text-sm font-medium">
          Start Date
        </Label>
        <Input
          id="start-date"
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            dispatch(
              setDateRange({
                startDate: e.target.value,
                endDate: filters.endDate,
              })
            )
          }
          className="mt-1"
        />
      </div>
      <div className="flex-1">
        <Label htmlFor="end-date" className="text-sm font-medium">
          End Date
        </Label>
        <Input
          id="end-date"
          type="date"
          value={filters.endDate}
          onChange={(e) =>
            dispatch(
              setDateRange({
                startDate: filters.startDate,
                endDate: e.target.value,
              })
            )
          }
          className="mt-1"
        />
      </div>
    </div>
  );
}
