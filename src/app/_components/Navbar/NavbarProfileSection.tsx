"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function NavbarProfileSection({ session }: { session: Session | null }) {
  if (session) {
    return (
      <>
        <Link className="px-4" href="/">
          Profile
        </Link>
        <button
          className="px-4"
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
      <Link className="px-4" href="/api/auth/signin">
        Sign In
      </Link>
    </>
  );
}
