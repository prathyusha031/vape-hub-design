import { Fragment } from "react";

/**
 * Splits a string into masked lines -> chars for GSAP reveals.
 * Rendered on the server, so no layout shift or hydration flicker.
 * Screen readers get the plain text via aria-label.
 */
export function SplitChars({
  text,
  className,
  charClassName = "split-char",
}: {
  text: string;
  className?: string;
  charClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {Array.from(w).map((ch, ci) => (
              <span key={ci} className={charClassName}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? <span aria-hidden="true"> </span> : null}
        </Fragment>
      ))}
    </span>
  );
}
