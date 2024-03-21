import { cn } from "@/lib/utils";
import { FormType } from "../hooks/useForm";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerTimer,
  SelectValue,
} from "@/src/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";

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
  return (
    <FormField
      control={form.control}
      name="timeSlot"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel>운동 시간대</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTriggerTimer>
                <SelectValue placeholder="시간대를 선택해주세요" />
              </SelectTriggerTimer>
            </FormControl>
            <SelectContent>
              {slotList.map((slot) => (
                <SelectItem
                  value={slot.value}
                  key={slot.value}
                  className={cn(
                    field.value === slot.value &&
                      "bg-accent text-accent-foreground"
                  )}
                >
                  {slot.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
