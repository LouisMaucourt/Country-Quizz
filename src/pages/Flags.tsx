import { QuizzEndScreen } from '@/components/ui/QuizzEndScreen'
import { QuizzProgress } from '@/components/ui/QuizzProgress'
import { QuizzSidebar } from '@/components/ui/QuizzSidebar'
import { Toast } from '@/components/ui/Toast'
import { randomData } from '@/utilis/randomData'
import React, { useEffect, useState } from 'react'

export const Flags = () => {
    const [toast, setToast] = useState<{ message: string; variant: "success" | "fail"; flag?: string } | null>(null)
    const total = 10
    const [question, setQuestion] = useState<any[]>([])
    const [correct, setCorrect] = useState<any | null>(null)
    const [score, setScore] = useState(0)
    const [history, setHistory] = useState<boolean[]>([])
    const [finished, setFinished] = useState(false)
    const [locked, setLocked] = useState(false)

    const onRestart = () => {
        setScore(0)
        setHistory([])
        setFinished(false)
        generateQuestion()
    }

    const duration = 2000
    const generateQuestion = () => {
        const random = randomData(4)
        const good = random[Math.floor(Math.random() * random.length)]
        setQuestion(random)
        setCorrect(good)
    }
    const handleClick = (country: any) => {
        if (locked) return
        setLocked(true)
    const isCorrect = country.name === correct?.name
    const newHistory = [...history, isCorrect]

    setHistory(newHistory)

    if (isCorrect) {
        setScore(prev => prev + 1)
        setToast({
            message: "Bravo !",
            variant: "success",
            flag: correct.flag
        })
    } else {
        setToast({
            message: `Raté, c'était ${correct?.name}`,
            variant: "fail",
            flag: correct.flag
        })
    }

    setTimeout(() => {
        if (newHistory.length >= total) {
            setFinished(true)
        } else {
            generateQuestion()
        }
        setLocked(false)
    }, duration)
}

    useEffect(() => {
        generateQuestion()
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
                        Quel est le drapeau de
                    </p>
                    <h2 className="text-2xl font-bold text-white mt-1">{correct?.name}</h2>
                </div>

                <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-4">
                    {question.map((f: any) => (
                        <button
                            key={f.name}
                            onClick={() => handleClick(f)}
                            className={`relative w-full h-full overflow-hidden rounded-2xl cursor-pointer group border border-white/10 transition-transform duration-150
                                ${locked ? "pointer-events-none opacity-60" : "hover:scale-[1.02] active:scale-[0.97]"}`}
                        >
                            <img
                                src={f.flag}
                                alt={f.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        </button>
                    ))}
                </div>
            </main>

            {toast && (
                <div className="fixed bottom-6 right-6 z-50">
                    <Toast
                        duration={duration}
                        onClose={() => setToast(null)}
                        variant={toast.variant}
                        className="min-w-3xs"
                    >
                        <div className="flex flex-col justify-center items-center gap-3">
                        <img src={toast.flag} alt="flag" className="size-80  rounded object-fill" />
                            {toast.message}
                        </div>
                    </Toast>
                </div>
            )}
        </div>
    )
}