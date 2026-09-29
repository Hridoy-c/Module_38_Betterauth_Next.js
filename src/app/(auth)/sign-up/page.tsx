"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signUp } from "@/lib/auth-client";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as SignupData;

    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Something went wrong. Please try again.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  const inputClass =
    "w-full rounded border-2 border-[#264143] bg-white px-3 py-3 text-[15px] text-[#264143] outline-none shadow-[3px_4px_0px_1px_#E99F4C] transition-all focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C] disabled:opacity-50";

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-[380px] rounded-[20px] border-2 border-[#264143] bg-[#EDDCD9] p-6 shadow-[3px_4px_0px_1px_#E99F4C]">
          <h1 className="mt-2 text-center text-2xl font-black text-[#264143]">
            SIGN UP
          </h1>

          <form onSubmit={onSubmit} className="mt-5">
            {error && (
              <div className="mb-4 rounded-md border-2 border-[#264143] bg-red-200 p-3 text-xs font-bold text-red-900 shadow-[2px_2px_0px_0px_#264143]">
                {error}
              </div>
            )}

            <div className="mb-4 flex flex-col">
              <label htmlFor="name" className="mb-2 font-semibold text-[#264143]">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                disabled={loading}
                className={inputClass}
              />
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="email" className="mb-2 font-semibold text-[#264143]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                disabled={loading}
                className={inputClass}
              />
            </div>

            <div className="mb-4 flex flex-col">
              <label htmlFor="password" className="mb-2 font-semibold text-[#264143]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                minLength={8}
                disabled={loading}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-[10px] bg-[#DE5499] px-4 py-3.5 text-[15px] font-extrabold text-[#264143] shadow-[3px_3px_0px_0px_#E99F4C] transition-all hover:opacity-90 active:translate-y-1 active:shadow-[1px_2px_0px_0px_#E99F4C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="mt-5 text-center text-sm text-[#264143]">
              Have an Account?{" "}
              <Link
                href="/sign-in"
                className="font-extrabold text-[#264143] hover:underline"
              >
                Login Here!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}