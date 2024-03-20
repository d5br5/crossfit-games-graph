import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerTimer,
  SelectValue,
} from "@/src/components/ui/select";

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
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function TimeSlot({ value, setValue }: Props) {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTriggerTimer className="w-[280px] font-medium hover:bg-accent hover:text-accent-foreground">
        <SelectValue placeholder="시간대" />
      </SelectTriggerTimer>
      <SelectContent>
        {slotList.map((slot) => {
          const isSelected = value === slot.value;
          const className = cn(
            isSelected && "bg-accent text-accent-foreground"
          );
          return (
            <SelectItem
              value={slot.value}
              key={slot.value}
              className={className}
            >
              {slot.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
