"use client";

import React from "react";

import DatePicker from "./date-picker";
import TimeSlot from "./time-slot";
import Location from "./location";

import { Form } from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import { FormDataType, useLogForm } from "./use-form";
import LogContent from "./log-content";

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
