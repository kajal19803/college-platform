import { prisma } from "@/lib/prisma";

export default async function WriteReviewPage() {

  const colleges =
    await prisma.college.findMany({

      select: {
        id: true,
        name: true,
      },

      orderBy: {
        name: "asc",
      },
    });

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">

      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold text-[#111827] mb-4">
            Write A Review
          </h1>

          <p className="text-gray-500 text-lg">
            Share your college experience and help future students.
          </p>
        </div>

        {/* FORM */}
        <form
          action="/api/reviews"
          method="POST"
          className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6 shadow-sm"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* COLLEGE */}
            <div>

              <label className="block mb-2 font-semibold text-[#111827]">
                Select College
              </label>

              <select
                name="collegeId"
                required
                className="w-full border border-gray-300 rounded-xl px-4 h-14 outline-none focus:border-[#B7D432]"
              >

                <option value="">
                  Choose College
                </option>

                {colleges.map((college) => (

                  <option
                    key={college.id}
                    value={college.id}
                  >
                    {college.name}
                  </option>
                ))}
              </select>
            </div>

            {/* COURSE */}
            <div>

              <label className="block mb-2 font-semibold text-[#111827]">
                Course
              </label>

              <input
                type="text"
                name="course"
                placeholder="B.Tech CSE"
                className="w-full border border-gray-300 rounded-xl px-4 h-14 outline-none focus:border-[#B7D432]"
              />
            </div>

            {/* NAME */}
            <div>

              <label className="block mb-2 font-semibold text-[#111827]">
                Your Name
              </label>

              <input
                type="text"
                name="studentName"
                required
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-xl px-4 h-14 outline-none focus:border-[#B7D432]"
              />
            </div>

            {/* EMAIL */}
            <div>

              <label className="block mb-2 font-semibold text-[#111827]">
                Email
              </label>

              <input
                type="email"
                name="studentEmail"
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded-xl px-4 h-14 outline-none focus:border-[#B7D432]"
              />
            </div>

            {/* YEAR */}
            <div>

              <label className="block mb-2 font-semibold text-[#111827]">
                Graduation Year
              </label>

              <input
                type="text"
                name="graduationYear"
                placeholder="2027"
                className="w-full border border-gray-300 rounded-xl px-4 h-14 outline-none focus:border-[#B7D432]"
              />
            </div>

            {/* RATING */}
            <div>

              <label className="block mb-2 font-semibold text-[#111827]">
                Rating
              </label>

              <select
                name="rating"
                required
                className="w-full border border-gray-300 rounded-xl px-4 h-14 outline-none focus:border-[#B7D432]"
              >

                <option value="5">
                  5 Stars
                </option>

                <option value="4">
                  4 Stars
                </option>

                <option value="3">
                  3 Stars
                </option>

                <option value="2">
                  2 Stars
                </option>

                <option value="1">
                  1 Star
                </option>
              </select>
            </div>
          </div>

          {/* TITLE */}
          <div>

            <label className="block mb-2 font-semibold text-[#111827]">
              Review Title
            </label>

            <input
              type="text"
              name="title"
              required
              placeholder="Great placements and faculty"
              className="w-full border border-gray-300 rounded-xl px-4 h-14 outline-none focus:border-[#B7D432]"
            />
          </div>

          {/* MESSAGE */}
          <div>

            <label className="block mb-2 font-semibold text-[#111827]">
              Full Review
            </label>

            <textarea
              name="message"
              rows={6}
              required
              placeholder="Write your detailed review..."
              className="w-full border border-gray-300 rounded-xl p-4 outline-none resize-none focus:border-[#B7D432]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#B7D432] hover:bg-[#a7c52b] text-[#111827] font-bold px-8 h-14 rounded-xl transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </main>
  );
}

