import { useState } from "react";
import { type Flags } from "../types";
import { FlagsContext } from ".";

/**
 * Props for FlagsProvider component.
 * @typedef {Object} FlagsProviderProps
 * @property {Flags} flags - Initial set of feature flags.
 * @property {React.ReactNode} children - Child components to be rendered within the provider.
 */
interface FlagsProviderProps {
  flags: Flags;
  children: React.ReactNode;
}

/**
 * Component that provides feature flags context to its children.
 *
 * `FlagsProvider` should wrap the top-level component in your application
 * where feature flags need to be accessed. It initializes the feature flags
 * state and provides the context for child components to consume these flags.
 *
 * @param {FlagsProviderProps} props - The props for the FlagsProvider component.
 * @returns {React.ReactElement} The FlagsProvider component with children.
 *
 * @example
 * <FlagsProvider flags={{ feature1: true, feature2: false }}>
 *   <YourComponent />
 * </FlagsProvider>
 */
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
