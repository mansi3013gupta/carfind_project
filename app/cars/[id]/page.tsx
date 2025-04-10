'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../components/Layout';

interface Car {
  id: number;
  name: string;
  brand: string;
  price: number;
  fuelType: string;
  image: string;
  seats: number;
  description: string;
  features: string[];
}

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    fetchCarDetails();
    checkWishlist();
  }, [id]);

  const fetchCarDetails = async () => {
    setLoading(true);
    try {
      // In a real application, this would be an API call
      // For now, we'll use mock data
      const mockCar: Car = {
        id: Number(id),
        name: 'Toyota Camry',
        brand: 'Toyota',
        price: 25000,
        fuelType: 'Petrol',
        image: '/toyota-camry.jpg',
        seats: 5,
        description: 'The Toyota Camry is a mid-size sedan that offers a comfortable ride, excellent fuel economy, and a spacious interior.',
        features: [
          'Apple CarPlay and Android Auto',
          'Lane Departure Warning',
          'Adaptive Cruise Control',
          'Blind Spot Monitoring',
          'Rear Cross Traffic Alert'
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCar(mockCar);
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.includes(Number(id)));
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const newWishlist = isInWishlist
      ? wishlist.filter((carId: number) => carId !== Number(id))
      : [...wishlist, Number(id)];
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsInWishlist(!isInWishlist);
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-8">Loading...</div>
      </Layout>
    );
  }

  if (!car) {
    return (
      <Layout>
        <div className="text-center py-8">Car not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={car.image || '/placeholder-car.jpg'}
              alt={car.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">{car.brand}</p>
              </div>
              <button
                onClick={toggleWishlist}
                className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                {isInWishlist ? '❤️' : '🤍'}
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${car.price.toLocaleString()}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-600 dark:text-gray-300">{car.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Fuel Type</p>
                  <p className="font-medium">{car.fuelType}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Seats</p>
                  <p className="font-medium">{car.seats}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-300">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 