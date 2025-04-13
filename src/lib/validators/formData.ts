import { number, object, string } from "yup";

export const formDataResolver = object({
    sealPlace: string()
        .required("Пожалуйста введите место установки пломбы"),
    sealNumber: string()
        .required("Пожалуйста введите место номер пломбы"),
    account: string()
        .required("Пожалуйста введите номер лицевого счета"),
    address: string()
        .required("Пожалуйста введите адрес"),
    number: string()
        .required("Пожалуйста введите контактный номер телефона"),
    fullName: string()
        .required("Пожалуйста введите ФИО потребителя"),
    actType: string()
        .required("Пожалуйста выберите тип акта"),
    pullElectro: string()
        .required("Пожалуйста выберите подачу электроэнергии"),
    timeToOff: string()
        .required("Пожалуйста введите время"),
    dateToOff: string()
        .required("Пожалуйста введите дату"),
    violation: string()
        .required("Пожалуйста выберите нарушение"),
    powerSupplyType: string()
        .required("Пожалуйста введите тип счетчика"),
    deviceValue: string()
        .required("Пожалуйста введите показания счетчика"),
    pullElectroAuthor: string()
        .required("Пожалуйста выберите автора действия"),
    duration: string()
        .required("Пожалуйста введите путь"),
    counterNumberNew: string()
        .required("Пожалуйста введите показания счетчика")
});
