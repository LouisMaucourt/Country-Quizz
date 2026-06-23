export const getCountries = async () => {
    const response = await fetch('/api/countries') 
    return response.json()
}