import { useEffect, useState } from 'react'
import { ArrowIcon, LocationIcon, SignalIcon } from './components/Icons'
import { Search } from './components/Search'
import { getForecast, getForecastByCords, getWeather, getWeatherByCords } from './components/api/fetch'
import { addPlaceToLocalStorage } from './utils/storage'

function App () {
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    dateFormat: '',
    windStatus: 0,
    humidity: 0,
    airPressure: 0,
    visibilityInMiles: 0,
    weather: '',
    locationName: ''
  })
  const [forecastData, setForecastData] = useState({})
  const [keys, setKeys] = useState([])

  const changeWeather = (data) => {
    const { weather, main, visibility, wind, name } = data
    const date = new Date() // Obtener la fecha actual
    const dateOptions = { weekday: 'short', day: 'numeric', month: 'short' }

    setWeatherData({
      // weather: weather.main ?? 'Shower',
      temp: Math.round(main?.temp ?? 0),
      dateFormat: date.toLocaleDateString('en-US', dateOptions),
      windStatus: Math.round(wind?.speed ?? 0),
      humidity: Math.round(main?.humidity ?? 0),
      airPressure: main?.pressure ?? 0,
      visibilityInMiles: visibility ? visibility / 1609.34 : 0,
      weather: weather[0]?.main ?? 'Shower',
      locationName: name
    })
    const progreso = document.getElementById('progress')
    const windStatus = document.getElementById('windStatus')
    progreso.style.width = Math.round(main?.humidity ?? 0) + '%'
    windStatus.style.transform = `rotate(${wind.deg}deg)`
  }

  const changeForecast = (data) => {
    const dailyForecast = []

    // Iterar sobre cada segmento de tiempo en el pronóstico extendido
    data.list.forEach(segment => {
      const fechaTexto = segment.dt_txt
      const fecha = new Date(fechaTexto)
      const dia = fecha.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
      // Si es un nuevo día, inicializar el objeto para ese día
      if (!dailyForecast[dia]) {
        dailyForecast[dia] = {
          minTemp: segment.main.temp,
          maxTemp: segment.main.temp,
          weather: segment.weather[0].main
        }
      } else {
        // Actualizar las temperaturas mínima y máxima si corresponde
        dailyForecast[dia].minTemp = Math.min(dailyForecast[dia].minTemp, segment.main.temp)
        dailyForecast[dia].maxTemp = Math.max(dailyForecast[dia].maxTemp, segment.main.temp)
      }
    })
    const dayKeys = Object.keys(dailyForecast)
    setForecastData(dailyForecast)
    setKeys(dayKeys)
  }

  const cords = () => {
    // Verificar si el navegador soporta la geolocalización
    if ('geolocation' in navigator) {
      // Obtener la ubicación actual del usuario
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        // Llamar a una función para obtener datos del clima, por ejemplo
        getWeatherByCords(lat, lon)
          .then(data => changeWeather(data))
        getForecastByCords(lat, lon)
          .then(data => changeForecast(data))
      })
    } else {
      // El navegador no soporta la geolocalización
      console.log('La geolocalización no está disponible en este navegador.')
    }
  }

  const inputSearch = (place) => {
    addPlaceToLocalStorage(place)
    getWeather(place)
      .then(data => changeWeather(data))
    getForecast(place)
      .then(data => changeForecast(data))
  }

  useEffect(() => {
    getWeather('mexico')
      .then(data => changeWeather(data))
    getForecast('mexico')
      .then(data => changeForecast(data))
  }, [])

  return (
    <main className='md:flex max-w-8xl mx-auto'>
      <section className='md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[400px] relative'>
        <Search inputSearch={inputSearch} />
        <article className='px-4 py-20 bg-blue-1 h-screen '>
          <button className='absolute top-6 right-4 bg-gray-3 rounded-full p-3 ' onClick={cords}>
            <SignalIcon />
          </button>
          <div className='flex flex-col items-center'>
            <img className='w-36' src={`/${weatherData.weather}.png`} alt={`/${weatherData.weather}`} />
            <p className='text-[144px] font-medium'>{weatherData.temp}<span className='text-gray-2 text-5xl'>°C</span></p>
            <p className='text-gray-2 text-4xl font-semibold pb-12'>{weatherData.weather}</p>
            <div className='flex gap-4 text-gray-2 text-lg font-medium pb-6'>
              <span>Today</span>
              <span>•</span>
              <span>{weatherData.dateFormat}</span>
            </div>
            <div className='flex gap-3'>
              <LocationIcon />
              <p className='text-gray-2 text-lg font-semibold'>{weatherData.locationName}</p>
            </div>
          </div>
        </article>
      </section>
      <section className='md:flex-1 md:pl-[400px] md:m-20'>
        <section className='p-12 md:p-0 md:pb-12 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7'>

          {
        keys.slice(0, 5).map((day) => {
          const minTemp = Math.floor(forecastData[day].minTemp)
          const maxTemp = Math.floor(forecastData[day].maxTemp)
          const weather = forecastData[day].weather
          return (
            <article className='flex flex-col items-center bg-blue-1 py-4 px-5 m-auto ' key={day}>
              <p className='text-base font-medium pb-3'>{day}</p>
              <img className='w-14 pb-8' src={`/${weather}.png`} alt={`/${weather}.png`} />
              <div className='flex gap-8'>
                <span>{maxTemp}°C</span>
                <span className='text-gray-2'>{minTemp}°C</span>
              </div>
            </article>
          )
        })
      }
        </section>
        <section className='p-5'>
          <h3 className='text-2xl font-bold pb-8'>Today’s Hightlights </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <article className='flex flex-col items-center bg-blue-1 w-full p-6'>
              <p className='text-base font-medium pb-2'>Wind status</p>
              <p className='text-6xl font-bold'>{weatherData.windStatus}<span className='text-5xl font-medium'>mph</span></p>
              <div className='flex items-center pt-5 gap-4'>
                <span id='windStatus' className='bg-gray-4 p-3 rounded-full'><ArrowIcon /></span>
                <span>WSW</span>
              </div>
            </article>
            <article className='flex flex-col items-center bg-blue-1 w-full py-6 px-12'>
              <p className='text-base font-medium pb-2'>Humidity</p>
              <p className='text-6xl font-bold'>{weatherData.humidity}<span className='text-5xl font-medium'>%</span></p>
              <div className='flex justify-between w-full pt-4'>
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
              <div className='w-full h-2 bg-gray-1 rounded-full overflow-hidden'>
                <div id='progress' className='h-full bg-yellow-1 transition-all duration-300' />
              </div>
              <span className='flex justify-end w-full'>%</span>
            </article>
            <article className='flex flex-col items-center bg-blue-1 w-full p-6'>
              <p className='text-base font-medium pb-2'>Visibility</p>
              <p className='text-6xl font-bold'>{weatherData.visibilityInMiles.toFixed(1)} <span className='text-5xl font-medium'>miles</span></p>
            </article>
            <article className='flex flex-col items-center bg-blue-1 w-full p-6'>
              <p className='text-base font-medium pb-2'>Air Pressure</p>
              <p className='text-6xl font-bold'>{weatherData.airPressure} <span className='text-5xl font-medium'>mb</span></p>
            </article>
          </div>

        </section>
        <footer className='text-sm font-medium text-center p-8'>created by <span className='font-bold'>Quiiroz</span> - devChallenges.io</footer>
      </section>
    </main>
  )
}

export default App
