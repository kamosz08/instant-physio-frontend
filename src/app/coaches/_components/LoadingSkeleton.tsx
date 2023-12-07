function SkeletonCard() {
  return (
    <div className="w-full animate-pulse ">
      <div className="h-96 rounded dark:bg-gray-300"></div>
      <div className="w-20 h-5 mt-1 rounded dark:bg-gray-300"></div>
      <div className="w-full h-5 mt-1 rounded dark:bg-gray-300"></div>
      <div className="w-24 h-8 mt-2 ml-auto rounded dark:bg-gray-300"></div>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((id) => (
        <SkeletonCard key={id} />
      ))}
    </div>
  );
}
