"use client";

import React from "react";

import DatePicker from "./DatePicker";
import TimeSlot from "./TimeSlot";
import Location from "./Location";

import { Form } from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import { FormDataType, useLogForm } from "./useForm";
import LogContent from "./LogContent";

const NewLogPage = () => {
  const form = useLogForm();

  function onSubmit(data: FormDataType) {
    console.log(data);
  }

  return (
    <div className="max-w-[1200px] size-full flex flex-col">
      <h1>새 운동일지</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 flex-1"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <DatePicker form={form} />
            <TimeSlot form={form} />
            <Location form={form} />
          </div>
          <LogContent form={form} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewLogPage;
