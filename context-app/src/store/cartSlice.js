import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]')
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find((i) => i.id === product.id)
      if (existing) existing.quantity += 1
      else state.items.push({ ...product, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeFromCart(state, action) {
      const id = action.payload
      state.items = state.items.filter((i) => i.id !== id)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart(state) {
      state.items = []
      localStorage.setItem('cart', JSON.stringify(state.items))
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer
