import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } = useContext(AdminContext)
  const [confirmDelete, setConfirmDelete] = useState(null) // stores docId to confirm

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const handleDelete = (docId) => {
    setConfirmDelete(docId) // show confirm dialog
  }

  const confirmAndDelete = async () => {
    await deleteDoctor(confirmDelete)
    setConfirmDelete(null)
  }

  return (
    <div className='m-5'>

      {/* Header */}
      <div className='mb-6'>
        <div className='inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 rounded-full px-4 py-1.5 text-xs font-bold tracking-wider uppercase mb-2'>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 21c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Therapists
        </div>
        <h1 className='text-2xl font-bold' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
          All Therapists
        </h1>
        <p className='text-gray-400 text-sm mt-1'>{doctors.length} therapist{doctors.length !== 1 ? 's' : ''} registered</p>
      </div>

      {/* Doctors Grid */}
      {doctors.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-indigo-50'>
          <div className='text-5xl mb-3'>👨‍⚕️</div>
          <p className='text-gray-400 font-medium'>No therapists registered yet</p>
          <p className='text-gray-300 text-sm'>Add a therapist to get started</p>
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {doctors.map((item, index) => (
            <div
              key={index}
              className='bg-white rounded-2xl overflow-hidden border border-indigo-50 shadow-sm hover:shadow-md transition-all duration-300 group'
            >
              {/* Image */}
              <div className='relative overflow-hidden h-40'
                style={{ background: 'linear-gradient(145deg, #EEF2FF, #EDE9FE)' }}>
                <img
                  className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500'
                  src={item.image}
                  alt={item.name}
                />
                {/* Availability badge */}
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.available
                    ? 'bg-green-100 text-green-600 border border-green-200'
                    : 'bg-red-50 text-red-400 border border-red-200'
                }`}>
                  {item.available ? '● Available' : '● Unavailable'}
                </div>
              </div>

              {/* Info */}
              <div className='p-3'>
                <p className='font-bold text-sm truncate' style={{ color: '#1e1b4b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {item.name}
                </p>
                <p className='text-xs text-indigo-500 font-medium truncate mt-0.5'>{item.speciality}</p>

                {/* Availability Toggle */}
                <div className='mt-2 flex items-center gap-2'>
                  <div
                    className='relative inline-flex items-center cursor-pointer'
                    onClick={() => changeAvailability(item._id)}
                  >
                    <div className={`w-8 h-4 rounded-full transition-colors duration-200 ${item.available ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                    <div className={`absolute w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 ${item.available ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                  </div>
                  <span className='text-xs text-gray-500'>{item.available ? 'Active' : 'Off'}</span>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className='w-full mt-3 py-1.5 rounded-xl text-xs font-semibold text-red-400 border border-red-100 bg-red-50 hover:bg-red-100 hover:text-red-600 hover:border-red-300 transition-all duration-200 flex items-center justify-center gap-1'
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className='fixed inset-0 z-50 flex items-center justify-center px-4'
          style={{ background: 'rgba(30,27,75,0.45)', backdropFilter: 'blur(4px)' }}>
          <div className='bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-red-100 animate-fade-in'>
            <div className='w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4'>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className='text-xl font-bold text-center mb-2' style={{ color: '#1e1b4b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Remove Therapist?
            </h2>
            <p className='text-gray-500 text-sm text-center mb-6'>
              This will permanently remove this therapist and cancel all their upcoming appointments. This cannot be undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={() => setConfirmDelete(null)}
                className='flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-all duration-200'
              >
                Cancel
              </button>
              <button
                onClick={confirmAndDelete}
                className='flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-all duration-200 shadow-md'
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorsList