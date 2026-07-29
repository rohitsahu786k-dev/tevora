import { describe, expect, it } from "vitest";
import {
  createConfigurationShareUrl,
  createConfigurationState,
  parseConfiguration,
  serialiseConfiguration,
} from "@/lib/configuration/state";
import { onespaceConfigurationSchema } from "@/lib/validation/configuration";

describe("configuration state", () => {
  it("creates schema-valid versioned state", () => {
    const state = createConfigurationState({
      id: "test-configuration",
      updatedAt: "2026-07-13T00:00:00.000Z",
    });
    expect(onespaceConfigurationSchema.safeParse(state).success).toBe(true);
    expect(state.version).toBe(1);
  });

  it("round-trips serialised and shared state", () => {
    const state = createConfigurationState({
      id: "shared-configuration",
      updatedAt: "2026-07-13T00:00:00.000Z",
    });
    state.finder.space = "boardroom";
    const serialised = serialiseConfiguration(state);
    expect(parseConfiguration(serialised)).toEqual(state);
    const url = new URL(
      createConfigurationShareUrl(state, "https://onespace.example/configure"),
    );
    expect(parseConfiguration(url.searchParams.get("configuration"))).toEqual(
      state,
    );
  });

  it("rejects corrupt and unsupported configuration versions", () => {
    expect(parseConfiguration("not-json")).toBeNull();
    expect(
      parseConfiguration(
        JSON.stringify({ ...createConfigurationState(), version: 2 }),
      ),
    ).toBeNull();
  });
});
