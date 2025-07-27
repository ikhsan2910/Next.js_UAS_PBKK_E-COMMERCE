'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Produk {
  id: number
  nama: string
  gambar: string
  harga: number
  deskripsi: string
}

export default function DetailProduk() {
  const params = useParams()
  const id = params?.id as string
  const [produk, setProduk] = useState<Produk | null>(null)

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduk(data))
        .catch((err) => console.error('Gagal fetch produk:', err))
    }
  }, [id])

  if (!produk) return <p>Loading...</p>

  const tambahKeKeranjang = () => {
    const keranjangLama = JSON.parse(localStorage.getItem('cart') || '[]')
    const sudahAda = keranjangLama.find((item: any) => item.id === produk.id)

    let keranjangBaru
    if (sudahAda) {
      keranjangBaru = keranjangLama.map((item: any) =>
        item.id === produk.id ? { ...item, jumlah: item.jumlah + 1 } : item
      )
    } else {
      keranjangBaru = [
        ...keranjangLama,
        {
          id: produk.id,
          nama: produk.nama,
          harga: produk.harga,
          gambar: produk.gambar,
          jumlah: 1,
        },
      ]
    }

    localStorage.setItem('cart', JSON.stringify(keranjangBaru))
    alert('Produk ditambahkan ke keranjang!')
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">{produk.nama}</h1>
      <img
        src={produk.gambar}
        alt={produk.nama}
        className="w-full rounded mb-4"
      />
      <p className="text-gray-700 mb-2">Harga: Rp{produk.harga}</p>
      <p className="text-gray-600">{produk.deskripsi}</p>

      <button
        onClick={tambahKeKeranjang}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Tambah ke Keranjang
      </button>
    </div>
  )
}
