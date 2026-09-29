import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
});

// Correctly export the single unified destructured actions 
export const { signIn, signUp, useSession } = authClient;
