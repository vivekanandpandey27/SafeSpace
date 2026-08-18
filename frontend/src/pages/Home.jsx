import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import { useNavigate } from 'react-router-dom'

const SymptomCheckerBanner = () => {
  const navigate = useNavigate()
  return (
    <section className="py-16 px-2">
      <div
        className="rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3730A3 0%, #4F46E5 50%, #7C3AED 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        {/* Left: Text */}
        <div className="flex-1 text-white text-center sm:text-left relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-4">
            <span>🧠</span> New Feature
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Not sure where to start?
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed max-w-md">
            Answer 4 quick questions and our pre-assessment tool will identify your concern and
            recommend the right specialist — before your first session even begins.
          </p>
          {/* Proof points */}
          <div className="flex flex-wrap gap-4 mt-5 justify-center sm:justify-start">
            {['⏱️ Takes 2 minutes', '🔒 100% Private', '🩺 Doctor-matched'].map(tag => (
              <span key={tag} className="text-xs text-indigo-200 flex items-center gap-1">{tag}</span>
            ))}
          </div>
        </div>

        {/* Right: CTA */}
        <div className="relative z-10 flex-shrink-0 text-center">
          <button
            onClick={() => { navigate('/symptom-check'); scrollTo(0, 0) }}
            className="bg-white text-primary font-bold px-8 py-4 rounded-2xl text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
          >
            <span>✨</span> Take the Free Assessment
          </button>
          <p className="text-indigo-300 text-xs mt-2">No account required</p>
        </div>
      </div>
    </section>
  )
}

const Home = () => {
  return (
    <div className='min-h-screen' style={{ background: 'linear-gradient(180deg, #F8F7FF 0%, #FFFFFF 100%)' }}>
      <Header />
      <SpecialityMenu />
      <SymptomCheckerBanner />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home