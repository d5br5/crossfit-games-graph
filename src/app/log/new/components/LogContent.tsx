import { FormType } from "../hooks/useForm";
import { Textarea } from "@/src/components/ui/textarea";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";

interface Props {
  form: FormType;
}

export default function LogContent({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>운동 상세 내용</FormLabel>
          <FormControl>
            <Textarea
              placeholder="운동 내용을 입력해주세요"
              className=""
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
