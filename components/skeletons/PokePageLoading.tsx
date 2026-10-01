export default function PokePageLoading() {
  return (
    <div
      className="
        flex flex-col
        rounded-xl
        mt-10 mb-5 sm:mb-15
        animate-pulse
        bg-gray-500/20 dark:bg-gray-700/40
        p-2
      "
    >
      {/* Wrapper for the top portion of the data table */}
      <div
        className="
          sm:flex flex-col sm:flex-row
          min-w-[300px] max-w-[400px]
          sm:min-w-full sm:h-[400px]
        "
      >
        {/* Wrapper for the title, sprite picture and types */}
        <div
          className="
            sm:w-1/2
            sm:mr-0.75 sm:mb-0.5
            h-[420px] sm:h-full
            font-bold text-xl
            text-gray-200 dark:text-gray-500/75
            bg-gray-500 dark:bg-gray-700/50
            rounded-tr-xl rounded-tl-xl sm:rounded-tr-none
          "
        >
          {/* Title section */}
          <div className="p-5 sm:p-2">
            Loading Pokémon data...
          </div>

          {/* Sprite picture */}
          <div
            className="
              h-[300px] w-[300px]
              sm:h-[275px] sm:w-[240px]
              bg-gray-600 dark:bg-gray-800
            "
          />
        </div>

        {/* Stats section */}
        <div
          className="
            sm:w-1/2
            sm:ml-0.75
            h-[250px] sm:h-[400px]
            bg-gray-600 dark:bg-gray-800
            sm:rounded-tr-xl
          "
        >
          {/* Stats header */}
          {renderHeader()}
        </div>
      </div>

      {/* Wrapper for the bottom portion of the data table */}
      <div className="flex flex-col sm:flex-row">
        {/* Abilities section */}
        <div
          className="
            sm:w-1/2
            bg-gray-700 dark:bg-gray-900/50
            h-[150px] sm:w-[245px]
            sm:mt-2 sm:mr-0.75
          "
        >
          {/* Abilities header */}
          {renderHeader()}
        </div>

        {/* Evolutions section */}
        <div
          className="
            sm:w-1/2
            sm:mt-2 sm:ml-0.75
            h-[100px] sm:h-[150px] sm:w-[245px]
            bg-gray-700 dark:bg-gray-900/50
          "
        >
          {/* Evolutions header */}
          {renderHeader()}
        </div>
      </div>
    </div>
  );
}

function renderHeader() {
  return (
    <div
      className="
        h-[40px]
        bg-gray-700 dark:bg-gray-900
      "
    />
  );
}
