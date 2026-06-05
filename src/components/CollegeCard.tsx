"use client";

import Link from "next/link";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { useCompare } from "@/context/CompareContext";

type College = {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  description: string;
  image?: string | null;
  examsAccepted?: string | null;
  placementRating?: number | null;
  coursesOffered?: number | null;
  collegeType?: string | null;
};

export default function CollegeCard({
  college,
}: {
  college: College;
}) {

  const router = useRouter();

  const {
    compare,
    addToCompare,
    removeFromCompare,
  } = useCompare();

  const isSelected =
    compare.includes(college.id);

  return (
    <div className="bg-white rounded-md overflow-hidden border shadow-sm hover:shadow-xl transition hover:-translate-y-1">

      {/* IMAGE */}
      <Link
        href={`/colleges/${college.id}`}
      >

        <div className="relative h-56 w-full">

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

          <div className="absolute bottom-4 left-4 right-4">

            <h2 className="text-2xl font-bold text-white line-clamp-2">
              {college.name}
            </h2>

            <p className="text-gray-200 mt-1">
              📍 {college.location}
            </p>
          </div>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-6">

        <div className="grid grid-cols-2 gap-5">

          {/* COURSES */}
          <div>

            <p className="text-gray-500 text-sm">
              Courses Offered
            </p>

            <p className="font-bold text-lg text-[#0B0835]">
              {
                college.coursesOffered ||
                20
              }+
            </p>
          </div>

          {/* RATING */}
          <div>

            <p className="text-gray-500 text-sm">
              Rating
            </p>

            <p className="font-bold text-lg text-yellow-500">
              ⭐ {college.rating}
            </p>
          </div>

          {/* FEES */}
          <div>

            <p className="text-gray-500 text-sm">
              Total Fees
            </p>

            <p className="font-bold text-lg text-green-600">
              ₹ {
                new Intl.NumberFormat(
                  "en-IN"
                ).format(
                  college.fees
                )
              }
            </p>
          </div>

          {/* TYPE */}
          <div>

            <p className="text-gray-500 text-sm">
              Type
            </p>

            <p className="font-bold text-lg text-[#0B0835]">
              {
                college.collegeType ||
                "Engineering"
              }
            </p>
          </div>

          {/* EXAMS */}
          <div>

            <p className="text-gray-500 text-sm">
              Exams
            </p>

            <p className="font-bold text-[#0B0835] line-clamp-1">
              {
                college.examsAccepted ||
                "JEE Main"
              }
            </p>
          </div>

          {/* PLACEMENT */}
          <div>

            <p className="text-gray-500 text-sm">
              Placement
            </p>

            <p className="font-bold text-green-600">
              ⭐ {
                college.placementRating ||
                4.2
              }/5
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex items-center gap-3">

          {/* COMPARE BUTTON */}
          <button
            onClick={() => {

              if (isSelected) {

                removeFromCompare(
                  college.id
                );

                return;
              }

              addToCompare(
                college.id
              );

              const updated = [
                ...compare,
                college.id,
              ];

              if (
                updated.length === 2
              ) {

                router.push(
                  `/compare?c1=${updated[0]}&c2=${updated[1]}`
                );
              }
            }}
            className={`flex-1 h-12 rounded-full border flex items-center justify-center gap-2 font-semibold transition ${
              isSelected
                ? "border-red-300 bg-red-50 text-red-600"
                : "border-[#3D0C4A] text-[#3D0C4A] hover:bg-[#faf5ff]"
            }`}
          >

            {/* ICON */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h4m6-18h4a2 2 0 012 2v14a2 2 0 01-2 2h-4m-6-4h6m-6-4h6m-6-4h6"
              />
            </svg>

            <span>
              {isSelected
                ? "Selected"
                : "Compare"}
            </span>
          </button>

          {/* VIEW BUTTON */}
          <Link
            href={`/colleges/${college.id}`}
            className="px-5 h-12 rounded-full bg-[#0B0835] text-white font-semibold flex items-center justify-center hover:bg-[#16114d] transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}