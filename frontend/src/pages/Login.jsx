import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)

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

  // Google Login handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setGoogleLoading(true)
        // Get user info from Google using access token
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        })

        const { sub: googleId, email, name, picture } = userInfo.data

        // Send to our backend
        const { data } = await axios.post(backendUrl + '/api/user/google', {
          credential: tokenResponse.access_token,
          googleId,
          email,
          name,
          picture,
        })

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Logged in with Google! 🎉')
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error('Google login failed. Please try again.')
        console.log(error)
      } finally {
        setGoogleLoading(false)
      }
    },
    onError: () => {
      toast.error('Google login was cancelled or failed.')
      setGoogleLoading(false)
    }
  })

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

        {/* Google Login Button */}
        <button
          type='button'
          onClick={() => handleGoogleLogin()}
          disabled={googleLoading}
          className='w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-indigo-300 transition-all duration-200 font-semibold text-gray-700 text-sm shadow-sm mb-5'
          style={{ cursor: googleLoading ? 'not-allowed' : 'pointer' }}
        >
          {googleLoading ? (
            <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          {googleLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        {/* Divider */}
        <div className='flex items-center gap-3 mb-5'>
          <div className='flex-1 h-px bg-gray-200'></div>
          <span className='text-xs text-gray-400 font-medium'>or continue with email</span>
          <div className='flex-1 h-px bg-gray-200'></div>
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