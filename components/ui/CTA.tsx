import { cn } from "@/lib/utils/cn";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "line";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  external?: boolean;
};

function Arrow() {
  return (
    <span aria-hidden="true" className="relative inline-flex h-3 w-5 items-center overflow-hidden">
      <span className="absolute left-0 h-px w-3.5 bg-current transition-all duration-500 ease-[var(--ease-expo)] group-hover:w-5" />
      <svg
        viewBox="0 0 8 10"
        className="absolute h-2.5 w-2 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5"
        style={{ left: "0.6rem" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M1 1l5 4-5 4" />
      </svg>
    </span>
  );
}

/**
 * Buttons: square-cornered, thin lines, a soft shadow, an arrow that travels.
 *  solid — the primary action (charcoal on light, ivory on dark)
 *  ghost — hairline border, fills faintly on hover
 *  line  — text with an underline that redraws on hover
 */
export function CTA({ href, children, variant = "solid", className, onClick, external }: Props) {
  const base =
    "group relative inline-flex min-h-12 items-center gap-3 whitespace-nowrap eyebrow !text-[0.7rem] !tracking-[0.18em] transition-[background-color,box-shadow,border-color,color] duration-500 ease-[var(--ease-expo)]";
  const styles = {
    solid:
      "bg-bone px-6 py-3.5 text-ink shadow-[var(--shadow-soft)] hover:bg-[color-mix(in_oklab,var(--color-bone)_86%,var(--color-ink))] hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_18px_40px_-14px_rgba(0,0,0,0.35)]",
    ghost:
      "border border-bone/25 px-6 py-3.5 text-bone hover:border-bone/60 hover:bg-bone/[0.04] hover:shadow-[var(--shadow-soft)]",
    line: "py-3 text-bone",
  }[variant];

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(base, styles, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {variant !== "line" && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 size-1.5 scale-0 bg-copper transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-100 group-focus-visible:scale-100"
        />
      )}
      <span className="relative">{children}</span>
      <Arrow />
      {variant === "line" && (
        <span
          aria-hidden="true"
          className="absolute bottom-1.5 left-0 h-px w-full origin-right bg-bone/35 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:origin-left group-hover:bg-bone"
        />
      )}
    </a>
  );
}
