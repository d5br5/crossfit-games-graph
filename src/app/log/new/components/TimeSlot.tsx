import React from "react";

import { cn } from "@/lib/utils";
import { FormType } from "../hooks/useForm";
import { Check, Clock3 } from "lucide-react";
import { Button } from "@/src/components/ui/button";

import { Command, CommandItem, CommandList } from "@/src/components/ui/command";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog";

const slotList = [
  { value: "dawn", label: "새벽" },
  { value: "morning", label: "아침" },
  { value: "midday", label: "점심" },
  { value: "afternoon", label: "오후" },
  { value: "evening", label: "저녁" },
  { value: "night", label: "밤" },
  { value: "midnight", label: "심야" },
];

interface Props {
  form: FormType;
}

export default function TimeSlot({ form }: Props) {
  const [open, setOpen] = React.useState(false);
  const [hoverValue, setHoverValue] = React.useState("");

  return (
    <FormField
      control={form.control}
      name="timeSlot"
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>운동 시간대</FormLabel>
            <Dialog
              open={open}
              onOpenChange={(open) => {
                // open 상태를 업데이트하고, hover value를 초기화
                setOpen(open);
                setHoverValue(field.value || "");
              }}
            >
              <DialogTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="justify-between"
                  >
                    {slotList.find((slot) => slot.value === field.value)
                      ?.label || "시간대를 선택해주세요"}
                    <Clock3 className="size-4" />
                  </Button>
                </FormControl>
              </DialogTrigger>
              <DialogContent className="p-2 max-w-52">
                <Command value={hoverValue} onValueChange={setHoverValue}>
                  <CommandList>
                    {slotList.map((slot) => (
                      <CommandItem
                        value={slot.value}
                        key={slot.value}
                        className="flex justify-between"
                        onSelect={() => {
                          form.setValue("timeSlot", slot.value);
                          form.clearErrors("timeSlot");
                          setOpen(false);
                        }}
                      >
                        {slot.label}
                        <Check
                          className={cn(
                            "size-4",
                            slot.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </DialogContent>
            </Dialog>
          </FormItem>
        );
      }}
    />
  );

  // return (
  //   <FormField
  //     control={form.control}
  //     name="timeSlot"
  //     render={({ field }) => (
  //       <FormItem className="flex flex-col gap-2">
  //         <FormLabel>운동 시간대</FormLabel>
  //         <Select onValueChange={field.onChange} defaultValue={field.value}>
  //           <FormControl>
  //             <SelectTriggerTimer>
  //               <SelectValue placeholder="시간대를 선택해주세요" />
  //             </SelectTriggerTimer>
  //           </FormControl>
  //           <SelectContent>
  //             {slotList.map((slot) => (
  //               <SelectItem
  //                 value={slot.value}
  //                 key={slot.value}
  //                 className={cn(
  //                   field.value === slot.value &&
  //                     "bg-accent text-accent-foreground"
  //                 )}
  //               >
  //                 {slot.label}
  //               </SelectItem>
  //             ))}
  //           </SelectContent>
  //         </Select>
  //       </FormItem>
  //     )}
  //   />
  // );
}
