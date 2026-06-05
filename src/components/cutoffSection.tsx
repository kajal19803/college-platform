"use client";

import { useMemo, useState } from "react";

type Cutoff = {
  id: string;
  year: number;
  exam: string;
  category: string;
  round: number | null;
  course: string;
  openingRank: number | null;
  closingRank: number;
};

export default function CutoffSection({
  cutoffs,
}: {
  cutoffs: Cutoff[];
}) {

  const [year, setYear] =
    useState("ALL");

  const [exam, setExam] =
    useState("ALL");

  const [category, setCategory] =
    useState("ALL");

  const [search, setSearch] =
    useState("");

  const years =
    [...new Set(
      cutoffs.map(
        (c) => c.year
      )
    )];

  const exams =
    [...new Set(
      cutoffs.map(
        (c) => c.exam
      )
    )];

  const categories =
    [...new Set(
      cutoffs.map(
        (c) => c.category
      )
    )];

  const filteredCutoffs =
    useMemo(() => {

      return cutoffs.filter(
        (cutoff) => {

          const matchYear =
            year === "ALL" ||
            cutoff.year.toString() === year;

          const matchExam =
            exam === "ALL" ||
            cutoff.exam === exam;

          const matchCategory =
            category === "ALL" ||
            cutoff.category === category;

          const matchSearch =
            cutoff.course
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          return (
            matchYear &&
            matchExam &&
            matchCategory &&
            matchSearch
          );
        }
      );
    }, [
      cutoffs,
      year,
      exam,
      category,
      search,
    ]);

  return (
    <div className="bg-white border rounded-lg p-7">

      {/* HEADER */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold text-[#0B0835]">
          College Cutoffs
        </h2>

        <p className="text-gray-500 mt-1">
          Previous year opening and closing ranks
        </p>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        {/* YEAR */}
        <select
          value={year}
          onChange={(e) =>
            setYear(
              e.target.value
            )
          }
          className="border rounded-lg h-11 px-4 outline-none"
        >

          <option value="ALL">
            All Years
          </option>

          {years.map((year) => (

            <option
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>

        {/* EXAM */}
        <select
          value={exam}
          onChange={(e) =>
            setExam(
              e.target.value
            )
          }
          className="border rounded-lg h-11 px-4 outline-none"
        >

          <option value="ALL">
            All Exams
          </option>

          {exams.map((exam) => (

            <option
              key={exam}
              value={exam}
            >
              {exam}
            </option>
          ))}
        </select>

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="border rounded-lg h-11 px-4 outline-none"
        >

          <option value="ALL">
            All Categories
          </option>

          {categories.map((category) => (

            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search course..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border rounded-lg h-11 px-4 outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg">

        <table className="w-full border-collapse min-w-[900px]">

          <thead>

            <tr className="bg-[#F3F4F6]">

              <th className="text-left px-5 py-4 border">
                Year
              </th>

              <th className="text-left px-5 py-4 border">
                Exam
              </th>

              <th className="text-left px-5 py-4 border">
                Course
              </th>

              <th className="text-left px-5 py-4 border">
                Category
              </th>

              <th className="text-left px-5 py-4 border">
                Round
              </th>

              <th className="text-left px-5 py-4 border">
                Opening Rank
              </th>

              <th className="text-left px-5 py-4 border">
                Closing Rank
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredCutoffs.map(
              (cutoff) => (

                <tr
                  key={cutoff.id}
                  className="hover:bg-gray-50"
                >

                  <td className="px-5 py-4 border">
                    {cutoff.year}
                  </td>

                  <td className="px-5 py-4 border">
                    {cutoff.exam}
                  </td>

                  <td className="px-5 py-4 border font-medium">
                    {cutoff.course}
                  </td>

                  <td className="px-5 py-4 border">
                    {cutoff.category}
                  </td>

                  <td className="px-5 py-4 border">
                    Round {
                      cutoff.round || "-"
                    }
                  </td>

                  <td className="px-5 py-4 border">
                    {
                      cutoff.openingRank ||
                      "-"
                    }
                  </td>

                  <td className="px-5 py-4 border font-bold text-blue-600">
                    {
                      cutoff.closingRank
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* EMPTY */}
      {filteredCutoffs.length === 0 && (

        <div className="text-center py-10 text-gray-500">
          No cutoff found.
        </div>
      )}
    </div>
  );
}