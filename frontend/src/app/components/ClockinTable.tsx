'use client';

import { useState } from 'react';
import { format, parseISO } from 'date-fns';

type ClockinLog = {
  date: string;
  time_in?: string;
  time_out?: string;
  is_auto_filled?: boolean;
};

type Props = {
  logs: ClockinLog[];
  onUpdate: (updated: ClockinLog) => void;
};

export default function ClockinTable({ logs, onUpdate }: Props) {
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-150px)] w-full h-full bg-white/60 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-3xl">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-blue-600 text-white text-left sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 font-medium">Date</th>
            <th className="px-4 py-2 font-medium">Time In</th>
            <th className="px-4 py-2 font-medium">Time Out</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            const formattedDate = format(parseISO(log.date), 'dd');
            const isToday = log.date === todayStr;

            const handleBlur = (field: 'time_in' | 'time_out', value: string) => {
              if (log[field] !== value) {
                onUpdate({
                  ...log,
                  [field]: value,
                  is_auto_filled: false,
                });
              }
            };

            return (
              <tr
                key={log.date}
                className={`border-t ${isToday ? 'bg-blue-100' : ''}`}
              >
                <td className="px-4 py-2">{formattedDate}</td>
              
                <td className="">
                  <input
                    type="time"
                    defaultValue={log.time_in || ''}
                    onBlur={(e) => handleBlur('time_in', e.target.value)}
                     className="w-full sm:w-32 text-sm px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="time"
                    defaultValue={log.time_out || ''}
                    onBlur={(e) => handleBlur('time_out', e.target.value)}
                     className="w-full sm:w-32 text-sm p-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
