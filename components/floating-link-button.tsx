import Button from "./button";
import { useRouter } from "next/router";

type Props = {
  children: string;
  href: string;
};

export default function FloatingLinkButton({ children, href }: Props) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(href)}
      className="absolute bottom-4 right-0"
    >
      {children}
    </Button>
  );
}
