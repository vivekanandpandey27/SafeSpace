import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <section className='py-16 md:mx-10'>
      {/* ─── Section Header ─── */}
      <div className='flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10'>
        <div>
          <div className='inline-flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-3'>
            <span>⭐</span> Trusted Specialists
          </div>
          <h2 className='text-3xl font-heading font-bold' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
            Top Mental Health Specialists
          </h2>
          <p className='text-gray-500 text-sm mt-2 max-w-md leading-relaxed'>
            Expert-vetted professionals ready to support your mental wellness journey.
          </p>
        </div>
        <button
          onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
          className='btn-outline text-sm whitespace-nowrap'
        >
          View All Therapists →
        </button>
      </div>

      {/* ─── Doctor Grid ─── */}
      <div className='w-full grid grid-cols-auto gap-5 pt-2'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className='doctor-card'
            key={index}
          >
            {/* Image Area */}
            <div className='doc-img-bg h-52 flex items-end justify-center overflow-hidden'>
              <img
                className='h-full w-full object-cover object-top'
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Info Area */}
            <div className='p-4'>
              {/* Availability */}
              <div className={item.available ? 'badge-available mb-2 inline-flex' : 'badge-unavailable mb-2 inline-flex'}>
                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {item.available ? 'Available' : 'Not Available'}
              </div>

              {/* Name */}
              <p className='text-gray-800 text-base font-semibold font-heading leading-tight' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {item.name}
              </p>

              {/* Specialty Tag */}
              <div className='mt-2'>
                <span className='text-xs font-medium text-primary bg-indigo-50 px-2.5 py-1 rounded-full inline-block'>
                  {item.speciality}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TopDoctors