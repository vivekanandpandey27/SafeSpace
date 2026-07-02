import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <section className='my-20 md:mx-10'>
            <div
                className='relative rounded-2xl overflow-hidden px-8 sm:px-12 md:px-16 lg:px-20 py-14 flex flex-col md:flex-row items-center gap-8'
                style={{ background: 'linear-gradient(135deg, #312e81 0%, #4F46E5 40%, #7C3AED 100%)' }}
            >
                {/* Background decoration */}
                <div className='absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none'
                    style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className='absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none'
                    style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                {/* ─── Left Content ─── */}
                <div className='flex-1 relative z-10'>
                    {/* Badge */}
                    <div className='inline-flex items-center gap-2 bg-white bg-opacity-15 border border-white border-opacity-25 rounded-full px-4 py-1.5 mb-5'>
                        <span className='text-sm'>💚</span>
                        <span className='text-white text-xs font-semibold tracking-wide'>Your Journey Starts Here</span>
                    </div>

                    {/* Headline */}
                    <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-4' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Start Your <br />
                        <span className='text-yellow-300'>Healing Journey</span>
                    </h2>
                    <p className='text-white mb-6 text-sm md:text-base leading-relaxed max-w-md' style={{ opacity: 0.85 }}>
                        Connect with 100+ trusted mental health experts — all vetted, compassionate, and ready to help you thrive.
                    </p>

                    {/* Features */}
                    <div className='flex flex-wrap gap-3 mb-8'>
                        {[
                            { icon: '🔒', text: 'Confidential' },
                            { icon: '✅', text: 'Expert-Vetted' },
                            { icon: '💬', text: 'Compassionate Care' },
                            { icon: '⏰', text: 'Flexible Scheduling' },
                        ].map(({ icon, text }) => (
                            <div key={text} className='flex items-center gap-1.5 bg-white bg-opacity-15 rounded-full px-3 py-1.5'>
                                <span className='text-sm'>{icon}</span>
                                <span className='text-white text-xs font-medium'>{text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <button
                        onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                        className='inline-flex items-center gap-2 bg-white font-semibold px-8 py-3.5 rounded-full hover:scale-105 transition-all duration-300 text-sm'
                        style={{ color: '#4F46E5', boxShadow: '0 4px 20px rgba(255,255,255,0.25)' }}
                    >
                        Create Free Account
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                {/* ─── Right: Image ─── */}
                <div className='hidden md:flex md:w-2/5 lg:w-[340px] justify-end items-end relative z-10'>
                    <div className='relative'>
                        {/* Glow ring */}
                        <div className='absolute inset-0 rounded-full opacity-30 blur-2xl'
                            style={{ background: 'radial-gradient(circle, #A78BFA 0%, transparent 60%)' }} />
                        <img
                            className='relative w-full max-w-xs object-contain'
                            src='/appointment_img.png'
                            onError={(e) => { e.target.style.display = 'none' }}
                            alt="mental health care"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner