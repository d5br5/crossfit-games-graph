import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerTimer,
  SelectValue,
} from "@/src/components/ui/select";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { FormType } from "../page";

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
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTriggerTimer>
                <SelectValue placeholder="시간대" />
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
          <FormDescription>
            You can manage email addresses in your
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
