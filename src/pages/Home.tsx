export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight text-center">
        Welcome to <span className="text-blue-600">ClinicNow</span>
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl text-center">
        Book appointments with the best doctors in your area. Quick, easy, and secure.
      </p>
      <div className="flex gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
          Find a Doctor
        </button>
        <button className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-8 rounded-lg border border-blue-200 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}
