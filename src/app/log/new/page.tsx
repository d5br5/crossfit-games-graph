"use client";

import React, { FormEvent } from "react";
import { Button } from "@/src/components/ui/button";
import { Check, MapPinned } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Popover,
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

import DatePicker from "./DatePicker";
import TimeSlot from "./TimeSlot";

const serverData = ["dinstorm", "라임라잇"];

const NewLogPage = () => {
  // 날짜 데이터
  const [date, setDate] = React.useState<Date>();

  // 시간대 데이터
  const [timeSlot, setTimeSlot] = React.useState("");

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

  const canSubmit = Boolean(date && timeSlot && locationValue);

  // 등록 버튼 클릭 handler
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    console.log("submit");
    console.log(date, timeSlot, locationValue);
  };

  const isPrevLocation = [...serverData, ...clientData].some(
    (item) => item === inputValue
  );

  return (
    <div className="max-w-[1200px] w-full px-3">
      {/* <h1>새 운동일지</h1> */}
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <DatePicker date={date} setDate={setDate} />
        <TimeSlot value={timeSlot} setValue={setTimeSlot} />

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
              className={cn("w-[280px] justify-between")}
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
