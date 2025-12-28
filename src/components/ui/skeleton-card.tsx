export default function SkeletonVehicleCards() {
  return (
    <div className=" flex w-full  flex-col gap-4 overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="w-full animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start space-x-4">
            <div className="h-36 w-44 rounded-md bg-gray-200"></div>
            <div className="flex-1 space-y-6">
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              <div className="h-4 w-2/3 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
