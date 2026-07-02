import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='min-h-screen' style={{ background: 'linear-gradient(180deg, #F8F7FF 0%, #FFFFFF 50%, #F5F3FF 100%)' }}>

      {/* ─── Page Header ─── */}
      <div className='text-center pt-14 pb-4'>
        <div className='inline-flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-4'>
          <span>ℹ️</span> Our Story
        </div>
        <h1 className='text-3xl md:text-4xl font-heading font-bold' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
          About <span className='gradient-text'>SafeSpace</span>
        </h1>
        <p className='text-gray-500 mt-3 text-sm max-w-md mx-auto'>
          A platform built with purpose — to make mental health care accessible, dignified, and effective for everyone.
        </p>
      </div>

      {/* ─── Mission Section ─── */}
      <div className='my-14 flex flex-col md:flex-row gap-12 items-center'>
        <div className='relative md:w-1/2'>
          <div className='absolute inset-0 rounded-2xl opacity-20 blur-2xl'
            style={{ background: 'linear-gradient(135deg, #4F46E5, #8B5CF6)' }} />
          <img
            className='relative w-full md:max-w-[400px] rounded-2xl object-cover shadow-card-hover'
            src={assets.about_image}
            alt="About SafeSpace"
          />
        </div>

        <div className='flex flex-col justify-center gap-5 md:w-1/2 text-sm text-gray-600 leading-relaxed'>
          <div className='bg-white rounded-2xl p-6 shadow-card border border-indigo-50'>
            <p className='mb-3'>
              Welcome to <strong className='text-primary'>SafeSpace</strong> — your trusted partner in managing your mental health journey with dignity, ease, and expert care. We understand the courage it takes to seek help, and we're here to make every step easier.
            </p>
            <p>
              SafeSpace connects you with a network of verified psychiatrists, psychologists, and therapists specializing in conditions like ADHD, OCD, anxiety, depression, PTSD, and more. Our platform is designed to eliminate barriers and reduce stigma around mental health care.
            </p>
          </div>

          <div className='bg-indigo-50 rounded-2xl p-6 border border-indigo-100'>
            <b className='text-primary text-base font-heading' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              🌟 Our Vision
            </b>
            <p className='mt-2 text-gray-600'>
              We envision a world where mental health care is as accessible and normalized as any other form of healthcare. SafeSpace bridges the gap between those seeking support and the experts who provide it — seamlessly, confidentially, and compassionately.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Why Choose Us ─── */}
      <div className='mb-6'>
        <div className='text-center mb-10'>
          <div className='inline-flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-3'>
            <span>💎</span> Why Us
          </div>
          <h2 className='text-2xl font-heading font-bold' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
            Why Choose SafeSpace?
          </h2>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20'>
          {[
            {
              icon: '🔒',
              title: 'CONFIDENTIAL',
              desc: 'Your sessions and personal data are always protected with end-to-end privacy standards.',
            },
            {
              icon: '✅',
              title: 'EXPERT-VETTED',
              desc: 'Every specialist on SafeSpace is rigorously verified — licensed, experienced, and compassionate.',
            },
            {
              icon: '💜',
              title: 'COMPASSIONATE',
              desc: 'Receive non-judgmental, empathetic care from specialists who truly understand your struggles.',
            },
            {
              icon: '⏰',
              title: 'FLEXIBLE',
              desc: 'Book sessions on your schedule. Appointments available 7 days a week to fit your lifestyle.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className='choose-card'>
              <div className='text-3xl mb-1'>{icon}</div>
              <b className='text-gray-800 font-heading text-sm font-bold tracking-wider' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {title}
              </b>
              <p className='text-sm leading-relaxed'>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Stats Row ─── */}
      <div
        className='rounded-2xl px-8 py-10 mb-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center'
        style={{ background: 'linear-gradient(135deg, #312e81 0%, #4F46E5 50%, #7C3AED 100%)' }}
      >
        {[
          { num: '100+', label: 'Verified Specialists' },
          { num: '8', label: 'Mental Health Areas' },
          { num: '5,000+', label: 'Sessions Booked' },
          { num: '4.9★', label: 'Patient Rating' },
        ].map(({ num, label }) => (
          <div key={label}>
            <p className='text-3xl font-bold text-white' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{num}</p>
            <p className='text-indigo-200 text-sm mt-1'>{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About