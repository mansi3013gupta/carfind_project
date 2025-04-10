'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CarCard from '../components/CarCard';

interface Car {
  id: number;
  name: string;
  brand: string;
  price: number;
  fuelType: string;
  image: string;
  seats: number;
}

export default function Wishlist() {
  const [wishlistCars, setWishlistCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistCars();
  }, []);

  const fetchWishlistCars = async () => {
    setLoading(true);
    try {
      // Get wishlist from localStorage
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      // In a real application, this would be an API call to fetch cars by IDs
      // For now, we'll use mock data
      const mockCars: Car[] = [
        {
          id: 1,
          name: 'Toyota Camry',
          brand: 'Toyota',
          price: 25000,
          fuelType: 'Petrol',
          image: '/toyota-camry.jpg',
          seats: 5,
        },
        {
          id: 2,
          name: 'Honda Civic',
          brand: 'Honda',
          price: 22000,
          fuelType: 'Petrol',
          image: '/honda-civic.jpg',
          seats: 5,
        },
      ];

      // Filter mock cars based on wishlist IDs
      const filteredCars = mockCars.filter(car => wishlist.includes(car.id));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWishlistCars(filteredCars);
    } catch (error) {
      console.error('Error fetching wishlist cars:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : wishlistCars.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Your wishlist is empty. Start adding cars to your wishlist!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
} 