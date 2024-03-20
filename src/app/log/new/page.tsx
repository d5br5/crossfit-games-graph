"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Check,
  MapPinned,
  Clock3,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";

const serverData = ["dinstorm", "라임라잇"];

const timezoneList = [
  { value: "dawn", label: "새벽" },
  { value: "morning", label: "아침" },
  { value: "midday", label: "점심" },
  { value: "afternoon", label: "오후" },
  { value: "evening", label: "저녁" },
  { value: "night", label: "밤" },
  { value: "midnight", label: "심야" },
];

const NewLogPage = () => {
  // 날짜 데이터
  const [date, setDate] = React.useState<Date>();

  // 시간대 데이터
  const [timezoneOpen, setTimezoneOpen] = React.useState(false);
  const [timezoneValue, setTimezoneValue] = React.useState("");
  // const [timezoneHoverValue, setTimezoneHoverValue] = React.useState("");

  // 장소 데이터
  const [inputValue, setInputValue] = React.useState("");
  const [locationOpen, setLocationOpen] = React.useState(false);
  const [locationValue, setLocationValue] = React.useState("");
  const [locationHoverValue, setLocationHoverValue] = React.useState("");

  // 신규 추가 장소 목록
  const [clientData, setClientData] = React.useState([
    "painstorm3",
    "limelight5",
  ]);

  const canSubmit = Boolean(date && timezoneValue && locationValue);

  // 등록 버튼 클릭 handler
  const onSubmit = () => {
    if (!canSubmit) return;
    console.log("submit");
    console.log(date, timezoneValue, locationValue);
  };

  const isPrevLocation = [...serverData, ...clientData].some(
    (item) => item === inputValue
  );

  return (
    <div className="max-w-[1200px] w-full px-3">
      {/* <h1>새 운동일지</h1> */}
      <div className="flex flex-col gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-between",
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

        <Popover open={timezoneOpen} onOpenChange={setTimezoneOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={timezoneOpen}
              className={cn(
                "w-[280px] justify-between",
                timezoneValue === "" && "text-muted-foreground"
              )}
            >
              {timezoneValue
                ? timezoneList.find((tz) => tz.value === timezoneValue)?.label
                : "시간대"}
              <Clock3 className="ml-2 size-4 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>
                  {timezoneList.map((tz) => {
                    const isSelected = timezoneValue === tz.value;
                    return (
                      <CommandItem
                        key={tz.value}
                        value={tz.value}
                        className={cn(
                          "flex justify-between px-3",
                          isSelected && "bg-accent text-accent-foreground"
                        )}
                        onSelect={(currentValue) => {
                          setTimezoneValue(currentValue);
                          setTimezoneOpen(false);
                        }}
                      >
                        {tz.label}
                        <Check
                          className={cn(
                            "size-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover
          open={locationOpen}
          onOpenChange={(value) => {
            // open 상태를 업데이트하고, input 및 hover value를 초기화
            setLocationOpen(value);
            setLocationHoverValue(locationValue);
            setInputValue("");
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={locationOpen}
              className={cn(
                "w-[280px] justify-between",
                locationValue === "" && "text-muted-foreground"
              )}
            >
              {locationValue
                ? [...clientData, ...serverData].find(
                    (location) => location === locationValue
                  )
                : "장소"}
              <MapPinned className="ml-2 size-4 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0">
            <Command
              value={locationHoverValue}
              onValueChange={setLocationHoverValue}
            >
              <CommandList>
                <CommandInput
                  placeholder="장소 검색 / 신규 등록"
                  value={inputValue}
                  onValueChange={setInputValue}
                />

                <CommandGroup heading="내 장소">
                  {serverData.map((location) => {
                    const isSelected = locationValue === location;
                    return (
                      <CommandItem
                        key={location}
                        value={location}
                        className={cn(
                          isSelected && "bg-accent text-accent-foreground"
                        )}
                        onSelect={(currentValue) => {
                          setLocationValue(currentValue);
                          setLocationHoverValue(currentValue);
                          setLocationOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {location}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandGroup heading="새로 추가된 장소">
                  {clientData.map((location) => {
                    const isSelected = locationValue === location;
                    return (
                      <CommandItem
                        key={location}
                        value={location}
                        className={cn(
                          isSelected && "bg-accent text-accent-foreground"
                        )}
                        onSelect={(currentValue) => {
                          setLocationValue(currentValue);
                          setLocationHoverValue(currentValue);
                          setLocationOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 size-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {location}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                {inputValue !== "" && (
                  <CommandGroup>
                    <CommandItem
                      disabled={isPrevLocation}
                      onSelect={() => {
                        setLocationOpen(false);
                        setClientData((prev) => [...prev, inputValue]);
                        setLocationValue(inputValue);
                        setLocationHoverValue(inputValue);
                        setInputValue("");
                      }}
                    >
                      신규 장소 추가 : {inputValue}
                    </CommandItem>
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="border rounded-md py-3 px-6">내용</div>
      </div>
      <div className="w-full text-right mt-4">
        <Button className="right-0" onClick={onSubmit} disabled={!canSubmit}>
          운동일지 만들기
        </Button>
      </div>
    </div>
  );
};

export default NewLogPage;
