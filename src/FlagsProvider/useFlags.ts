import { useContext } from "react";
import { FlagsContext } from "./context";

export const useFlags = () => {
  const context = useContext(FlagsContext);
  if (context == null) {
    throw new Error("useFlags must be used within a FlagsProvider");
  }
  return context;
};
