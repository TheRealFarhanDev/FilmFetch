import React from 'react'
import { Link } from 'react-router-dom'

const Card = React.memo(
    ({ movie }) => {
        return (
            <Link to={`/movie/${movie.id}`} className="block">
                <div className='bg-[#0F0D23] rounded-lg text-white p-2.5 flex flex-col items-start cursor-pointer'>
                    <img className='rounded-lg object-cover w-full h-[350px]' src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `/No-Poster-vertical.png`} alt="no poster" loading='lazy' />
                    <h1 className='font-bold my-3 text-xl'>{movie.title}</h1>
                    <div className='flex items-center gap-2 text-gray-400 text-lg'>
                        <div className='flex items-center gap-1'>
                            <img className='align-middle pb-0.5 w-4 h-4' src="/star.png" alt="star" />
                            <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                        </div>
                        <span>•</span>
                        <span>{movie.original_language.toUpperCase()}</span>
                        <span>•</span>
                        <span>{movie.release_date.split('-')[0] || 'N/A'}</span>
                    </div>
                </div>
            </Link>
        )
    }
)

export default Card
