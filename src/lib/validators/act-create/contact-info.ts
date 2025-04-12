import { object, string } from "yup";

export const contactInfoResolver = object({
    number: string()
        .required("Пожалуйста введите номер")
        .length(11, 'Номер должен состоять из 11 символов'),
        fullName: string()
        .required("Пожалуйста введите ФИО"),
        address: string()
        .required("Пожалуйста введите адрес")
});
