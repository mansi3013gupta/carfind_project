'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Car {
  id: number;
  name: string;
  brand: string;
  price: number;
  fuelType: string;
  image: string;
  seats: number;
}

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.includes(car.id));
  }, [car.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const newWishlist = isInWishlist
      ? wishlist.filter((id: number) => id !== car.id)
      : [...wishlist, car.id];
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsInWishlist(!isInWishlist);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      {/* Image Section */}
      <div className="relative">
        <img
          src={car.image || '/placeholder-car.jpg'}
          alt={car.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          {car.name}
        </h3>
        <p className="text-gray-600 mb-2">{car.brand}</p>
        
        {/* Price and Specifications */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            ${car.price.toLocaleString()}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {car.fuelType}
            </span>
            <span className="text-sm text-gray-500">
              {car.seats} seats
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          href={`/cars/${car.id}`}
          className="mt-4 block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
