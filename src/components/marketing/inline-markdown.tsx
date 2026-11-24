import Link from "next/link";
import { Fragment, type ReactNode } from "react";

// Tiny, safe inline renderer for journal copy: [text](/path), [text](https://…) and **bold**.
// No HTML is ever injected; anything else renders as plain text.
const TOKEN = /\[([^\]]+)\]\(((?:\/|https:\/\/)[^\s)]*)\)|\*\*([^*]+)\*\*/g;

export function InlineMarkdown({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const [, label, href, bold] = match;
    if (href) {
      parts.push(
        href.startsWith("/") ? (
          <Link
            key={index}
            href={href}
            className="text-sage font-medium underline-offset-4 hover:underline"
          >
            {label}
          </Link>
        ) : (
          <a
            key={index}
            href={href}
            rel="noreferrer"
            className="text-sage font-medium underline-offset-4 hover:underline"
          >
            {label}
          </a>
        ),
      );
    } else {
      parts.push(
        <strong key={index} className="text-ink font-semibold">
          {bold}
        </strong>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
