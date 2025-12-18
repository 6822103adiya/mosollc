import { useState, useEffect } from 'react'
import { getContactInfo } from '../utils/storage'
import './Contact.css'

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(() => getContactInfo())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  useEffect(() => {
    // Мэдээлэл шинэчлэх
    const interval = setInterval(() => {
      setContactInfo(getContactInfo())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    alert('Баярлалаа! Таны мессеж амжилттай илгээгдлээ. Бид удахгүй танд хариу өгөх болно.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    })
  }

  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="container">
          <h1 className="page-title">Холбоо барих ✉️</h1>
          <p className="page-subtitle">
            Үйлчилгээ хүсвэл доорх формыг бөглөнө үү.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info">
              <h2>Бидэнтэй холбогдох</h2>
              <p>
                Асуулт, санал хүсэлт, төсөл хөгжүүлэх талаар ярилцъя.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <div>
                    <h4>Утас</h4>
                    <p>{contactInfo.phone}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <div>
                    <h4>Имэйл</h4>
                    <p>{contactInfo.email}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <h4>Хаяг</h4>
                    <p>{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Нэр *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Таны нэр"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Имэйл (заавал биш)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="имэйл@жишээ.ком"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Утас *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+976 94859113"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Мессеж *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Таны мессеж..."
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Илгээх
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact



