
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import type { NextAuthOptions } from "next-auth";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {

  session: {
    strategy: "jwt",
  },

  providers: [

    Credentials({

      name: "credentials",

      credentials: {

        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {

        if (
          !credentials?.email ||
          !credentials?.password
        ) {

          return null;
        }

        const user =
          await prisma.user.findUnique({

            where: {
              email:
                credentials.email,
            },
          });

        if (!user) {

          return null;
        }

        const isPasswordCorrect =
          await bcrypt.compare(

            credentials.password,

            user.password
          );

        if (!isPasswordCorrect) {

          return null;
        }

        return {

          id: user.id,

          email: user.email,

          name: user.name,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  secret:
    process.env
      .NEXTAUTH_SECRET,
};
