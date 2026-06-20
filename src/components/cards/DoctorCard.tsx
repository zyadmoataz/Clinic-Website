// ==========================================
// OWNER: Omar
// PURPOSE: Doctor Discovery - Doctor Card
// ACTION: Replace this static layout with dynamic API data!
// ==========================================

export function DoctorCard() {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-lg">
      <div className="mb-5 flex items-start gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xl font-bold text-gray-500">
            DR
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                Dr. Example Name
              </h3>
              <p className="mb-1 text-sm font-medium text-blue-600">Cardiology</p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-0.5">
              <span className="text-xs font-bold text-yellow-700">4.9</span>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            15 years of experience in cardiology and heart surgery.
          </p>
        </div>
      </div>

      <div className="mt-auto flex gap-2 border-t border-gray-100 pt-4">
        <button className="flex-1 rounded-lg bg-blue-50 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100">
          View Profile
        </button>
        <button className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
}
