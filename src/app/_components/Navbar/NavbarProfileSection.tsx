"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarProfileSection({ session }: { session: Session | null }) {
  const pathname = usePathname();

  if (session) {
    return (
      <>
        <Link className="btn btn-ghost px-4" href="/">
          Profile
        </Link>
        <button
          className="btn btn-ghost px-4"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <Link
        className="btn btn-ghost px-4"
        href={`/login?callbackPath=${pathname}`}
      >
        Sign In
      </Link>
    </>
  );
}
