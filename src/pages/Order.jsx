import { useState } from 'react'
import './Order.css'

const Order = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Баярлалаа! Таны захиалга амжилттай илгээгдлээ. Бид удахгүй танд хариу өгөх болно.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      budget: '',
      description: ''
    })
  }

  return (
    <div className="order">
      <section className="order-hero">
        <div className="container">
          <h1 className="page-title">Захиалга өгөх</h1>
          <p className="page-subtitle">
            Төслөө эхлүүлэхийн тулд доорх мэдээллийг бөглөнө үү.
          </p>
        </div>
      </section>

      <section className="order-content">
        <div className="container">
          <div className="order-wrapper">
            <div className="order-info">
              <h2>Захиалга өгөх</h2>
              <p>
                Бид таны төслийн талаар илүү их мэдээлэл авахыг хүсч байна. 
                Доорх формыг бөглөнө үү, бид танд удахгүй хариу өгөх болно.
              </p>
              
              <div className="order-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Мэдээлэл бөглөх</h4>
                    <p>Төслийн талаарх мэдээллийг бөглөнө үү</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Төлөвлөлт</h4>
                    <p>Бид таны хэрэгцээг шинжилж, төлөвлөгөө гаргана</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Хөгжүүлэлт</h4>
                    <p>Төслийг хөгжүүлж, танд хүргэнэ</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="order-form" onSubmit={handleSubmit}>
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
                <label htmlFor="email">Имэйл *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  placeholder="+976 99999999"
                />
              </div>

              <div className="form-group">
                <label htmlFor="service">Үйлчилгээний төрөл *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Сонгох...</option>
                  <option value="web">Вэб хөгжүүлэлт</option>
                  <option value="mobile">Мобайл апп хөгжүүлэлт</option>
                  <option value="system">Систем интеграц</option>
                  <option value="design">UI/UX дизайн</option>
                  <option value="other">Бусад</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="budget">Төсөв</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Сонгох...</option>
                  <option value="5m">5,000,000₮ - 10,000,000₮</option>
                  <option value="10m">10,000,000₮ - 15,000,000₮</option>
                  <option value="15m">15,000,000₮ - 20,000,000₮</option>
                  <option value="20m+">20,000,000₮+</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Төслийн тайлбар *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Төслийн талаар дэлгэрэнгүй тайлбарлана уу..."
                ></textarea>
              </div>

              <button type="submit" className="submit-button">
                Захиалга илгээх
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Order



