import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, clearCart } from '../store/cartSlice'

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector((s) => s.cart.items)

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <aside style={{ width: 320 }}>
      <h2>Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((i) => (
          <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
            <div>
              <div>{i.title}</div>
              <div>Qty: {i.quantity}</div>
            </div>
            <div>
              <div>${(i.price * i.quantity).toFixed(2)}</div>
              <button onClick={() => dispatch(removeFromCart(i.id))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 12 }}>
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => dispatch(clearCart())}>Clear</button>
      </div>
    </aside>
  )
}
