import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

import Link from "next/link";

export const dynamic =
  "force-dynamic";

async function getProfileData() {

  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user?.email) {
    return null;
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email:
          session.user.email,
      },

      include: {
        savedColleges: {
          include: {
            college: true,
          },
        },
      },
    });

  return user;
}

export default async function ProfilePage() {

  const user =
    await getProfileData();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="bg-[#0B0835] text-white rounded-3xl p-10 mb-10">

          <p className="text-[#B7D432] font-semibold mb-3">
            My Profile
          </p>

          <h1 className="text-5xl font-bold mb-4">
            Welcome, {user.name}
          </h1>

          <p className="text-gray-300 text-lg">
            {user.email}
          </p>
        </div>

        {/* SAVED COLLEGES */}
        <div className="flex items-center justify-between mb-8">

          <div>
            <h2 className="text-3xl font-bold text-[#0B0835]">
              Saved Colleges
            </h2>

            <p className="text-gray-500 mt-2">
              Colleges you saved for later
            </p>
          </div>

          <div className="bg-white px-5 py-3 rounded-2xl border shadow-sm">

            <p className="text-sm text-gray-500">
              Total Saved
            </p>

            <h3 className="text-2xl font-bold text-[#0B0835]">
              {
                user.savedColleges
                  .length
              }
            </h3>
          </div>
        </div>

        {user.savedColleges
          .length === 0 ? (

          <div className="bg-white rounded-3xl p-12 border shadow-sm text-center">

            <h3 className="text-3xl font-bold text-[#0B0835] mb-4">
              No Saved Colleges
            </h3>

            <p className="text-gray-500 mb-8">
              Start exploring and save colleges you like.
            </p>

            <Link
              href="/"
              className="bg-[#B7D432] text-[#0B0835] px-6 py-3 rounded-xl font-bold"
            >
              Explore Colleges
            </Link>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {user.savedColleges.map(
              (saved) => {

                const college =
                  saved.college;

                return (
                  <Link
                    key={saved.id}
                    href={`/colleges/${college.id}`}
                  >
                    <div className="bg-white rounded-3xl p-6 border shadow-sm hover:shadow-xl transition hover:-translate-y-1">

                      <h3 className="text-2xl font-bold text-[#0B0835] mb-4 line-clamp-2">
                        {college.name}
                      </h3>

                      <p className="text-gray-500 mb-4">
                        📍 {college.location}
                      </p>

                      <div className="flex items-center justify-between mb-5">

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

                      <p className="text-gray-600 line-clamp-4">
                        {
                          college.description
                        }
                      </p>

                      <div className="mt-6 text-[#0B0835] font-semibold">
                        View College →
                      </div>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        )}
      </div>
    </main>
  );
}