export default function ListLoading() {
  return (
    <div className="animate-pulse">
      <h1
        className="
          mt-6 mb-2
          text-2xl text-center
          text-gray-300 dark:text-gray-600/50
          font-bold
          p-2
        "
      >
        Loading Pokédex...
      </h1>

      <div className="w-[300px] mx-auto">
        {/* Search Bar skeleton */}
        <div
          className="
            mx-auto text-center
            bg-gray-400/75 dark:bg-gray-700/75
            p-2 mt-4 mb-6
            rounded
            w-[275px] h-[40px]
          "
        />

        {/* List items skeleton */}
        <div className="grid grid-cols-2 gap-2">
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
          {renderListItemSkeleton()}
        </div>
      </div>

      {/* Pagination skeleton */}
      <div
        className="
          w-[350px] h-[40px]
          bg-gray-600 dark:bg-gray-900
          mt-5 mb-5
          rounded-xl
        "
      />
    </div>
  );
}

// Helper functions
function renderListItemSkeleton() {
  return (
    <div
      className="
        rounded-xl
        bg-gray-500/75 dark:bg-gray-800/75
        h-[150px] w-[150px]
      "
    />
  );
}
