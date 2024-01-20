import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useFlags } from "./useFlags";
import { FlagsProvider } from "./FlagsProvider";

describe("useFlags hook", () => {
  it("should throw an error when used outside of FlagsProvider", () => {
    expect(() => {
      renderHook(() => useFlags());
    }).toThrow("useFlags must be used within a FlagsProvider");
  });

  it("should return the flags context when used within FlagsProvider", () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <FlagsProvider flags={{ flag1: true }}>{children}</FlagsProvider>
    );
    const { result } = renderHook(() => useFlags(), { wrapper });

    expect(result.current.flags).toEqual({ flag1: true });
    expect(typeof result.current.setFlags).toBe("function");
  });
});
