import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export async function getAuthServerSession() {
  const session = await getServerSession(nextAuthOptions);

  return session;
}
