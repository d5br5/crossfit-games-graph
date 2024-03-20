"use client";

import React, { FormEvent } from "react";
import { Button } from "@/src/components/ui/button";

import DatePicker from "./DatePicker";
import TimeSlot from "./TimeSlot";
import Location from "./Location";

const serverData = ["dinstorm", "라임라잇"];

const NewLogPage = () => {
  // form data
  const [date, setDate] = React.useState<Date>(); // 날짜
  const [timeSlot, setTimeSlot] = React.useState(""); // 시간대
  const [location, setLocation] = React.useState(""); // 장소

  // 신규 추가 장소 목록
  const [clientData, setClientData] = React.useState([
    "painstorm3",
    "limelight5",
  ]);

  const canSubmit = Boolean(date && timeSlot && location);

  // 등록 버튼 클릭 handler
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    console.log("submit");
    console.log(date, timeSlot, location);
  };

  return (
    <div className="max-w-[1200px] w-full px-3">
      {/* <h1>새 운동일지</h1> */}
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <DatePicker date={date} setDate={setDate} />
        <TimeSlot value={timeSlot} setValue={setTimeSlot} />
        <Location
          serverData={serverData}
          clientData={clientData}
          setClientData={setClientData}
          location={location}
          setLocation={setLocation}
        />

        <div className="border rounded-md py-3 px-6">내용</div>
        <div className="w-full text-right mt-4">
          <Button className="right-0" type="submit" disabled={!canSubmit}>
            운동일지 만들기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewLogPage;
