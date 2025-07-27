'use client';

import { useEffect, useState } from 'react';

interface Produk {
  id: string;
  nama: string;
  harga: number;
  gambar: string;
}

export default function ProductPage() {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch produk');
        }
        return res.json();
      })
      .then(data => {
        const mapped = data.map((item: any) => ({
          id: item.product_id,
          nama: item.name,
          harga: item.price,
          gambar: '/default.jpg', // placeholder gambar
        }));
        setProduk(mapped);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <main className="p-8">Loading produk...</main>;
  }

  if (error) {
    return <main className="p-8 text-red-600">Error: {error}</main>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produk.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={item.gambar}
              alt={`Gambar produk ${item.nama}`}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-semibold">{item.nama}</h2>
            <p className="text-gray-700">
              Rp {item.harga.toLocaleString('id-ID')}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
