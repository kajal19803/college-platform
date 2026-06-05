import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET(
  request: Request
) {

  const {
    searchParams,
  } = new URL(
    request.url
  );

  const exam =
    searchParams.get(
      "exam"
    );

  const category =
    searchParams.get(
      "category"
    );

  const rank =
    Number(
      searchParams.get(
        "rank"
      )
    );

  const year =
    Number(
      searchParams.get(
        "year"
      )
    );

  try {

    const colleges =
      await prisma.cutoff.findMany({

        where: {

          exam:
            exam || undefined,

          category:
            category || undefined,

          year:
            year || undefined,

          closingRank: {
            gte: rank,
          },
        },

        include: {
          college: true,
        },

        orderBy: {
          closingRank: "asc",
        },

        take: 50,
      });

    return NextResponse.json({
      colleges,
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
