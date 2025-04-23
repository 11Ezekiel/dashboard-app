"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type FilteredDropdownProps = {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
};

export default function FilteredDropdown({
  label,
  options,
  onSelect,
}: FilteredDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-between gap-2 text-sm capitalize 
            border-gray-300 dark:border-gray-700 
            bg-white dark:bg-gray-900 
            text-black dark:text-white
            hover:bg-gray-100 dark:hover:bg-gray-800
            focus:ring-2 focus:ring-gray-800 focus:outline-none"
        >
          {label} <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-md"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onSelect(option)}
            className="cursor-pointer text-sm px-3 py-2 
              hover:bg-gray-100 dark:hover:bg-gray-800 
              text-gray-900 dark:text-gray-100"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
