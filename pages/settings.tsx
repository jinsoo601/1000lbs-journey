import Page from "@/components/page";
import { signOut } from "next-auth/react";

export default function Settings() {
  return (
    <Page isProtected={true}>
      <p className="text-3xl">Settings</p>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </Page>
  );
}
