"use client";

import { useSession } from "next-auth/react";
import { fetchClient } from "./fetchClient";
import { useEffect } from "react";

export const useApplyAuthToFetchClient = () => {
  const session = useSession();

  useEffect(() => {
    if (session.data?.user.accessToken) {
      fetchClient.setDefaultClientHeaders({
        Authorization: `Bearer ${session.data.user.accessToken}`,
      });
    }
  }, [session.data?.user.accessToken]);
};
