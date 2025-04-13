import { object, string } from "yup";

export const actTypeResolver = object({
  actType: string()
    .required("Пожалуйста, выберите тип акта")
});