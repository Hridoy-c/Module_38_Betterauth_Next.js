"use client";
import { requestPasswordReset } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import Link from "next/link";
import { FormEvent } from "react";

const inputClass =
  "w-full rounded border-2 border-[#264143] bg-white px-3 py-3 text-[15px] text-[#264143] outline-none shadow-[3px_4px_0px_1px_#E99F4C] transition-all focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C] disabled:opacity-50";

const ForgotPasswordPage = () => {
  const handleForgotPassword =  async(e : FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as { email: string }    ;

    const resData = await requestPasswordReset({
        email: data.email,
        redirectTo: "/reset-password",    
    }); 

    toast.success("Password reset email sent! Please check your inbox.")
    console.log("Password reset response:", resData);



  };

  return (
    <div>
      <h1>Forgot Password Page</h1>
      <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-[380px] rounded-[20px] border-2 border-[#264143] bg-[#EDDCD9] p-6 shadow-[3px_4px_0px_1px_#E99F4C]">
            <form onSubmit={handleForgotPassword} className="mt-5">
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 font-semibold text-[#264143]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-[10px] bg-[#DE5499] px-4 py-3.5 text-[15px] font-extrabold text-[#264143] shadow-[3px_3px_0px_0px_#E99F4C] transition-all hover:opacity-90 active:translate-y-1 active:shadow-[1px_2px_0px_0px_#E99F4C] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Reset Password
              </button>

              <p className="mt-5 text-center text-sm text-[#264143]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-extrabold text-[#264143] hover:underline"
                >
                  Sign Up Here!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
