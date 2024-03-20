"use client";

import React, { FormEvent } from "react";
import { Button } from "@/src/components/ui/button";

import DatePicker from "./DatePicker";
import TimeSlot from "./TimeSlot";
import Location from "./Location";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerTimer,
  SelectValue,
} from "@/src/components/ui/select";

// const serverData = ["dinstorm", "라임라잇"];

const FormSchema = z.object({
  timeSlot: z.string(),
});

const serverData = [
  { id: 1, label: "painstorm" },
  { id: 2, label: "limelight" },
];

const serverDataLabelList = serverData.map((item) => item.label);

const NewLogPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

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
  const onSubmit2 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    console.log("submit");
    console.log(date, timeSlot, location);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="max-w-[1200px] w-full px-3">
      {/* <h1>새 운동일지</h1> */}
      {/* <form className="flex flex-col gap-3" onSubmit={onSubmit2}>
        <DatePicker date={date} setDate={setDate} />
        <Location
          serverData={serverDataLabelList}
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
      </form> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TimeSlot form={form} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewLogPage;
