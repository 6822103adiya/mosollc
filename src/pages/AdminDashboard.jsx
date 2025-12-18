import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveHomeContent, getHomeContent, saveAboutContent, getAboutContent, saveContactInfo, getContactInfo } from '../utils/storage'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home')
  const navigate = useNavigate()

  useEffect(() => {
    // Нэвтрэх эрх шалгах
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!isLoggedIn) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    navigate('/admin/login')
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Module Soft</h2>
          <p>Админ Панел</p>
        </div>
        
        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            🏠 Нүүр
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            📝 Нүүр хуудас
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            📄 Бидний тухай
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            ✉️ Холбоо барих мэдээлэл
          </button>
          <button
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Захиалгууд
          </button>
        </nav>
        
        <button className="admin-logout-button" onClick={handleLogout}>
          Гарах
        </button>
      </div>
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>Админ Панел</h1>
          <p>Веб сайтын мэдээлэл удирдах</p>
        </div>
        
        <div className="admin-main">
          {activeTab === 'home' && <AdminHome />}
          {activeTab === 'content' && <AdminContent />}
          {activeTab === 'about' && <AdminAbout />}
          {activeTab === 'contact' && <AdminContact />}
          {activeTab === 'orders' && <AdminOrders />}
        </div>
      </div>
    </div>
  )
}

const AdminHome = () => {
  return (
    <div className="admin-section">
      <h2>Тавтай морил</h2>
      <p>Админ панелд тавтай морил. Эндээс веб сайтын мэдээллийг удирдана уу.</p>
      
      <div className="admin-stats">
        <div className="admin-stat-card">
          <h3>Нийт хуудас</h3>
          <p className="stat-number">4</p>
        </div>
        <div className="admin-stat-card">
          <h3>Захиалга</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="admin-stat-card">
          <h3>Холбоо барих</h3>
          <p className="stat-number">0</p>
        </div>
      </div>
    </div>
  )
}

