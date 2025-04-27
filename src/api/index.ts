const apiKey = process.env.NEXT_PUBLIC_API_KEY
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

function getWeatherByCords (lat: number, lon: number) {
  return fetch(`${baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getForecastByCords (lat: number, lon: number) {
  return fetch(`${baseUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getWeather (place: string) {  
  return fetch(`${baseUrl}/weather?q=${place}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getForecast (place: string) {
  return fetch(`${baseUrl}/forecast?q=${place}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

export {
  getWeather,
  getForecast,
  getWeatherByCords,
  getForecastByCords
}
