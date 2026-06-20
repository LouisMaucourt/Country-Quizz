export const mapCountries = (country: any) => ({
    id: country.uuid,
    name: country.names.common,
    officialName: country.names.official,
    flag: country.flag?.url_svg || country.flag?.url_png,
    population: country.population,
    capital: country.capitals?.[0]?.name || "Unknown",
    region: country.region,
    subregion: country.subregion,
    lat: country.coordinates?.lat,
    lng: country.coordinates?.lng,
})