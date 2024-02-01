"use client";

import { useCloseDropdownOnClickOutside } from "@/utils/useCloseDropdownOnClickOutside";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export function NavbarProfileSection() {
  const pathname = usePathname();
  const { data } = useSession();
  const ref = useRef<HTMLDetailsElement>(null);
  useCloseDropdownOnClickOutside(ref);

  const handleSubmenuItemClick = () => {
    ref.current!.open = false;
  };

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
        <details className="dropdown dropdown-end" ref={ref}>
          <summary className="block">
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
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li onClick={handleSubmenuItemClick}>
              <Link href={"/sessions"}>My sessions</Link>
            </li>
            <li onClick={handleSubmenuItemClick}>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
        </details>
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
