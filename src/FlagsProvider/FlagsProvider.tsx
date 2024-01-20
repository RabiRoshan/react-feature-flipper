import { useState } from "react";
import { type Flags } from "../types";
import { FlagsContext } from "./context";

interface FlagsProviderProps {
  flags: Flags;
  children: React.ReactNode;
}

export const FlagsProvider: React.FC<FlagsProviderProps> = ({
  flags: defaultFlags,
  children,
}) => {
  const [flags, setFlags] = useState(defaultFlags);

  return (
    <FlagsContext.Provider value={{ flags, setFlags }}>
      {children}
    </FlagsContext.Provider>
  );
};
