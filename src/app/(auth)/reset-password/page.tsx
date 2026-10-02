import ResetPasswordFrom from "@/components/ResetPasswordFrom";
import { Suspense } from "react";


const ResetPasswordPage = () => {
 
  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}> 
        <ResetPasswordFrom /> 
      </Suspense>

    </div>


  );
};

export default ResetPasswordPage;

