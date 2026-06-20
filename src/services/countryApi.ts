export const getCountries = async () => {
    const apiKey = process.env.PUBLIC_API_KEY;
    if (!apiKey) return

    const response = await fetch(
        'https://api.restcountries.com/countries/v5?limit=100',
        { headers: { 'Authorization': apiKey } }
    );

    const json = await response.json();
    return json.data.objects;
}
