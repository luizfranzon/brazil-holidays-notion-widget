/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { getURLQueryParams } from "@/utils/getUrlParams";
import { useEffect, useState } from "react";
import { HolidayList } from "./HolidayList";

interface PageQueryParams {
  fontStyle: "sans" | "mono";
  backgroundColor: "dark" | "light";
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
}

export default function Home() {

  const [params, setParams] = useState({} as PageQueryParams)

  useEffect(() => {
    setParams(getURLQueryParams())
  }, [])

  return (
    <div className={`${params.backgroundColor == "dark" && "bg-notionBlack"} h-screen`}>
      <HolidayList />
    </div>
  );
}
