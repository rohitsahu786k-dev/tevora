import { ProductBrowserSkeleton } from "@/components/products/product-browser-skeleton";
export default function Loading() {
  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen max-w-7xl px-5 py-24 sm:px-8"
    >
      <div className="bg-surface-muted h-5 w-28 animate-pulse motion-reduce:animate-none" />
      <div className="bg-surface-muted mt-8 h-20 max-w-3xl animate-pulse motion-reduce:animate-none" />
      <div className="mt-16">
        <ProductBrowserSkeleton />
      </div>
    </main>
  );
}
