import { createContext } from "react";
import type { PartContextType } from "./PartContextProvider";

export const PartContext = createContext<PartContextType>(
  {} as PartContextType,
);