import { useFlags } from "../FlagsProvider";

/**
 * Base properties for the Flipper component.
 */
type BaseFlipperProps = {
  /**
   * A list of flag names that determine the rendering behavior.
   */
  authorizedFlags: string[];

  /**
   * If true, all flags in authorizedFlags must be true to render the children or invoke onMatchRender.
   * If false, any one of the authorizedFlags being true will suffice.
   */
  requireAllFlags?: boolean;

  /**
   * Optional custom render function invoked when the feature flag condition is not met.
   * It receives arrays of matched and unmatched flags.
   */
  onNoMatchRender?: (matched: string[], unmatched: string[]) => React.ReactNode;
};

/**
 * FlipperProps when children are provided.
 */
type FlipperPropsWithChildren = BaseFlipperProps & {
  /**
   * The children to render when the feature flag condition is met.
   */
  children: React.ReactNode;

  /**
   * onMatchRender is not used when children are provided.
   */
  onMatchRender?: never;
};

/**
 * FlipperProps when a custom render function is provided.
 */
type FlipperPropsWithRenderFunc = BaseFlipperProps & {
  /**
   * Children are not used when onMatchRender is provided.
   */
  children?: never;

  /**
   * Custom render function invoked when the feature flag condition is met.
   * It receives arrays of matched and unmatched flags.
   */
  onMatchRender: (matched: string[], unmatched: string[]) => React.ReactNode;
};

/**
 * Union type for Flipper component props.
 */
type FlipperProps = FlipperPropsWithChildren | FlipperPropsWithRenderFunc;

/**
 * Flipper component to conditionally render content based on feature flags.
 */
export const Flipper: React.FC<FlipperProps> = ({
  authorizedFlags,
  requireAllFlags = false,
  children,
  onMatchRender,
  onNoMatchRender,
}) => {
  const { flags } = useFlags();

  // Separate matched and unmatched flags
  const matchedFlags = authorizedFlags.filter((flag) => flags[flag]);
  const unmatchedFlags = authorizedFlags.filter((flag) => !flags[flag]);

  // Determine if flags meet the required condition
  const isAuthorized = requireAllFlags
    ? matchedFlags.length === authorizedFlags.length
    : matchedFlags.length > 0;

  // Render logic based on flag condition
  if (isAuthorized) {
    return (
      <>
        {onMatchRender ? onMatchRender(matchedFlags, unmatchedFlags) : children}
      </>
    );
  } else {
    return (
      <>
        {onNoMatchRender ? onNoMatchRender(matchedFlags, unmatchedFlags) : null}
      </>
    );
  }
};
