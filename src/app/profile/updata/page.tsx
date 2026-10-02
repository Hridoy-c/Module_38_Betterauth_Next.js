'use client';



import { updateUser } from "@/lib/auth-client";
import React, { FormEvent } from "react";

const inputClass =
  "w-full rounded border-2 border-[#264143] bg-white px-3 py-3 text-[15px] text-[#264143] outline-none shadow-[3px_4px_0px_1px_#E99F4C] transition-all focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C] disabled:opacity-50";
const UpdataProfilePage = () => {


      const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
     
    
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries()) as { name: string; email: string }; 

        const resData  = await updateUser({
            name: data.name,
        })

    
     
      };




  return (
    <div>
      <h1>Updata Profile</h1>
      <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
        <div className="flex w-full items-center justify-center">
          <div className="w-full max-w-[380px] rounded-[20px] border-2 border-[#264143] bg-[#EDDCD9] p-6 shadow-[3px_4px_0px_1px_#E99F4C]">
            <h1 className="mt-2 text-center text-2xl font-black text-[#264143]">
              UPDATE PROFILE
            </h1>
            
            <form
            onSubmit={handleUpdateProfile}
             className="mt-5" >
               
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="name"
                  className="mb-2 font-semibold text-[#264143]"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className={inputClass}
                />
              </div>
              
             
              
              <button
               
                type="submit"
                className="mt-4 w-full rounded-[10px] bg-[#DE5499] px-4 py-3.5 text-[15px] font-extrabold text-[#264143] shadow-[3px_3px_0px_0px_#E99F4C] transition-all hover:opacity-90 active:translate-y-1 active:shadow-[1px_2px_0px_0px_#E99F4C] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdataProfilePage;
