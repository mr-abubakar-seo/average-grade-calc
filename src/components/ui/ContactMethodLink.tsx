type ContactMethodLinkProps = {
  type: string;
  value: string;
};

const linkClass =
  "inline-block max-w-full break-all text-sm font-semibold leading-relaxed text-[var(--brand)] underline-offset-4 transition-colors hover:underline dark:text-white sm:text-right";

export function ContactMethodLink({ type, value }: ContactMethodLinkProps) {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("email")) {
    return (
      <a className={linkClass} href={`mailto:${value}`}>
        {value}
      </a>
    );
  }

  if (normalizedType.includes("website")) {
    const href = value.startsWith("http") ? value : `https://${value}`;

    return (
      <a className={linkClass} href={href} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    );
  }

  return <span className="inline-block max-w-full break-all text-sm text-slate-600 dark:text-slate-400">{value}</span>;
}
