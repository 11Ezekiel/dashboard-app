"use client";

import FeaturedCarouselCard from "@/components/featuredCarousel";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoveUpRight, MoveDownLeft } from "lucide-react";
import FilteredDropdown from "@/components/filteredDropdown";
import SortAndExport from "@/components/sortAndExport";
import { Search } from "lucide-react";
import EventsTable from "@/components/eventsTable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", registrations: 30 },
  { name: "Feb", registrations: 45 },
  { name: "Mar", registrations: 60 },
  { name: "Apr", registrations: 40 },
  { name: "May", registrations: 70 },
];

export default function Home() {
  const [selectedDate, setSelectedDate] = useState("Date");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedName, setSelectedName] = useState("Name");

  const statuses = ["Status", "Completed", "Ongoing", "Upcoming"];
  const speakers = [
    "Name",
    "Jane Doe",
    "Dr. Peter Smith",
    "Dr. Akin Malik",
    "John Lee",
    "Rachel Moore",
    "Prof. Alan Olsen",
    "Kason Ahmad",
    "Emily Zhang",
    "Diego Hernandez",
    "Guest Panel",
  ];

  return (
    <main className="flex flex-col gap-6 p-4 sm:p-6 max-w-screen-xl mx-auto w-full">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-900">
        Welcome! Here’s your summary
      </h1>

      {/* Summary cards */}
      <section className="flex flex-col lg:grid lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-muted-foreground">Total Events</h3>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold">100,000</p>
              <MoveUpRight className="w-4 h-4 text-green-600" />
              <p className="text-green-600 text-sm">+20%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-muted-foreground">Active Speakers</h3>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold">25</p>
              <MoveDownLeft className="w-4 h-4 text-red-600" />
              <p className="text-red-600 text-sm">-5.0%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-muted-foreground">
              Total Registrations
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold">300</p>
              <MoveUpRight className="w-4 h-4 text-green-600" />
              <p className="text-green-600 text-sm">+5.3%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-muted-foreground">Total Revenue</h3>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold">$500,000</p>
              <MoveUpRight className="w-4 h-4 text-green-600" />
              <p className="text-green-600 text-sm">+5.0%</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Chart and Carousel */}
      <section className="flex flex-col gap-4 mt-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-800">
          Event Registrations per month
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Chart */}
          <Card className="min-h-[300px] h-full">
            <CardContent className="p-4 h-full">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="registrations"
                      stroke="#f49620"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Carousel */}
          <div className="h-full">
            <div className="h-full min-h-[300px]">
              <FeaturedCarouselCard />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-800">
          Events History
        </h2>
        <div className="pt-2 flex flex-col md:flex-row md:flex-wrap md:items-start gap-4">
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <FilteredDropdown
              label={selectedDate}
              options={["Newest", "Oldest", "This Month"]}
              onSelect={setSelectedDate}
            />
            <FilteredDropdown
              label={selectedStatus}
              options={statuses}
              onSelect={setSelectedStatus}
            />
            <FilteredDropdown
              label={selectedName}
              options={speakers}
              onSelect={setSelectedName}
            />
          </div>

          {/* Sort/Export */}
          <div className="w-full md:ml-auto md:w-auto">
            <SortAndExport
              onSortChange={(val) => console.log("Sort by:", val)}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="pt-2 flex flex-wrap space-x-6">
          {/* search + dropdowns + sort/export */}
        </div>

        <div className="mt-4">
          <EventsTable
            filters={{
              date: "",
              status: selectedStatus,
              name: selectedName,
            }}
          />
        </div>
      </section>
    </main>
  );
}
