import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='bg-zinc-800 px-4 lg:px-10 flex items-center justify-center'>
      <div className='flex flex-col items-center gap-5 py-20 text-center max-w-3xl'>
        
        <h2 className='text-4xl lg:text-6xl my-3 font-bold leading-snug uppercase text-white'>
          Find Your Favorite
          <br />
          <span className='text-zinc-900'>Book Here!</span>
        </h2>

        <p className='text-lg lg:text-xl text-zinc-300 max-w-2xl'>
          Dive into a world of endless stories, where every page holds a new adventure. Browse through our shelves and discover treasures waiting to be explored. From bestsellers to hidden gems, our collection spans genres and cultures, promising a literary journey like no other.
        </p>

        {/* Button */}
        <Link to="/all-books" className='block mt-6'>
          <button className='bg-zinc-900 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-black transition-all duration-300'>
            EXPLORE NOW
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Hero