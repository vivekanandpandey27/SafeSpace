import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

// ─── Quiz Questions ──────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'emotion',
    question: 'How have you been feeling lately?',
    subtitle: 'Select all that apply — be as honest as you can.',
    multi: true,
    options: [
      { id: 'sad',        emoji: '😔', label: 'Sad or empty',           tags: ['depression'] },
      { id: 'anxious',    emoji: '😰', label: 'Anxious or worried',      tags: ['anxiety'] },
      { id: 'angry',      emoji: '😤', label: 'Irritable or angry',      tags: ['depression', 'trauma'] },
      { id: 'numb',       emoji: '😶', label: 'Emotionally numb',        tags: ['trauma', 'depression'] },
      { id: 'overwhelmed',emoji: '🌊', label: 'Overwhelmed / burnt out', tags: ['anxiety', 'stress'] },
      { id: 'distracted', emoji: '💭', label: 'Unfocused / distracted',  tags: ['adhd'] },
      { id: 'compulsive', emoji: '🔄', label: 'Stuck in repetitive thoughts', tags: ['ocd'] },
      { id: 'hopeless',   emoji: '🌑', label: 'Hopeless about the future', tags: ['depression'] },
    ],
  },
  {
    id: 'duration',
    question: 'How long have you been feeling this way?',
    subtitle: 'Duration helps us understand the severity.',
    multi: false,
    options: [
      { id: 'days',   emoji: '📅', label: 'Just a few days',      tags: ['mild'] },
      { id: 'weeks',  emoji: '🗓️', label: '1–4 weeks',            tags: ['moderate'] },
      { id: 'months', emoji: '📆', label: '1–6 months',           tags: ['moderate', 'persistent'] },
      { id: 'long',   emoji: '⏳', label: 'More than 6 months',   tags: ['persistent', 'clinical'] },
    ],
  },
  {
    id: 'impact',
    question: 'How is this affecting your daily life?',
    subtitle: 'Select every area that feels impacted.',
    multi: true,
    options: [
      { id: 'sleep',        emoji: '😴', label: 'Sleep (too much or too little)', tags: ['depression', 'anxiety'] },
      { id: 'work',         emoji: '💼', label: 'Work or studies',                tags: ['adhd', 'anxiety', 'depression'] },
      { id: 'relationships',emoji: '💔', label: 'Relationships',                  tags: ['trauma', 'depression'] },
      { id: 'appetite',     emoji: '🍽️', label: 'Eating habits',                  tags: ['depression', 'anxiety'] },
      { id: 'motivation',   emoji: '🔋', label: 'Motivation & energy',            tags: ['depression'] },
      { id: 'social',       emoji: '🚶', label: 'Avoiding social situations',     tags: ['anxiety', 'trauma'] },
    ],
  },
  {
    id: 'specific',
    question: 'Have you experienced any of these?',
    subtitle: 'These help us pinpoint the right specialist.',
    multi: true,
    options: [
      { id: 'flashbacks',   emoji: '⚡', label: 'Flashbacks or nightmares',       tags: ['trauma'] },
      { id: 'panic',        emoji: '💓', label: 'Panic attacks or racing heart',   tags: ['anxiety'] },
      { id: 'rituals',      emoji: '🔄', label: 'Compulsive rituals or checking',  tags: ['ocd'] },
      { id: 'hyperactive',  emoji: '⚡', label: 'Hyperactivity or impulsiveness',  tags: ['adhd'] },
      { id: 'medication',   emoji: '💊', label: 'Thinking about medication',       tags: ['psychiatry'] },
      { id: 'none',         emoji: '✅', label: 'None of the above',               tags: [] },
    ],
  },
]

// ─── Scoring Engine ──────────────────────────────────────────────────────────
const SPECIALTY_MAP = {
  'Depression Counselor': { tags: ['depression'], weight: 0 },
  'Anxiety & Stress':     { tags: ['anxiety', 'stress'], weight: 0 },
  'Trauma & PTSD':        { tags: ['trauma'], weight: 0 },
  'OCD Therapist':        { tags: ['ocd'], weight: 0 },
  'ADHD Specialist':      { tags: ['adhd'], weight: 0 },
  'Psychiatrist':         { tags: ['psychiatry', 'clinical'], weight: 0 },
  'Psychologist':         { tags: ['moderate', 'persistent'], weight: 0 },
  'CBT Therapist':        { tags: ['mild', 'anxiety', 'depression'], weight: 0 },
}

