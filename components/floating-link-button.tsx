import { useRouter } from "next/router";

type Props = {
  children: string;
  href: string;
};

export default function FloatingLinkButton({ children, href }: Props) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      className="absolute bottom-4 right-0 bg-indigo-200 font-semibold text-black p-2 rounded-md"
    >
      {children}
    </button>
  );
}
