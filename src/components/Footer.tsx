import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B0835] text-white mt-auto">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              CollegeHub
            </h2>

            <p className="text-gray-300 leading-7">
              Discover top engineering colleges,
              compare them and find the perfect
              college for your future.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-bold text-xl mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-300">
              <Link href="/">Home</Link>

              <Link href="/">Top Colleges</Link>

              <Link href="/">Compare</Link>
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="font-bold text-xl mb-4">
              Resources
            </h3>

            <div className="flex flex-col gap-3 text-gray-300">
              <button className="text-left">
                Engineering
              </button>

              <button className="text-left">
                Placements
              </button>

              <button className="text-left">
                Scholarships
              </button>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-bold text-xl mb-4">
              Contact
            </h3>

            <div className="flex flex-col gap-3 text-gray-300">
              <p>support@collegehub.com</p>

              <p>India</p>

              <p>+91 9876543210</p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400">
          © 2026 CollegeHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}