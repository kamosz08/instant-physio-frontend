"use client";

import { useApplyAuthToFetchClient } from "@/utils/fetch/useFetchClient";
import { SessionProvider } from "next-auth/react";
import { useHandleAuthError } from "./useHandleAuthError";

function HooksUsingAuthSession() {
  useApplyAuthToFetchClient();
  useHandleAuthError();

  return null;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <HooksUsingAuthSession />
      {children}
    </SessionProvider>
  );
}
