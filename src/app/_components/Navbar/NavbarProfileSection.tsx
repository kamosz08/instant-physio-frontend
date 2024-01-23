"use client";

import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarProfileSection({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const { data } = useSession();

  if (session) {
    return (
      <>
        <span className="mr-2 text-sm text-gray-500 hidden sm:block">
          Credits:
        </span>
        <span className="mr-2 text-sm text-gray-500 sm:hidden">c:</span>
        <p className="font-semibold mr-2 text-sm">
          {data?.user.details.credits || session.user.details.credits}
        </p>
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
