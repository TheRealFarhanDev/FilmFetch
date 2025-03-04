  import { useEffect, useState } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import SkeletonMovieInfo from '../components/SkeletonMovieInfo';

  function MovieInfo() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    };

    const BASE_URL = 'https://api.themoviedb.org/3';

    useEffect(() => {
      const fetchMovie = async () => {
        const response = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, options);
        const data = await response.json();

        setMovie(data);
      };
      fetchMovie();
    }, [id]);

    if (!movie) {
      return <SkeletonMovieInfo className='flex justify-center align-middle' />;
    }

    const formatRevenue = (num) => {
      return num >= 1e6 ? `$${(num / 1e6).toFixed(1)}M` : `$${num.toLocaleString()}`;
    };

    return (
      <div className="bg-[#030014] min-h-screen text-white flex justify-center items-start">
        <div className="min-w-[90%] mx-12 my-7  sm:my-14 sm:mx-24 bg-[#0F0D23] rounded-xl h-auto flex flex-col md:flex-row shadow-[0px_12px_32px_0px_rgba(206,206,251,0.02)_inset,0px_0px_100px_0px_rgba(171,139,255,0.30)] ring-1 ring-white/20">
          <div className="content p-6 md:p-12 w-full flex flex-col justify-between gap-3.5 md:gap-6">
            <div className="head flex justify-between w-full items-start min-h-12 md:h-24">
              <div className="title flex flex-col gap-2 md:gap-4 transition">
                <h1 className='font-bold text-xl md:text-4xl transition'>{movie.title}</h1>
                <span className='text-sm md:text-lg flex items-center gap-2.5 text-[#A8B5DB] font-light transition'>
                  <span>{movie.release_date.split('-')[0] || 'N/A'}</span>
                  <span>•</span>
                  <span>{Math.floor(`${movie.runtime}` / 60)}h {movie.runtime % 60}m</span>
                </span>
              </div>
              <div className="self-auto btn bg-[#221F3D] inline-flex px-3 py-1.5 md:px-4 md:py-2 gap-1 font-semibold items-center rounded-md w-auto max-w-max transition">
                <img className='self-start mt-1  md:mt-0 md:self-center w-4 h-4' src="/star.png" alt="" />
                <p>{movie.vote_average}<span className='text-[#A8B5DB]'>/10 ({movie.vote_count.toLocaleString()})</span></p>
              </div>
            </div>
            <div className="img grid auto-rows-auto md:grid-cols-4 gap-3 md:gap-4 overflow-auto md:max-w-[1000px] md:max-h-[441px] transition mx-auto">
              <img className='rounded-lg w-full h-full md:col-span-1 md:w-[302px] object-cover' src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `/No-Poster-vertical.png`} alt="movie image" />
              <img className='rounded-lg w-full h-full md:col-span-3 md:w-[772px] object-top object-contain' src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : `/No-Poster-horizontal.png`} alt="movie image" />
            </div>
            <section className='flex justify-between w-full gap-5'>
              <div className="info md:max-w-[800px] flex flex-wrap">

                {/* genres section */}

                <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-0 min-h-8 mb-3 md:mb-5'>

                  <div className='min-w-12 md:min-w-36 text-[#A8B5DB] font-normal text-sm md:text-lg inline'>
                    Genres
                  </div>
                  <div className='flex gap-2 flex-wrap'>
                    {movie.genres.map((genre, index) => (
                      <span key={index} className='self-start py-1 px-1.5 md:py-2 md:px-4 bg-[#221F3D] rounded-md transition'>{genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* overview section*/}

                <div className='flex flex-col md:flex-row md:items-start gap-2 md:gap-0 min-h-8 mb-3 md:mb-5'>
                  <div className='min-w-12 md:min-w-36 text-[#A8B5DB] font-normal text-sm md:text-lg'>Overview</div>
                  <p>
                    {movie.overview}
                  </p>
                </div>

                {/* Release Date */}
                <div className='flex flex-col w-full md:flex-row md:items-start gap-2 md:gap-0 min-h-8 mb-3 md:mb-5'>
                  <div className='w-full min-w-12 md:max-w-36 text-[#A8B5DB] font-normal text-sm md:text-lg'>
                    Release Date
                  </div>
                  <div className='w-full'>
                    <p className='font-normal md:font-semibold text-sm md:text-lg text-[#D6C7FF]'>
                      {movie.release_date}
                    </p>
                  </div>
                </div>

                {/* Countries */}
                <div className='flex flex-col w-full md:flex-row md:items-start gap-2 md:gap-0 min-h-8 mb-3 md:mb-5'>
                  <div className='w-full min-w-12 md:max-w-36 text-[#A8B5DB] font-normal text-sm md:text-lg'>
                    Countries
                  </div>
                  <div className='w-full'>
                    <p className='font-normal md:font-semibold text-sm md:text-lg text-[#D6C7FF]'>
                      {movie.production_countries.map((country) => country.name).join("  •  ") || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className='flex flex-col w-full md:flex-row md:items-start gap-2 md:gap-0 min-h-8 mb-3 md:mb-5'>
                  <div className='w-full min-w-12 md:max-w-36 text-[#A8B5DB] font-normal text-sm md:text-lg'>
                    Status
                  </div>
                  <div className='w-full'>
                    <p className='font-normal md:font-semibold text-sm md:text-lg text-[#D6C7FF]'>
                      {movie.status}
                    </p>
                  </div>
                </div>

                {/* Countries */}
                <div className='flex flex-col w-full md:flex-row md:items-start gap-2 md:gap-0 min-h-8 mb-3 md:mb-5'>
                  <div className='w-full min-w-12 md:max-w-36 text-[#A8B5DB] font-normal text-sm md:text-lg'>
                    Language
                  </div>
                  <div className='w-full'>
                    <p className='font-normal md:font-semibold text-sm md:text-lg text-[#D6C7FF]'>
                      {movie.spoken_languages.map((language) => language.english_name).join("  •  ") || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Revenue */}
                <div className='flex flex-col w-full md:flex-row md:items-start gap-2 md:gap-0 min-h-8 mb-3 md:mb-5'>
                  <div className='w-full min-w-12 md:max-w-36 text-[#A8B5DB] font-normal text-sm md:text-lg'>
                    Revenue
                  </div>
                  <div className='w-full'>
                    <p className='font-normal md:font-semibold text-sm md:text-lg text-[#D6C7FF]'>
                      {movie.revenue
                        ? formatRevenue(movie.revenue)
                        : "N/A"
                      }
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className='flex flex-col w-full md:flex-row md:items-start gap-2 md:gap-0 min-h-8 mb-3 md:mb-5'>
                  <div className='w-full min-w-12 md:max-w-36 text-[#A8B5DB] font-normal text-sm md:text-lg'>
                    Tagline
                  </div>
                  <div className='w-full'>
                    <p className='font-normal md:font-semibold text-sm md:text-lg text-[#D6C7FF]'>
                      {movie.tagline
                        ? movie.tagline
                        : "N/A"
                      }
                    </p>
                  </div>
                </div>

                {/*Production Companies */}
                <div className='flex flex-col w-full md:flex-row md:items-start gap-2 md:gap-0 min-h-8 '>
                  <div className='w-full min-w-12 md:max-w-36 text-[#A8B5DB] font-normal text-sm md:text-lg'>
                    Production Companies
                  </div>
                  <div className='w-full'>
                    <p className='font-normal md:font-semibold text-sm md:text-lg text-[#D6C7FF] '>
                      {movie.production_companies.map((company) => company.name).join("  •  ") || "N/A"}
                    </p>
                  </div>
                </div>

              </div>

              <button onClick={() => navigate(-1)} className='self-start text-sm md:text-base font-semibold text-center text-[#121212] py-2 px-5 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] rounded-md flex items-center gap-1'>
                Visit Homepage
                <img className='w-4 h-4 md:w-6 md:h-6 filter grayscale invert' src="/arrow-right-tiny.png" alt="left arrow" />
              </button>
            </section>
          </div>
        </div>
      </div>
    );
  }

  export default MovieInfo;
