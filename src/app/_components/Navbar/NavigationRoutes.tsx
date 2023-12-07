"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationRoutes() {
  const pathname = usePathname();
  const navRoutes = [
    { name: "Home", path: "/" },
    { name: "Coaches", path: "/coaches" },
  ];

  return (
    <ul className="flex justify-evenly ">
      {navRoutes.map((route) => (
        <li
          key={route.path}
          className={pathname === route.path ? "px-4 text-primary" : "px-4"}
        >
          <Link href={route.path}>{route.name}</Link>
        </li>
      ))}
    </ul>
  );
}
