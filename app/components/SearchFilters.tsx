'use client';

import { useState } from 'react';

interface SearchFiltersProps {
  onSearch: (filters: {
    search: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
    fuelType: string;
    sortBy: 'price_asc' | 'price_desc' | '';
  }) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      search,
      brand,
      minPrice: Number(minPrice) || 0,
      maxPrice: Number(maxPrice) || 1000000,
      fuelType,
      sortBy: sortBy as 'price_asc' | 'price_desc' | '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded bg-white text-gray-900"
        />
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-white text-gray-900"
        >
          <option value="">All Brands</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Ford">Ford</option>
          <option value="BMW">BMW</option>
          <option value="Mercedes">Mercedes</option>
        </select>
        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-white text-gray-900"
        >
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-white text-gray-900"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-white text-gray-900"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-white text-gray-900"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>
  );
} 