import { useContext } from "react";
import { FlagsContext } from ".";

/**
 * Custom hook for accessing the feature flags context.
 *
 * This hook simplifies the process of using feature flags in your React components
 * by providing direct access to the flags and the associated setter function.
 * It must be used within a component tree that has `FlagsProvider` at its root,
 * as it relies on the context provided by `FlagsProvider`.
 *
 * @returns The `flags` state and the `setFlags` function from the context.
 *
 * @example
 * const { flags, setFlags } = useFlags();
 *
 * @throws Will throw an error if used outside of a `FlagsProvider`.
 */
export const useFlags = () => {
  const context = useContext(FlagsContext);
  if (context == null) {
    throw new Error("useFlags must be used within a FlagsProvider");
  }
  return context;
};
