import { randomData } from "@/utilis/randomData"
import { useState } from "react"

const MAX_QUESTIONS = 10
export const useQuizz = () => {
        const [question, setQuestion] = useState<any[]>([])
        const [correct, setCorrect] = useState<any | null>(null)
        const [score, setScore] = useState(0)
        const [history, setHistory] = useState<boolean[]>([])
        const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
        const [locked, setLocked] = useState(false)
        const [finished, setFinished] = useState(false)
        const [animMap, setAnimMap] = useState<Record<string, 'correct' | 'wrong'>>({})
    
        const generateQuestion = () => {
            const data = randomData(4)
            const good = data[Math.floor(Math.random() * data.length)]
            setQuestion(data)
            setCorrect(good)
            setFeedback(null)
            setAnimMap({})
            setLocked(false)
        }
    const handleAnswer = (country: any) => {
            if (locked) return
            setLocked(true)
    
            const isCorrect = country.name === correct?.name
            const newHistory = [...history, isCorrect]
            setHistory(newHistory)
    
            const newAnim: Record<string, 'correct' | 'wrong'> = {}
            newAnim[correct.name] = 'correct'
            if (!isCorrect) newAnim[country.name] = 'wrong'
            setAnimMap(newAnim)
    
            setFeedback(isCorrect
                ? { msg: '✓  Bonne réponse !', type: 'success' }
                : { msg: `✗  C'était ${correct?.name}`, type: 'error' }
            )
            if (isCorrect) setScore(prev => prev + 1)
    
            setTimeout(() => {
                if (newHistory.length >= MAX_QUESTIONS) setFinished(true)
                else generateQuestion()
            }, 1400)
    }
    const restart = () => {
        setScore(0); setHistory([]); setFinished(false); generateQuestion()
    }
    return {
        question, correct, score, history,
        feedback, locked, finished, animMap,
        setFinished, generateQuestion, handleAnswer, restart,
        MAX_QUESTIONS
    }

}