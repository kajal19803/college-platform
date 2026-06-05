export const dynamic = "force-dynamic";

import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { Prisma } from "@prisma/client";

import CollegeCard from "@/components/CollegeCard";

export default async function CollegesPage({

  searchParams,

}: {

  searchParams: Promise<{
    page?: string;
    search?: string;

    location?: string;
    rating?: string;
    fees?: string;
  }>;

}) {

  const params =
    await searchParams;

  const currentPage = Number(
    params.page || 1
  );

  const search =
    params.search || "";

  const location =
    params.location || "";

  const rating = Number(
    params.rating || 0
  );

  const fees = Number(
    params.fees || 100000000
  );

  const pageSize = 12;

  const skip =
    (currentPage - 1) *
    pageSize;

  const whereClause: Prisma.CollegeWhereInput = {

    AND: [

      /* SEARCH */
      search.trim()
        ? {
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
                collegeType: {
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
            ],
          }
        : {},

      /* LOCATION */
      location.trim()
        ? {
            location: {
              contains:
                location,
              mode:
                Prisma.QueryMode.insensitive,
            },
          }
        : {},

      /* RATING */
      {
        rating: {
          gte: rating,
        },
      },

      /* FEES */
      {
        fees: {
          lte: fees,
        },
      },
    ],
  };

  const colleges =
    await prisma.college.findMany({

      where:
        whereClause,

      select: {
        id: true,
        name: true,
        location: true,
        fees: true,
        rating: true,
        image: true,
        description: true,
        coursesOffered: true,
        collegeType: true,
        placementRating: true,
        examsAccepted: true,
      },

      skip,

      take: pageSize,

      orderBy: {
        rating: "desc",
      },
    });

  const totalColleges =
    await prisma.college.count({

      where:
        whereClause,
    });

  const totalPages =
    Math.ceil(
      totalColleges / pageSize
    );

  return (
    <main className="min-h-screen bg-[#F5F5F5] pt-32 pb-16">

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-6 mb-12">

        <h1 className="text-5xl font-bold text-[#0B0835] mb-4">
          Explore Colleges
        </h1>

        <p className="text-gray-500 text-lg">
          Discover top colleges
          across India.
        </p>

        {(search ||
          location ||
          rating ||
          fees !== 100000000) && (

          <div className="flex flex-wrap gap-3 mt-6">

            {search && (

              <div className="bg-white border rounded-2xl px-5 py-3">

                <span className="text-gray-500">
                  Search:
                </span>

                <span className="font-bold text-[#0B0835] ml-2">
                  {search}
                </span>
              </div>
            )}

            {location && (

              <div className="bg-white border rounded-2xl px-5 py-3">

                <span className="text-gray-500">
                  Location:
                </span>

                <span className="font-bold text-[#0B0835] ml-2">
                  {location}
                </span>
              </div>
            )}

            {rating > 0 && (

              <div className="bg-white border rounded-2xl px-5 py-3">

                <span className="text-gray-500">
                  Rating:
                </span>

                <span className="font-bold text-[#0B0835] ml-2">
                  {rating}+
                </span>
              </div>
            )}

            {fees !== 100000000 && (

              <div className="bg-white border rounded-2xl px-5 py-3">

                <span className="text-gray-500">
                  Max Fees:
                </span>

                <span className="font-bold text-[#0B0835] ml-2">
                  ₹ {new Intl.NumberFormat("en-IN").format(fees)}
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* EMPTY STATE */}
      {colleges.length === 0 && (

        <section className="max-w-4xl mx-auto px-6 text-center py-24">

          <h2 className="text-4xl font-bold text-[#0B0835] mb-5">
            No Colleges Found
          </h2>

          <p className="text-gray-500 text-lg">
            Try searching with another
            keyword.
          </p>
        </section>
      )}

      {/* COLLEGES */}
      {colleges.length > 0 && (

        <section className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {colleges.map((college) => (

              <CollegeCard
                key={college.id}
                college={college}
              />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex items-center justify-center gap-4 mt-14">

            {currentPage > 1 && (

              <Link
                href={`/colleges?page=${
                  currentPage - 1
                }&search=${search}&location=${location}&rating=${rating}&fees=${fees}`}
                className="px-6 py-3 rounded-2xl bg-white border font-semibold hover:bg-[#F5F5F5]"
              >
                Previous
              </Link>
            )}

            <div className="px-6 py-3 bg-transparent text-black font-bold">
              {currentPage} / {totalPages}
            </div>

            {currentPage <
              totalPages && (

              <Link
                href={`/colleges?page=${
                  currentPage + 1
                }&search=${search}&location=${location}&rating=${rating}&fees=${fees}`}
                className="px-6 py-3 rounded-2xl bg-transparent text-black font-semibold"
              >
                Next
              </Link>
            )}
          </div>
        </section>
      )}
    </main>
  );
}