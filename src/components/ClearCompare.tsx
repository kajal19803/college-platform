"use client";

import { useEffect } from "react";

import { useCompare } from "@/context/CompareContext";

export default function ClearCompare() {

  const { clearCompare } =
    useCompare();

  useEffect(() => {

    clearCompare();

  }, []);

  return null;
}
