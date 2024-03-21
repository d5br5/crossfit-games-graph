import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Check, MapPinned } from "lucide-react";
import { FormType } from "../hooks/useForm";

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

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";

interface Props {
  form: FormType;
}

interface CommandGroupProps {
  heading: string;
  list: string[];
}

const serverData = [
  { id: 1, label: "painstorm" },
  { id: 2, label: "limelight" },
];
const serverDataLabelList = serverData.map((item) => item.label);

export default function Location({ form }: Props) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [hoverValue, setHoverValue] = React.useState("");

  // 신규 추가 장소 목록
  const [clientData, setClientData] = React.useState([
    "painstorm3",
    "limelight5",
  ]);

  const isLocationNameExists = [...serverDataLabelList, ...clientData].some(
    (item) => item === inputValue
  );

  const createNewLocation = () => {
    setOpen(false);
    setClientData((prev) => [...prev, inputValue]);
    form.setValue("location", inputValue);
  };

  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => {
        const LocationCommandGroup = ({ heading, list }: CommandGroupProps) => {
          return (
            <CommandGroup heading={heading}>
              {list.map((location) => (
                <CommandItem
                  value={location}
                  key={location}
                  onSelect={() => {
                    form.setValue("location", location);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      location === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {location}
                </CommandItem>
              ))}
            </CommandGroup>
          );
        };

        return (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>Language</FormLabel>
            <Popover
              open={open}
              onOpenChange={(open) => {
                // open 상태를 업데이트하고, input 및 hover value를 초기화
                setOpen(open);
                setInputValue("");
                setHoverValue(hoverValue);
              }}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between"
                  >
                    {field.value || "운동 장소"}
                    <MapPinned className="ml-2 size-4 shrink-0" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command value={hoverValue} onValueChange={setHoverValue}>
                  <CommandList>
                    <CommandInput
                      placeholder="장소를 선택해주세요"
                      value={inputValue}
                      onValueChange={setInputValue}
                    />
                    <LocationCommandGroup
                      heading="내 운동 장소"
                      list={serverDataLabelList}
                    />
                    <LocationCommandGroup
                      heading="신규 추가 장소"
                      list={clientData}
                    />

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
          </FormItem>
        );
      }}
    />
  );
}
