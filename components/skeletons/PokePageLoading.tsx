export default function PokePageLoading() {
  return (
    <div
      className="
        flex flex-col
        mx-auto
        rounded-xl
        mt-10 mb-5
        justify-center
        animate-pulse
        bg-gray-500 dark:bg-gray-700
      "
    >
      <div
        className="
          pt-1
          pl-1
          pr-1
        "
      >
        {/* Title and ID section */}
        <div
          className="
            w-[300px]
            flex
            items-center
            font-bold text-xl
            [-webkit-text-stroke:0.1px_rgb(0_0_0_/_50%)]
            border-gray-400 dark:bg-gray-600
            p-5
            rounded-tl-xl rounded-tr-xl
          "
        >
          Loading Pokémon data...
        </div>

        {/* Sprite picture */}
        <div className="w-[300px] h-[300px] bg-gray-600 dark:bg-gray-900" />
      </div>

      {/* Types section */}
      <div className="flex px-1">
        <div
          className="
            w-full
            p-6
            bg-gray-400 dark:bg-gray-600
          "
        />
      </div>

      {/* Stats section */}
      <div className="px-1">
        <div className="text-center bg-gray-800 p-5" />
        {renderStatRow()}
        {renderStatRow()}
        {renderStatRow()}
        {renderStatRow()}
        {renderStatRow()}
        {renderStatRow()}
        {renderStatRow()}
      </div>

      {/* Abilities section */}
      <div className="w-full px-1">
        <div className="text-center bg-gray-800 p-5" />
        <div className="flex flex-col">
          <div className="flex w-full">
            <div
              className="
                w-1/2
                bg-gray-500 dark:bg-gray-700
                p-5
                border-1 border-gray-600
              "
            />
            <div
              className="
                w-1/2
                bg-gray-600 dark:bg-gray-900
                p-5
                border-1 border-gray-600
              "
            />
          </div>
        </div>
      </div>

      {/* Evolution section */}
      <div className="w-full px-1">
        <div className="text-center bg-gray-800 p-5" />
        <div className="flex w-full">
          <div
            className="
              w-1/5
              bg-gray-400 dark:bg-gray-600
              p-5
              border-1 border-gray-600 rounded-bl-xl
            "
          />
          <div
            className="
              w-2/5
              bg-gray-700 dark:bg-gray-900
              p-5
              border-1 border-gray-600
            "
          />
          <div
            className="
              w-2/5
              bg-gray-500 dark:bg-gray-700
              p-5
              border-1 border-gray-600 rounded-br-xl
            "
          />
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
          border-1 border-gray-700
          p-5
          bg-gray-500 dark:bg-gray-700
        "
      />
      <div
        className="
          w-1/2
          border-1 border-gray-700
          p-5
          bg-gray-600 dark:bg-gray-900
        "
      />
    </div>
  );
}
