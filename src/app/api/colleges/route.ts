import { prisma } from "@/lib/prisma";

import { Prisma } from "@prisma/client";

import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function GET(
  req: NextRequest
) {

  try {

    const search =
      req.nextUrl.searchParams
        .get("search")
        ?.toLowerCase() || "";

    const location =
      req.nextUrl.searchParams
        .get("location")
        ?.toLowerCase() || "";

    const minRating = Number(
      req.nextUrl.searchParams.get(
        "rating"
      ) || 0
    );

    const maxFees = Number(
      req.nextUrl.searchParams.get(
        "fees"
      ) || 100000000
    );

    const colleges =
      await prisma.college.findMany({

        where: {

          AND: [

            {
              OR: [

                {
                  name: {
                    contains: search,
                    mode:
                      Prisma.QueryMode.insensitive,
                  },
                },

                {
                  location: {
                    contains: search,
                    mode:
                      Prisma.QueryMode.insensitive,
                  },
                },

                {
                  description: {
                    contains: search,
                    mode:
                      Prisma.QueryMode.insensitive,
                  },
                },

                {
                  examsAccepted: {
                    contains: search,
                    mode:
                      Prisma.QueryMode.insensitive,
                  },
                },

                {
                  collegeType: {
                    contains: search,
                    mode:
                      Prisma.QueryMode.insensitive,
                  },
                },

                ...(search.includes("iit")
                  ? [
                      {
                        name: {
                          contains:
                            "Indian Institute of Technology",

                          mode:
                            Prisma.QueryMode.insensitive,
                        },
                      },
                    ]
                  : []),

                ...(search.includes("nit")
                  ? [
                      {
                        name: {
                          contains:
                            "National Institute of Technology",

                          mode:
                            Prisma.QueryMode.insensitive,
                        },
                      },
                    ]
                  : []),
              ],
            },

            {
              location: {
                contains: location,

                mode:
                  Prisma.QueryMode.insensitive,
              },
            },

            {
              rating: {
                gte: minRating,
              },
            },

            {
              fees: {
                lte: maxFees,
              },
            },
          ],
        },

        take: 24,

        orderBy: [
          {
            rating: "desc",
          },

          {
            createdAt: "desc",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      data: colleges,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch colleges",
      },

      {
        status: 500,
      }
    );
  }
}