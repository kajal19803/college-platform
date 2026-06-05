import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {

  try {

    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.email) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await req.json();

    console.log("BODY:", body);

    const { collegeId } = body;

    const user =
      await prisma.user.findUnique({
        where: {
          email:
            session.user.email,
        },
      });

    console.log("USER:", user);

    if (!user) {

      return NextResponse.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const existing =
      await prisma.savedCollege.findUnique(
        {
          where: {
            userId_collegeId: {
              userId: user.id,
              collegeId,
            },
          },
        }
      );

    if (existing) {

      await prisma.savedCollege.delete({
        where: {
          id: existing.id,
        },
      });

      return NextResponse.json({
        saved: false,
      });
    }

    console.log(
      "SAVING:",
      collegeId
    );

    await prisma.savedCollege.create({
      data: {
        userId: user.id,
        collegeId,
      },
    });

    return NextResponse.json({
      saved: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}