import { getAuthServerSession } from "@/utils/getAuthServerSession";
import { Suspense } from "react";
import { SessionsList } from "./_components/SessionsList";

export default async function Sessions() {
  const session = await getAuthServerSession();

  if (!session?.user || session.error) {
    return <p>Access Denied</p>;
  }

  return (
    <div className="w-full flex max-w-5xl px-4 sm:px-24 justify-center">
      <Suspense>
        <SessionsList userId={Number(session.user.id)} />
      </Suspense>
    </div>
  );
}
