export default function Skeleton() {
  return (
    <div className="animate-pulse">
      {/* Current Weather Skeleton */}
      <div className="rounded-3xl border border-(--border) bg-(--surface) p-6 sm:p-8">
        <div className="mb-8 space-y-3">
          <div className="h-4 w-32 rounded bg-(--surface-hover)" />
          <div className="h-8 w-48 rounded bg-(--surface-hover)" />
        </div>

        <div className="mb-8 flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-(--surface-hover)" />
          <div className="h-14 w-28 rounded-xl bg-(--surface-hover)" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl bg-(--surface-hover) p-5"
            >
              <div className="h-4 w-24 rounded bg-(--border)" />
              <div className="mt-4 h-8 w-20 rounded bg-(--border)" />
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Skeleton */}
      <div className="mt-6 rounded-3xl border border-(--border) bg-(--surface) p-6 sm:p-8">
        <div className="mb-6 h-6 w-40 rounded bg-(--surface-hover)" />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-2xl bg-(--surface-hover) p-4"
            >
              <div className="h-4 w-16 rounded bg-(--border)" />
              <div className="mt-2 h-3 w-12 rounded bg-(--border)" />
              <div className="my-5 h-9 w-9 rounded-full bg-(--border)" />
              <div className="h-4 w-20 rounded bg-(--border)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}