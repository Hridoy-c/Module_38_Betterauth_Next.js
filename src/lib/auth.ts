import { betterAuth, type User } from "better-auth";
import { MongoClient  } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";


const client = new MongoClient(process.env.MONGODB_AUTH_URL || "");
const db = client.db("better-auth-1");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
 

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
   sendResetPassword: async ({ user, url,  token }: { user:  User; url: string; token: string }, request?: Request
    ): Promise<void> => {
      if (process.env.NODE_ENV === "development") {
    console.log(`Reset link for ${user.email}: ${url}`);
    return;
  }
      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        html: `Click <a href="${url}">here</a> to reset your password.`,
      });
    },
  },
  emailVerification: {
   sendVerificationEmail:  async({user, url})=>{
    void resend.emails.send({
       from: 'Acme <onboarding@resend.dev>',
        to: user.email,
        subject: 'Verify your email address',
        html: `Click <a href="${url}">here</a> to verify your email.`,
      });
   },
   sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 3600 
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
    transaction: false,
  }),
});
