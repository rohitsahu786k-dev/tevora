import { PortableText, type PortableTextBlock } from "@portabletext/react";

export function CmsPortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          h2: ({ children }) => <h2 className="type-h2 mt-10">{children}</h2>,
          h3: ({ children }) => <h3 className="type-h3 mt-8">{children}</h3>,
          normal: ({ children }) => (
            <p className="type-body text-ink-muted mt-5">{children}</p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="type-h4 border-accent my-8 border-l-2 pl-6">
              {children}
            </blockquote>
          ),
        },
      }}
    />
  );
}
