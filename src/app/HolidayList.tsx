"use client"

import { ChevronLeft, ChevronRight } from "lucide-react";

import data from "@/data.json";
import { useState } from "react";

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

  console.log(filterHolidaysByMonth(data, 0))

  return (
    <div className="w-full h-screen">
      <header className="flex items-center gap-2">
        <ChevronLeft onClick={() => handleChangeMonth("prev")} className="cursor-pointer" />

        <span>{getMonthName(selectedMonth)}</span>
        <ChevronRight onClick={() => handleChangeMonth("next")} className="cursor-pointer" />
      </header>
      <main>
        <ul>
          {filterHolidaysByMonth(data, selectedMonth).map((holiday: DataType, index: number) => (
            <li key={index}>
              <h1>{holiday.title} - {new Date(holiday.date).toISOString()}</h1>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}