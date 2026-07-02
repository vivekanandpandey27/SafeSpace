import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <div className='min-h-[85vh] flex items-center justify-center py-10 px-4'
      style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #EDE9FE 100%)' }}>

      {/* ─── Card ─── */}
      <form onSubmit={onSubmitHandler}
        className='w-full max-w-md glass rounded-3xl p-8 shadow-card-hover animate-fade-in-up'>

        {/* Logo & Brand */}
        <div className='flex items-center gap-2 mb-6'>
          <div className='w-9 h-9 rounded-xl flex items-center justify-center'
            style={{ background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z" fill="white" opacity="0.9"/>
              <circle cx="12" cy="9" r="3" fill="white"/>
            </svg>
          </div>
          <span className='font-bold text-primary text-lg' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SafeSpace</span>
        </div>

        {/* Heading */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold mb-1' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
            {state === 'Sign Up' ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          <p className='text-gray-500 text-sm'>
            {state === 'Sign Up'
              ? 'Begin your journey toward mental wellness'
              : 'Log in to continue your healing journey'}
          </p>
        </div>

        {/* Form Fields */}
        <div className='flex flex-col gap-4'>
          {state === 'Sign Up' && (
            <div>
              <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5'>Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='safespace-input'
                type="text"
                placeholder="Your full name"
                required
              />
            </div>
          )}

          <div>
            <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5'>Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='safespace-input'
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5'>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='safespace-input'
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='btn-primary w-full mt-6 py-3 text-base font-semibold'
        >
          {state === 'Sign Up' ? '🚀 Create Account' : '→ Log In'}
        </button>

        {/* Toggle */}
        <p className='text-center text-gray-500 text-sm mt-4'>
          {state === 'Sign Up'
            ? <>Already have an account?{' '}<span onClick={() => setState('Login')} className='text-primary font-semibold cursor-pointer hover:underline'>Log in here</span></>
            : <>Don't have an account?{' '}<span onClick={() => setState('Sign Up')} className='text-primary font-semibold cursor-pointer hover:underline'>Sign up free</span></>
          }
        </p>

        {/* Privacy Note */}
        <p className='text-center text-gray-400 text-xs mt-4'>
          🔒 Your information is confidential and never shared.
        </p>
      </form>
    </div>
  )
}

export default Login