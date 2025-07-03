'use client';

import { useState } from "react";
import { format } from "date-fns";
import ClockinTable from "@/app/components/ClockinTable";
import CalendarGrid from "@/app/components/CalendarGrid";

// Utility: get all dates in current month
function getDatesInMonth(month: number, year: number) {
  const numDays = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: numDays }, (_, i) => new Date(year, month, i + 1));
}

function isWeekday(date: Date) {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export default function WorklogPage() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const currentMonthDates = getDatesInMonth(viewMonth, viewYear);

  const toggleDate = (date: Date) => {
    if (!isWeekday(date)) return;
    const formatted = format(date, "yyyy-MM-dd");
    setSelectedDates((prev) => {
      const newDates = prev.includes(formatted)
        ? prev.filter((d) => d !== formatted)
        : [...prev, formatted];
      return newDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    });
  };

  const handleSelectCutoffRange = (cutoff: "1st" | "2nd" | "all") => {
    let newSelected: string[] = [];
    if (cutoff === "1st") {
      newSelected = currentMonthDates
        .filter((d) => d.getDate() <= 15 && isWeekday(d))
        .map((d) => format(d, "yyyy-MM-dd"));
    } else if (cutoff === "2nd") {
      newSelected = currentMonthDates
        .filter((d) => d.getDate() > 15 && isWeekday(d))
        .map((d) => format(d, "yyyy-MM-dd"));
    } else {
      newSelected = currentMonthDates
        .filter((d) => isWeekday(d))
        .map((d) => format(d, "yyyy-MM-dd"));
    }
    setSelectedDates(newSelected);
  };

  const logs = selectedDates.map((date) => ({
    date,
    time_in: '07:00',
    time_out: '16:00',
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
            />
          </div>
        </div>

      </div>
    </div>
  );
}
