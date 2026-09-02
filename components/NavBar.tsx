import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="flex gap-2 font-bold bg-gray-700 w-full justify-center p-2 [text-shadow:1px_1px_0_#000]">
        <Link href={"/"}>Home</Link>
        {" | "}
        <Link href={"/pokemon"}>Pokémons</Link>
      </nav>
    </>
  );
}
