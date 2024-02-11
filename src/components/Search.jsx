import { useState, useEffect } from 'react'
import { ExitIcon, RightIcon, SearchIcon } from './Icons'
import { getPlacesFromLocalStorage } from '../utils/storage'

export function Search ({ inputSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchPlace, setSearchPlace] = useState('')
  const [places, setPlaces] = useState(null)

  const toggleMenu = () => {
    if (isMenuOpen) {
      document.body.classList.remove('no-scrollbar')
    } else {
      document.body.classList.add('no-scrollbar')
    }
    setIsMenuOpen(prev => !prev)
  }

  const search = (event) => {
    event.preventDefault()
    inputSearch(searchPlace)
  }

  const selectAndClose = (place) => {
    inputSearch(place)
    toggleMenu()
  }

  useEffect(() => {
    setPlaces(getPlacesFromLocalStorage())
  }, [])
  return (
    <header className='bg-blue-1'>
      <div className='py-6 px-4'>
        <button
          className='py-3 px-5 bg-gray-3'
          onClick={toggleMenu}
        >Seach for places
        </button>
      </div>
      <nav className={`${isMenuOpen ? 'fixed' : 'hidden'} top-0 left-0 right-0 bottom-0 md:w-[400px] bg-blue-1 text-center items-center justify-center z-50 overflow-auto no-scrollbar p-3`}>
        <button
          className='flex ml-auto p-4'
          onClick={toggleMenu}
        ><ExitIcon />
        </button>
        <form className='flex gap-3' onSubmit={search}>
          <div className='flex items-center gap-3 border w-full border-gray-1 pl-3 p-1'>
            <SearchIcon />
            <input
              className='bg-transparent w-full py-2 focus:outline-none'
              placeholder='Mexico'
              type='text'
              value={searchPlace}
              onChange={(event) => setSearchPlace(event.target.value)}
            />
          </div>
          <button type='submit' className='bg-blue-3 px-5 py-3'>Search</button>
        </form>
        <div className='flex flex-col py-10 gap-3'>
          {
            places?.map(place => (
              <button
                className='flex w-full px-3 py-6 border hover:border border-transparent hover:border-gray-1 group'
                key={place}
                onClick={() => selectAndClose(place)}
              >
                <p>{place}</p>
                <span className='ml-auto hidden group-hover:block'><RightIcon /></span>
              </button>
            ))
          }
        </div>
      </nav>
    </header>

  )
}
