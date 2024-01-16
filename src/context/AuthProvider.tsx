"use client";

import { useApplyAuthToFetchClient } from "@/utils/fetch/useFetchClient";
import { SessionProvider } from "next-auth/react";

function ApplyAuthToFetch() {
  useApplyAuthToFetchClient();
  return null;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ApplyAuthToFetch />
      {children}
    </SessionProvider>
  );
}
