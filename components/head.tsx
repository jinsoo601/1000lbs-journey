import NextHead from "next/head";

export default function Head({ title }: { title: string }) {
  return (
    <NextHead>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </NextHead>
  );
}
