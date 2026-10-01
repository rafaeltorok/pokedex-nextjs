export default function ListLoading() {
  return (
    <div className="animate-pulse">
      <h1
        className="
          mt-8 mb-2
          text-2xl
          text-gray-300 dark:text-gray-600/50
          font-bold
          p-2
        "
      >
        Loading available Pokémons...
      </h1>

      <div className="w-[300px] mx-auto">
        {/* Search Bar skeleton */}
        <div
          className="
            mx-auto text-center
            bg-gray-400/75 dark:bg-gray-700/75
            p-2 my-4
            rounded
            w-[275px] h-[40px]
          "
        />

        {/* List items skeleton */}
        <div className="flex flex-col gap-2">
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
        border-1 border-gray-700/75 rounded
        bg-gray-500/75 dark:bg-gray-800/75
        h-[50px]
      "
    />
  );
}
