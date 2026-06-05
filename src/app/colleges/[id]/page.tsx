export const dynamic = "force-dynamic";

import Image from "next/image";

import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

import SaveCollegeButton from "@/components/SaveCollegeButton";

import CutoffSection from "@/components/cutoffSection";

async function getCollege(id: string) {

  const college =
    await prisma.college.findFirst({

      where: {
        id,
      },

      include: {

        reviews: {

          orderBy: {
            createdAt: "desc",
          },
        },

        cutoffs: {

          orderBy: [

            {
              year: "desc",
            },

            {
              round: "asc",
            },
          ],
        },
      },
    });

  if (!college) {
    return null;
  }

  const similarColleges =
    await prisma.college.findMany({

      select: {

        id: true,

        name: true,

        location: true,

        fees: true,

        rating: true,

        image: true,
      },

      where: {

        AND: [

          {
            id: {
              not: college.id,
            },
          },

          {
            location: {

              contains:
                college.location.split(",")[0],

              mode: "insensitive",
            },
          },
        ],
      },

      take: 4,
    });

  return {
    college,
    similarColleges,
  };
}

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } =
    await params;

  const data =
    await getCollege(id);

  if (!data) {
    return notFound();
  }

  const {
    college,
    similarColleges,
  } = data;

  return (
    <main className="min-h-screen bg-[#F5F7FA]">

      {/* HERO */}
      <section className="bg-[#2F3B52] pt-32 pb-10">

        <div className="max-w-6xl mx-auto px-6">

          <div className="flex flex-col lg:flex-row gap-8 justify-between">

            {/* LEFT */}
            <div className="flex gap-6">

              {/* IMAGE */}
              <div className="relative w-32 h-32 bg-white rounded-lg overflow-hidden border shrink-0">

                <Image
                  src={
                    college.image ||
                    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={college.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* INFO */}
              <div className="text-white">

                <h1 className="text-4xl font-bold leading-tight mb-4">
                  {college.name}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-200 mb-4">

                  <span>
                    📍 {college.location}
                  </span>

                  <span>
                    🏛️ {
                      college.collegeType ??
                      "Engineering"
                    }
                  </span>

                  <span>
                    📅 Estd {
                      college.establishedYear ??
                      "N/A"
                    }
                  </span>
                </div>

                <div className="flex items-center gap-3">

                  <span className="text-yellow-400 text-lg font-semibold">
                    ⭐ {college.rating}
                  </span>

                  <span className="text-sm text-gray-300">
                    Placement Rating:
                    {" "}
                    {
                      college.placementRating ??
                      "N/A"
                    }/5
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-4 min-w-[260px]">

              <button className="bg-[#FF7900] hover:bg-[#e96d00] text-white h-12 rounded-lg font-semibold transition">
                Apply Now
              </button>

              <button className="border border-white/20 hover:bg-white/10 text-white h-12 rounded-lg font-semibold transition">
                Download Brochure
              </button>

              <SaveCollegeButton
                collegeId={college.id}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* ABOUT */}
            <div className="bg-white border rounded-lg p-7">

              <h2 className="text-2xl font-bold text-[#0B0835] mb-5">
                About College
              </h2>

              <div className="space-y-5 text-gray-600 leading-8">

                <p>
                  {college.description}
                </p>

                <p>
                  {college.name} is one of
                  the reputed institutions
                  located in {
                    college.location
                  }.
                </p>
              </div>
            </div>

            {/* CUTOFFS */}
            <CutoffSection
              cutoffs={college.cutoffs}
            />

            {/* REVIEWS */}
            <div className="bg-white border rounded-lg p-7">

              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold text-[#0B0835]">
                  Student Reviews
                </h2>

                <Link
                  href="/write-review"
                  className="bg-[#FF7900] hover:bg-[#e96d00] text-white px-5 h-11 rounded-lg flex items-center justify-center font-semibold transition"
                >
                  Write Review
                </Link>
              </div>

              {college.reviews.length === 0 ? (

                <div className="border rounded-lg p-8 text-center bg-gray-50">

                  <p className="text-gray-500">
                    No reviews yet.
                  </p>
                </div>

              ) : (

                <div className="space-y-5">

                  {college.reviews.map((review) => (

                    <div
                      key={review.id}
                      className="border rounded-lg p-5"
                    >

                      <div className="flex items-start justify-between gap-4 mb-4">

                        <div>

                          <h3 className="text-lg font-bold text-[#0B0835]">
                            {review.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">

                            {review.studentName}

                            {review.course && (
                              <>
                                {" • "}
                                {review.course}
                              </>
                            )}

                            {review.graduationYear && (
                              <>
                                {" • "}
                                Batch {review.graduationYear}
                              </>
                            )}
                          </p>
                        </div>

                        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-md text-sm font-semibold">
                          ⭐ {review.rating}/5
                        </div>
                      </div>

                      <p className="text-gray-600 leading-7">
                        {review.message}
                      </p>

                      <p className="text-xs text-gray-400 mt-4">

                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SIMILAR COLLEGES */}
            <div className="bg-white border rounded-lg p-7">

              <h2 className="text-2xl font-bold text-[#0B0835] mb-6">
                Similar Colleges
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {similarColleges.map((college) => (

                  <Link
                    key={college.id}
                    href={`/colleges/${college.id}`}
                    className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white"
                  >

                    <div className="relative h-40 w-full">

                      <Image
                        src={
                          college.image ||
                          "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop"
                        }
                        alt={college.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-4">

                      <h3 className="font-bold text-lg text-[#0B0835] line-clamp-2">
                        {college.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-2">
                        📍 {college.location}
                      </p>

                      <div className="flex items-center justify-between mt-4">

                        <span className="text-yellow-500 font-semibold">
                          ⭐ {college.rating}
                        </span>

                        <span className="text-green-600 font-bold">
                          ₹ {
                            new Intl.NumberFormat(
                              "en-IN"
                            ).format(
                              college.fees
                            )
                          }
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>

            <div className="bg-white border rounded-lg p-6 sticky top-40">

              <h3 className="text-2xl font-bold text-[#0B0835] mb-6">
                College Info
              </h3>

              <div className="space-y-5">

                <div>

                  <p className="text-sm text-gray-500">
                    Average Fees
                  </p>

                  <p className="text-2xl font-bold text-green-600">
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

                  <p className="text-sm text-gray-500">
                    Campus Size
                  </p>

                  <p className="font-semibold text-[#0B0835]">
                    {
                      college.campusSize ??
                      "N/A"
                    }
                  </p>
                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Total Students
                  </p>

                  <p className="font-semibold text-[#0B0835]">
                    {
                      college.totalStudents ??
                      "N/A"
                    }
                  </p>
                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Total Faculty
                  </p>

                  <p className="font-semibold text-[#0B0835]">
                    {
                      college.totalFaculty ??
                      "N/A"
                    }
                  </p>
                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Exams Accepted
                  </p>

                  <p className="font-semibold text-[#0B0835]">
                    {
                      college.examsAccepted ??
                      "N/A"
                    }
                  </p>
                </div>

                <button className="w-full bg-[#FF7900] hover:bg-[#e96d00] text-white h-12 rounded-lg font-semibold transition">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
