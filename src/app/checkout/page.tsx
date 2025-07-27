'use client'

import { useEffect, useState } from 'react'

interface Item {
  id: number
  nama: string
  harga: number
  jumlah: number
  gambar: string
}

export default function CheckoutPage() {
  const [keranjang, setKeranjang] = useState<Item[]>([])
  const [nama, setNama] = useState('')
  const [alamat, setAlamat] = useState('')

  useEffect(() => {
    const cart = localStorage.getItem('cart')
    if (cart) {
      setKeranjang(JSON.parse(cart))
    }
  }, [])

  const total = keranjang.reduce((acc, item) => acc + item.harga * item.jumlah, 0)

  const handleCheckout = async () => {
    if (!nama || !alamat) {
      alert('Harap isi nama dan alamat!')
      return
    }

    const data = {
      nama,
      alamat,
      items: keranjang.map((item) => ({
        product_id: item.id,
        jumlah: item.jumlah,
        harga: item.harga,
      })),
    }

    try {
      const res = await fetch('http://localhost:8000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Checkout gagal')

      alert('Checkout berhasil!')
      localStorage.removeItem('cart')
      window.location.href = '/orders'
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan saat checkout.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Nama</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <label className="block mt-4 mb-1 font-medium">Alamat</label>
        <textarea
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <h2 className="text-lg font-semibold mb-2">Ringkasan Belanja</h2>
      {keranjang.map((item) => (
        <div key={item.id} className="flex items-center gap-4 mb-2">
          <img src={item.gambar} className="w-16 h-16 rounded object-cover" />
          <div>
            <p>{item.nama}</p>
            <p className="text-sm text-gray-500">
              {item.jumlah} x Rp{item.harga}
            </p>
          </div>
        </div>
      ))}
      <p className="font-bold mt-4">Total: Rp{total}</p>

      <button
        onClick={handleCheckout}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Bayar Sekarang
      </button>
    </div>
  )
}
