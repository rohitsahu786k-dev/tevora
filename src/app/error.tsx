"use client";
import { Button } from "@/components/ui/button";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main-content"
      className="mx-auto min-h-[65vh] max-w-7xl px-5 py-24 sm:px-8"
    >
      <p className="type-eyebrow text-error">Something went wrong</p>
      <h1 className="type-h1 mt-5">We couldn’t load this page.</h1>
      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
