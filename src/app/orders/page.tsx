// app/orders/page.tsx
'use client'

import { useEffect, useState } from 'react'

type Produk = {
  nama: string
  harga: number
  gambar: string
}

type Item = {
  id: number
  jumlah: number
  harga: number
  product: Produk
}

type Order = {
  id: number
  created_at: string
  total: number
  items: Item[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetch('http://localhost:8000/api/orders?customer_id=1')
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Gagal fetch orders:', err))
  }, [])

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Riwayat Pesanan</h1>
      {orders.length === 0 ? (
        <p>Belum ada pesanan.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 rounded mb-4 shadow">
            <h2 className="font-bold">Pesanan #{order.id}</h2>
            <p className="text-sm text-gray-500">Tanggal: {new Date(order.created_at).toLocaleString()}</p>
            <div className="mt-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 mb-2">
                  <img src={item.product.gambar} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-medium">{item.product.nama}</p>
                    <p className="text-sm text-gray-600">
                      {item.jumlah} x Rp{item.harga}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 font-semibold">Total: Rp{order.total}</p>
          </div>
        ))
      )}
    </div>
  )
}
