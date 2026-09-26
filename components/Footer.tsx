import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        flex flex-col sm:flex-row
        w-full
        bg-gray-700
        bottom-0
        p-3
        text-sm
        text-gray-400
        gap-1
        inset-x-0 bottom-0
      "
    >
      <div className="w-full sm:w-1/2 text-center">
        <p>
          Developed by Rafael G. Torok (2026).{" "}
          <Link target="_blank" href={"https://github.com/rafaeltorok"}>
            Github profile⇗
          </Link>
        </p>
      </div>

      <div className="w-full sm:w-1/2 text-center">
        <p>
          Powered by the {" "}
          <Link target="_blank" href={"https://pokeapi.co"}>
            Poké API⇗
          </Link>
        </p>
      </div>
    </footer>
  );
}
