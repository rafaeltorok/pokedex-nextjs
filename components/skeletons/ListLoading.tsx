export default function ListLoading() {
  return (
    <div className="mx-auto text-center animate-pulse">
      <h1
        className="
          mx-auto mt-8 mb-2
          text-2xl text-center
          text-gray-300 dark:text-gray-600/50
          font-bold
        "
      >
        Loading available Pokémons...
      </h1>

      <div className="w-[300px] mx-auto text-center">
        {/* Search Bar skeleton */}
        <div className="mx-auto text-center">
          <input
            className="bg-gray-400/75 dark:bg-gray-700/75 p-2 my-4 rounded w-[275px]"
            disabled
          />
        </div>

        {/* List items skeleton */}
        <div className="mx-auto text-center">
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
      <div className="inline-flex mt-3 mb-5">
        {/* Left nav arrow skeleton */}
        <div
          className="
            h-10 w-10
            rounded-md border border-gray-700/75
            mr-2 md:mr-4
            bg-gray-600/75 dark:bg-gray-900/75
          "
        />

        {/* Page numbers skeleton */}
        <div className="flex -space-x-px">
          {renderPageNumberSkeleton()}
          {renderPageNumberSkeleton()}
          {renderPageNumberSkeleton()}
          {renderPageNumberSkeleton()}
          {renderPageNumberSkeleton()}
          {renderPageNumberSkeleton()}
        </div>

        {/* Right nav arrow skeleton */}
        <div
          className="
            h-10 w-10
            rounded-md border border-gray-700/75
            ml-2 md:ml-4
            bg-gray-600/75 dark:bg-gray-900/75
          "
        />
      </div>
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
        p-2 m-2
        h-[50px]
      "
    />
  );
}

function renderPageNumberSkeleton() {
  return (
    <div
      className="
        h-10 w-10
        border border-gray-700/75
        bg-gray-600/75 dark:bg-gray-900/75
        first:rounded-l-md last:rounded-r-md
      "
    />
  );
}
