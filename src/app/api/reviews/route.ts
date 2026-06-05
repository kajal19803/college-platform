
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {

  try {

    const formData =
      await request.formData();

    const studentName =
      formData.get(
        "studentName"
      ) as string;

    const studentEmail =
      formData.get(
        "studentEmail"
      ) as string;

    const rating =
      Number(
        formData.get("rating")
      );

    const title =
      formData.get(
        "title"
      ) as string;

    const message =
      formData.get(
        "message"
      ) as string;

    const course =
      formData.get(
        "course"
      ) as string;

    const graduationYear =
      formData.get(
        "graduationYear"
      ) as string;

    const collegeId =
      formData.get(
        "collegeId"
      ) as string;

    await prisma.review.create({

      data: {

        studentName,

        studentEmail,

        rating,

        title,

        message,

        course,

        graduationYear,

        collegeId,
      },
    });

    return NextResponse.redirect(

      new URL(
        `/colleges/${collegeId}`,
        request.url
      )
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Failed to submit review",
      },
      {
        status: 500,
      }
    );
  }
}

