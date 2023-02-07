import Page from "@/components/page";
import { useRouter } from "next/router";

export default function Journal() {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Page isProtected={true}>Single Journal Entry details page ID: {slug}</Page>
  );
}