const AdminContent = () => {
  const [homeContent, setHomeContent] = useState(() => getHomeContent())

  useEffect(() => {
    setHomeContent(getHomeContent())
  }, [])

  const handleSave = () => {
    saveHomeContent(homeContent)
    alert('Мэдээлэл амжилттай хадгалагдлаа!')
  }

  const addFeature = () => {
    setHomeContent({
      ...homeContent,
      features: [...homeContent.features, { icon: '✨', title: '', description: '' }]
    })
  }

  const removeFeature = (index) => {
    const newFeatures = homeContent.features.filter((_, i) => i !== index)
    setHomeContent({ ...homeContent, features: newFeatures })
  }

  const addWhyUs = () => {
    const currentWhyUs = homeContent.whyUs || []
    setHomeContent({
      ...homeContent,
      whyUs: [...currentWhyUs, { icon: '✨', title: '', description: '' }]
    })
  }

  const removeWhyUs = (index) => {
    const currentWhyUs = homeContent.whyUs || []
    const newWhyUs = currentWhyUs.filter((_, i) => i !== index)
    setHomeContent({ ...homeContent, whyUs: newWhyUs })
  }

  return (
    <div className="admin-section">
      <h2>Нүүр хуудасны мэдээлэл засах</h2>
      
      <div className="admin-form-section">
        <h3>Hero хэсэг</h3>
        <div className="form-group">
          <label>Гарчиг</label>
          <textarea
            value={homeContent.heroTitle}
            onChange={(e) => setHomeContent({...homeContent, heroTitle: e.target.value})}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Дэд гарчиг</label>
          <textarea
            value={homeContent.heroSubtitle}
            onChange={(e) => setHomeContent({...homeContent, heroSubtitle: e.target.value})}
            rows="2"
          />
        </div>
      </div>
      
      <div className="admin-form-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Үйлчилгээний картууд</h3>
          <button className="admin-add-button" onClick={addFeature}>+ Нэмэх</button>
        </div>
        {homeContent.features.map((feature, index) => (
          <div key={index} className="admin-card-edit">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: 'var(--accent-cyan)', margin: 0 }}>Карт #{index + 1}</h4>
              <button className="admin-delete-button" onClick={() => removeFeature(index)}>Устгах</button>
            </div>
            <div className="form-group">
              <label>Эмоджи</label>
              <input
                type="text"
                value={feature.icon}
                onChange={(e) => {
                  const newFeatures = [...homeContent.features]
                  newFeatures[index].icon = e.target.value
                  setHomeContent({...homeContent, features: newFeatures})
                }}
              />
            </div>
            <div className="form-group">
              <label>Гарчиг</label>
              <input
                type="text"
                value={feature.title}
                onChange={(e) => {
                  const newFeatures = [...homeContent.features]
                  newFeatures[index].title = e.target.value
                  setHomeContent({...homeContent, features: newFeatures})
                }}
              />
            </div>
            <div className="form-group">
              <label>Тайлбар</label>
              <textarea
                value={feature.description}
                onChange={(e) => {
                  const newFeatures = [...homeContent.features]
                  newFeatures[index].description = e.target.value
                  setHomeContent({...homeContent, features: newFeatures})
                }}
                rows="2"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="admin-form-section">
        <h3>"Яагаад биднийг сонгох вэ" хэсэг</h3>
        <div className="form-group">
          <label>Гарчиг</label>
          <input
            type="text"
            value={homeContent.whyUsTitle || ''}
            onChange={(e) => setHomeContent({...homeContent, whyUsTitle: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Дэд гарчиг</label>
          <textarea
            value={homeContent.whyUsSubtitle || ''}
            onChange={(e) => setHomeContent({...homeContent, whyUsSubtitle: e.target.value})}
            rows="2"
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', marginBottom: '1rem' }}>
          <h4 style={{ color: 'var(--accent-cyan)', margin: 0 }}>Картууд</h4>
          <button className="admin-add-button" onClick={addWhyUs}>+ Нэмэх</button>
        </div>
        {(homeContent.whyUs || []).map((item, index) => (
          <div key={index} className="admin-card-edit">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: 'var(--accent-cyan)', margin: 0 }}>Карт #{index + 1}</h4>
              <button className="admin-delete-button" onClick={() => removeWhyUs(index)}>Устгах</button>
            </div>
            <div className="form-group">
              <label>Эмоджи</label>
              <input
                type="text"
                value={item.icon}
                onChange={(e) => {
                  const newWhyUs = [...(homeContent.whyUs || [])]
                  newWhyUs[index].icon = e.target.value
                  setHomeContent({...homeContent, whyUs: newWhyUs})
                }}
              />
            </div>
            <div className="form-group">
              <label>Гарчиг</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => {
                  const newWhyUs = [...(homeContent.whyUs || [])]
                  newWhyUs[index].title = e.target.value
                  setHomeContent({...homeContent, whyUs: newWhyUs})
                }}
              />
            </div>
            <div className="form-group">
              <label>Тайлбар</label>
              <textarea
                value={item.description}
                onChange={(e) => {
                  const newWhyUs = [...(homeContent.whyUs || [])]
                  newWhyUs[index].description = e.target.value
                  setHomeContent({...homeContent, whyUs: newWhyUs})
                }}
                rows="2"
              />
            </div>
          </div>
        ))}
      </div>
      
      <button className="admin-save-button" onClick={handleSave}>
        Хадгалах
      </button>
    </div>
  )
}

const AdminContact = () => {
  const [contactInfo, setContactInfo] = useState(() => getContactInfo())

  useEffect(() => {
    setContactInfo(getContactInfo())
  }, [])

  const handleSave = () => {
    saveContactInfo(contactInfo)
    alert('Холбоо барих мэдээлэл амжилттай хадгалагдлаа!')
  }

  return (
    <div className="admin-section">
      <h2>Холбоо барих мэдээлэл засах</h2>
      
      <div className="admin-form-section">
        <div className="form-group">
          <label>Утасны дугаар</label>
          <input
            type="text"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Имэйл хаяг</label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Хаяг</label>
          <input
            type="text"
            value={contactInfo.address}
            onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
          />
        </div>
      </div>
      
      <button className="admin-save-button" onClick={handleSave}>
        Хадгалах
      </button>
    </div>
  )
}

const AdminAbout = () => {
  const [aboutContent, setAboutContent] = useState(() => getAboutContent())

  useEffect(() => {
    setAboutContent(getAboutContent())
  }, [])

  const handleSave = () => {
    saveAboutContent(aboutContent)
    alert('Бидний тухай мэдээлэл амжилттай хадгалагдлаа!')
  }

  const addService = () => {
    setAboutContent({
      ...aboutContent,
      services: [...aboutContent.services, { icon: '✅', title: '', description: '' }]
    })
  }

  const removeService = (index) => {
    const newServices = aboutContent.services.filter((_, i) => i !== index)
    setAboutContent({ ...aboutContent, services: newServices })
  }

  return (
    <div className="admin-section">
      <h2>Бидний тухай хуудасны мэдээлэл засах</h2>
      
      <div className="admin-form-section">
        <h3>Гарчиг</h3>
        <div className="form-group">
          <label>Гарчиг</label>
          <input
            type="text"
            value={aboutContent.title}
            onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Дэд гарчиг</label>
          <textarea
            value={aboutContent.subtitle}
            onChange={(e) => setAboutContent({...aboutContent, subtitle: e.target.value})}
            rows="2"
          />
        </div>
      </div>

      <div className="admin-form-section">
        <h3>Бидний зорилго</h3>
        <div className="form-group">
          <label>Гарчиг</label>
          <input
            type="text"
            value={aboutContent.mission.title}
            onChange={(e) => setAboutContent({
              ...aboutContent,
              mission: {...aboutContent.mission, title: e.target.value}
            })}
          />
        </div>
        <div className="form-group">
          <label>Тайлбар</label>
          <textarea
            value={aboutContent.mission.description}
            onChange={(e) => setAboutContent({
              ...aboutContent,
              mission: {...aboutContent.mission, description: e.target.value}
            })}
            rows="4"
          />
        </div>
      </div>

      <div className="admin-form-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Үйлчилгээнүүд</h3>
          <button className="admin-add-button" onClick={addService}>+ Нэмэх</button>
        </div>
        {aboutContent.services.map((service, index) => (
          <div key={index} className="admin-card-edit">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: 'var(--accent-cyan)', margin: 0 }}>Үйлчилгээ #{index + 1}</h4>
              <button className="admin-delete-button" onClick={() => removeService(index)}>Устгах</button>
            </div>
            <div className="form-group">
              <label>Эмоджи</label>
              <input
                type="text"
                value={service.icon}
                onChange={(e) => {
                  const newServices = [...aboutContent.services]
                  newServices[index].icon = e.target.value
                  setAboutContent({...aboutContent, services: newServices})
                }}
              />
            </div>
            <div className="form-group">
              <label>Гарчиг</label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => {
                  const newServices = [...aboutContent.services]
                  newServices[index].title = e.target.value
                  setAboutContent({...aboutContent, services: newServices})
                }}
              />
            </div>
            <div className="form-group">
              <label>Тайлбар</label>
              <textarea
                value={service.description}
                onChange={(e) => {
                  const newServices = [...aboutContent.services]
                  newServices[index].description = e.target.value
                  setAboutContent({...aboutContent, services: newServices})
                }}
                rows="2"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="admin-form-section">
        <h3>Манай баг</h3>
        <div className="form-group">
          <label>Гарчиг</label>
          <input
            type="text"
            value={aboutContent.team.title}
            onChange={(e) => setAboutContent({
              ...aboutContent,
              team: {...aboutContent.team, title: e.target.value}
            })}
          />
        </div>
        <div className="form-group">
          <label>Тайлбар</label>
          <textarea
            value={aboutContent.team.description}
            onChange={(e) => setAboutContent({
              ...aboutContent,
              team: {...aboutContent.team, description: e.target.value}
            })}
            rows="4"
          />
        </div>
      </div>
      
      <button className="admin-save-button" onClick={handleSave}>
        Хадгалах
      </button>
    </div>
  )
}

const AdminOrders = () => {
  return (
    <div className="admin-section">
      <h2>Захиалгууд</h2>
      <p>Одоогоор захиалга байхгүй байна.</p>
      <p className="admin-note">⚠️ Энэ функц нь backend холболт шаардлагатай.</p>
    </div>
  )
}

export default AdminDashboard


