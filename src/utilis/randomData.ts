import { CACHE_KEY } from "@/hooks/useCountry"

export const randomData = (number: number) => {
    const raw = localStorage.getItem(CACHE_KEY)
    const data = raw ? JSON.parse(raw) : []
    const shuffled = data.sort(() => Math.random() - 0.5)
    
    return shuffled.slice(0, number)
}