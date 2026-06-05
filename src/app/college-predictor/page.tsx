import PredictorForm from "@/components/PredictorForm";

export default function CollegePredictorPage() {

  return (
    <main className="min-h-screen bg-[#F5F7FB] pt-32 pb-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-12 text-center">

          <h1 className="text-5xl font-bold text-[#0B0835] mb-4">
            College Predictor
          </h1>

          <p className="text-gray-500 text-lg">
            Predict colleges based on your exam rank and category.
          </p>
        </div>

        {/* FORM */}
        <PredictorForm />
      </div>
    </main>
  );
}
