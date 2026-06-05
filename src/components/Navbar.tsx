"use client";

import Link from "next/link";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  usePathname,
} from "next/navigation";

import {
  signOut,
  useSession,
} from "next-auth/react";

import { useCompare } from "@/context/CompareContext";

import AuthModal from "@/components/AuthModal";

import SearchBar from "@/components/SearchBar";

import Filters from "@/components/Filters";

export default function Navbar() {

  const {
    compare,
    clearCompare,
  } = useCompare();

  const pathname =
    usePathname();

  const { data: session } =
    useSession();

  const [
    isAuthOpen,
    setIsAuthOpen,
  ] = useState(false);

  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false);

  const [
    isFilterOpen,
    setIsFilterOpen,
  ] = useState(false);

  const filterRef =
    useRef<HTMLDivElement>(null);

  const menuRef =
    useRef<HTMLDivElement>(null);

  /* RESET COMPARE WHEN OPENING COMPARE PAGE */
  useEffect(() => {

    if (
      pathname.startsWith(
        "/compare"
      )
    ) {

      clearCompare();
    }

  }, [pathname]);

  /* CLOSE POPUPS OUTSIDE CLICK */
  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        filterRef.current &&
        !filterRef.current.contains(
          event.target as Node
        )
      ) {

        setIsFilterOpen(false);
      }

      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {

        setIsMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">

        <nav className="bg-[#0B0B0B]/95 backdrop-blur border-b border-white/10">

          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">

            {/* LEFT */}
            <div className="flex items-center gap-8 flex-1">

              {/* LOGO */}
              <Link
                href="/"
                className="flex items-center gap-3 shrink-0"
              >

                <div className="w-12 h-12 bg-[#B7D432] flex items-center justify-center text-[#0B0835] font-black text-2xl rounded-xl">
                  C
                </div>

                <div>

                  <h1 className="font-bold text-2xl text-white leading-none">
                    CollegeHub
                  </h1>

                  <p className="text-xs text-gray-400 mt-1">
                    Discover Top Colleges
                  </p>
                </div>
              </Link>

              {/* SEARCH */}
              <div className="hidden lg:block flex-1 max-w-[650px]">
                <SearchBar />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6 relative">

              {/* APPLY FILTER */}
              <button
                onClick={() =>
                  setIsFilterOpen(
                    !isFilterOpen
                  )
                }
                className="hidden md:flex items-center gap-2 text-white hover:text-[#B7D432] transition font-medium"
              >

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
                    d="M4 6h16M7 12h10M10 18h4"
                  />
                </svg>

                <span>
                  Apply Filters
                </span>
              </button>

              {/* FILTER POPUP */}
              {isFilterOpen && (

                <div className="absolute top-16 right-[320px] z-[100]">

                  <div
                    ref={filterRef}
                    className="w-[400px] bg-white shadow-2xl border border-gray-200"
                  >

                    <div className="flex items-center justify-between px-5 py-4 border-b">

                      <h2 className="text-xl font-bold text-[#0B0835]">
                        Apply Filters
                      </h2>

                      <button
                        onClick={() =>
                          setIsFilterOpen(false)
                        }
                        className="text-2xl text-gray-400 hover:text-black"
                      >
                        ×
                      </button>
                    </div>

                    <div className="p-5">
                      <Filters />
                    </div>
                  </div>
                </div>
              )}

              {/* COMPARE */}
              <Link
                href={
                  compare.length === 2
                    ? `/compare?c1=${compare[0]}&c2=${compare[1]}`
                    : "/compare"
                }
                className="hidden md:flex items-center justify-center bg-white/10 hover:bg-white/20 transition border border-white/10 text-white px-5 py-3 font-medium"
              >
                Compare {compare.length}/2
              </Link>

              {/* WRITE REVIEW */}
              <Link
                href="/write-review"
                className="hidden md:flex items-center gap-2 text-white hover:text-[#B7D432] transition font-medium"
              >

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
                    d="M11 5h2m-1-1v2m-7 6h14M5 19h14"
                  />
                </svg>

                <span>
                  Write Review
                </span>
              </Link>
               
           {/* COLLEGE PREDICTOR */}
              <Link
                 href="/college-predictor"
                 className="hidden md:flex items-center gap-2 text-white hover:text-[#B7D432] transition font-medium"
               >

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
               d="M9 17v-6h13v6M9 5v6h13V5M3 5h.01M3 11h.01M3 17h.01"
               />
              </svg>

              <span>
                 Predictor
              </span>
             </Link>

              {/* EXPLORE */}
              <Link
                href="/colleges"
                className="hidden md:flex items-center gap-2 text-white hover:text-[#B7D432] transition font-medium"
              >

                <div className="grid grid-cols-3 gap-[2px]">

                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />

                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />

                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>

                <span>
                  Explore
                </span>
              </Link>

              {/* MENU BUTTON */}
              <button
                onClick={() =>
                  setIsMenuOpen(
                    !isMenuOpen
                  )
                }
                className="w-12 h-12 border border-white/20 bg-white/10 flex flex-col items-center justify-center gap-1.5 hover:bg-white/20 transition"
              >

                <span className="w-5 h-[2px] bg-white" />
                <span className="w-5 h-[2px] bg-white" />
                <span className="w-5 h-[2px] bg-white" />
              </button>

              {/* MENU */}
              {isMenuOpen && (

                <div
                  ref={menuRef}
                  className="absolute top-24 right-0 w-80 bg-white shadow-2xl border border-gray-200"
                >

                  {session?.user ? (

                    <>
                      <div className="bg-[#0B0835] p-6 text-white">

                        <div className="flex items-center gap-4">

                          <div className="w-14 h-14 bg-[#FF7900] text-white font-bold flex items-center justify-center text-2xl">
                            {session.user.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <h3 className="font-bold text-lg">
                              {session.user.name}
                            </h3>

                            <p className="text-sm text-gray-300 break-all">
                              {session.user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 flex flex-col">

                        <Link
                          href="/profile"
                          className="px-4 py-3 hover:bg-[#F5F5F5] font-medium"
                        >
                          👤 My Profile
                        </Link>

                        <Link
                          href="/compare"
                          className="px-4 py-3 hover:bg-[#F5F5F5] font-medium"
                        >
                          📊 Compare Colleges
                        </Link>

                        <Link
                          href="/write-review"
                          className="px-4 py-3 hover:bg-[#F5F5F5] font-medium"
                        >
                          ✍️ Write Review
                        </Link>

                        <button
                          onClick={() =>
                            signOut()
                          }
                          className="text-left px-4 py-3 hover:bg-red-50 text-red-600 font-medium"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </>

                  ) : (

                    <div className="p-5">

                      <h3 className="text-2xl font-bold text-[#0B0835] mb-3">
                        Welcome 👋
                      </h3>

                      <p className="text-gray-500 text-sm mb-5">
                        Login to save colleges and access your profile.
                      </p>

                      <button
                        onClick={() => {

                          setIsMenuOpen(false);

                          setIsAuthOpen(true);
                        }}
                        className="w-full bg-[#B7D432] text-[#0B0835] py-3 font-bold hover:opacity-90 transition"
                      >
                        Login / Register
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() =>
          setIsAuthOpen(false)
        }
      />
    </>
  );
}
