import { useState, useEffect } from 'react'
import { getAboutContent } from '../utils/storage'
import './About.css'

const About = () => {
  const [content, setContent] = useState(() => getAboutContent())

  useEffect(() => {
    // Мэдээлэл шинэчлэх
    const interval = setInterval(() => {
      setContent(getAboutContent())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1 className="page-title">{content.title}</h1>
          <p className="page-subtitle">
            {content.subtitle}
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-text">
            <h2>{content.mission.title}</h2>
            <p>{content.mission.description}</p>

            <h2>Бидний үйлчилгээ</h2>
            <div className="services-list">
              {content.services.map((service, index) => (
                <div key={index} className="service-item">
                  <span className="check-icon">{service.icon}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2>{content.team.title}</h2>
            <p>{content.team.description}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About



