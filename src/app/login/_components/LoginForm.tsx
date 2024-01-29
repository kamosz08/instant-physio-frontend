"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

type FormState =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; error: string };

export const LoginForm = ({ redirectPath }: { redirectPath?: string }) => {
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState<FormState>({ state: "idle" });
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormState({ state: "loading" });
      setFormValues({ username: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        username: formValues.username,
        password: formValues.password,
      });

      if (!res?.error) {
        if (redirectPath) window.location.pathname = redirectPath;
        if (searchParams.get("callbackPath")) {
          window.location.href =
            window.location.origin + searchParams.get("callbackPath")!;
        }
        if (searchParams.get("callbackUrl")) {
          window.location.href = searchParams.get("callbackUrl")!;
        }
      } else {
        setFormState({ state: "error", error: "invalid username or password" });
      }
    } catch (error: any) {
      setFormState({ state: "error", error: error });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <div role="alert" className="alert alert-info mb-6 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-current shrink-0 w-6 h-6 hidden sm:block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Demo user u:&quot;test-user&quot; p:&quot;test&quot;</span>
      </div>
      {formState.state === "error" && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">
          {formState.error}
        </p>
      )}
      <div className="mb-6">
        <input
          required
          type="username"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          placeholder="Username"
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className="input input-bordered input-primary w-full max-w-xs"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary uppercase w-full"
        disabled={formState.state === "loading"}
      >
        Sign In
      </button>

      {/* <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>

      <a
        className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
        style={{ backgroundColor: "#3b5998" }}
        onClick={() => alert("Not implemented yet")}
        role="button"
      >
        <img
          className="pr-2"
          src="/images/google.svg"
          alt=""
          style={{ height: "2rem" }}
        />
        Continue with Google
      </a>
      <a
        className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
        style={{ backgroundColor: "#55acee" }}
        onClick={() => alert("Not implemented yet")}
        role="button"
      >
        <img
          className="pr-2"
          src="/images/github.svg"
          alt=""
          style={{ height: "2.2rem" }}
        />
        Continue with GitHub
      </a> */}
    </form>
  );
};
