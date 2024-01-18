import { getAuthServerSession } from "@/utils/getAuthServerSession";
import { LoginForm } from "./_components/LoginForm";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getAuthServerSession();

  if (session) redirect("/");

  return (
    <div className="w-full flex max-w-5xl px-4 sm:px-24 justify-center">
      <div className="shadow-xl rounded-sm p-10">
        <LoginForm redirectPath={"/"} />
      </div>
    </div>
  );
}
