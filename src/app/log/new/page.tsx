"use client";

import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

const NewLogPage = () => {
  const [date, setDate] = useState<Date>();

  const onSubmit = () => {
    console.log("submit");
    console.log(date);
  };

  return (
    <div className="max-w-[1200px] w-full">
      <h1>새 운동일지</h1>
      <div className="flex flex-col gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-between font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? (
                format(date, "PPPP", { locale: ko })
              ) : (
                <span>날짜 선택</span>
              )}
              <CalendarIcon className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 items-center flex flex-col pb-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
            <PopoverClose asChild>
              <Button size="sm">날짜 선택 및 닫기</Button>
            </PopoverClose>
          </PopoverContent>
        </Popover>
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="시간대 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dawn">새벽</SelectItem>
            <SelectItem value="morning">아침</SelectItem>
            <SelectItem value="midday">점심</SelectItem>
            <SelectItem value="afternoon">오후</SelectItem>
            <SelectItem value="evening">저녁</SelectItem>
            <SelectItem value="night">밤</SelectItem>
            <SelectItem value="midnight">심야</SelectItem>
          </SelectContent>
        </Select>
        <div>장소</div>
        <div className="border rounded-md py-3 px-6">내용</div>
      </div>
      <div className="w-full text-right mt-4">
        <Button className="right-0" onClick={onSubmit}>
          운동일지 만들기
        </Button>
      </div>
    </div>
  );
};

export default NewLogPage;
