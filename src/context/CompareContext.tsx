
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type CompareContextType = {
  compare: string[];

  addToCompare: (
    id: string
  ) => void;

  removeFromCompare: (
    id: string
  ) => void;

  clearCompare: () => void;
};

const CompareContext =
  createContext<CompareContextType | null>(
    null
  );

export function CompareProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [
    compare,
    setCompare,
  ] = useState<string[]>([]);

  /* LOAD FROM LOCAL STORAGE */
  useEffect(() => {

    const savedCompare =
      localStorage.getItem(
        "compare-colleges"
      );

    if (savedCompare) {

      try {

        setCompare(
          JSON.parse(savedCompare)
        );

      } catch {

        localStorage.removeItem(
          "compare-colleges"
        );
      }
    }
  }, []);

  /* SAVE TO LOCAL STORAGE */
  useEffect(() => {

    localStorage.setItem(
      "compare-colleges",
      JSON.stringify(compare)
    );

  }, [compare]);

  /* ADD */
  const addToCompare = (
    id: string
  ) => {

    if (
      compare.includes(id)
    ) {
      return;
    }

    if (
      compare.length >= 2
    ) {

      alert(
        "You can compare only 2 colleges at a time."
      );

      return;
    }

    setCompare(
      (prev) => [
        ...prev,
        id,
      ]
    );
  };

  /* REMOVE */
  const removeFromCompare = (
    id: string
  ) => {

    setCompare(
      (prev) =>
        prev.filter(
          (item) =>
            item !== id
        )
    );
  };

  /* CLEAR */
  const clearCompare =
    () => {

      setCompare([]);

      localStorage.removeItem(
        "compare-colleges"
      );
    };

  return (
    <CompareContext.Provider
      value={{
        compare,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {

  const context =
    useContext(
      CompareContext
    );

  if (!context) {

    throw new Error(
      "useCompare must be used inside CompareProvider"
    );
  }

  return context;
}
