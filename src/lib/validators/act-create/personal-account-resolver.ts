import { object, string } from "yup";

export const personalAccountResolver = object({
  account: string()
    .required("Пожалуйста, введите лицевой счет")
    .matches(/^\d+$/, "Лицевой счет должен содержать только цифры")
    .min(6, "Лицевой счет должен содержать минимум 6 цифр")
    .max(20, "Лицевой счет должен содержать максимум 20 цифр")
});