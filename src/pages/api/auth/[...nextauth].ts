import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        process.env.ENV == "DEV"
          ? process.env.DEV_GOOGLE_CLIENT_ID
          : process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.ENV == "DEV"
          ? process.env.DEV_GOOGLE_CLIENT_SECRET
          : process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
