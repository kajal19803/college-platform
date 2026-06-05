"use client";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { useState } from "react";

export default function Filters() {

  const router =
    useRouter();

  const pathname =
    usePathname();

  const [
    location,
    setLocation,
  ] = useState("");

  const [
    rating,
    setRating,
  ] = useState("");

  const [
    fees,
    setFees,
  ] = useState("");

  const applyFilters = () => {

    const params =
      new URLSearchParams();

    if (location.trim()) {

      params.set(
        "location",
        location
      );
    }

    if (rating) {

      params.set(
        "rating",
        rating
      );
    }

    if (fees) {

      params.set(
        "fees",
        fees
      );
    }

    router.push(
      `${pathname}?${params.toString()}`
    );
  };

  return (
    <div className="space-y-5">

      {/* LOCATION */}
      <div>

        <label className="text-sm font-semibold text-[#0B0835] block mb-2">
          Location
        </label>

        <input
          type="text"
          placeholder="Delhi, Mumbai..."
          value={location}
          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }
          className="w-full border border-gray-300 rounded-xl px-4 h-12 outline-none focus:border-[#FF7900] transition"
        />
      </div>

      {/* RATING */}
      <div>

        <label className="text-sm font-semibold text-[#0B0835] block mb-2">
          Minimum Rating
        </label>

        <select
          value={rating}
          onChange={(e) =>
            setRating(
              e.target.value
            )
          }
          className="w-full border border-gray-300 rounded-xl px-4 h-12 outline-none focus:border-[#FF7900] transition"
        >

          <option value="">
            Select Rating
          </option>

          <option value="3">
            3+ Rating
          </option>

          <option value="4">
            4+ Rating
          </option>

          <option value="4.5">
            4.5+ Rating
          </option>
        </select>
      </div>

      {/* FEES */}
      <div>

        <label className="text-sm font-semibold text-[#0B0835] block mb-2">
          Maximum Fees
        </label>

        <select
          value={fees}
          onChange={(e) =>
            setFees(
              e.target.value
            )
          }
          className="w-full border border-gray-300 rounded-xl px-4 h-12 outline-none focus:border-[#FF7900] transition"
        >

          <option value="">
            Select Fees
          </option>

          <option value="100000">
            Under ₹1 Lakh
          </option>

          <option value="300000">
            Under ₹3 Lakhs
          </option>

          <option value="500000">
            Under ₹5 Lakhs
          </option>
        </select>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center gap-3 pt-2">

        <button
          onClick={applyFilters}
          className="flex-1 bg-transparent hover:bg-[#a7c52b] text-[#0B0835] font-bold h-12 rounded-md transition"
        >
          Apply Filters
        </button>

        <button
          onClick={() => {

            setLocation("");
            setRating("");
            setFees("");

            router.push(pathname);
          }}
          className="flex-1 border border-gray-300 hover:bg-gray-100 text-[#0B0835] font-semibold h-12 rounded-xl transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}