"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavbarProfileSection() {
  const pathname = usePathname();
  const { data } = useSession();

  if (data?.user) {
    return (
      <>
        <span className="mr-2 text-sm text-gray-500 hidden sm:block">
          Credits:
        </span>
        <span className="mr-2 text-sm text-gray-500 sm:hidden">c:</span>
        <p className="font-semibold mr-2 text-sm">
          {data.user.details.credits}
        </p>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                width={40}
                height={40}
                alt="Tailwind CSS Navbar component"
                src="/default-avatar.png"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/sessions"}>My sessions</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
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
