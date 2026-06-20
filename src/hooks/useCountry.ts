import { getCountries } from "@/services/countryApi"
import { useEffect, useState } from "react"
import { mapCountries } from "@/utilis/mapCountries"

export const CACHE_KEY = "countries"

export const useCountry = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {   
        const load = async () => {
            try {
                setLoading(true)
                setError(null)

                const cached = localStorage.getItem(CACHE_KEY)
                if (cached) {
                    setData(JSON.parse(cached))
                    setLoading(false)
                    return
                }
                const result = await getCountries()
                const cleanData = result.map(mapCountries)

                localStorage.setItem(CACHE_KEY, JSON.stringify(cleanData));
                setData(result);
            }
            catch (e:any) {
                setError(e.message)
            }
            finally {
                setLoading(false)
            }
        }
        load()
    }, [])
    return {data, loading, error}
}