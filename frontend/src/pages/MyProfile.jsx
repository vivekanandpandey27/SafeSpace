import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className='min-h-screen py-8' style={{ background: 'linear-gradient(180deg, #F8F7FF 0%, #FFFFFF 100%)' }}>
            <div className='max-w-xl mx-auto'>

                {/* ─── Page Header ─── */}
                <div className='mb-8'>
                    <div className='inline-flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-3'>
                        <span>👤</span> My Account
                    </div>
                    <h1 className='text-2xl font-bold' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}>
                        My Profile
                    </h1>
                </div>

                {/* ─── Profile Card ─── */}
                <div className='bg-white rounded-3xl shadow-card border border-indigo-50 overflow-hidden'>

                    {/* ─── Avatar Section ─── */}
                    <div className='relative h-28 flex items-end px-6 pb-0'
                        style={{ background: 'linear-gradient(135deg, #312e81 0%, #4F46E5 50%, #7C3AED 100%)' }}>
                        <div className='relative mb-[-40px]'>
                            {isEdit ? (
                                <label htmlFor='image' className='cursor-pointer block'>
                                    <div className='relative'>
                                        <img
                                            className='w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg opacity-85'
                                            src={image ? URL.createObjectURL(image) : userData.image}
                                            alt=""
                                        />
                                        <div className='absolute inset-0 rounded-2xl bg-black bg-opacity-30 flex items-center justify-center'>
                                            <img className='w-6' src={assets.upload_icon} alt="" />
                                        </div>
                                    </div>
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                                </label>
                            ) : (
                                <img
                                    className='w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg'
                                    src={userData.image}
                                    alt=""
                                />
                            )}
                        </div>
                    </div>

                    <div className='px-6 pt-14 pb-6'>
                        {/* Name */}
                        {isEdit ? (
                            <input
                                className='safespace-input text-2xl font-bold mb-1 max-w-64'
                                style={{ color: '#1e1b4b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                type="text"
                                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                value={userData.name}
                            />
                        ) : (
                            <p className='text-2xl font-bold mb-1' style={{ color: '#1e1b4b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                {userData.name}
                            </p>
                        )}
                        <p className='text-xs text-indigo-400 tracking-wider uppercase font-semibold'>SafeSpace Member</p>

                        <hr className='border-indigo-50 my-5' />

                        {/* Contact Information */}
                        <div className='mb-5'>
                            <p className='text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2'>
                                <span>📋</span> Contact Information
                            </p>
                            <div className='grid grid-cols-[140px_1fr] gap-y-3 text-sm'>
                                <p className='font-semibold text-gray-500'>Email</p>
                                <p className='text-primary'>{userData.email}</p>

                                <p className='font-semibold text-gray-500'>Phone</p>
                                {isEdit ? (
                                    <input
                                        className='safespace-input text-sm max-w-48'
                                        type="text"
                                        onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                        value={userData.phone}
                                    />
                                ) : (
                                    <p className='text-primary'>{userData.phone}</p>
                                )}

                                <p className='font-semibold text-gray-500'>Address</p>
                                {isEdit ? (
                                    <div className='flex flex-col gap-2'>
                                        <input
                                            className='safespace-input text-sm'
                                            type="text"
                                            onChange={(e) => setUserData(prev => ({ ...prev, address: { ...(prev.address || {}), line1: e.target.value } }))}
                                            value={userData.address?.line1 || ''}
                                            placeholder='Address line 1'
                                        />
                                        <input
                                            className='safespace-input text-sm'
                                            type="text"
                                            onChange={(e) => setUserData(prev => ({ ...prev, address: { ...(prev.address || {}), line2: e.target.value } }))}
                                            value={userData.address?.line2 || ''}
                                            placeholder='Address line 2'
                                        />
                                    </div>
                                ) : (
                                    <p className='text-gray-500'>
                                        {userData.address?.line1}<br />{userData.address?.line2}
                                    </p>
                                )}
                            </div>
                        </div>

                        <hr className='border-indigo-50 my-5' />

                        {/* Basic Information */}
                        <div className='mb-6'>
                            <p className='text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2'>
                                <span>🧬</span> Basic Information
                            </p>
                            <div className='grid grid-cols-[140px_1fr] gap-y-3 text-sm'>
                                <p className='font-semibold text-gray-500'>Gender</p>
                                {isEdit ? (
                                    <select
                                        className='safespace-input max-w-36 text-sm'
                                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                        value={userData.gender}
                                    >
                                        <option value="Not Selected">Not Selected</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                ) : (
                                    <p className='text-gray-600'>{userData.gender}</p>
                                )}

                                <p className='font-semibold text-gray-500'>Birthday</p>
                                {isEdit ? (
                                    <input
                                        className='safespace-input max-w-40 text-sm'
                                        type='date'
                                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                        value={userData.dob}
                                    />
                                ) : (
                                    <p className='text-gray-600'>{userData.dob}</p>
                                )}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className='flex gap-3'>
                            {isEdit ? (
                                <>
                                    <button
                                        onClick={updateUserProfileData}
                                        className='btn-primary text-sm px-6 py-2.5 flex-1'
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => { setIsEdit(false); setImage(false) }}
                                        className='btn-outline text-sm px-6 py-2.5'
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEdit(true)}
                                    className='btn-outline text-sm px-6 py-2.5'
                                >
                                    ✏️ Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile