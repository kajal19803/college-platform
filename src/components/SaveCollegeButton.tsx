"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";

export default function SaveCollegeButton({
  collegeId,
}: {
  collegeId: string;
}) {

  const { data: session } =
    useSession();

  const [saved, setSaved] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSave = async () => {

    if (!session) {
      alert(
        "Please login first"
      );
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        "/api/save-college",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            collegeId,
          }),
        }
      );

      const data =
        await res.json();

      setSaved(data.saved);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`w-full py-3 rounded-xl font-bold transition ${
        saved
          ? "bg-red-100 text-red-600"
          : "bg-[#B7D432] text-[#0B0835]"
      }`}
    >
      {loading
        ? "Saving..."
        : saved
        ? "Saved ❤️"
        : "Save College"}
    </button>
  );
}