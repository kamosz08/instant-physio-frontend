"use client";

import { useApplyAuthToFetchClient } from "@/utils/fetch/useFetchClient";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { useHandleAuthError } from "./useHandleAuthError";

function HooksUsingAuthSession() {
  useApplyAuthToFetchClient();
  useHandleAuthError();

  return null;
}

export default function AuthProvider({
  children,
  session,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  return (
    <SessionProvider session={session}>
      <HooksUsingAuthSession />
      {children}
    </SessionProvider>
  );
}
