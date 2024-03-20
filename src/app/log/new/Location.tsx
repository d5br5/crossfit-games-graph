import React from "react";
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
import { Button } from "@/src/components/ui/button";

interface Props {
  serverData: string[];
  clientData: string[];
  setClientData: React.Dispatch<React.SetStateAction<string[]>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export default function Location({
  serverData,
  clientData,
  setClientData,
  location,
  setLocation,
}: Props) {
  const [inputValue, setInputValue] = React.useState("");
  const [locationOpen, setLocationOpen] = React.useState(false);
  const [locationHoverValue, setLocationHoverValue] = React.useState("");

  const isPrevLocation = [...serverData, ...clientData].some(
    (item) => item === inputValue
  );

  return (
    <Popover
      open={locationOpen}
      onOpenChange={(value) => {
        // open 상태를 업데이트하고, input 및 hover value를 초기화
        setLocationOpen(value);
        setLocationHoverValue(location);
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
          {location
            ? [...clientData, ...serverData].find((item) => item === location)
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
              {serverData.map((item) => {
                const isSelected = item === location;
                return (
                  <CommandItem
                    key={item}
                    value={item}
                    className={cn(
                      isSelected && "bg-accent text-accent-foreground"
                    )}
                    onSelect={(currentValue) => {
                      setLocation(currentValue);
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
                    {item}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandGroup heading="새로 추가된 장소">
              {clientData.map((item) => {
                const isSelected = item === location;
                return (
                  <CommandItem
                    key={item}
                    value={item}
                    className={cn(
                      isSelected && "bg-accent text-accent-foreground"
                    )}
                    onSelect={(currentValue) => {
                      setLocation(currentValue);
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
                    {item}
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
                    setLocation(inputValue);
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
  );
}
