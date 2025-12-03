/** @format */

"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPriceMin, setEmail, setPhone } from "@/redux/slices/filtersSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function OtherFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters.filters);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <Label htmlFor="price-min" className="text-sm font-medium">
          Minimum Price
        </Label>
        <Input
          id="price-min"
          type="number"
          placeholder="0"
          value={filters.priceMin}
          onChange={(e) => dispatch(setPriceMin(e.target.value))}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-sm font-medium">
          Customer Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={filters.email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1234567890"
          value={filters.phone}
          onChange={(e) => dispatch(setPhone(e.target.value))}
          className="mt-1"
        />
      </div>
    </div>
  );
}
