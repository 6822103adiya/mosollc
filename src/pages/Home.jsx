import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getHomeContent } from '../utils/storage'
import './Home.css'

const Home = () => {
  const [content, setContent] = useState(() => getHomeContent())

  useEffect(() => {
    // Мэдээлэл шинэчлэх
    const interval = setInterval(() => {
      setContent(getHomeContent())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home">
      {/* Гол хэсэг */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              {content.heroTitle.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < content.heroTitle.split('\n').length - 1 && <br />}
                </span>
              ))} <span className="hero-emoji">🚀</span>
            </h1>
            <p className="hero-subtitle" dangerouslySetInnerHTML={{ __html: content.heroSubtitle.replace('Module Soft', '<strong>Module Soft</strong>') }} />
            <Link to="/zahialga" className="hero-button">
              Захиалга өгөх
            </Link>
          </div>
        </div>
      </section>

      {/* Үйлчилгээний хэсэг */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Манай ур чадварууд 💪</h2>
          <div className="features-grid">
            {content.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Яагаад биднийг сонгох вэ хэсэг */}
      <section className="why-us">
        <div className="container">
          <h2 className="section-title" dangerouslySetInnerHTML={{
            __html: content.whyUsTitle 
              ? content.whyUsTitle.replace('Module Soft', '<span style="color: var(--color-emerald-400)">Module Soft</span>')
              : 'Яагаад <span style="color: var(--color-emerald-400)">Module Soft</span>?'
          }} />
          <p className="section-subtitle">
            {content.whyUsSubtitle || 'Таны бизнесийн өсөлтийг хурдасгах найдвартай технологийн хамтрагч.'}
          </p>
          <div className="why-us-grid">
            {content.whyUs && content.whyUs.length > 0 ? (
              content.whyUs.map((item, index) => (
                <div key={index} className="why-us-card">
                  <div className="why-us-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))
            ) : (
              <>
                <div className="why-us-card">
                  <div className="why-us-icon">💡</div>
                  <h3>Инноваци ба бүтээлч байдал</h3>
                  <p>Бид хамгийн сүүлийн үеийн технологи, шинэлэг санааг ашиглан асуудлыг шийддэг.</p>
                </div>
                <div className="why-us-card">
                  <div className="why-us-icon">⚙️</div>
                  <h3>Мэргэжлийн баг</h3>
                  <p>Туршлагатай хөгжүүлэгчид, дизайнерууд хамтран ажилладаг.</p>
                </div>
                <div className="why-us-card">
                  <div className="why-us-icon">🚀</div>
                  <h3>Хурдан бөгөөд чанартай гүйцэтгэл</h3>
                  <p>Уян хатан аргачлалаар (Agile) чанартай, хурдан хүргэнэ.</p>
                </div>
                <div className="why-us-card">
                  <div className="why-us-icon">🤝</div>
                  <h3>Урт хугацааны дэмжлэг</h3>
                  <p>Төслийн дараа ч дэмжлэг үзүүлэхийг бид эрхэмлэдэг.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home



