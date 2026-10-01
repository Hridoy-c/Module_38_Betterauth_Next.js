"use client";

import { signOut, useSession } from "@/lib/auth-client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) =>
    `rounded-lg px-3 py-2 text-sm transition-colors duration-300 ${
      pathname === href
        ? "bg-[#00bfff]/10 text-[#00bfff]"
        : "text-white/70 hover:text-white"
    }`;

  const Logout = async () => {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-[#333] bg-black/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="relative flex items-center pl-6 text-xl font-semibold tracking-tight text-[#00bfff]"
        >
          <span className="absolute left-0 h-3.5 w-3.5 rounded-full bg-[#00bfff]" />
          <span className="absolute left-0 h-3.5 w-3.5 animate-ping rounded-full bg-[#00bfff]" />
          MyApp
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-2 md:flex">
          {session?.user ? (
            <>
              <span className="text-white"> Welcome, {session.user.name}</span>
              <button
                className="rounded-[10px] cursor-pointer bg-[#00bfff] px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-[#00bfff]/60"
                onClick={Logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-[10px] border border-[#333] px-4 py-2 text-sm text-white transition-colors duration-300 hover:border-[#00bfff]/60"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="rounded-[10px] bg-[#00bfff] px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-[#00bfff]/60"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-[#333] p-2 text-white md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
    </header>
  );
}
