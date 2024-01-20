# react-feature-flipper

Effortlessly manage feature flags in React. `react-feature-flipper` simplifies flag distribution and control across your application, providing an intuitive and efficient solution for feature toggling.

## Features

- **Easy Integration**: Seamlessly integrates with any React project.
- **Dynamic Flag Management**: Allows for flexible and dynamic control of feature visibility within your application.
- **Context-Based**: Utilizes React's context API for efficient flag state management.
- **Custom Hooks**: Provides `useFlags` hook for easy access to flag state and control within components.

## Installation

```bash
npm install react-feature-flipper
```

Or

```bash
yarn add react-feature-flipper
```

## Usage

### Basic Usage

```jsx
import React from "react";
import { FlagsProvider, Flipper } from "react-feature-flipper";

const App = () => {
  return (
    <FlagsProvider flags={{ feature1: true }}>
      <Flipper authorizedFlags={["feature1"]}>
        <div>Feature 1 is active!</div>
      </Flipper>
    </FlagsProvider>
  );
};

export default App;
```

### Advanced Usage

#### Using `useFlags` Hook

```jsx
import React from "react";
import { useFlags, FlagsProvider } from "react-feature-flipper";

const MyComponent = () => {
  const { flags, setFlags } = useFlags();

  // Example usage of the flags
  return (
    <div>
      {flags.feature1 && <p>Feature 1 is active!</p>}
      <button onClick={() => setFlags({ ...flags, feature1: !flags.feature1 })}>
        Toggle Feature 1
      </button>
    </div>
  );
};

const App = () => (
  <FlagsProvider flags={{ feature1: false }}>
    <MyComponent />
  </FlagsProvider>
);

export default App;
```

#### Using `requireAllFlags`

By default, `Flipper` checks if at least one of the `authorizedFlags` is true. Use `requireAllFlags` to render content only if all specified flags are true.

```jsx
<Flipper authorizedFlags={["feature1", "feature2"]} requireAllFlags>
  <div>All required features are active!</div>
</Flipper>
```

#### Using `onNoMatchRender`

Customize rendering when the flag conditions aren't met using `onNoMatchRender`. It provides arrays of matched and unmatched flags.

```jsx
<Flipper
  authorizedFlags={["feature1"]}
  onNoMatchRender={(matched, unmatched) => (
    <div>Feature 1 is not active. Unmatched Flags: {unmatched.join(", ")}</div>
  )}
>
  <div>Feature 1 is active!</div>
</Flipper>
```

#### Using `onMatchRender`

Define custom rendering for when flag conditions are met with `onMatchRender`. Note that `onMatchRender` is mutually exclusive with `children`.

```jsx
<Flipper
  authorizedFlags={["feature1"]}
  onMatchRender={(matched, unmatched) => (
    <div>
      Feature 1 is active and custom rendered! Matched Flags:{" "}
      {matched.join(", ")}
    </div>
  )}
/>
```

## License

`react-feature-flipper` is [MIT licensed](./LICENSE).
