import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        process.env.ENV == "DEV"
          ? process.env.DEV_GOOGLE_CLIENT_ID as string
          : process.env.GOOGLE_CLIENT_ID as string,
      clientSecret:
        process.env.ENV == "DEV"
          ? process.env.DEV_GOOGLE_CLIENT_SECRET as string
          : process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export default NextAuth(authOptions);
