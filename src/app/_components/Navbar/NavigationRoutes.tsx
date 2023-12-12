"use client";
import { Specialization } from "@/domain-logic/user/getSpecializations";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationRoutes({
  categories,
}: {
  categories: Specialization[];
}) {
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
      <li className="px-4">
        <details>
          <summary>Categories</summary>
          <ul className="p-2">
            {categories.map((category) => (
              <li
                className={
                  decodeURI(pathname) === `/categories/${category.name}`
                    ? "text-primary"
                    : ""
                }
                key={category.id}
              >
                <Link
                  className="active:!text-primary active:!bg-transparent focus:!text-primary focus:!bg-transparent"
                  href={`/categories/${category.name}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
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
