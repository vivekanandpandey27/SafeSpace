import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='mt-24'>
      {/* ─── Main Footer ─── */}
      <div className='footer-gradient rounded-2xl px-8 md:px-12 py-12 mb-0'>
        <div className='grid md:grid-cols-[2.5fr_1fr_1fr] gap-12 items-start'>

          {/* ─── Brand Column ─── */}
          <div className='flex flex-col gap-5'>
            {/* Logo */}
            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 rounded-xl flex items-center justify-center'
                style={{ background: 'linear-gradient(135deg, #6366F1, #A78BFA)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z" fill="white" opacity="0.9"/>
                  <circle cx="12" cy="9" r="3" fill="white"/>
                </svg>
              </div>
              <div>
                <span className='text-xl font-bold text-white' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Safe<span style={{ color: '#A78BFA' }}>Space</span>
                </span>
                <p className='text-[9px] text-indigo-300 tracking-wider leading-none'>MENTAL HEALTH CARE</p>
              </div>
            </div>

            <p className='text-indigo-200 text-sm leading-relaxed max-w-xs'>
              <strong className='text-white'>SafeSpace – Your Safe Space for Mental Wellness.</strong>{' '}
              We connect you with trusted, expert-vetted mental health specialists for ADHD, OCD, anxiety, depression, trauma and more — seamlessly and confidentially.
            </p>

            {/* Trust Badges */}
            <div className='flex flex-wrap gap-2'>
              {['🔒 Confidential', '✅ Expert-Vetted', '💚 Compassionate'].map(badge => (
                <span key={badge} className='text-xs bg-white bg-opacity-10 text-indigo-200 px-3 py-1 rounded-full border border-white border-opacity-10'>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ─── Company Links ─── */}
          <div>
            <p className='text-sm font-bold text-white mb-5 uppercase tracking-widest'>Company</p>
            <ul className='flex flex-col gap-3 text-indigo-300 text-sm'>
              <li><Link to='/' className='hover:text-white transition-colors duration-200'>Home</Link></li>
              <li><Link to='/about' className='hover:text-white transition-colors duration-200'>About Us</Link></li>
              <li><Link to='/contact' className='hover:text-white transition-colors duration-200'>Contact Us</Link></li>
              <li><span className='hover:text-white transition-colors duration-200 cursor-pointer'>Privacy Policy</span></li>
            </ul>
          </div>

          {/* ─── Contact Info ─── */}
          <div>
            <p className='text-sm font-bold text-white mb-5 uppercase tracking-widest'>Get in Touch</p>
            <ul className='flex flex-col gap-3 text-indigo-300 text-sm'>
              <li className='flex items-center gap-2'>
                <span>📞</span>
                <span>+91-90000-90000</span>
              </li>
              <li className='flex items-center gap-2'>
                <span>✉️</span>
                <span>support@safespace.in</span>
              </li>
              <li className='flex items-center gap-2'>
                <span>🕒</span>
                <span>Mon–Sat, 9 AM – 8 PM</span>
              </li>
            </ul>

            {/* Crisis Line */}
            <div className='mt-5 bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl p-3'>
              <p className='text-xs text-indigo-200 font-semibold mb-1'>🆘 Mental Health Crisis?</p>
              <p className='text-xs text-indigo-300'>iCall Helpline: <strong className='text-white'>9152987821</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className='bg-indigo-950 rounded-b-2xl px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2'>
        <p className='text-xs text-indigo-400'>
          © 2025 <span className='text-indigo-300 font-medium'>SafeSpace</span> — All Rights Reserved.
        </p>
        <p className='text-xs text-indigo-500'>
          Made with 💜 for mental wellness
        </p>
      </div>
    </footer>
  );
};

export default Footer;