import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import { assets } from './assets/assets'
import RelatedDoctors from './components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const doc = doctors.find((doc) => doc._id === docId)
    if (doc) {
      // Ensure slots_booked is always at least an empty object
      setDocInfo({ ...doc, slots_booked: doc.slots_booked || {} })
    }
  }

  const getAvailableSlots = () => {
    if (!docInfo) return
    setDocSlots([])

    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })

        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()
        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime

        const isSlotAvailable =
          !docInfo?.slots_booked?.[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(slotTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Please login to book a session')
      return navigate('/login')
    }

    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const slotDate = day + "_" + month + "_" + year

    try {
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo()
    }
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return (
    docInfo && (
      <div className='min-h-screen py-6' style={{ background: 'linear-gradient(180deg, #F8F7FF 0%, #FFFFFF 100%)' }}>

        {/* ─── Doctor Profile Card ─── */}
        <div className='flex flex-col sm:flex-row gap-6 mb-8'>
          {/* Doctor Image */}
          <div className='sm:w-72 flex-shrink-0'>
            <div className='rounded-2xl overflow-hidden shadow-card' style={{ background: 'linear-gradient(145deg, #EEF2FF, #EDE9FE)' }}>
              <img
                className='w-full object-cover object-top'
                src={docInfo.image}
                alt={docInfo.name}
              />
            </div>
          </div>

          {/* Doctor Info */}
          <div className='flex-1 bg-white rounded-2xl shadow-card border border-indigo-50 p-6 sm:p-8'>
            {/* Name & Verified */}
            <div className='flex items-center gap-2 mb-1'>
              <h1 className='text-2xl font-bold' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
                {docInfo.name}
              </h1>
              <img src={assets.verified_icon} alt="verified" className='w-5' />
            </div>

            {/* Degree & Specialty & Experience */}
            <div className='flex flex-wrap items-center gap-2 mt-2 mb-4'>
              <span className='text-sm text-gray-600'>{docInfo.degree}</span>
              <span className='text-gray-300'>•</span>
              <span className='text-xs font-semibold text-primary bg-indigo-50 px-3 py-1 rounded-full'>
                {docInfo.speciality}
              </span>
              <span className='text-xs font-medium text-gray-500 border border-gray-200 px-3 py-1 rounded-full'>
                {docInfo.experience}
              </span>
            </div>

            {/* About */}
            <div className='mb-4'>
              <p className='flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2'>
                <img src={assets.info_icon} alt="" className='w-4' />
                About
              </p>
              <p className='text-sm text-gray-500 leading-relaxed max-w-2xl'>
                {docInfo.about}
              </p>
            </div>

            {/* Session Fee */}
            <div className='inline-flex items-center gap-2 bg-indigo-50 rounded-xl px-4 py-2.5'>
              <span className='text-sm text-gray-500'>Session fee:</span>
              <span className='font-bold text-primary text-base'>{currencySymbol} {docInfo.fees}</span>
            </div>
          </div>
        </div>

        {/* ─── Booking Section ─── */}
        <div className='bg-white rounded-2xl shadow-card border border-indigo-50 p-6 sm:ml-[calc(18rem+1.5rem)]'>
          <h2 className='text-base font-bold mb-5 flex items-center gap-2' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
            <span>📅</span> Schedule Your Session
          </h2>

          {/* Day Picker */}
          <div className='flex gap-3 items-center w-full overflow-x-auto pb-2 mb-4'>
            {docSlots.length > 0 && docSlots.map((item, index) => (
              <button
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`slot-day ${slotIndex === index ? 'active' : ''}`}
              >
                <p className='text-xs'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className='text-sm font-bold mt-0.5'>{item[0] && item[0].datetime.getDate()}</p>
              </button>
            ))}
          </div>

          {/* Time Picker */}
          <div className='flex items-center gap-2 w-full overflow-x-auto pb-2 mb-6'>
            {docSlots.length > 0 && docSlots[slotIndex] &&
              docSlots[slotIndex].map((item, index) => (
                <button
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`slot-time ${item.time === slotTime ? 'active' : ''}`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            className='btn-primary text-sm px-10 py-3.5 font-semibold'
          >
            🗓️ Book Your Session
          </button>
        </div>

        {/* ─── Related Specialists ─── */}
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    )
  )
}

export default Appointment