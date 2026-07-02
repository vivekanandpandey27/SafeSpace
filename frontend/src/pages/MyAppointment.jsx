import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Session Payment',
      description: "Therapy Session Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  // Function to make payment using razorpay
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  // Generate appointment data from doctors
  // useEffect(() => {
  //   if (doctors.length) {
  //     const generatedAppointments = doctors.slice(0, 3).map((doc, idx) => ({
  //       _id: `appointment_${idx}`,
  //       docData: {
  //         name: doc.name,
  //         speciality: doc.speciality,
  //         image: doc.image,
  //         address: doc.address || { line1: "Street X", line2: "City Y" }
  //       },
  //       slotDate: `12_0${idx + 1}_2025`,
  //       slotTime: `${10 + idx}:00 AM`,
  //       payment: idx === 1,
  //       isCompleted: idx === 2,
  //       cancelled: false
  //     }))
  //     setAppointments(generatedAppointments)
  //   }
  // }, [doctors])

  const simulateStripe = () => toast.info("Redirecting to Stripe...")
  const simulateRazorpay = () => toast.info("Opening Razorpay...")

  return (
    <div className='min-h-screen py-6' style={{ background: 'linear-gradient(180deg, #F8F7FF 0%, #FFFFFF 100%)' }}>

      {/* ─── Page Header ─── */}
      <div className='mb-8'>
        <div className='inline-flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-3'>
          <span>📅</span> Appointments
        </div>
        <h1 className='text-2xl font-bold' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
          My Sessions
        </h1>
        <p className='text-gray-500 text-sm mt-1'>Track and manage your upcoming therapy sessions.</p>
      </div>

      {/* ─── Appointments List ─── */}
      {appointments.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <div className='text-6xl mb-4'>📋</div>
          <p className='text-gray-400 text-lg font-medium'>No sessions yet</p>
          <p className='text-gray-400 text-sm mt-1 mb-6'>Book your first therapy session to get started.</p>
          <button onClick={() => navigate('/doctors')} className='btn-primary text-sm px-6 py-3'>
            Find a Therapist
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {appointments.map((item, index) => (
            <div key={index} className='bg-white rounded-2xl shadow-card border border-indigo-50 overflow-hidden'>
              <div className='flex flex-col sm:flex-row gap-0'>

                {/* ─── Doctor Image ─── */}
                <div className='sm:w-36 flex-shrink-0'>
                  <div className='h-full min-h-36 overflow-hidden' style={{ background: 'linear-gradient(145deg, #EEF2FF, #EDE9FE)' }}>
                    <img
                      className='w-full h-full object-cover object-top sm:max-w-[144px]'
                      src={item.docData.image}
                      alt={item.docData.name}
                    />
                  </div>
                </div>

                {/* ─── Info ─── */}
                <div className='flex-1 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
                  <div className='flex flex-col gap-1.5'>
                    <p className='text-base font-bold' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
                      {item.docData.name}
                    </p>
                    <span className='text-xs font-medium text-primary bg-indigo-50 px-2.5 py-1 rounded-full inline-block w-fit'>
                      {item.docData.speciality}
                    </span>
                    <div className='flex items-start gap-2 mt-1 text-xs text-gray-500'>
                      <span>📍</span>
                      <div>
                        <p>{item.docData.address.line1}</p>
                        <p>{item.docData.address.line2}</p>
                      </div>
                    </div>
                    <p className='text-xs text-gray-500 flex items-center gap-1'>
                      <span>🗓️</span>
                      <span className='font-semibold text-gray-700'>{slotDateFormat(item.slotDate)}</span>
                      <span className='mx-1'>|</span>
                      <span>{item.slotTime}</span>
                    </p>
                  </div>

                  {/* ─── Action Buttons ─── */}
                  <div className='flex flex-col gap-2 min-w-[180px]'>
                    {/* Pay Online */}
                    {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                      <button
                        onClick={() => setPayment(item._id)}
                        className='w-full py-2.5 px-4 rounded-xl text-sm font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200'
                      >
                        💳 Pay Online
                      </button>
                    )}
                    {/* Razorpay button */}
                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                      <button
                        onClick={() => appointmentRazorpay(item._id)}
                        className='w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-all duration-200 flex items-center justify-center'
                      >
                        <img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="" />
                      </button>
                    )}
                    {/* Paid */}
                    {!item.cancelled && item.payment && !item.isCompleted && (
                      <button className='w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-green-50 border border-green-200 text-green-600 cursor-default'>
                        ✅ Paid
                      </button>
                    )}
                    {/* Completed */}
                    {item.isCompleted && (
                      <button className='w-full py-2.5 px-4 rounded-xl text-sm font-semibold bg-indigo-50 border border-indigo-200 text-primary cursor-default'>
                        🎉 Session Completed
                      </button>
                    )}
                    {/* Cancel */}
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='w-full py-2.5 px-4 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500 transition-all duration-200'
                      >
                        Cancel Session
                      </button>
                    )}
                    {/* Cancelled */}
                    {item.cancelled && !item.isCompleted && (
                      <button className='w-full py-2.5 px-4 rounded-xl text-sm font-medium text-red-400 border border-red-200 bg-red-50 cursor-default'>
                        ❌ Session Cancelled
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments