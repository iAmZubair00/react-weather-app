/* const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = import.meta.env.VITE_API_BASE_URL */

const apiKey = process.env.REACT_APP_API_KEY
const baseUrl = process.env.REACT_APP_API_BASE_URL

function getWeatherByCords (lat, lon) {
  return fetch(`${baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getForecastByCords (lat, lon) {
  return fetch(`${baseUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getWeather (place) {  
  return fetch(`${baseUrl}/weather?q=${place}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => data)
}

function getForecast (place) {
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
