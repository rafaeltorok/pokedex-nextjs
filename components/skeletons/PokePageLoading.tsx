export default function PokePageLoading() {
  return (
    <div
      className="
        flex flex-col
        w-full
        mx-auto
        rounded-xl
        mt-10 mb-5 sm:mb-15
        justify-center
        animate-pulse
        bg-gray-500/20 dark:bg-gray-700/40
        sm:p-0
        sm:min-w-[490px]
      "
    >
      {/* Wrapper for the top portion of the data table */}
      <div
        className="
          sm:flex
          p-1 sm:p-0
        "
      >
        {/* Wrapper for the title, sprite picture and types */}
        <div
          className="
            p-1 sm:p-0
            flex flex-col
            items-center
            border-gray-400 dark:bg-gray-600/50
            bg-gray-500 dark:bg-gray-700/50
            sm:w-1/2
            sm:m-2 sm:mr-0.75 sm:mb-0.75
            rounded-tr-xl rounded-tl-xl sm:rounded-tr-none
          "
        >
          {/* Table title - Pokémon name and ID number */}
          <div
            className="
              font-bold text-xl text-gray-200 dark:text-gray-500/75
              p-4 sm:px-3 sm:py-2
            "
          >
            Loading Pokémon data...
          </div>

          {/* Sprite section */}
          <div
            className="
              w-[300px] h-[300px]
              sm:h-full sm:w-full
              p-4
              bg-gray-600 dark:bg-gray-900/50
            "
          />

          {/* Pokémon types section */}
          <div 
            className="
              flex w-full
              p-6
              bg-gray-400 dark:bg-gray-600/50
            "
          />
        </div>

        {/* Stats section */}
        <div
          className="
            px-1 sm:p-1
            sm:flex sm:flex-col
            sm:w-1/2
            sm:m-1 sm:ml-0.75 sm:mb-0.75
          "
        >
          <div className="text-center bg-gray-800/50 py-5 sm:py-6 sm:rounded-tr-xl" />
          {renderStatRow()}
          {renderStatRow()}
          {renderStatRow()}
          {renderStatRow()}
          {renderStatRow()}
          {renderStatRow()}
          {renderStatRow()}
        </div>
      </div>

      {/* Wrapper for the bottom portion of the data table */}
      <div className="sm:flex">
        {/* Abilities section */}
        <div
          className="
            w-full
            px-1 sm:p-0
            sm:flex-col
            sm:w-1/2
            sm:m-2 sm:mr-0.75 sm:mt-0.75
          "
        >
          <div className="text-center bg-gray-800/50 p-5" />
          <div className="flex flex-col">
            <div className="flex w-full">
              <div
                className="
                  w-1/2
                  bg-gray-500 dark:bg-gray-700/50
                  p-5 sm:py-6
                  border-1 border-gray-600/50
                  sm:rounded-bl-xl
                "
              />
              <div
                className="
                  w-1/2
                  bg-gray-600 dark:bg-gray-900/50
                  p-5 sm:py-6
                  border-1 border-gray-600/50
                "
              />
          </div>
        </div>
      </div>

        {/* Evolution section */}
        <div
          className="
            w-full
            p-1 sm:p-0
            sm:flex-col
            sm:w-1/2
            sm:m-2 sm:ml-0.75 sm:mt-0.75
          "
        >
          <div className="text-center bg-gray-800/50 p-5" />
          <div className="flex w-full">
            <div
              className="
                w-1/5
                bg-gray-400 dark:bg-gray-600/50
                p-5 sm:py-6
                border-1 border-gray-600/50 rounded-bl-xl sm:rounded-none
              "
            />
            <div
              className="
                w-2/5
                bg-gray-700 dark:bg-gray-900/50
                p-5 sm:py-6
                border-1 border-gray-600/50
              "
            />
            <div
              className="
                w-2/5
                bg-gray-500 dark:bg-gray-700/50
                p-5 sm:py-6
                border-1 border-gray-600/50 rounded-br-xl
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function renderStatRow() {
  return (
    <div className="flex text-center">
      <div
        className="
          w-1/2
          border-1 border-gray-700/50
          p-5 sm:py-6
          bg-gray-500 dark:bg-gray-700/50
        "
      />
      <div
        className="
          w-1/2
          border-1 border-gray-700/50
          p-5 sm:py-6
          bg-gray-600 dark:bg-gray-900/50
        "
      />
    </div>
  );
}
