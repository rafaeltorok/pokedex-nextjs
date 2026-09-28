export default function Home() {
  return (
    <div
      className="
        flex flex-col flex-1
        items-center
        justify-center
        font-sans
      "
    >
      <main
        className="
          flex flex-1 flex-col
          w-full max-w-3xl
          items-center
          py-16
          px-10
          sm:items-start
        "
      >
        <h1 className="mx-auto text-4xl font-bold [text-shadow:1px_1px_0_#000]">
          Pokédex App
        </h1>

        <section className="mx-auto my-10">
          <p className="text-center">Built with Next.js and Tailwind CSS.</p>

          <div className="mt-5">
            Features:
            <ul className="list-disc">
              <li>
                The full Pokédex from Generations I to IV (Kanto, Johto, Hoenn and Sinnoh)
              </li>
              <li>Filter the Pokémons by name</li>
              <li>Click on each type to get info about its damage relations</li>
              <li>Click on each ability for a short description</li>
            </ul>
          </div>

          <div className="mt-5">
            Pokémon info:
            <ul className="list-disc">
              <li>Base stats</li>
              <li>Types</li>
              <li>Normal and Hidden abilities</li>
              <li>Evolution chain</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
