import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <h1 className="text-3xl font-bold">Selamat Datang di Toko Online</h1>
      <p className="text-lg text-gray-600">Temukan produk terbaik pilihan kamu!</p>

      <a
        href="/product"
        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Lihat Produk
      </a>
    </main>
  );
}
