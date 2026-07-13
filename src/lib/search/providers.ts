import {
  searchContent,
  type SearchResult,
} from "@/components/search/search-data";

export type SearchProviderKind =
  "local" | "cms" | "algolia" | "meilisearch" | "elasticsearch";

export interface SearchRequest {
  query: string;
  limit?: number;
}

export interface SearchProvider {
  readonly kind: SearchProviderKind;
  search(request: SearchRequest): Promise<SearchResult[]>;
}

export class LocalSearchProvider implements SearchProvider {
  readonly kind = "local" as const;
  async search({ query, limit = 12 }: SearchRequest) {
    return searchContent(query).slice(0, limit);
  }
}

// Remote providers call a same-origin server route. Provider credentials belong
// in that server implementation and are never accepted by this client adapter.
export class ServerSearchProvider implements SearchProvider {
  constructor(
    readonly kind: Exclude<SearchProviderKind, "local">,
    private readonly endpoint = "/api/search",
  ) {}
  async search({ query, limit = 12 }: SearchRequest) {
    const url = new URL(this.endpoint, window.location.origin);
    url.searchParams.set("q", query);
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("provider", this.kind);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Search provider unavailable");
    return (await response.json()) as SearchResult[];
  }
}

export const localSearchProvider = new LocalSearchProvider();
