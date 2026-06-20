export const showPopulationNumber= (number: number) => {
    if (number > 1_000_000) {
        return (number / 1_000_000).toFixed(1) + "M"
    }
    return Intl.NumberFormat('fr-FR').format(number)
}