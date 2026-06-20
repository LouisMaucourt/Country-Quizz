import { QuizzEndScreen } from '@/components/ui/QuizzEndScreen'
import { QuizzProgress } from '@/components/ui/QuizzProgress'
import { QuizzSidebar } from '@/components/ui/QuizzSidebar'
import { Toast } from '@/components/ui/Toast'
import { randomData } from '@/utilis/randomData'
import { showPopulationNumber } from '@/utilis/showPopulationNb'
import { useEffect, useRef, useState } from 'react'

export const Population = () => {
  const [toast, setToast] = useState<{ message: string; variant: "success" | "fail"; flag?: string } | null>(null)
  const [question, setQuestion] = useState<any[]>([])
  const [correct, setCorrect] = useState<any | null>(null)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)
  const [locked, setLocked] = useState(false)

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = 10
  const duration = 2500

  const onRestart = () => {
    setScore(0)
    setHistory([])
    setFinished(false)
    setLocked(false)
    generateQuestion()
  }

  const generateQuestion = () => {
    const data = randomData(4)

    let biggest = data[0]
    for (let i = 1; i < data.length; i++) {
      if (data[i].population > biggest.population) {
        biggest = data[i]
      }
    }

    setQuestion(data)
    setCorrect(biggest)
  }

  const handleClick = (p: any) => {
    if (locked) return
    setLocked(true)

    const isCorrect = p.name === correct?.name
    const newHistory = [...history, isCorrect]
    setHistory(newHistory)

    if (isCorrect) {
      setScore(prev => prev + 1)
      setToast({
        message: `Correct ! ${correct.name} avec ${showPopulationNumber(correct.population)} habitants`,
        variant: "success",
        flag: correct.flag,
      })
    } else {
      setToast({
        message: `Raté, c'était ${correct?.name} (${showPopulationNumber(correct.population)})`,
        variant: "fail",
        flag: correct?.flag,
      })
    }

    timeoutRef.current = setTimeout(() => {
      if (newHistory.length >= total) {
        setFinished(true)
      } else {
        generateQuestion()
        setLocked(false)
      }
    }, duration)
  }

  useEffect(() => {
    generateQuestion()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  if (finished) {
    return <QuizzEndScreen score={score} total={total} onRestart={onRestart} />
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-neutral-950">
      <QuizzSidebar score={score} history={history} />

      <main className="flex-1 min-w-0 h-screen flex flex-col px-6 py-5 gap-4">
        <div className="shrink-0">
          <QuizzProgress total={total} history={history} />
        </div>

        <div className="text-center shrink-0">
          <p className="text-xs uppercase tracking-widest text-neutral-400">
            Quel pays a
          </p>
          <h2 className="text-2xl font-bold text-white mt-1">la plus grande population ?</h2>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4">
          {question.map((p) => (
            <button
              key={p.name}
              onClick={() => handleClick(p)}
              disabled={locked}
              className={`relative w-full h-full overflow-hidden rounded-2xl group border border-white/10 transition-transform duration-150 ${locked ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:scale-[1.02] active:scale-[0.97]"
                }`}
            >
              <img
                src={p.flag}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </main>

      {toast && (
        <Toast
          duration={duration}
          onClose={() => setToast(null)}
          variant={toast.variant}
        >
          <img src={toast.flag} alt="flag" className="w-16 h-16 rounded-xl object-cover" />
          {toast.message}
        </Toast>
      )}
    </div>
  )
}