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
          <Button
            variant="outline"
            className="flex items-center gap-2 
              border-gray-300 dark:border-gray-700 
              bg-white dark:bg-gray-900 
              text-black dark:text-white dark:hover:bg-gray-800"
          >
            Sort: {selectedSort}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-white dark:bg-gray-900 
            border-gray-300 dark:border-gray-700 
            text-black dark:text-white dark:hover:bg-gray-800"
        >
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => handleSelect(option)}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export Button with Icon */}
      <Button
        variant="outline"
        className="flex items-center gap-2 
          border-gray-300 dark:border-gray-700 
          bg-white dark:bg-gray-900 
          text-black dark:text-white dark:hover:bg-gray-800"
      >
        <FileDown className="w-4 h-4" />
        Export
      </Button>
    </div>
  );
}
