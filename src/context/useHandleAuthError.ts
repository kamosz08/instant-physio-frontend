"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useHandleAuthError = () => {
  const session = useSession();
  const path = usePathname();

  useEffect(() => {
    if (
      session?.data?.error === "RefreshAccessTokenError" &&
      path !== "/login"
    ) {
      signOut({ callbackUrl: "/login" });
    }
  }, [session?.data?.error, path]);
};
