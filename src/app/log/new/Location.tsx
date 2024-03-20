import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Check, MapPinned } from "lucide-react";

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

interface Props {
  serverData: string[];
  clientData: string[];
  setClientData: React.Dispatch<React.SetStateAction<string[]>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

interface CommandProps {
  heading: string;
  group: string[];
}

export default function Location({
  serverData,
  clientData,
  setClientData,
  location,
  setLocation,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [hoverValue, setHoverValue] = React.useState("");

  const isLocationNameExists = [...serverData, ...clientData].some(
    (item) => item === inputValue
  );

  const handleSelectItem = (value: string) => {
    setLocation(value);
    setOpen(false);
  };

  const createNewLocation = () => {
    setOpen(false);
    setClientData((prev) => [...prev, inputValue]);
    setLocation(inputValue);
  };

  const LocationGroup = ({ heading, group }: CommandProps) => {
    return (
      <CommandGroup heading={heading}>
        {group.map((item) => {
          const isSelected = item === location;
          const className = cn(
            "mr-2 h-4 w-4",
            isSelected ? "opacity-100" : "opacity-0"
          );
          return (
            <CommandItem
              key={item}
              value={item}
              className={cn(isSelected && "bg-accent text-accent-foreground")}
              onSelect={handleSelectItem}
            >
              <Check className={className} />
              {item}
            </CommandItem>
          );
        })}
      </CommandGroup>
    );
  };

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        // open 상태를 업데이트하고, input 및 hover value를 초기화
        setOpen(open);
        setHoverValue(location);
        setInputValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[280px] justify-between")}
        >
          {location || "장소"}
          <MapPinned className="ml-2 size-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command value={hoverValue} onValueChange={setHoverValue}>
          <CommandList>
            <CommandInput
              placeholder="장소 검색 / 신규 등록"
              value={inputValue}
              onValueChange={setInputValue}
            />

            <LocationGroup heading="내 장소" group={serverData} />
            <LocationGroup heading="새로 추가된 장소" group={clientData} />
            {inputValue !== "" && (
              <CommandGroup>
                <CommandItem
                  disabled={isLocationNameExists}
                  onSelect={createNewLocation}
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
