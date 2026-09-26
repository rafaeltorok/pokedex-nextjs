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
        <h1 className="mx-auto text-2xl font-bold [text-shadow:1px_1px_0_#000]">
          Pokédex App
        </h1>

        <section className="mx-auto my-10">
          <p>Built with Next.js and Tailwind CSS.</p>

          <div className="mt-5">
            Features:
            <ul className="list-disc">
              <li>
                The full Pokédex from Generations I to IV (Kanto to Sinnoh)
              </li>
              <li>Filter the Pokémons by name</li>
              <li>Display their types</li>
              <li>Check their base stats</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
