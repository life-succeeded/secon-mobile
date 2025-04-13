import { createContext } from "react";

export type ContextModel = {
    pageState: number;
    setPageState: (number: number) => void;
    previousPage?: number;
}

export const ActCreateContext = createContext<ContextModel>(null);