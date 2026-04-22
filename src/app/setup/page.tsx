'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateProfile } from '@/app/actions/auth'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const GOALS = [
  { id: 'Energy', label: 'Boost Energy', icon: '⚡' },
  { id: 'Consistency', label: 'Be Consistent', icon: '📅' },
  { id: 'Digestion', label: 'Better Digestion', icon: '🌿' },
  { id: 'Weight', label: 'Weight Balance', icon: '⚖️' },
  { id: 'Cravings', label: 'Stop Cravings', icon: '🚫' },
  { id: 'Sleep', label: 'Better Sleep', icon: '🌙' },
]

const DIETS = [
  { id: 'Vegan', label: 'Vegan' },
  { id: 'Keto', label: 'Keto' },
  { id: 'Paleo', label: 'Paleo' },
  { id: 'Gluten-Free', label: 'Gluten-Free' },
  { id: 'Dairy-Free', label: 'Dairy-Free' },
  { id: 'None', label: 'No Restrictions' },
]

export default function SetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [goals, setGoals] = useState<string[]>([])
  const [diets, setDiets] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id])
  }

  const toggleDiet = (id: string) => {
    setDiets(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id])
  }

  const handleComplete = async () => {
    setLoading(true)
    const result = await updateProfile({
      wellnessGoals: goals,
      dietaryRestrictions: diets,
      onboardingCompleted: true,
    })

    if (result.success) {
      router.push('/dashboard')
    } else {
      alert('Error saving profile: ' + result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-hidden flex flex-col items-center justify-center p-6 font-sans">
      {/* Abstract Background Elements */}
      <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-lime-light rounded-full blur-[150px] opacity-40" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-stone-100 rounded-full blur-[120px] opacity-60" />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-serif italic text-stone-800">
          Almond Mom
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/fridge-rescue" className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-stone-800 transition-colors">Fridge Rescue</Link>
          <div className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-400 border border-stone-200">
            Setup Step {step}/3
          </div>
        </div>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-stone-100 overflow-hidden relative z-10"
      >
        {/* Progress Bar */}
        <div className="h-1 w-full bg-stone-100/50">
          <div 
            className="h-full bg-stone-900 transition-all duration-700 ease-in-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-10 md:p-14">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-stone-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Personalization</span>
                <h1 className="text-4xl md:text-5xl font-serif italic text-stone-800 mb-4 leading-tight">What's your primary<br/>wellness goal?</h1>
                <p className="text-stone-500 mb-10 text-sm font-light">Pick everything that applies. We'll tailor your sanctuary accordingly.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => toggleGoal(g.id)}
                      className={`p-6 rounded-[2rem] border transition-all duration-300 group ${
                        goals.includes(g.id) 
                          ? 'border-stone-900 bg-stone-50 shadow-md scale-[1.02]' 
                          : 'border-stone-100/50 bg-white hover:border-stone-200 hover:bg-stone-50/50'
                      }`}
                    >
                      <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform origin-bottom-left">{g.icon}</span>
                      <span className={`text-[11px] uppercase tracking-widest font-bold ${goals.includes(g.id) ? 'text-stone-900' : 'text-stone-500'}`}>
                        {g.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-stone-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Dietary Profile</span>
                <h1 className="text-4xl md:text-5xl font-serif italic text-stone-800 mb-4 leading-tight">Any dietary<br/>restrictions?</h1>
                <p className="text-stone-500 mb-10 text-sm font-light">Help us curate the perfect clean ingredients for your body.</p>
                
                <div className="flex flex-wrap gap-3">
                  {DIETS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => toggleDiet(d.id)}
                      className={`px-8 py-4 rounded-full border text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                        diets.includes(d.id) 
                          ? 'border-stone-900 bg-stone-900 text-white shadow-lg scale-[1.02]' 
                          : 'border-stone-200/50 bg-white hover:border-stone-300 text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-8 animate-bounce-slow">🌿</div>
                <h1 className="text-4xl md:text-5xl font-serif italic text-stone-800 mb-6 leading-tight">Your Sanctuary<br/>is ready.</h1>
                <p className="text-stone-500 mb-12 text-sm font-light max-w-sm mx-auto">We've customized your experience. Prepare to explore the cleanest version of your kitchen.</p>
                
                <div className="bg-lime-light/30 rounded-[2rem] p-8 text-left mb-8 border border-lime-border/50 max-w-sm mx-auto">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-3">Your Curation</h3>
                  <p className="text-stone-800 text-sm leading-relaxed">
                    Focusing on <span className="font-bold">{goals.length > 0 ? goals.join(', ') : 'holistic wellness'}</span>
                    {diets.length > 0 && <span> with <span className="font-bold">{diets.join(', ')}</span> preferences.</span>}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-14 pt-8 border-t border-stone-100/50 flex justify-between items-center">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-[10px] uppercase tracking-widest text-stone-400 font-bold hover:text-stone-800 transition-colors"
              >
                ← Go Back
              </button>
            ) : <div />}

            <button
              onClick={() => step < 3 ? setStep(step + 1) : handleComplete()}
              disabled={loading || (step === 1 && goals.length === 0)}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl text-[10px] uppercase tracking-widest active:scale-[0.98] disabled:bg-stone-200 disabled:shadow-none flex items-center gap-2"
            >
              {loading ? 'Curating...' : step === 3 ? 'Enter Kitchen' : 'Next Step'}
              {!loading && step < 3 && <span>→</span>}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
