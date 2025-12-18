import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

const AdminLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Энгийн нэвтрэх систем (production дээр backend ашиглах хэрэгтэй)
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Нэвтрэх нэр эсвэл нууц үг буруу байна')
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <h1 className="admin-login-title">Админ нэвтрэх</h1>
          <p className="admin-login-subtitle">Module Soft Админ Панел</p>
          
          {error && <div className="admin-error">{error}</div>}
          
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username">Нэвтрэх нэр</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Нэвтрэх нэр оруулна уу"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Нууц үг</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Нууц үг оруулна уу"
              />
            </div>
            
            <button type="submit" className="admin-login-button">
              Нэвтрэх
            </button>
          </form>
          
          <div className="admin-login-info">
            <p>⚠️ Анхааруулга: Энэ нь зөвхөн тест систем юм</p>
            <p>Нэвтрэх нэр: <strong>admin</strong></p>
            <p>Нууц үг: <strong>admin123</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin


