"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationRoutes() {
  const pathname = usePathname();

  return (
    <>
      <li className={pathname === "/" ? "px-4 text-primary" : "px-4"}>
        <Link
          className="active:!text-primary active:!bg-transparent focus:!text-primary focus:!bg-transparent"
          href={"/"}
        >
          Home
        </Link>
      </li>
      <li className={pathname === "/categories" ? "px-4 text-primary" : "px-4"}>
        <details>
          <summary>Categories</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li>
      <li className={pathname === "/coaches" ? "px-4 text-primary" : "px-4"}>
        <Link
          className="active:!text-primary active:!bg-transparent focus:!text-primary focus:!bg-transparent"
          href={"/coaches"}
        >
          Coaches
        </Link>
      </li>
    </>
  );
}
