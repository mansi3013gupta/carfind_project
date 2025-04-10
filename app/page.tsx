'use client';

import { useState, useEffect } from 'react';
import SearchFilters from './components/SearchFilters';
import CarCard from './components/CarCard';
import Layout from './components/Layout';

interface Car {
  id: number;
  name: string;
  brand: string;
  price: number;
  fuelType: string;
  image: string;
  seats: number;
}

interface Filters {
  search: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  fuelType: string;
  sortBy: 'price_asc' | 'price_desc' | '';
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async (filters: Partial<Filters> = {}) => {
    setLoading(true);
    try {
      // In a real application, this would be an API call
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
        // Add more mock cars as needed
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Apply filters
      let filteredCars = [...mockCars];
      if (filters.brand) {
        filteredCars = filteredCars.filter(car => car.brand === filters.brand);
      }
      if (filters.fuelType) {
        filteredCars = filteredCars.filter(car => car.fuelType === filters.fuelType);
      }
      if (filters.minPrice !== undefined) {
        filteredCars = filteredCars.filter(car => car.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice!);
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredCars = filteredCars.filter(
          car => car.name.toLowerCase().includes(searchTerm) ||
                 car.brand.toLowerCase().includes(searchTerm)
        );
      }
      if (filters.sortBy === 'price_asc') {
        filteredCars.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price_desc') {
        filteredCars.sort((a, b) => b.price - a.price);
      }

      setCars(filteredCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters: Filters) => {
    setCurrentPage(1);
    fetchCars(filters);
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

  return (
    <Layout>
      <div className="space-y-8">
        <SearchFilters onSearch={handleSearch} />
        
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            
            {cars.length === 0 && (
              <div className="text-center py-8">
                No cars found matching your criteria.
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
