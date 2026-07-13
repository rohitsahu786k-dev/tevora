import { describe, expect, it } from "vitest";
import {
  mainNavigation,
  productMenuGroups,
  sectorMenuItems,
  spaceMenuGroups,
} from "@/config/navigation";
import { searchContent, searchIndex } from "@/components/search/search-data";

describe("global navigation accessibility contracts", () => {
  it("uses the required primary navigation language", () =>
    expect(mainNavigation.map(({ label }) => label)).toEqual([
      "Products",
      "Spaces",
      "Sectors",
      "Configure",
      "Projects",
      "Resources",
      "Design Support",
      "Partners",
      "Company",
      "Contact",
    ]));
  it("provides unique, labelled menu destinations", () => {
    const items = [...productMenuGroups, ...spaceMenuGroups]
      .flatMap(({ items }) => items)
      .concat(sectorMenuItems);
    expect(items.every(({ label, href }) => Boolean(label && href))).toBe(true);
    expect(new Set(items.map(({ href }) => href)).size).toBe(items.length);
  });
  it("includes descriptions for every product-family menu item", () =>
    expect(
      productMenuGroups
        .flatMap(({ items }) => items)
        .every(({ description }) => Boolean(description)),
    ).toBe(true));
  it("indexes every requested search category", () =>
    expect(new Set(searchIndex.map(({ category }) => category))).toEqual(
      new Set([
        "Products",
        "Product Families",
        "Accessories",
        "Spaces",
        "Sectors",
        "Projects",
        "Resources",
        "Company Pages",
      ]),
    ));
  it("returns ranked results for keyboard search", () =>
    expect(searchContent("presentation").at(0)?.title).toMatch(
      /Presentation|ARC/i,
    ));
});
