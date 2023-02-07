import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex justify-between items-start relative md:items-center">
      <div className="text-2xl font-semibold ">1000LBS</div>
      <button
        className="text-2xl font-medium md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ⋮
      </button>
      <ul
        className={`
          absolute right-0 top-[2rem] border-2 border-slate-500 bg-black divide-y divide-y-slate-500 ${
            isOpen ? "block" : "hidden"
          } md:flex md:flex-row md:static md:gap-6 md:border-0 md:divide-y-0
        `}
      >
        <NavItem href="/journals">Journals</NavItem>
        <NavItem href="/goals">Goals</NavItem>
        <NavItem href="/statistics">Statistics</NavItem>
        <NavItem href="/settings">Settings</NavItem>
      </ul>
    </nav>
  );
}

function NavItem({ children, href }: { children: string; href: string }) {
  return (
    <li>
      <Link className="block p-2 md:p-0" href={href}>
        {children}
      </Link>
    </li>
  );
}
