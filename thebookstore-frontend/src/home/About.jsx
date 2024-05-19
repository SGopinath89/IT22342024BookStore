import React from 'react'

// ADD FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// IMPORT IMAGE
import devImage from '../assets/devImage.jpeg'

const About = () => {
  return (
    <div className='bg-gray-100 px-6 lg:px-24 py-40 flex flex-col items-center uppercase'>
      
      {/* DESCRIPTION */}
      <div className='text-center mb-10'>
        <p className='text-lg max-w-3xl'>
          Welcome to our bookstore! Our mission is to foster a love for reading by providing a wide range of books across different genres. We believe in the power of stories to inspire, 
          educate, and entertain.
        </p>
      </div>

      {/* DEVELOPER DETAILS */}
      <div className='text-center mb-10'>
        <h2 className='text-gray-900 text-3xl font-medium mb-5'>
          Developer:
        </h2>
        <div className='flex flex-col justify-center gap-8 items-center'>
          
          {/* DEVELOPER IMAGE */}
          <img src={devImage} alt="" className='w-32 h-32 rounded-full'/>
          
          {/* DEVELOPER DETAILS */}
          <h3 className='text-xl'>
            <a href="">Achira Wijesuriya</a>
          </h3>
          
          {/* SOCIAL ICONS */}
          <div className="flex mt-0  space-x-4">
              <a href="https://github.com/arwijesuriya" aria-label="GitHub" target='_blank'>
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="https://www.linkedin.com/in/arwijesuriya58/" aria-label="LinkedIn" target='_blank'>
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
            </div>
        </div>
      </div>
    </div>
  )
}

export default About