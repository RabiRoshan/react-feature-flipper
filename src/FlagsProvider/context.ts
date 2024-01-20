import { createContext } from "react";
import { type Flags } from "../types";

interface FlagsContextState {
  flags: Flags;
  setFlags: (flags: Flags) => void;
}

export const FlagsContext = createContext<FlagsContextState | null>(null);
