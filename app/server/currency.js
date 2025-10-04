// Next.js Server Action: Currency & Country API Integration
export async function getCountriesAndCurrencies() {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,currencies');
    return await res.json();
}

export async function getExchangeRates(baseCurrency) {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    return await res.json();
}
