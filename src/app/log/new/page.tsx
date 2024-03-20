"use client";

import React from "react";

import DatePicker from "./DatePicker";
import TimeSlot from "./TimeSlot";
import Location from "./Location";

import { UseFormReturn, useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/src/components/ui/form";

const FormSchema = z.object({
  date: z.date(),
  timeSlot: z.string(),
  location: z.string(),
});

export type FormType = UseFormReturn<z.infer<typeof FormSchema>>;

const NewLogPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="max-w-[1200px] w-full px-3">
      {/* <h1>새 운동일지</h1> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DatePicker form={form} />
          <Location form={form} />
          <TimeSlot form={form} />
          <div className="border rounded-md py-3 px-6">내용</div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewLogPage;
