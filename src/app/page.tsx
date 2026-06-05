import CollegeCard from "@/components/CollegeCard";

import SearchBar from "@/components/SearchBar";

async function getColleges(
  search: string,
  location: string,
  rating: string,
  fees: string
) {

  const res = await fetch(
    `http://localhost:3000/api/colleges?search=${search}&location=${location}&rating=${rating}&fees=${fees}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    location?: string;
    rating?: string;
    fees?: string;
  }>;
}) {

  const params =
    await searchParams;

  const search =
    params.search || "";

  const location =
    params.location || "";

  const rating =
    params.rating || "";

  const fees =
    params.fees || "";

  const response =
    await getColleges(
      search,
      location,
      rating,
      fees
    );

  const colleges =
    response.data;

  return (
    <main className="min-h-screen bg-[#F9FAFB]">

      {/* HERO */}
      <section className="relative h-[420px] overflow-hidden border-b">

        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop')",
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-[#111827]/75" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-center">

          <div className="max-w-6xl mx-auto px-6 w-full">

            <div className="max-w-3xl">

              <p className="text-[#B7D432] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Discover Top Colleges
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">

                Find & Compare
                Colleges Across India
              </h1>

              <p className="text-gray-300 text-lg leading-8 max-w-2xl mb-8">

                Explore colleges,
                compare fees,
                placements,
                rankings and find
                the right college
                for your future.
              </p>

              

              {/* TAGS */}
              <div className="flex flex-wrap gap-3 mt-6">

                {[
                  "Engineering",
                  "MBA",
                  "Medical",
                  "Law",
                  "BCA",
                  "Design",
                ].map((item) => (

                  <button
                    key={item}
                    className="bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLEGES */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <h2 className="text-3xl font-bold text-[#2F3B52]">

              {search
                ? `Search Results for "${search}"`
                : "Top Colleges"}
            </h2>

            <p className="text-gray-500 mt-2">
              Explore highly rated colleges across India
            </p>
          </div>

          <div className="bg-white border rounded-lg px-5 py-3 min-w-[180px]">

            <p className="text-sm text-gray-500">
              Total Colleges
            </p>

            <h3 className="text-2xl font-bold text-[#2F3B52]">
              {colleges.length}
            </h3>
          </div>
        </div>

        {/* EMPTY STATE */}
        {colleges.length === 0 ? (

          <div className="bg-white border rounded-lg p-12 text-center">

            <h3 className="text-2xl font-bold text-[#2F3B52] mb-3">
              No Colleges Found
            </h3>

            <p className="text-gray-500">
              Try searching with another keyword.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {colleges.map(
              (college: any) => (

                <CollegeCard
                  key={college.id}
                  college={college}
                />
              )
            )}
          </div>
        )}
      </section>
    </main>
  );
}