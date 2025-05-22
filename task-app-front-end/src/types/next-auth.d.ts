// These imports are needed for type augmentation even though they appear unused
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
/* eslint-enable @typescript-eslint/no-unused-vars */

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    accessToken: string;
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    id: string;
    name: string;
    email: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extend the built-in JWT types
   */
  interface JWT {
    id: string;
    accessToken: string;
  }
}
