"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EventsTableProps = {
  filters: {
    date: string;
    status: string;
    name: string;
  };
};

const events = [
  {
    name: "Cloud Innovation Summit",
    date: "2024-10-15",
    speaker: "Jane Doe",
    status: "Completed",
  },
  {
    name: "Blockchain Revolution Conference",
    date: "2024-11-05",
    speaker: "Dr. Peter Smith",
    status: "Ongoing",
  },
  {
    name: "AI in Healthcare Symposium",
    date: "2024-10-21",
    speaker: "Dr. Akin Malik",
    status: "Completed",
  },
  {
    name: "Future of Fintech Forum",
    date: "2024-10-18",
    speaker: "John Lee",
    status: "Upcoming",
  },
  {
    name: "Data Analytics in Business",
    date: "2024-11-12",
    speaker: "Rachel Moore",
    status: "Completed",
  },
  {
    name: "Sustainable Energy Expo",
    date: "2024-10-24",
    speaker: "Prof. Alan Olsen",
    status: "Completed",
  },
  {
    name: "Web3 Interface Workshop",
    date: "2024-11-06",
    speaker: "Kason Ahmad",
    status: "Ongoing",
  },
  {
    name: "Cybersecurity for Startups",
    date: "2024-11-13",
    speaker: "Emily Zhang",
    status: "Ongoing",
  },
  {
    name: "Smart Cities Forum",
    date: "2024-11-09",
    speaker: "Diego Hernandez",
    status: "Completed",
  },
  {
    name: "Tech Safari Mixer",
    date: "2024-10-30",
    speaker: "Guest Panel",
    status: "Upcoming",
  },
];

const statusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "default";
    case "ongoing":
      return "secondary";
    case "upcoming":
      return "outline";
    default:
      return "outline";
  }
};

export default function EventsTable({ filters }: EventsTableProps) {
  const { status, name, date } = filters;

  const filteredEvents = events.filter((event) => {
    const statusMatch = status === "Status" || event.status === status;
    const nameMatch = name === "Name" || event.speaker === name;
    const dateMatch = !date || event.date === date; // 👈 checks if date filter is applied

    return statusMatch && nameMatch && dateMatch;
  });

  return (
    <Card>
      <CardContent className="p-0 px-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="min-w-[220px]">Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Speaker</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event, i) => (
                <TableRow key={i}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.speaker}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(event.status)}>
                      {event.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEvents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No events match the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t mt-2">
          <div className="text-sm text-muted-foreground">
            Showing {filteredEvents.length} of {events.length}
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-2 hover:bg-muted rounded-md">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="px-3 py-1 bg-primary text-white rounded-md text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 hover:bg-muted rounded-md text-sm font-medium">
              2
            </button>
            <button className="px-3 py-1 hover:bg-muted rounded-md text-sm font-medium">
              3
            </button>
            <button className="p-2 hover:bg-muted rounded-md">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
