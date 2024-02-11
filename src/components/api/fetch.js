const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = import.meta.env.VITE_API_BASE_URL

function getWeatherByCords (lat, lon) {
  return fetch(`${baseUrl}?endpoint=weather&lat=${lat}&lon=${lon}&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getForecastByCords (lat, lon) {
  return fetch(`${baseUrl}?endpoint=forecast&lat=${lat}&lon=${lon}&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getWeather (place) {
  return fetch(`${baseUrl}?endpoint=weather&place=${place}&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getForecast (place) {
  return fetch(`${baseUrl}?endpoint=forecast&place=${place}&api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

export {
  getWeather,
  getForecast,
  getWeatherByCords,
  getForecastByCords
}
