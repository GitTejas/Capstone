import React, { useContext  } from 'react';
import { AppContext } from './AppContext';

const Home = () => {
  const { currentIndex, images } = useContext(AppContext);

  // Generate a list of particles with random positions and sizes
  const particles = Array.from({ length: 20 }).map((_, index) => ({
    id: index,
    size: `${Math.random() * 5 + 5}px`,
    left: `${Math.random() * 100}vw`, 
    animationDelay: `${Math.random() * 10}s`, 
  }));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 px-4 relative overflow-hidden">
      
      {/* Animated Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white animate-bubble-fall opacity-80"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.left,
              animationDelay: particle.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Heading and Description */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 mb-6 animate-smooth-fade">
        Welcome to the Movie Rental App!
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl text-center leading-relaxed mb-8">
        This application allows users to browse a collection of movies, rent their favorites, and leave ratings and reviews. 
        Explore our collection and share your thoughts on the movies you love!
      </p>

      {/* Image Slider */}
      <div className="relative w-full h-64 overflow-hidden rounded-lg mb-8">
        <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out">
          {/* Loop through images */}
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Movie ${index + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
