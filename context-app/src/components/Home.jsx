import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import ProductList from './ProductList'
import Cart from './Cart'

export default function Home() {
  const { user, login } = useAuth()
  const { language } = useLanguage()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const greetings = {
    en: 'Welcome',
    es: 'Bienvenido',
    fr: 'Bienvenue'
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!username) {
      setError('Please enter a username')
      return
    }
    // basic demo login
    const u = { name: username }
    try {
      localStorage.setItem('user', JSON.stringify(u))
    } catch (e) {
      // ignore storage errors
    }
    login(username)
    // stay in the same app; AuthProvider will update UI to show shopping
  }

  if (user) {
    return (
      <div style={{ padding: 16 }}>
        <h1>{greetings[language] || greetings.en}</h1>
        <p>{`You are signed in as ${user.name}.`}</p>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginTop: 12 }}>
          <ProductList />
          <Cart />
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 360, padding: 24, borderRadius: 10, boxShadow: '0 8px 20px rgba(0,0,0,0.08)', background: '#fff' }}>
        <h2 style={{ marginTop: 0, marginBottom: 8 }}>Sign in</h2>
        <p style={{ marginTop: 0, color: '#666', fontSize: 14 }}>Enter your username and password to continue to the shop.</p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #ddd' }}
            />
            {error && <div style={{ color: '#c00', fontSize: 13 }}>{error}</div>}
            <button type="submit" style={{ marginTop: 8, padding: '10px 12px', borderRadius: 6, background: '#2f8bfd', color: '#fff', border: 'none' }}>Sign in</button>
          </div>
        </form>
        <div style={{ marginTop: 12, fontSize: 13, color: '#888' }}>
          Demo account: any username, password not validated.
        </div>
      </div>
    </div>
  )
}
