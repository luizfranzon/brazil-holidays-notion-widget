"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";

import data from "@/data.json";
import { useState } from "react";
import { format } from "date-fns";

interface DataType {
  title: string;
  date: string;
}

export function HolidayList() {

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())

  function filterHolidaysByMonth(data: DataType[], month: number) {
    if (month < 0 || month > 11) throw new Error("Invalid month");

    return data.filter((holiday: any) => new Date(holiday.date).getMonth() === month);
  }

  function getMonthName(monthIndex: number) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return months[monthIndex];
  }

  function handleChangeMonth(action: "next" | "prev") {
    if (action === "next") {
      if (selectedMonth === 11) return setSelectedMonth(0);
      setSelectedMonth(selectedMonth + 1);
    }
    if (action === "prev") {
      if (selectedMonth === 0) return setSelectedMonth(11);
      setSelectedMonth(selectedMonth - 1);
    }
  }

  return (
    <div className="h-screen rounded-lg bg-white">
      <header className="flex items-center gap-2 bg-[#232136] text-white">
        <ChevronLeft
          size={50}
          onClick={() => handleChangeMonth("prev")}
          className="cursor-pointer"
        />

        <span
          className="font-bold text-3xl"
          onClick={() => setSelectedMonth(new Date().getMonth())}
        >
          {getMonthName(selectedMonth)}
        </span>

        <ChevronRight
          size={50}
          onClick={() => handleChangeMonth("next")}
          className="cursor-pointer"
        />
      </header>
      <main>
        <ul>
          {filterHolidaysByMonth(data, selectedMonth).map((holiday: DataType, index: number) => (
            <li key={index}>
              <h1>{holiday.title} - {format(new Date(holiday.date), 'dd/MM')}</h1>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}