const SPECIALTY_REASONS = {
  'Depression Counselor': 'You reported persistent low mood, loss of energy, and changes in motivation — core indicators that a depression counselor can address.',
  'Anxiety & Stress':     'Your responses show significant worry, physical tension, and overwhelm — signs that an anxiety specialist would be most beneficial.',
  'Trauma & PTSD':        'Experiences like flashbacks, emotional numbness, and avoidance suggest trauma-related patterns a PTSD therapist is trained to treat.',
  'OCD Therapist':        'Repetitive thoughts, compulsive behaviours, and mental rituals are best addressed through specialised OCD therapy (ERP).',
  'ADHD Specialist':      'Difficulty focusing, impulsivity, and hyperactivity are hallmarks of ADHD that an ADHD specialist can properly assess.',
  'Psychiatrist':         'Given the severity and duration of your symptoms, a psychiatrist can provide both therapy and medication evaluation if needed.',
  'Psychologist':         'Your experiences suggest a structured psychological assessment and talk therapy would be the most effective starting point.',
  'CBT Therapist':        'Cognitive Behavioural Therapy (CBT) is highly effective for the patterns you\'ve described — rewiring negative thought cycles.',
}

function computeResult(answers) {
  const scores = {}
  Object.keys(SPECIALTY_MAP).forEach(k => (scores[k] = 0))

  answers.forEach(stepAnswers => {
    stepAnswers.forEach(opt => {
      opt.tags.forEach(tag => {
        Object.entries(SPECIALTY_MAP).forEach(([specialty, data]) => {
          if (data.tags.includes(tag)) scores[specialty] += 1
        })
      })
    })
  })

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const top = sorted[0][0]
  // Fallback: if all scores are 0, recommend Psychologist
  return sorted[0][1] === 0 ? 'Psychologist' : top
}

