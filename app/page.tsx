import Link from "next/link";

export default function Home() {
  return (
    <div
      className="
        flex flex-col flex-1
        items-center
        justify-center
        font-sans
        bg-black
      "
    >
      <main
        className="
          flex flex-1 flex-col
          w-full max-w-3xl
          items-center
          py-16
          px-10
          bg-black
          sm:items-start
        "
      >
        <h1 className="mx-auto text-2xl font-bold [text-shadow:1px_1px_0_#000]">
          Pokédex App
        </h1>

        <section className="mx-auto my-10">
          <p>Build with Next.js and Tailwind CSS.</p>

          <div className="mt-5">
            Features:
            <ul className="list-disc">
              <li>Contains all 151 Pokémons from Generation I (Kanto)</li>
              <li>Filter the Pokémons by name</li>
              <li>Display each Pokémon types</li>
              <li>Check their base stats</li>
            </ul>
          </div>
        </section>

        <section className="mx-auto">
          <p className="text-gray-500">
            <em>
              Developed by Rafael G. Torok (2026).
              <br />
              <Link target="_blank" href={"https://github.com/rafaeltorok"}>
                Github profile⇗
              </Link>
            </em>
          </p>
        </section>
      </main>
    </div>
  );
}
