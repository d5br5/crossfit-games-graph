"use client";

import React from "react";

import DatePicker from "./components/DatePicker";
import TimeSlot from "./components/TimeSlot";
import Location from "./components/Location";

import { Form } from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import { FormDataType, useLogForm } from "./hooks/useForm";

const NewLogPage = () => {
  const form = useLogForm();

  function onSubmit(data: FormDataType) {
    console.log(data);
  }

  return (
    <div className="max-w-[1200px] w-full px-3">
      {/* <h1>새 운동일지</h1> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <DatePicker form={form} />
            <TimeSlot form={form} />
            <Location form={form} />
          </div>
          <div className="border rounded-md py-3 px-6">내용</div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewLogPage;
