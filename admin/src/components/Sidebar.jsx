import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const adminLinks = [
    {
      to: '/admin-dashboard',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.8"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.6"/>
        </svg>
      ),
      label: 'Dashboard'
    },
    {
      to: '/all-appointments',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="8" cy="15" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="15" r="1.5" fill="currentColor"/>
        </svg>
      ),
      label: 'Appointments'
    },
    {
      to: '/add-doctor',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M19 3v6M16 6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      label: 'Add Therapist'
    },
    {
      to: '/doctor-list',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 21c0-3.3 2.7-6 6-6h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="17" cy="15" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M17 13v4M15 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      label: 'Therapists List'
    },
  ]

  const doctorLinks = [
    {
      to: '/doctor-dashboard',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.8"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.6"/>
        </svg>
      ),
      label: 'Dashboard'
    },
    {
      to: '/doctor-appointments',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="8" cy="15" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="15" r="1.5" fill="currentColor"/>
        </svg>
      ),
      label: 'My Sessions'
    },
    {
      to: '/doctor-profile',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      label: 'My Profile'
    },
  ]

  const links = aToken ? adminLinks : dToken ? doctorLinks : []

  return (
    <div className='min-h-screen bg-white border-r border-indigo-100 shadow-sm'>
      {/* Sidebar Header */}
      <div className='px-4 py-5 border-b border-indigo-50'>
        <p className='text-xs font-bold uppercase tracking-widest text-gray-400 hidden md:block'>
          {aToken ? 'Admin Panel' : 'Doctor Panel'}
        </p>
      </div>

      <ul className='flex flex-col gap-1 mt-3 px-2'>
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-3 md:px-4 rounded-xl cursor-pointer transition-all duration-200 group ${
                isActive
                  ? 'text-white shadow-md'
                  : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' }
                : {}
            }
          >
            <span className='flex-shrink-0'>{icon}</span>
            <p className='hidden md:block text-sm font-medium'>{label}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar