'use client';
import { resetPassword } from "@/lib/auth-client";
import { Toast, toast } from "@heroui/react";
import { useSearchParams } from "next/navigation";



const inputClass =
  "w-full rounded border-2 border-[#264143] bg-white px-3 py-3 text-[15px] text-[#264143] outline-none shadow-[3px_4px_0px_1px_#E99F4C] transition-all focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C] disabled:opacity-50";

const ResetPasswordFrom = () => {

    const searchParams = useSearchParams();
      const token = searchParams.get("token");
    
        const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {  
          e.preventDefault();


            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries()) as { newPassword: string }; 
           
            if (!token) {
              console.error("Token not found in URL");
              return;
            }
    
           const resData =  await resetPassword({
              newPassword: data.newPassword,
              token: token,
            });
    
            toast.success("Password reset successful! You can now log in with your new password.");
            console.log("Password reset response:", resData);
    
    
    
        }
    
  return (
    <div>
    
          <div>
      <h1>Reset Password Page</h1>
      <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-[380px] rounded-[20px] border-2 border-[#264143] bg-[#EDDCD9] p-6 shadow-[3px_4px_0px_1px_#E99F4C]">
            <h1 className="mt-2 text-center text-2xl font-black text-[#264143]">
              RESET PASSWORD
            </h1>
            <p className="mt-2 text-center text-sm text-[#264143]">
              Enter your new password below.
            </p>
            
            <form
                onSubmit={handleResetPassword}
             className="mt-5">
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="newPassword"
                  className="mb-2 font-semibold text-[#264143]"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  required
                  minLength={8}
                  className={inputClass}
                />
              </div>
              
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 font-semibold text-[#264143]"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  required
                  minLength={8}
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
                Remember your password?{" "}
                <a
                  href="/sign-in"
                  className="font-extrabold text-[#264143] hover:underline"
                >
                  Login Here!
                </a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>       
    </div>
  )
}

export default ResetPasswordFrom
