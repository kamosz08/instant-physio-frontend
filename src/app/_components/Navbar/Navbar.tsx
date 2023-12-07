import Link from "next/link";
import { NavbarProfileSection } from "./NavbarProfileSection";
import { NavigationRoutes } from "./NavigationRoutes";
import Image from "next/image";
import { getAuthServerSession } from "@/utils/getAuthServerSession";

export default async function Navbar() {
  const session = await getAuthServerSession();

  return (
    <nav className="py-4 lg:px-32 px-12 flex justify-between items-center text-mainBlack font-semibold">
      <div>
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
      <NavigationRoutes />
      <div>
        <NavbarProfileSection session={session} />
      </div>
    </nav>
  );
}
