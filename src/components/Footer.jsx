import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getContactInfo } from '../utils/storage'
import './Footer.css'

const Footer = () => {
  const [contactInfo, setContactInfo] = useState(() => getContactInfo())

  useEffect(() => {
    // Мэдээлэл шинэчлэх
    const interval = setInterval(() => {
      setContactInfo(getContactInfo())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Module Soft</h3>
            <p className="footer-description">
              Бид таны бизнесийг дижитал эринд амжилттай урагшлуулах технологийн хамтрагч.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Холбоо барих</h4>
            <div className="footer-contact">
              <p>📞 {contactInfo.phone}</p>
              <p>✉️ {contactInfo.email}</p>
              <p>📍 {contactInfo.address}</p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Холбоосууд</h4>
            <div className="footer-links">
              <Link to="/">Нүүр</Link>
              <Link to="/bidnii-tuhai">Бидний тухай</Link>
              <Link to="/zahialga">Захиалга</Link>
              <Link to="/holbo-barih">Холбоо барих</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Module Soft. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer



