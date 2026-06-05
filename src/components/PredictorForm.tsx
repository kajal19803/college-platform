"use client";

import {
  useState,
} from "react";

type Result = {

  id: string;

  year: number;

  exam: string;

  category: string;

  round: number | null;

  course: string;

  closingRank: number;

  openingRank: number | null;

  college: {

    id: string;

    name: string;

    location: string;

    image: string | null;

    rating: number;
  };
};

export default function PredictorForm() {

  const [
    exam,
    setExam,
  ] = useState(
    "JEE Advanced"
  );

  const [
    category,
    setCategory,
  ] = useState("OPEN");

  const [
    rank,
    setRank,
  ] = useState("");

  const [
    year,
    setYear,
  ] = useState("2024");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    results,
    setResults,
  ] = useState<Result[]>(
    []
  );

  const predictColleges =
    async () => {

      if (!rank) {
        return;
      }

      try {

        setLoading(true);

        const response =
          await fetch(
            `/api/predict-colleges?exam=${exam}&category=${category}&rank=${rank}&year=${year}`
          );

        const data =
          await response.json();

        setResults(
          data.colleges
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="space-y-10">

      {/* FORM */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          {/* EXAM */}
          <div>

            <label className="block text-sm font-semibold text-[#0B0835] mb-2">
              Exam
            </label>

            <select
              value={exam}
              onChange={(e) =>
                setExam(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 h-12 px-4 rounded-lg outline-none"
            >

              <option>
                JEE Advanced
              </option>

              <option>
                JEE Main
              </option>
            </select>
          </div>

          {/* CATEGORY */}
          <div>

            <label className="block text-sm font-semibold text-[#0B0835] mb-2">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 h-12 px-4 rounded-lg outline-none"
            >

              <option>
                OPEN
              </option>

              <option>
                OBC-NCL
              </option>

              <option>
                SC
              </option>

              <option>
                ST
              </option>

              <option>
                EWS
              </option>
            </select>
          </div>

          {/* RANK */}
          <div>

            <label className="block text-sm font-semibold text-[#0B0835] mb-2">
              Rank
            </label>

            <input
              type="number"
              placeholder="Enter Rank"
              value={rank}
              onChange={(e) =>
                setRank(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 h-12 px-4 rounded-lg outline-none"
            />
          </div>

          {/* YEAR */}
          <div>

            <label className="block text-sm font-semibold text-[#0B0835] mb-2">
              Year
            </label>

            <select
              value={year}
              onChange={(e) =>
                setYear(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 h-12 px-4 rounded-lg outline-none"
            >

              <option>
                2024
              </option>

              <option>
                2023
              </option>

              <option>
                2022
              </option>

              <option>
                2021
              </option>
            </select>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={
            predictColleges
          }
          className="mt-8 bg-[#FF7900] hover:bg-[#eb7000] text-white h-12 px-8 rounded-lg font-semibold transition"
        >

          {loading
            ? "Predicting..."
            : "Predict Colleges"}
        </button>
      </div>

      {/* RESULTS */}
      <div className="space-y-5">

        {results.map(
          (item) => (

            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                {/* LEFT */}
                <div>

                  <h2 className="text-2xl font-bold text-[#0B0835] mb-2">
                    {
                      item.college
                        .name
                    }
                  </h2>

                  <p className="text-gray-500 mb-4">
                    📍 {
                      item.college
                        .location
                    }
                  </p>

                  <div className="flex flex-wrap gap-3">

                    <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
                      {
                        item.course
                      }
                    </span>

                    <span className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                      Closing Rank:
                      {" "}
                      {
                        item.closingRank
                      }
                    </span>

                    <span className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg text-sm font-medium">
                      ⭐ {
                        item.college
                          .rating
                      }
                    </span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-start lg:items-end gap-3">

                  <div className="bg-[#E8F7E9] text-green-700 px-5 py-2 rounded-lg font-semibold">
                    Eligible ✅
                  </div>

                  <a
                    href={`/colleges/${item.college.id}`}
                    className="bg-[#0B0835] hover:bg-[#151042] text-white px-6 h-11 rounded-lg inline-flex items-center font-medium transition"
                  >
                    View College
                  </a>
                </div>
              </div>
            </div>
          )
        )}

        {!loading &&
          results.length ===
            0 && (

            <div className="bg-white border border-gray-200 rounded-xl p-14 text-center text-gray-500">
              No colleges predicted yet.
            </div>
          )}
      </div>
    </div>
  );
}
