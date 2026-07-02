import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <nav className='navbar-glass flex items-center justify-between text-sm px-4 sm:px-8 py-3 mb-0'>
      {/* ─── Logo ─────────────────────────────── */}
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z" fill="white" opacity="0.9"/>
            <circle cx="12" cy="9" r="3" fill="white"/>
          </svg>
        </div>
        <div>
          <span className='text-xl font-heading font-bold' style={{ color: '#4F46E5', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Safe<span className='text-secondary' style={{ color: '#8B5CF6' }}>Space</span>
          </span>
          <p className='text-[9px] text-gray-400 leading-none tracking-wider font-body'>MENTAL HEALTH CARE</p>
        </div>
      </div>

      {/* ─── Desktop Nav ─────────────────────── */}
      <ul className='hidden md:flex items-center gap-1 font-medium'>
        {[
          { to: '/', label: 'HOME' },
          { to: '/doctors', label: 'OUR THERAPISTS' },
          { to: '/about', label: 'ABOUT' },
          { to: '/contact', label: 'CONTACT' },
        ].map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-gray-600 hover:text-primary hover:bg-indigo-50'
                }`
              }
              style={({ isActive }) => isActive ? { background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' } : {}}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* ─── Right Actions ───────────────────── */}
      <div className='flex items-center gap-3'>
        {/* Admin Panel – home page only */}
        {location.pathname === '/' && (
          <button
            onClick={() => window.open('http://localhost:5174', '_blank')}
            className='text-xs px-4 py-2 rounded-full border border-indigo-200 text-primary hover:bg-primary hover:text-white transition-all duration-200 hidden md:block font-medium'
          >
            Admin Panel
          </button>
        )}

        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <div className='w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-200 ring-offset-1 transition-all group-hover:ring-primary'>
              <img className='w-full h-full object-cover' src={userData.image || '/fallback-user.png'} alt="profile" />
            </div>
            <img className='w-2.5' src={assets.dropdown_icon || '/fallback-icon.png'} alt="dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium z-20 hidden group-hover:block'>
              <div className='min-w-52 bg-white rounded-2xl shadow-card-hover border border-indigo-50 flex flex-col gap-1 p-3 animate-fade-in'>
                <p onClick={() => navigate('my-profile')}
                  className='px-4 py-2.5 rounded-xl hover:bg-indigo-50 hover:text-primary cursor-pointer text-gray-600 text-sm transition-all duration-150 font-body'>
                  👤 My Profile
                </p>
                <p onClick={() => navigate('my-appointments')}
                  className='px-4 py-2.5 rounded-xl hover:bg-indigo-50 hover:text-primary cursor-pointer text-gray-600 text-sm transition-all duration-150 font-body'>
                  📅 My Sessions
                </p>
                <hr className='border-indigo-50 my-1' />
                <p onClick={logout}
                  className='px-4 py-2.5 rounded-xl hover:bg-red-50 hover:text-red-500 cursor-pointer text-gray-600 text-sm transition-all duration-150 font-body'>
                  🚪 Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='btn-primary hidden md:flex items-center gap-2 text-sm px-5 py-2.5'
          >
            <span>Get Started</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Mobile menu toggle */}
        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden cursor-pointer'
          src={assets.menu_icon}
          alt="menu"
        />

        {/* ─── Mobile Full-Screen Menu ─────── */}
        <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {/* Backdrop */}
          <div
            className='absolute inset-0'
            style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4C1D95 100%)' }}
            onClick={() => setShowMenu(false)}
          />
          {/* Panel */}
          <div className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 flex flex-col ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className='flex items-center justify-between px-6 py-5 border-b border-indigo-50'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-lg flex items-center justify-center' style={{ background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z" fill="white"/>
                    <circle cx="12" cy="9" r="3" fill="white" opacity="0.7"/>
                  </svg>
                </div>
                <span className='font-bold text-primary' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SafeSpace</span>
              </div>
              <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-6 cursor-pointer opacity-60 hover:opacity-100' alt="close" />
            </div>

            <ul className='flex flex-col gap-1 mt-4 px-4 flex-1'>
              {[
                { to: '/', label: '🏠 Home' },
                { to: '/doctors', label: '💼 Our Therapists' },
                { to: '/about', label: 'ℹ️ About' },
                { to: '/contact', label: '📞 Contact' },
              ].map(({ to, label }) => (
                <NavLink key={to} onClick={() => setShowMenu(false)} to={to}>
                  <p className='px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-indigo-50 hover:text-primary transition-all duration-150 text-sm'>
                    {label}
                  </p>
                </NavLink>
              ))}
            </ul>

            <div className='p-4 border-t border-indigo-50'>
              {!token && (
                <button
                  onClick={() => { navigate('/login'); setShowMenu(false) }}
                  className='btn-primary w-full text-sm py-3'
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar