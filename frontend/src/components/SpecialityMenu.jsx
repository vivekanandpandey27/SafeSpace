import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <section id='speciality' className='py-20 px-2'>
            {/* ─── Section Header ─── */}
            <div className='flex flex-col items-center gap-3 mb-10'>
                <div className='flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase'>
                    <span>🧩</span> Find By Condition
                </div>
                <h2 className='text-3xl font-heading font-bold text-center section-title section-title-center' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
                    What brings you here today?
                </h2>
                <p className='text-gray-500 text-center max-w-sm text-sm leading-relaxed'>
                    Browse our specialised mental health categories and connect with the right expert for your needs.
                </p>
            </div>

            {/* ─── Specialty Cards ─── */}
            <div className='flex sm:justify-center gap-4 pt-2 w-full overflow-x-auto pb-3' style={{ scrollbarWidth: 'none' }}>
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className='specialty-card group'
                        key={index}
                    >
                        <div className='specialty-icon-bg'>
                            <img
                                className='w-10 h-10'
                                src={item.image}
                                alt={item.speciality}
                            />
                        </div>
                        <p className='text-xs font-semibold text-center text-gray-600 group-hover:text-white transition-colors duration-300 leading-tight max-w-[90px]'>
                            {item.speciality}
                        </p>
                    </Link>
                ))}
            </div>

            {/* ─── Help Badge ─── */}
            <div className='flex justify-center mt-10'>
                <div className='inline-flex items-center gap-3 bg-white border border-indigo-100 rounded-2xl px-6 py-3 shadow-card'>
                    <span className='text-xl'>🤝</span>
                    <p className='text-sm text-gray-500'>
                        Not sure where to start?{' '}
                        <Link to='/doctors' className='text-primary font-semibold hover:underline'>
                            Browse all therapists
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SpecialityMenu