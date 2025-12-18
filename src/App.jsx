import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NewYearEffect from './components/NewYearEffect'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Order from './pages/Order'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function AppContent() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <div className={`App ${location.pathname === '/zahialga' ? 'page-order' : ''}`}>
      {!isAdminPage && (
        <>
          {location.pathname === '/' && <NewYearEffect />}
          <Navbar />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bidnii-tuhai" element={<About />} />
        <Route path="/zahialga" element={<Order />} />
        <Route path="/holbo-barih" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

