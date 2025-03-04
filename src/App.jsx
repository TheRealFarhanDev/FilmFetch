import './App.css'
import HeroImage from './components/HeroImage'
import HeroTitle from './components/HeroTitle'
import Logo from './components/Logo'
import Search from './components/Search'
import Card from './components/Card'
import SkeletonCard from './components/SkeletonCard'
import MovieInfo from './pages/MovieInfo'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import { Routes, Route} from 'react-router-dom'

function App() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [isLoading, setIsLoading] = useState(true)
  const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const BASE_URL = 'https://api.themoviedb.org/3';

  const fetchData = async (page, query = '') => {
    setIsLoading(true)
    const url = query ?
      `${BASE_URL}/search/movie?query=${query}&language=en-US&page=${page}`
      :
      `${BASE_URL}/movie/popular?language=en-US&page=${page}`;
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('Network Isuue')
      }
      const data = await response.json();
      setMovies(data.results)
      setPage(data.page)

    } catch (error) {
      console.error('Error fetchinf Data:', error);


    } finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    fetchData(page, debouncedSearch);
  }, [page, debouncedSearch])


  return (
    <>
      <Routes>
        <Route path='/' element={
          <div className='bg-[url(/BG.png)] bg-top bg-contain bg-no-repeat min-h-screen bg-[#030014] font-sans'>
            <Logo />
            <HeroImage />
            <HeroTitle />
            <Search search={search} setSearch={setSearch} />

            <div className='container mx-auto p-4 md:px-6 mt-3'>
              <h1 className='font-bold text-white text-2xl'>Popular</h1>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  mt-5'>
                {isLoading
                  ? Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className="h-fit">
                      <SkeletonCard />
                    </div>
                  ))
                  : movies.length > 0
                    ? movies.map((movie) => (
                      <div key={movie.id} className="h-fit">
                        <Card movie={movie} />
                      </div>
                    ))
                    : <h2 className=" text-white font-bold mx-20 w-full inline-flex mb-20 text-center">No Movies Found</h2>
                }
              </div>
            </div>
            {movies.length > 0 ? (
              <div className="actions container mx-auto flex justify-around py-5 items-center">
                <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)} className='cursor-pointer bg-[#0F0D23] p-4 rounded-lg'><img src="/arrow-left-tiny.svg" alt="" /></button>
                <h4 className='text-white'>{page}/50</h4>
                <button disabled={page >= 50} onClick={() => setPage((prev) => prev + 1)} className='cursor-pointer bg-[#0F0D23] p-4 rounded-lg'><img src="/arrow-right-tiny.png" alt="" /></button>
              </div>) : ''}
          </div>
        }
        />
        <Route path='/movie/:id' element={<MovieInfo />} />
      </Routes>
    </>
  )
}

export default App 
