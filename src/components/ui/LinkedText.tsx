import { Fragment } from "react";

type LinkedTextProps = {
  text: string;
};

const linkPattern =
  /([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|https?:\/\/[^\s]+|www\.[^\s]+|\b(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s]*)?)/gi;

const trailingPunctuation = /[.,;:!?)]*$/;

const linkClass =
  "break-all font-semibold text-[var(--brand)] underline underline-offset-4 transition-colors hover:text-[var(--brand-deep)] dark:text-white dark:hover:text-white";

function getLinkParts(value: string) {
  const punctuation = value.match(trailingPunctuation)?.[0] ?? "";
  const cleanValue = punctuation ? value.slice(0, -punctuation.length) : value;
  return { cleanValue, punctuation };
}

function getHref(value: string) {
  if (value.includes("@") && !value.startsWith("http")) {
    return `mailto:${value}`;
  }

  return value.startsWith("http") ? value : `https://${value}`;
}

export function LinkedText({ text }: LinkedTextProps) {
  return (
    <>
      {text.split("\n").map((line, lineIndex) => {
        const pieces = line.split(linkPattern).filter(Boolean);

        return (
          <Fragment key={`${line}-${lineIndex}`}>
            {lineIndex > 0 && <br />}
            {pieces.map((piece, pieceIndex) => {
              if (!linkPattern.test(piece)) {
                linkPattern.lastIndex = 0;
                return <Fragment key={`${piece}-${pieceIndex}`}>{piece}</Fragment>;
              }

              linkPattern.lastIndex = 0;
              const { cleanValue, punctuation } = getLinkParts(piece);
              const isEmail = cleanValue.includes("@") && !cleanValue.startsWith("http");

              return (
                <Fragment key={`${piece}-${pieceIndex}`}>
                  <a
                    className={linkClass}
                    href={getHref(cleanValue)}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                  >
                    {cleanValue}
                  </a>
                  {punctuation}
                </Fragment>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}
