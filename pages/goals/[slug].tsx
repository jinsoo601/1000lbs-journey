import Page from "@/components/page";
import { useRouter } from "next/router";

export default function Goal() {
  const router = useRouter();
  const { slug } = router.query;
  return <Page isProtected={true}>Goal detail page ID: {slug}</Page>;
}
