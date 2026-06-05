import Image from "next/image";

import Link from "next/link";

import { prisma } from "@/lib/prisma";


import ClearCompare from "@/components/ClearCompare";

async function getColleges(
  c1?: string,
  c2?: string
) {

  if (!c1 || !c2) {
    return [];
  }

  const colleges =
    await prisma.college.findMany({

      where: {
        id: {
          in: [c1, c2],
        },
      },

      select: {
        id: true,
        name: true,
        location: true,
        fees: true,
        rating: true,
        description: true,
        image: true,

        placementRating: true,
        nirfRanking: true,
        campusSize: true,
        totalStudents: true,
        totalFaculty: true,
        coursesOffered: true,
        examsAccepted: true,
        collegeType: true,
        establishedYear: true,
      },
    });

  return colleges;
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{
    c1?: string;
    c2?: string;
  }>;
}) {

  const params =
    await searchParams;

  const c1 = params.c1;
  const c2 = params.c2;

  /* NOTHING SELECTED */
  if (!c1 && !c2) {

    return (
      <main className="min-h-screen bg-[#F5F7FB] pt-32 px-6 flex items-center justify-center">

        <div className="bg-white border border-gray-200 rounded-xl p-12 max-w-2xl w-full text-center shadow-sm">

          <h1 className="text-5xl font-bold text-[#0B0835] mb-5">
            Compare Colleges
          </h1>

          <p className="text-gray-500 text-lg leading-8 mb-10">
            Select two colleges and compare
            placements, rankings, fees,
            campus size and much more.
          </p>

          <Link
            href="/colleges"
            className="inline-flex items-center justify-center bg-[#FF7900] hover:bg-[#eb7000] text-white px-8 h-14 rounded-lg font-semibold transition"
          >
            Explore Colleges
          </Link>
        </div>
      </main>
    );
  }

  /* ONLY ONE SELECTED */
  if (
    (c1 && !c2) ||
    (!c1 && c2)
  ) {

    return (
      <main className="min-h-screen bg-[#F5F7FB] pt-32 px-6 flex items-center justify-center">
       <ClearCompare />
        <div className="bg-white border border-gray-200 rounded-xl p-12 max-w-2xl w-full text-center shadow-sm">

          <h1 className="text-4xl font-bold text-[#0B0835] mb-5">
            Select One More College
          </h1>

          <p className="text-gray-500 text-lg leading-8 mb-10">
            You need two colleges to
            start comparison.
          </p>

          <div className="flex items-center justify-center gap-4">

            <Link
              href={`/colleges/${c1 || c2}`}
              className="bg-[#0B0835] text-white px-7 h-12 rounded-lg font-medium inline-flex items-center"
            >
              View College
            </Link>

            <Link
              href="/colleges"
              className="bg-[#FF7900] text-white px-7 h-12 rounded-lg font-medium inline-flex items-center"
            >
              Select Another
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const colleges =
    await getColleges(
      c1,
      c2
    );

  /* INVALID IDS */
  if (
    colleges.length !== 2
  ) {

    return (
      <main className="min-h-screen bg-[#F5F7FB] pt-32 px-6 flex items-center justify-center">

        <div className="bg-white border border-gray-200 rounded-xl p-12 max-w-2xl w-full text-center shadow-sm">

          <h1 className="text-4xl font-bold text-red-600 mb-5">
            Colleges Not Found
          </h1>

          <p className="text-gray-500 text-lg leading-8 mb-10">
            One or both selected colleges
            could not be found.
          </p>

          <Link
            href="/colleges"
            className="inline-flex items-center justify-center bg-[#FF7900] hover:bg-[#eb7000] text-white px-8 h-14 rounded-lg font-semibold transition"
          >
            Explore Colleges
          </Link>
        </div>
      </main>
    );
  }

  const [
    college1,
    college2,
  ] = colleges;

  const comparisonRows = [

    {
      label: "Location",

      value1:
        college1.location,

      value2:
        college2.location,
    },

    {
      label: "Rating",

      value1: `⭐ ${college1.rating}`,

      value2: `⭐ ${college2.rating}`,
    },

    {
      label: "Fees",

      value1: `₹ ${new Intl.NumberFormat(
        "en-IN"
      ).format(
        college1.fees
      )}`,

      value2: `₹ ${new Intl.NumberFormat(
        "en-IN"
      ).format(
        college2.fees
      )}`,
    },

    {
      label:
        "Placement Rating",

      value1: `⭐ ${
        college1.placementRating ??
        "N/A"
      }/5`,

      value2: `⭐ ${
        college2.placementRating ??
        "N/A"
      }/5`,
    },

    {
      label:
        "NIRF Ranking",

      value1:
        college1.nirfRanking ??
        "N/A",

      value2:
        college2.nirfRanking ??
        "N/A",
    },

    {
      label:
        "Campus Size",

      value1:
        college1.campusSize ??
        "N/A",

      value2:
        college2.campusSize ??
        "N/A",
    },

    {
      label:
        "Students",

      value1:
        college1.totalStudents ??
        "N/A",

      value2:
        college2.totalStudents ??
        "N/A",
    },

    {
      label:
        "Faculty",

      value1:
        college1.totalFaculty ??
        "N/A",

      value2:
        college2.totalFaculty ??
        "N/A",
    },

    {
      label:
        "Courses Offered",

      value1:
        college1.coursesOffered ??
        "N/A",

      value2:
        college2.coursesOffered ??
        "N/A",
    },

    {
      label:
        "Exams Accepted",

      value1:
        college1.examsAccepted ??
        "N/A",

      value2:
        college2.examsAccepted ??
        "N/A",
    },

    {
      label:
        "College Type",

      value1:
        college1.collegeType ??
        "N/A",

      value2:
        college2.collegeType ??
        "N/A",
    },

    {
      label:
        "Established Year",

      value1:
        college1.establishedYear ??
        "N/A",

      value2:
        college2.establishedYear ??
        "N/A",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F7FB] pt-32 pb-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-[#0B0835] mb-3">
            College Comparison
          </h1>

          <p className="text-gray-500 text-lg">
            Compare colleges side by side.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          {[college1, college2].map(
            (college) => (

              <div
                key={college.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >

                <div className="relative h-72 w-full">

                  <Image
                    src={
                      college.image ||
                      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop"
                    }
                    alt={college.name}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

                    <h2 className="text-3xl font-bold mb-2">
                      {college.name}
                    </h2>

                    <p className="text-gray-200">
                      📍 {college.location}
                    </p>
                  </div>
                </div>

                <div className="p-6">

                  <div className="grid grid-cols-2 gap-5">

                    <div>
                      <p className="text-gray-500 text-sm">
                        Rating
                      </p>

                      <p className="text-xl font-bold text-yellow-500">
                        ⭐ {college.rating}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Fees
                      </p>

                      <p className="text-xl font-bold text-green-600">
                        ₹ {
                          new Intl.NumberFormat(
                            "en-IN"
                          ).format(
                            college.fees
                          )
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        NIRF Ranking
                      </p>

                      <p className="text-xl font-bold text-[#0B0835]">
                        {
                          college.nirfRanking ||
                          "N/A"
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Placement
                      </p>

                      <p className="text-xl font-bold text-[#0B0835]">
                        ⭐ {
                          college.placementRating ||
                          "N/A"
                        }
                        /5
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/colleges/${college.id}`}
                    className="mt-6 inline-flex items-center justify-center bg-[#0B0835] hover:bg-[#151042] text-white px-6 h-12 rounded-lg font-medium transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )
          )}
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

          <div className="grid grid-cols-3 bg-[#EEF2F7] border-b">

            <div className="px-6 py-5 font-bold text-[#0B0835]">
              Features
            </div>

            <div className="px-6 py-5 border-l font-bold text-[#0B0835]">
              {college1.name}
            </div>

            <div className="px-6 py-5 border-l font-bold text-[#0B0835]">
              {college2.name}
            </div>
          </div>

          {comparisonRows.map(
            (
              row,
              index
            ) => (

              <div
                key={index}
                className="grid grid-cols-3 border-b last:border-b-0"
              >

                <div className="px-6 py-5 bg-[#FAFAFA] font-semibold text-[#0B0835]">
                  {row.label}
                </div>

                <div className="px-6 py-5 border-l text-gray-700">
                  {row.value1}
                </div>

                <div className="px-6 py-5 border-l text-gray-700">
                  {row.value2}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
