'use client';

import { useState } from "react";
import { format } from "date-fns";
import ClockinTable from "@/app/components/ClockinTable";
import CalendarGrid from "@/app/components/CalendarGrid";

// Utility: get all dates in current month
function getDatesInMonth(month: number, year: number): Date[] {
  const numDays = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: numDays }, (_, i) => new Date(year, month, i + 1));
}

// Utility: check if it's a valid workday (exclude Sunday)
function isValidWorkday(date: Date): boolean {
  return date.getDay() !== 0;
}

export default function OvertimePage() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const currentMonthDates = getDatesInMonth(viewMonth, viewYear);

  // Initially select only valid workdays (Mon–Sat, excluding Sunday)
const [selectedDates, setSelectedDates] = useState<string[]>(() =>
  currentMonthDates
    .filter((d) => d.getDay() !== 0) // Exclude Sundays
    .map((d) => format(d, "yyyy-MM-dd"))
);

  const toggleDate = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd");
    setSelectedDates((prev) => {
      const exists = prev.includes(formatted);
      const updated = exists
        ? prev.filter((d) => d !== formatted)
        : [...prev, formatted];
      return updated.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    });
  };
const handleSelectCutoffRange = (cutoff: "1st" | "2nd" | "all") => {
  if (cutoff === "all") {
    const allWorkdays = currentMonthDates
      .filter((d) => d.getDay() !== 0) // Exclude Sundays
      .map((d) => format(d, "yyyy-MM-dd"));
    setSelectedDates(allWorkdays);
  }
};


  const logs = selectedDates.map((date) => ({
    date,
    time_in: "16:00",
    time_out: "19:00",
    is_auto_filled: true,
  }));

  const handleUpdateLog = (updatedLog: any) => {
    console.log("Updated:", updatedLog);
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto flex gap-4 h-[calc(100vh-150px)]">
        {/* Clock-in Table */}
        <div className="w-1/3 h-full">
          <div className="h-full bg-white/60 rounded-2xl shadow-xl overflow-y-auto">
            <ClockinTable logs={logs} onUpdate={handleUpdateLog} />
          </div>
        </div>

        {/* Calendar */}
        <div className="flex-1 h-full">
          <div className="h-full border border-gray-200 shadow-xl rounded-2xl">
            <CalendarGrid
              currentMonthDates={currentMonthDates}
              selectedDates={selectedDates}
              toggleDate={toggleDate}
              onSelectCutoffRange={handleSelectCutoffRange}
              viewMonth={viewMonth}
              viewYear={viewYear}
              onPrevMonth={() => {
                if (viewMonth === 0) {
                  setViewMonth(11);
                  setViewYear(viewYear - 1);
                } else {
                  setViewMonth(viewMonth - 1);
                }
              }}
              onNextMonth={() => {
                if (viewMonth === 11) {
                  setViewMonth(0);
                  setViewYear(viewYear + 1);
                } else {
                  setViewMonth(viewMonth + 1);
                }
              }}
              defaultCutoff="all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
