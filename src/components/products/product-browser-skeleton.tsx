export function ProductBrowserSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading product browser"
      className="grid gap-8 lg:grid-cols-[15rem_1fr]"
    >
      <div className="hidden space-y-5 lg:block">
        <div className="bg-surface-muted h-5 w-20 animate-pulse motion-reduce:animate-none" />
        <div className="bg-surface-muted h-40 animate-pulse motion-reduce:animate-none" />
        <div className="bg-surface-muted h-5 w-24 animate-pulse motion-reduce:animate-none" />
        <div className="bg-surface-muted h-40 animate-pulse motion-reduce:animate-none" />
      </div>
      <div className="grid gap-px md:grid-cols-2">
        <div className="bg-surface-muted h-96 animate-pulse motion-reduce:animate-none" />
        <div className="bg-surface-muted h-96 animate-pulse motion-reduce:animate-none" />
      </div>
      <span className="sr-only">Loading products</span>
    </div>
  );
}
