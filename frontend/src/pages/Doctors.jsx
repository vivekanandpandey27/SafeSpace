import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const mentalHealthSpecialities = [
    'Psychiatrist',
    'Psychologist',
    'ADHD Specialist',
    'OCD Therapist',
    'CBT Therapist',
    'Anxiety & Stress',
    'Depression Counselor',
    'Trauma & PTSD',
]

const specialityEmojis = {
    'Psychiatrist': '🧠',
    'Psychologist': '💭',
    'ADHD Specialist': '⚡',
    'OCD Therapist': '🔄',
    'CBT Therapist': '💡',
    'Anxiety & Stress': '🌊',
    'Depression Counselor': '🌱',
    'Trauma & PTSD': '🕊️',
}

const Doctors = () => {
    const { speciality } = useParams()
    const [filterDoc, setFilterDoc] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
        } else {
            setFilterDoc(doctors)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [doctors, speciality])

    return (
        <div className='min-h-screen' style={{ background: '#F8F7FF' }}>
            {/* ─── Page Header ─── */}
            <div className='py-10 px-2'>
                <div className='inline-flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-4'>
                    <span>🩺</span> Our Specialists
                </div>
                <h1 className='text-3xl font-heading font-bold mb-2' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
                    Find Your Therapist
                </h1>
                <p className='text-gray-500 text-sm max-w-md'>
                    Browse our network of expert mental health specialists. Filter by condition to find the right match for your needs.
                </p>
            </div>

            {/* ─── Filter Toggle (mobile) ─── */}
            <button
                onClick={() => setShowFilter(!showFilter)}
                className={`flex items-center gap-2 py-2 px-4 mb-4 border rounded-full text-sm font-medium transition-all sm:hidden ${showFilter ? 'bg-primary text-white border-primary' : 'border-indigo-200 text-primary bg-white'}`}
            >
                <span>🔍</span> {showFilter ? 'Hide Filters' : 'Filter by Condition'}
            </button>

            <div className='flex flex-col sm:flex-row items-start gap-6 mt-2'>
                {/* ─── Filter Sidebar ─── */}
                <aside className={`flex-col gap-2 ${showFilter ? 'flex' : 'hidden sm:flex'} min-w-[200px]`}>
                    <div className='bg-white rounded-2xl shadow-card border border-indigo-50 p-4'>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2'>Conditions</p>

                        {/* All option */}
                        <button
                            onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 mb-1 ${!speciality ? 'bg-primary text-white shadow-glow' : 'text-gray-600 hover:bg-indigo-50 hover:text-primary'}`}
                        >
                            <span>🌐</span> All Specialists
                        </button>

                        {mentalHealthSpecialities.map((spec) => (
                            <button
                                key={spec}
                                onClick={() => {
                                    speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)
                                    scrollTo(0, 0)
                                }}
                                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 mb-1 ${
                                    speciality === spec
                                        ? 'bg-primary text-white shadow-glow'
                                        : 'text-gray-600 hover:bg-indigo-50 hover:text-primary'
                                }`}
                            >
                                <span>{specialityEmojis[spec]}</span>
                                {spec}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* ─── Doctor Grid ─── */}
                <div className='flex-1'>
                    {filterDoc.length === 0 ? (
                        <div className='flex flex-col items-center justify-center py-20 text-center'>
                            <div className='text-6xl mb-4'>🔍</div>
                            <p className='text-gray-400 text-lg font-medium'>No specialists found</p>
                            <p className='text-gray-400 text-sm mt-1'>Try a different condition or browse all specialists.</p>
                        </div>
                    ) : (
                        <div className='w-full grid grid-cols-auto gap-5 gap-y-6'>
                            {filterDoc.map((item, index) => (
                                <div
                                    onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                                    className='doctor-card'
                                    key={index}
                                >
                                    {/* Image */}
                                    <div className='doc-img-bg h-52 overflow-hidden'>
                                        <img className='w-full h-full object-cover object-top' src={item.image} alt={item.name} />
                                    </div>
                                    {/* Info */}
                                    <div className='p-4'>
                                        <div className={item.available ? 'badge-available mb-2 inline-flex' : 'badge-unavailable mb-2 inline-flex'}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                            {item.available ? 'Available' : 'Not Available'}
                                        </div>
                                        <p className='text-gray-800 text-base font-semibold leading-tight' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {item.name}
                                        </p>
                                        <span className='text-xs font-medium text-primary bg-indigo-50 px-2.5 py-1 rounded-full inline-block mt-2'>
                                            {item.speciality}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Doctors