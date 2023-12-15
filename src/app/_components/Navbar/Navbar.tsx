import Link from "next/link";
import { NavbarProfileSection } from "./NavbarProfileSection";
import { NavigationRoutes } from "./NavigationRoutes";
import Image from "next/image";
import { getAuthServerSession } from "@/utils/getAuthServerSession";
import { getSpecializationsAction } from "@/domain-logic/user/getSpecializations";
import { backendApi } from "@/backendApi";

export default async function Navbar() {
  const [session, categories] = await Promise.all([
    getAuthServerSession(),
    getSpecializationsAction(() => backendApi.specialization.getAll()),
  ]);

  return (
    <div className="flex justify-center">
      <div className="navbar bg-base-100 max-w-5xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <NavigationRoutes categories={categories} />
            </ul>
          </div>
          <Link href="/">
            <Image
              src="/logo-nobg.png"
              alt="Instant Physio Logo"
              className="h-12 object-contain"
              width={160}
              height={45}
              priority
            />
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <NavigationRoutes categories={categories} />
          </ul>
        </div>
        <div className="navbar-end">
          <NavbarProfileSection session={session} />
        </div>
      </div>
    </div>
  );
}
