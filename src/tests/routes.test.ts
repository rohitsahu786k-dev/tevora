import { describe, expect, it } from "vitest";
import { routes } from "@/lib/routes";
describe("route helpers", () => {
  it("builds dynamic routes", () =>
    expect(routes.product("console")).toBe("/product/console"));
});
