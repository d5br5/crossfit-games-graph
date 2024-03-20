import { z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  date: z.date(),
  timeSlot: z.string(),
  location: z.string(),
});

export type FormDataType = z.infer<typeof FormSchema>;
export type FormType = UseFormReturn<FormDataType>;

export const useFormF = () => {
  const form = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
  });

  return form;
};
