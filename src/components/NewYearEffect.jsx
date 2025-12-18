import { useEffect, useState } from 'react'
import './NewYearEffect.css'

const NewYearEffect = () => {
  const [confetti, setConfetti] = useState([])
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Create confetti particles
    const createConfetti = () => {
      const colors = ['#34d399', '#00ffff', '#8b5cf6', '#ff00ff', '#ffffff']
      const newConfetti = []

      for (let i = 0; i < 30; i++) {
        newConfetti.push({
          id: Math.random(),
          left: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
          duration: Math.random() * 2 + 2
        })
      }

      setConfetti(newConfetti)
    }

    createConfetti()
    const interval = setInterval(createConfetti, 4000)

    // Handle scroll to hide banner
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className={`new-year-banner ${isScrolled ? 'hidden' : ''}`}>
        <span className="new-year-text">🎉 Шинэ жил 2026 🎉</span>
      </div>
      <div className="confetti-container">
        {confetti.map((item) => (
          <div
            key={item.id}
            className="confetti"
            style={{
              left: `${item.left}%`,
              backgroundColor: item.color,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`
            }}
          />
        ))}
      </div>
      <div className="sparkles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="sparkle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 2 + 1}s`
          }}></div>
        ))}
      </div>
    </>
  )
}

export default NewYearEffect


