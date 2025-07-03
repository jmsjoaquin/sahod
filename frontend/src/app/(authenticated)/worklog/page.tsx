'use client';

import { useState } from "react";
import CalendarGrid from "@/app/components/CalendarGrid";
import { format } from "date-fns";

// Utility: get all dates in current month
function getDatesInMonth(month: number, year: number) {
  const numDays = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: numDays }, (_, i) => new Date(year, month, i + 1));
}

export default function WorklogPage() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const currentMonthDates = getDatesInMonth(viewMonth, viewYear);

  // Toggle a date as selected/unselected (attendance)
  const toggleDate = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd");
    setSelectedDates((prev) =>
      prev.includes(formatted)
        ? prev.filter((d) => d !== formatted)
        : [...prev, formatted]
    );
  };

  // Handle "cutoff" range selection
  const handleSelectCutoffRange = (cutoff: "1st" | "2nd" | "all") => {
    let newSelected: string[] = [];
    if (cutoff === "1st") {
      newSelected = currentMonthDates
        .filter((d) => d.getDate() <= 15)
        .map((d) => format(d, "yyyy-MM-dd"));
    } else if (cutoff === "2nd") {
      newSelected = currentMonthDates
        .filter((d) => d.getDate() > 15)
        .map((d) => format(d, "yyyy-MM-dd"));
    } else {
      newSelected = currentMonthDates.map((d) => format(d, "yyyy-MM-dd"));
    }
    setSelectedDates(newSelected);
  };


  return (
    <div className="w-full flex justify-center items-start  py-8 overflow-x-hidden">
     <div className="w-full flex justify-center items-start py-3">
  <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 px-3">
    
    {/* Left Panel */}
    <div className="space-y-4">
      <div className="bg-gray-200 rounded-2xl h-32 flex items-center justify-center text-xl font-bold">
        CLOCK IN
      </div>
      <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center text-xl font-bold">
        DATES AVAILABLE
      </div>
    </div>

    {/* Calendar Center Panel */}
    <div className="col-span-1 md:col-span-2">
      <div className=" rounded-2xl h-full min-h-[400px] flex items-center justify-center text-2xl font-bold">
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

    {/* Right Panel */}
  <div className="space-y-4">
      <div className="bg-gray-200 rounded-2xl h-32 flex items-center justify-center text-xl font-bold">
     HOURS WORKED
      </div>
  
    </div> 
      <div className="space-y-4">
      <div className="bg-gray-200 rounded-2xl h-32 flex items-center justify-center text-xl font-bold">
        UNDERTIME
      </div>
    </div> 
    <div className="space-y-4">
      <div className="bg-gray-200 rounded-2xl h-32 flex items-center justify-center text-xl font-bold">
        OVERTIME
      </div>
  </div>
</div>
</div>
</div>
  );
}


// 'use client';

// import { useState } from "react";
// import CalendarGrid from "@/app/components/CalendarGrid";
// import { format } from "date-fns";

// // Utility: get all dates in current month
// function getDatesInMonth(month: number, year: number) {
//   const numDays = new Date(year, month + 1, 0).getDate();
//   return Array.from({ length: numDays }, (_, i) => new Date(year, month, i + 1));
// }

// export default function WorklogPage() {
//   const today = new Date();
//   const [viewMonth, setViewMonth] = useState(today.getMonth());
//   const [viewYear, setViewYear] = useState(today.getFullYear());
//   const [selectedDates, setSelectedDates] = useState<string[]>([]);

//   const currentMonthDates = getDatesInMonth(viewMonth, viewYear);

//   // Toggle a date as selected/unselected (attendance)
//   const toggleDate = (date: Date) => {
//     const formatted = format(date, "yyyy-MM-dd");
//     setSelectedDates((prev) =>
//       prev.includes(formatted)
//         ? prev.filter((d) => d !== formatted)
//         : [...prev, formatted]
//     );
//   };

//   // Handle "cutoff" range selection
//   const handleSelectCutoffRange = (cutoff: "1st" | "2nd" | "all") => {
//     let newSelected: string[] = [];
//     if (cutoff === "1st") {
//       newSelected = currentMonthDates
//         .filter((d) => d.getDate() <= 15)
//         .map((d) => format(d, "yyyy-MM-dd"));
//     } else if (cutoff === "2nd") {
//       newSelected = currentMonthDates
//         .filter((d) => d.getDate() > 15)
//         .map((d) => format(d, "yyyy-MM-dd"));
//     } else {
//       newSelected = currentMonthDates.map((d) => format(d, "yyyy-MM-dd"));
//     }
//     setSelectedDates(newSelected);
//   };

//   return (
//  <div className="rounded-lg flex flex-col justify-center items-center p-4 ">
//   <div className="mx-auto bg-white rounded-lg shadow-xl sm:p-4 md:p-6
//                   w-full max-w-full sm:max-w-2xl md:max-w-4xl transition-all">
//   {/* Responsive Grid Layout */}
//     <div className="
//   grid
//   grid-cols-1
//   gap-2
//   sm:gap-4
//   md:grid-cols-3
//   md:grid-rows-2
//   w-full
// ">
//   {/* CLOCK IN */}
//   <div className="bg-gray-100 min-h-[120px] md:min-h-[200px] flex flex-col justify-center items-center rounded-lg">
//     <span className="text-lg sm:text-xl font-bold">CLOCK IN</span>
//     <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">DATES AVAILABLE</span>
//   </div>
//   {/* CALENDAR */}
//   <div className="min-h-[120px] md:min-h-[200px] flex flex-col justify-center items-center rounded-lg md:col-span-2">
//    <CalendarGrid
//               currentMonthDates={currentMonthDates}
//               selectedDates={selectedDates}
//               toggleDate={toggleDate}
//               onSelectCutoffRange={handleSelectCutoffRange}
//               viewMonth={viewMonth}
//               viewYear={viewYear}
//               onPrevMonth={() => {
//                 if (viewMonth === 0) {
//                   setViewMonth(11);
//                   setViewYear(viewYear - 1);
//                 } else {
//                   setViewMonth(viewMonth - 1);
//                 }
//               }}
//               onNextMonth={() => {
//                 if (viewMonth === 11) {
//                   setViewMonth(0);
//                   setViewYear(viewYear + 1);
//                 } else {
//                   setViewMonth(viewMonth + 1);
//                 }
//               }}
//             />
//   </div>
//   {/* HOURS WORKED / DAYS WORKED */}
//   <div className="bg-gray-100 min-h-[100px] flex flex-col justify-center items-center rounded-lg">
//     <span className="text-base sm:text-lg font-semibold">HOURS WORKED</span>
//     <span className="mt-1 text-xs sm:text-sm">DAYS WORKED</span>
//   </div>
//   {/* UNDERTIME */}
//   <div className="bg-gray-100 min-h-[100px] flex flex-col justify-center items-center rounded-lg">
//     <span className="text-base sm:text-lg font-semibold">UNDERTIME</span>
//   </div>
//   {/* OVERTIME */}
//   <div className="bg-gray-100 min-h-[100px] flex flex-col justify-center items-center rounded-lg">
//     <span className="text-base sm:text-lg font-semibold">OVERTIME</span>
//     <span className="mt-1 text-xs sm:text-sm">HOURS<br />DAYS</span>
//   </div>
// </div>
//   </div>
// </div> 
//   );
// }
