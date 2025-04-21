"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileDown } from "lucide-react";
import { useState } from "react";

const sortOptions = ["Most recent", "Oldest", "A-Z", "Z-A"];

export default function SortAndExport({
  onSortChange,
}: {
  onSortChange: (value: string) => void;
}) {
  const [selectedSort, setSelectedSort] = useState("Most recent");

  const handleSelect = (option: string) => {
    setSelectedSort(option);
    onSortChange(option);
  };

  return (
    <div className="flex gap-4 items-center">
      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Sort: {selectedSort}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortOptions.map((option) => (
            <DropdownMenuItem key={option} onClick={() => handleSelect(option)}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export Button with Icon */}
      <Button variant="outline" className="flex items-center gap-2">
        <FileDown className="w-4 h-4" />
        Export
      </Button>
    </div>
  );
}
