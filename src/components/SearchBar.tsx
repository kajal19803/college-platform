"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function SearchBar() {

  const [search, setSearch] =
    useState("");

  const router = useRouter();

  function handleSearch(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (!search.trim()) return;

    router.push(
      `/colleges?search=${encodeURIComponent(
        search
      )}`
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-white rounded-md overflow-hidden shadow-lg"
    >

      <input
        type="text"
        placeholder="Search colleges, courses, exams..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full px-5 py-4 outline-none text-gray-700"
      />

      <button
        type="submit"
        className="bg-[#B7D432] text-white px-6 py-4 font-semibold hover:bg-[#e56d00] transition"
      >
        Search
      </button>
    </form>
  );
}