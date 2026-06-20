// ==========================================
// OWNER: Helda
// PURPOSE: Patient History - Appointment Card
// ACTION: Replace this static layout with dynamic data!
// ==========================================

export function AppointmentCard() {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
            Confirmed
          </span>
        </div>
      </div>

      <div className="mb-4 flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-500">
          DA
        </div>
        <div>
          <h3 className="leading-tight font-bold text-gray-900">Dr. Ahmed Ali</h3>
          <p className="mb-1 text-sm text-gray-500">Cardiology</p>
        </div>
      </div>

      <div className="mt-auto mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Tomorrow at 10:00 AM</span>
        </div>
      </div>

      <div className="mt-auto flex w-full gap-2">
        <button className="h-8 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-xs text-gray-800 hover:bg-gray-50">
          Reschedule
        </button>
        <button className="h-8 w-full rounded-lg bg-transparent px-3 text-xs text-red-500 hover:bg-red-50 hover:text-red-600">
          Cancel
        </button>
      </div>
    </div>
  );
}
