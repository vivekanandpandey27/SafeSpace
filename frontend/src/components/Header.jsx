import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    return (
        <div className='hero-bg rounded-2xl px-6 md:px-10 lg:px-20 flex flex-col md:flex-row overflow-hidden relative my-4'>

            {/* ─── Left Content ─────────────────────── */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-5 py-12 md:py-[8vw] md:mb-[-30px] relative z-10'>

                {/* Trust Pill */}
                <div className='flex items-center gap-2 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-25 rounded-full px-4 py-1.5'>
                    <span className='text-lg'>🛡️</span>
                    <span className='text-white text-xs font-medium tracking-wide'>Safe · Confidential · Expert-Vetted</span>
                </div>

                {/* Main Heading */}
                <h1 className='text-3xl md:text-4xl lg:text-5xl text-white font-heading font-bold leading-tight' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Find Your <br />
                    <span className='text-yellow-300'>Safe Space</span>
                </h1>

                {/* Sub Heading */}
                <p className='text-white text-opacity-90 text-sm md:text-base leading-relaxed max-w-md' style={{ opacity: 0.9 }}>
                    Connect with trusted mental health specialists — psychiatrists, psychologists, and therapists — for ADHD, OCD, anxiety, depression, PTSD and more.
                </p>

                {/* Stats Row */}
                <div className='flex items-center gap-4 text-white'>
                    <img className='w-24' src={assets.group_profiles} alt="specialists" />
                    <div>
                        <p className='text-sm font-semibold'>100+ Specialists</p>
                        <p className='text-xs' style={{ opacity: 0.8 }}>Ready to help you today</p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
                    <a
                        href='#speciality'
                        className='flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 hover:shadow-glow text-sm'
                        style={{ color: '#4F46E5' }}
                    >
                        Book a Session
                        <img className='w-3' src={assets.arrow_icon} alt="" />
                    </a>
                    <button
                        onClick={() => navigate('/doctors')}
                        className='flex items-center gap-2 bg-white bg-opacity-15 text-white border border-white border-opacity-30 px-6 py-3 rounded-full hover:bg-opacity-25 transition-all duration-300 text-sm font-medium'
                    >
                        Browse Specialists
                    </button>
                </div>

                {/* Feature Badges */}
                <div className='flex flex-wrap gap-2 mt-1'>
                    {['🧠 ADHD', '😟 OCD', '💭 Anxiety', '🌱 Depression', '🦋 PTSD'].map(tag => (
                        <span key={tag} className='bg-white bg-opacity-15 text-white text-xs px-3 py-1 rounded-full border border-white border-opacity-20'>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* ─── Right: Doctor Image ───────────────── */}
            <div className='md:w-1/2 relative flex items-end justify-center md:justify-end'>
                <img
                    className='w-full md:absolute bottom-0 h-auto max-h-[500px] object-contain object-bottom rounded-lg'
                    src={assets.header_img}
                    alt="Mental health specialist"
                />
                {/* Floating Card */}
                <div className='hidden md:block absolute top-8 right-4 bg-white rounded-2xl shadow-card px-4 py-3 border border-indigo-50 animate-float'>
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm'>✅</div>
                        <div>
                            <p className='text-xs font-semibold text-gray-700'>Available Now</p>
                            <p className='text-[10px] text-gray-400'>30+ therapists online</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header