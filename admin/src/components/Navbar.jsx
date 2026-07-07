import React, { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const isOnDashboard =
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/doctor-dashboard'

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-indigo-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm'>
      {/* Left — Logo + Role */}
      <div className='flex items-center gap-3'>

        {/* SafeSpace Logo */}
        <div
          className='flex items-center gap-2 cursor-pointer'
          onClick={() => navigate('/')}
        >
          <div className='w-9 h-9 rounded-xl flex items-center justify-center shadow-md'
            style={{ background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z" fill="white" opacity="0.9"/>
              <circle cx="12" cy="9" r="3" fill="white"/>
            </svg>
          </div>
          <div>
            <p className='text-base font-bold leading-none' style={{ color: '#4F46E5', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Safe<span style={{ color: '#8B5CF6' }}>Space</span>
            </p>
            <p className='text-[9px] text-gray-400 tracking-widest leading-none font-medium'>MENTAL HEALTH CARE</p>
          </div>
        </div>

        {/* Role Badge */}
        <span className='px-3 py-1 rounded-full text-xs font-semibold border'
          style={{
            background: aToken ? 'linear-gradient(135deg, #EEF2FF, #EDE9FE)' : 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
            color: aToken ? '#4F46E5' : '#059669',
            borderColor: aToken ? '#C7D2FE' : '#A7F3D0'
          }}>
          {aToken ? '🛡️ Admin' : '👨‍⚕️ Doctor'}
        </span>

        {/* User Panel Button on Dashboards */}
        {isOnDashboard && (
          <button
            onClick={() => window.open('http://safespace-health.duckdns.org:5001', '_blank')}
            className='ml-1 text-xs px-3 py-1.5 rounded-full border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-medium hidden sm:block'
          >
            🌐 User Panel
          </button>
        )}
      </div>

      {/* Right — Logout */}
      <button
        onClick={logout}
        className='flex items-center gap-2 text-sm px-5 py-2 rounded-full font-semibold transition-all duration-200 hover:shadow-md'
        style={{ background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)', color: 'white' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Logout
      </button>
    </div>
  )
}

export default Navbar
