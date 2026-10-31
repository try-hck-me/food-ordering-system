// src/components/Carousel.jsx

import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative  mx-auto">
      <div className="overflow-hidden relative  ">
        {/* Image Slides */}
        <div
          className="whitespace-nowrap transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="inline-block w-full object-cover mx-auto my-auto"
            />
          ))}
        </div>

        {/* Previous and Next Buttons */}
        <button
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black text-white pb-1 px-3 rounded-full focus:outline-none text-3xl"
          onClick={prevSlide}
        >
         &lt;
        </button>
        <button
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black  text-white pb-1 px-3 rounded-full focus:outline-none text-3xl"
          onClick={nextSlide}
        >
          &gt;
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer h-2 w-2 rounded-full ${
                index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
