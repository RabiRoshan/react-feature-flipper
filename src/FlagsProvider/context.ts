import { createContext } from "react";
import { type Flags } from "../types";

/**
 * Interface defining the shape of the context state for feature flags.
 *
 * @interface
 * @property {Flags} flags - The current state of the feature flags.
 * @property {(flags: Flags) => void} setFlags - Function to update the feature flags state.
 */
export interface FlagsContextState {
  flags: Flags;
  setFlags: (flags: Flags) => void;
}

/**
 * Context for providing and consuming feature flags throughout the application.
 *
 * This context should be used with the `FlagsProvider` to wrap parts of the app
 * where feature flags are needed. It provides the current state of the flags and
 * a function to update them.
 *
 * @example
 * // Consuming the context in a component
 * const { flags, setFlags } = useContext(FlagsContext);
 *
 * @type {React.Context<FlagsContextState | null>}
 */
export const FlagsContext = createContext<FlagsContextState | null>(null);
