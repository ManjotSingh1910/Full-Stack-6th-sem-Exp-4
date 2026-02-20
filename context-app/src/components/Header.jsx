import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function Header() {
  const { user, login, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { language, setLang } = useLanguage()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!username) return
    login(username)
    const u = { name: username }
    try {
      localStorage.setItem('user', JSON.stringify(u))
    } catch (e) {
      // ignore
    }
    // stay in the same app; AuthProvider will update UI to show shopping
  }

  return (
    <header style={{ padding: 16, borderBottom: '1px solid #ddd' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <strong>Context API App</strong>
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={toggleTheme}>Theme: {theme}</button>
          <select value={language} onChange={(e) => setLang(e.target.value)} style={{ marginLeft: 8 }}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
          {user ? (
            <>
              <span style={{ marginLeft: 8 }}>Hi, {user.name}</span>
              <button style={{ marginLeft: 8 }} onClick={logout}>Logout</button>
            </>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginLeft: 8 }}>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: '4px 8px' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: '4px 8px' }}
              />
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </div>
    </header>
  )
}
