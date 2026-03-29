import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center border-b border-gray-800">

      <h1 className="text-xl font-bold">
            Vinay Creations
      </h1>

      <div className="flex gap-6">

        <Link href="/" className="hover:text-gray-400">
          Home
        </Link>

        <Link href="/gallery" className="hover:text-gray-400">
          Gallery
        </Link>

        <Link href="/contact" className="hover:text-gray-400">
          Contact
        </Link>

      </div>

    </nav>
  );
}