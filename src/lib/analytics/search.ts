import type { SearchCategory } from "@/components/search/search-data";

export type SearchAnalyticsEvent =
  | { name: "search_submitted"; query: string; resultCount: number }
  | {
      name: "search_result_selected";
      query: string;
      resultId: string;
      category: SearchCategory;
    }
  | { name: "search_no_results"; query: string };

export interface SearchAnalyticsAdapter {
  track(event: SearchAnalyticsEvent): void | Promise<void>;
}

export const noopSearchAnalytics: SearchAnalyticsAdapter = {
  track: () => undefined,
};
