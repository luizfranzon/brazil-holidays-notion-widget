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
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ]

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
    <div className="p-4 h-full">
      <div className="rounded-lg h-full max-h-52 bg-white max-w-80 flex flex-col items-center border-4 border-[#c4a7e7]">
        <header className="flex items-center justify-center gap-2 bg-[#232136] text-white w-full">
          <ChevronLeft
            size={50}
            onClick={() => handleChangeMonth("prev")}
            className="cursor-pointer"
          />
          <span
            className="font-bold text-3xl text-center w-full select-none cursor-pointer"
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
        <main className="w-full p-2">
          <ul>
            {filterHolidaysByMonth(data, selectedMonth).map((holiday: DataType, index: number) => (
              <li className="flex items-center gap-2 ml-1" key={index}>
                <div className="bg-black w-3 rounded-full h-1"></div>
                <h1>{holiday.title} - {format(new Date(holiday.date), 'dd/MM')}</h1>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  )
}