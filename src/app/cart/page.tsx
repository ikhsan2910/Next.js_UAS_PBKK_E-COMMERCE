// app/cart/page.tsx
'use client'

import { useEffect, useState } from 'react'

type Item = {
  id: number
  nama: string
  harga: number
  gambar: string
  jumlah: number
}

export default function CartPage() {
  const [cart, setCart] = useState<Item[]>([])

 useEffect(() => {
  const stored = localStorage.getItem('cart')
  if (stored) {
    const parsed = JSON.parse(stored)
    // pastikan setiap item punya jumlah
    const fixed = parsed.map((item: any) => ({
      ...item,
      jumlah: item.jumlah || 1,
    }))
    setCart(fixed)
  }
}, [])


  const updateCart = (newCart: Item[]) => {
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const tambah = (id: number) => {
    updateCart(
      cart.map((item) =>
        item.id === id ? { ...item, jumlah: item.jumlah + 1 } : item
      )
    )
  }

  const kurang = (id: number) => {
    updateCart(
      cart
        .map((item) =>
          item.id === id && item.jumlah > 1
            ? { ...item, jumlah: item.jumlah - 1 }
            : item
        )
        .filter((item) => item.jumlah > 0)
    )
  }

  const hapus = (id: number) => {
    updateCart(cart.filter((item) => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.harga * item.jumlah, 0)

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
      {cart.length === 0 ? (
        <p>Keranjang kosong.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="mb-4 border-b pb-4">
            <img src={item.gambar} className="w-32 rounded mb-2" />
            <h2 className="text-lg font-semibold">{item.nama}</h2>
            <p>Harga: Rp{item.harga}</p>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => kurang(item.id)} className="px-2 bg-gray-200 rounded">-</button>
              <span>{item.jumlah}</span>
              <button onClick={() => tambah(item.id)} className="px-2 bg-gray-200 rounded">+</button>
              <button onClick={() => hapus(item.id)} className="ml-4 text-red-500">Hapus</button>
            </div>
          </div>
        ))
      )}
      <div className="mt-6 font-bold text-xl">Total: Rp{total}</div>
    </div>
  )
}
