import { FormType } from "./use-form";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/src/components/ui/calendar";
import { Button } from "@/src/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";

interface Props {
  form: FormType;
}

export default function DatePicker({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel>운동 날짜</FormLabel>
          <Dialog>
            <DialogTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className="pl-3 text-left justify-between"
                >
                  {field.value ? (
                    format(field.value, "PPPP", { locale: ko })
                  ) : (
                    <span>날짜를 선택해주세요</span>
                  )}
                  <CalendarIcon className="size-4" />
                </Button>
              </FormControl>
            </DialogTrigger>
            <DialogContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
              <DialogClose asChild>
                <Button size="sm" className="mx-4 mb-4">
                  날짜 선택 및 닫기
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </FormItem>
      )}
    />
  );
}
