import { useContext } from "react";
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlagsProvider, FlagsContext } from ".";

// Test component that uses the FlagsContext
const TestConsumerComponent = () => {
  const flagsContext = useContext(FlagsContext);
  if (!flagsContext) {
    throw new Error("FlagsContext is not defined");
  }
  const { flags, setFlags } = flagsContext;
  return (
    <div>
      <div data-testid="flag-value">{JSON.stringify(flags)}</div>
      <button onClick={() => setFlags({ flag1: !flags.flag1 })}>
        Toggle Flag
      </button>
    </div>
  );
};

describe("FlagsProvider component", () => {
  it("provides flags context to children", async () => {
    render(
      <FlagsProvider flags={{ flag1: true }}>
        <TestConsumerComponent />
      </FlagsProvider>
    );

    expect(screen.getByTestId("flag-value").textContent).toBe('{"flag1":true}');

    // Use userEvent for simulating user interactions
    userEvent.click(screen.getByRole("button", { name: "Toggle Flag" }));

    // Wait for the flag to be toggled and check the updated value
    await waitFor(() => {
      expect(screen.getByTestId("flag-value").textContent).toBe(
        '{"flag1":false}'
      );
    });
  });
});
