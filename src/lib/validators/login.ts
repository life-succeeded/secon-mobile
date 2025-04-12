import { object, string } from "yup";

export const loginResolver = object({
    brigadeId: string()
        .required("Пожалуйста введите номер бригады")
        .length(24, 'Номер бригады должен состоять из 24 символов')
});
