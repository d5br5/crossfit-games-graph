"use client";

import { Button } from "@/src/components/ui/button";
import React, { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon, Check, MapPinned } from "lucide-react";

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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";

const serverData = [
  { value: "painstorm", label: "dinstorm" },
  { value: "limelight", label: "라임라잇" },
];

const NewLogPage = () => {
  const [date, setDate] = useState<Date>();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const [clientData, setClientData] = useState([
    { value: "painstorm3", label: "painstorm3" },
    { value: "lime light4", label: "limelight 4" },
  ]);

  const onSubmit = () => {
    console.log("submit");
    console.log(date);
  };

  return (
    <div className="max-w-[1200px] w-full px-3">
      {/* <h1>새 운동일지</h1> */}
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
              {date ? format(date, "PPPP", { locale: ko }) : <span>날짜</span>}
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
            <SelectValue placeholder="시간대" />
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

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[280px] justify-between"
            >
              {value
                ? clientData.find((location) => location.value === value)?.label
                : "장소"}
              <MapPinned className="ml-2 size-4 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0">
            <Command>
              <CommandList>
                <CommandInput
                  placeholder="장소 검색 / 신규 등록"
                  value={inputValue}
                  onValueChange={setInputValue}
                />
                {inputValue !== "" &&
                  [...serverData, ...clientData].every(
                    (item) => item.label !== inputValue
                  ) && (
                    <CommandItem
                      onSelect={() => {
                        setClientData((prev) => [
                          ...prev,
                          { value: inputValue, label: inputValue },
                        ]);
                        setInputValue("");
                        setValue(inputValue);
                        setOpen(false);
                      }}
                    >
                      신규 장소 추가 : {inputValue}
                    </CommandItem>
                  )}
                <CommandGroup heading="내 장소">
                  {serverData.map((location) => (
                    <CommandItem
                      key={location.value}
                      value={location.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === location.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {location.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup heading="새로 추가된 장소">
                  {clientData.map((location) => (
                    <CommandItem
                      key={location.value}
                      value={location.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === location.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {location.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

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
