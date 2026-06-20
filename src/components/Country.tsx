import { useCountry } from '@/hooks/useCountry'


export const Country = () => {
    const { data, loading, error } = useCountry()
    
    if (loading) return <>Loading...</>
    if (error) return <>error {error}</>
    if (!data.length) return <>no data cheh</>
    console.log(data)
}
