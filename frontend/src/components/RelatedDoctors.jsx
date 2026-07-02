import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  if (relDoc.length === 0) return null

  return (
    <section className='py-16'>
      {/* ─── Section Header ─── */}
      <div className='flex flex-col items-center gap-3 mb-10'>
        <div className='inline-flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase'>
          <span>🔗</span> Related Specialists
        </div>
        <h2 className='text-2xl font-heading font-bold text-center' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
          Other Specialists in This Area
        </h2>
        <p className='text-gray-500 text-sm text-center max-w-sm'>
          Explore more qualified therapists specialising in {speciality}.
        </p>
      </div>

      {/* ─── Related Cards Grid ─── */}
      <div className='w-full grid grid-cols-auto gap-5'>
        {relDoc.map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className='doctor-card'
            key={index}
          >
            {/* Image */}
            <div className='doc-img-bg h-48 flex items-end justify-center overflow-hidden'>
              <img
                className='h-full w-full object-cover object-top'
                src={item.image}
                alt={item.name}
              />
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
    </section>
  )
}

export default RelatedDoctors