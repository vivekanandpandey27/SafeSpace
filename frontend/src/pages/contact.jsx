import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='min-h-screen' style={{ background: 'linear-gradient(180deg, #F8F7FF 0%, #FFFFFF 100%)' }}>

      {/* ─── Page Header ─── */}
      <div className='text-center pt-14 pb-4'>
        <div className='inline-flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-4'>
          <span>📞</span> Reach Out
        </div>
        <h1 className='text-3xl md:text-4xl font-heading font-bold' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
          Contact <span className='gradient-text'>SafeSpace</span>
        </h1>
        <p className='text-gray-500 mt-3 text-sm max-w-sm mx-auto'>
          We're here to help. Reach out to our support team or find a specialist today.
        </p>
      </div>

      {/* ─── Main Contact Section ─── */}
      <div className='my-12 flex flex-col md:flex-row gap-10 items-start mb-20'>
        {/* Image */}
        <div className='w-full md:max-w-[360px] relative flex-shrink-0'>
          <div className='absolute inset-0 rounded-2xl opacity-20 blur-2xl'
            style={{ background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' }} />
          <img
            className='relative w-full rounded-2xl object-cover shadow-card-hover'
            src={assets.contact_image}
            alt="Contact SafeSpace"
          />
        </div>

        {/* Contact Details */}
        <div className='flex flex-col gap-5 flex-1'>

          {/* Office */}
          <div className='bg-white rounded-2xl p-6 shadow-card border border-indigo-50'>
            <p className='text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2'>
              <span>🏢</span> Our Office
            </p>
            <div className='flex flex-col gap-3 text-gray-600 text-sm'>
              <div className='flex items-start gap-3'>
                <span className='text-lg mt-0.5'>📍</span>
                <div>
                  <p>54709 Willms Station, Suite 350</p>
                  <p className='text-gray-400'>Washington, USA</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-lg'>📞</span>
                <p>Tel: (415) 555-0132</p>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-lg'>✉️</span>
                <p>support@safespace.in</p>
              </div>
              <div className='flex items-center gap-3'>
                <span className='text-lg'>🕒</span>
                <p>Mon – Sat, 9 AM – 8 PM IST</p>
              </div>
            </div>
          </div>

          {/* Crisis Support */}
          <div className='rounded-2xl p-5 border border-red-100 bg-red-50'>
            <p className='text-sm font-bold text-red-600 flex items-center gap-2 mb-2'>
              <span>🆘</span> Mental Health Crisis Support
            </p>
            <p className='text-xs text-red-500 mb-3'>
              If you or someone you know is in immediate distress, please contact a crisis helpline:
            </p>
            <div className='flex flex-col gap-1.5 text-xs text-gray-600'>
              <p>🇮🇳 iCall (India): <strong className='text-red-600'>9152987821</strong></p>
              <p>🌍 Crisis Text Line: Text <strong>HOME</strong> to <strong>741741</strong></p>
            </div>
          </div>

          {/* Careers */}
          <div className='bg-white rounded-2xl p-6 shadow-card border border-indigo-50'>
            <p className='text-xs font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2'>
              <span>💼</span> Careers at SafeSpace
            </p>
            <p className='text-gray-500 text-sm mb-4'>
              Join our mission to make mental health care accessible for all. We're hiring passionate people.
            </p>
            <button className='btn-outline text-sm'>
              Explore Open Roles
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact