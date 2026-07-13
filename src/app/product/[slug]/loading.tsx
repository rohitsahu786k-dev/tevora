export default function Loading() {
  return (
    <main
      id="main-content"
      className="mx-auto min-h-screen max-w-7xl px-5 py-20 sm:px-8"
    >
      <div className="grid animate-pulse gap-10 motion-reduce:animate-none lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="bg-surface-muted h-4 w-32" />
          <div className="bg-surface-muted mt-8 h-24" />
          <div className="bg-surface-muted mt-6 h-8" />
          <div className="bg-surface-muted mt-10 h-14" />
        </div>
        <div className="bg-surface-muted aspect-[4/3] lg:col-span-7" />
      </div>
      <span className="sr-only">Loading product</span>
    </main>
  );
}
