import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Flipper } from ".";
import { FlagsProvider } from "../FlagsProvider";
import "@testing-library/jest-dom";

describe("Flipper component", () => {
  it("renders children when a flag is active", () => {
    render(
      <FlagsProvider flags={{ "feature-1": true }}>
        <Flipper authorizedFlags={["feature-1"]}>
          <div>Feature Active</div>
        </Flipper>
      </FlagsProvider>
    );
    expect(screen.getByText("Feature Active")).toBeInTheDocument();
  });

  it("does not render children when a flag is inactive", () => {
    render(
      <FlagsProvider flags={{ "feature-1": false }}>
        <Flipper authorizedFlags={["feature-1"]}>
          <div>Feature Active</div>
        </Flipper>
      </FlagsProvider>
    );
    expect(screen.queryByText("Feature Active")).toBeNull();
  });

  it("renders custom component on match using onMatchRender", () => {
    render(
      <FlagsProvider flags={{ "feature-1": true }}>
        <Flipper
          authorizedFlags={["feature-1"]}
          onMatchRender={() => <div>Custom Render</div>}
        />
      </FlagsProvider>
    );
    expect(screen.getByText("Custom Render")).toBeInTheDocument();
  });

  it("renders custom component on mismatch using onMismatchRender", () => {
    render(
      <FlagsProvider flags={{ "feature-1": false }}>
        <Flipper
          authorizedFlags={["feature-1"]}
          onMatchRender={() => <div>Custom Matched Render</div>}
          onNoMatchRender={() => <div>Custom Mismatched Render</div>}
        />
      </FlagsProvider>
    );
    expect(screen.getByText("Custom Mismatched Render")).toBeInTheDocument();
  });
});