// ─── Component ───────────────────────────────────────────────────────────────
const SymptomChecker = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [step, setStep] = useState(0)           // 0–3 = questions, 4 = results
  const [answers, setAnswers] = useState([[], [], [], []])
  const [selected, setSelected] = useState([])   // selected option ids for current step
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('forward')
  const [result, setResult] = useState(null)
  const [matchedDoctors, setMatchedDoctors] = useState([])

  const currentStep = STEPS[step]
  const progress = Math.round(((step) / STEPS.length) * 100)

  // Restore selections from saved answers when navigating back
  useEffect(() => {
    if (step < STEPS.length) {
      setSelected(answers[step].map(o => o.id))
    }
  }, [step])

  const toggleOption = (opt) => {
    if (currentStep.multi) {
      // special case: if 'none' is clicked, clear everything
      if (opt.id === 'none') {
        setSelected(['none'])
        return
      }
      setSelected(prev => {
        const without_none = prev.filter(id => id !== 'none')
        return without_none.includes(opt.id)
          ? without_none.filter(id => id !== opt.id)
          : [...without_none, opt.id]
      })
    } else {
      setSelected([opt.id])
    }
  }

  const transitionTo = (nextStep, dir = 'forward') => {
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setStep(nextStep)
      setAnimating(false)
    }, 280)
  }

  const handleNext = () => {
    // Save answers for this step
    const currentOptions = currentStep.options.filter(o => selected.includes(o.id))
    const newAnswers = [...answers]
    newAnswers[step] = currentOptions
    setAnswers(newAnswers)

    if (step < STEPS.length - 1) {
      transitionTo(step + 1, 'forward')
    } else {
      // Compute result
      const res = computeResult(newAnswers)
      setResult(res)
      const matched = doctors.filter(d => d.speciality === res && d.available)
      setMatchedDoctors(matched.slice(0, 3))
      transitionTo(STEPS.length, 'forward')
    }
  }

  const handleBack = () => {
    if (step === 0) return
    if (step === STEPS.length) {
      // Going back from results to last question
      setSelected(answers[STEPS.length - 1].map(o => o.id))
      transitionTo(STEPS.length - 1, 'back')
      return
    }
    transitionTo(step - 1, 'back')
  }

  const handleRetake = () => {
    setAnswers([[], [], [], []])
    setSelected([])
    setResult(null)
    setMatchedDoctors([])
    transitionTo(0, 'back')
  }

  const isNextDisabled = selected.length === 0

  // ── Results Screen ──────────────────────────────────────────────────────
  if (step === STEPS.length) {
    return (
      <div className="quiz-page-bg min-h-screen flex flex-col items-center justify-start py-12 px-4">
        {/* Header */}
        <div className="w-full max-w-2xl mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-indigo-400 hover:text-primary text-sm flex items-center gap-1 transition-colors mb-6"
          >
            ← Back to Home
          </button>
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-3">
            <span>✅</span> Your Pre-Assessment Result
          </div>
        </div>

        {/* Result Card */}
        <div
          className={`quiz-card w-full max-w-2xl ${animating ? (direction === 'forward' ? 'quiz-slide-in-right' : 'quiz-slide-in-left') : 'quiz-visible'}`}
        >
          {/* Recommendation Banner */}
          <div className="result-banner rounded-2xl p-6 mb-6 text-white text-center">
            <p className="text-sm font-medium opacity-80 mb-1">Based on your responses, we recommend</p>
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {result}
            </h2>
            <p className="text-xs opacity-70 mt-1">This is a pre-assessment, not a clinical diagnosis</p>
          </div>

          {/* Why Section */}
          <div className="bg-indigo-50 rounded-xl p-4 mb-6">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Why this recommendation?</p>
            <p className="text-sm text-gray-600 leading-relaxed">{SPECIALTY_REASONS[result]}</p>
          </div>

          {/* Matched Doctors */}
          {matchedDoctors.length > 0 ? (
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-700 mb-3">
                🩺 Available {result}s — Book your first session
              </p>
              <div className="flex flex-col gap-3">
                {matchedDoctors.map((doc) => (
                  <div
                    key={doc._id}
                    onClick={() => { navigate(`/appointment/${doc._id}`); scrollTo(0, 0) }}
                    className="result-doctor-card flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 border-indigo-100">
                      <img className="w-full h-full object-cover object-top" src={doc.image} alt={doc.name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{doc.name}</p>
                      <span className="text-xs text-primary bg-indigo-50 px-2 py-0.5 rounded-full">{doc.speciality}</span>
                      <p className="text-xs text-gray-500 mt-1">{doc.experience} experience · ₹{doc.fees} per session</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1.5 rounded-full">
                        Book →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm text-amber-700 font-medium">No {result}s are available right now</p>
              <p className="text-xs text-amber-600 mt-1">Browse all our specialists to find someone who can help</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => { navigate(`/doctors/${result}`); scrollTo(0, 0) }}
              className="btn-primary flex-1 text-center text-sm py-3"
            >
              View all {result}s →
            </button>
            <button
              onClick={handleRetake}
              className="btn-outline flex-1 text-sm py-3"
            >
              Retake Quiz
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
            ⚠️ This quiz is for guidance only and does not constitute a medical diagnosis. 
            Please consult a qualified professional for proper assessment.
          </p>
        </div>

        {/* Crisis Banner */}
        <div className="w-full max-w-2xl mt-6 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-xl flex-shrink-0">🆘</span>
          <div>
            <p className="text-sm font-semibold text-red-700">If you're in crisis or need immediate help</p>
            <p className="text-xs text-red-500 mt-0.5">
              iCall: <strong>9152987821</strong> &nbsp;·&nbsp; Vandrevala Foundation: <strong>1860-2662-345</strong> &nbsp;·&nbsp; Available 24/7
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz Steps ──────────────────────────────────────────────────────────
  return (
    <div className="quiz-page-bg min-h-screen flex flex-col items-center justify-start py-12 px-4">
      {/* Back to home */}
      <div className="w-full max-w-2xl mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-indigo-400 hover:text-primary text-sm flex items-center gap-1 transition-colors"
        >
          ← Back to Home
        </button>
      </div>

      {/* Quiz Card */}
      <div className="quiz-card w-full max-w-2xl">
        {/* Top: Label + Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-primary rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
              <span>🧠</span> Mental Health Assessment
            </div>
            <span className="text-xs text-gray-400 font-medium">
              {step + 1} of {STEPS.length}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-indigo-50 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full quiz-progress-bar transition-all duration-500"
              style={{ width: `${progress + (100 / STEPS.length)}%` }}
            />
          </div>
        </div>

        {/* Question + Options */}
        <div className={animating ? (direction === 'forward' ? 'quiz-slide-out-left' : 'quiz-slide-out-right') : 'quiz-visible'}>
          <h2
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1e1b4b' }}
          >
            {currentStep.question}
          </h2>
          <p className="text-sm text-gray-400 mb-6">{currentStep.subtitle}</p>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {currentStep.options.map((opt) => {
              const isSelected = selected.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleOption(opt)}
                  className={`quiz-option ${isSelected ? 'quiz-option-selected' : ''}`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="text-sm font-medium flex-1 text-left">{opt.label}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            {step > 0 && (
              <button onClick={handleBack} className="btn-outline px-6 py-3 text-sm">
                ← Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2 transition-all ${
                isNextDisabled ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              {step === STEPS.length - 1 ? '✨ See My Results' : 'Continue →'}
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-indigo-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <p className="text-xs text-gray-400 mt-6 text-center max-w-sm leading-relaxed">
        Your answers are completely private and are never stored or shared.
        This tool is for guidance only — not a clinical diagnosis.
      </p>
    </div>
  )
}

export default SymptomChecker
