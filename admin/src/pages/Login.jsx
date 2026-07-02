import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center px-4'
      style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #EDE9FE 100%)' }}
    >
      <form onSubmit={onSubmitHandler} className='w-full max-w-md'>

        {/* Card */}
        <div className='bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-indigo-100'>

          {/* Logo */}
          <div className='flex items-center gap-3 mb-8'>
            <div className='w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg'
              style={{ background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z" fill="white" opacity="0.9"/>
                <circle cx="12" cy="9" r="3" fill="white"/>
              </svg>
            </div>
            <div>
              <p className='text-xl font-bold leading-tight' style={{ color: '#4F46E5', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Safe<span style={{ color: '#8B5CF6' }}>Space</span>
              </p>
              <p className='text-[9px] text-gray-400 tracking-widest font-semibold'>MENTAL HEALTH CARE</p>
            </div>
          </div>

          {/* Toggle Tabs */}
          <div className='flex rounded-2xl bg-indigo-50 p-1 mb-6'>
            {['Admin', 'Doctor'].map((role) => (
              <button
                key={role}
                type='button'
                onClick={() => setState(role)}
                className='flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200'
                style={
                  state === role
                    ? { background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)', color: 'white', boxShadow: '0 2px 8px rgba(79,70,229,0.35)' }
                    : { color: '#6B7280' }
                }
              >
                {role === 'Admin' ? '🛡️ Admin' : '👨‍⚕️ Therapist'}
              </button>
            ))}
          </div>

          {/* Heading */}
          <h1 className='text-2xl font-bold mb-1' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
            {state === 'Admin' ? 'Admin Login' : 'Therapist Login'}
          </h1>
          <p className='text-sm text-gray-400 mb-6'>
            {state === 'Admin' ? 'Access your admin control panel' : 'Access your therapist dashboard'}
          </p>

          {/* Fields */}
          <div className='flex flex-col gap-4 mb-6'>
            <div>
              <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5'>Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                placeholder='you@example.com'
                required
                className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-sm transition-all duration-200 bg-gray-50 focus:bg-white'
              />
            </div>
            <div>
              <label className='block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5'>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='••••••••'
                required
                className='w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none text-sm transition-all duration-200 bg-gray-50 focus:bg-white'
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200 disabled:opacity-60'
            style={{ background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' }}
          >
            {loading ? '⏳ Logging in...' : `→ Login as ${state === 'Admin' ? 'Admin' : 'Therapist'}`}
          </button>

          {/* Privacy */}
          <p className='text-center text-gray-400 text-xs mt-5'>
            🔒 Secure admin access — SafeSpace Mental Health Care
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login