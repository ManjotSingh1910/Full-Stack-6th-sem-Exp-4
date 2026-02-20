import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, setFilter } from '../store/productsSlice'
import { addToCart } from '../store/cartSlice'

export default function ProductList() {
  const dispatch = useDispatch()
  const { items, status, filter } = useSelector((s) => s.products)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [status, dispatch])

  const filtered = items.filter((p) => p.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div style={{ flex: 1 }}>
      <h2>Products</h2>
      <input placeholder="Filter" value={filter} onChange={(e) => dispatch(setFilter(e.target.value))} />
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Failed to load products.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginTop: 12 }}>
        {filtered.map((p) => (
          <div key={p.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: '#fff' }}>
            <div style={{ width: '100%', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={p.image} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 14, minHeight: 44 }}>{p.title}</div>
            <div style={{ marginTop: 8, fontWeight: 'bold' }}>${p.price}</div>
            <button onClick={() => dispatch(addToCart(p))} style={{ marginTop: 10 }}>Add</button>
          </div>
        ))}
      </div>
    </div>
  )
}
