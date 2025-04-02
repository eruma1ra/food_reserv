
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import RestaurantCard from '@/components/RestaurantCard';
import RestaurantFilters from '@/components/RestaurantFilters';
import { useToast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';

export type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  priceLevel: string;
  image: string;
  address: string;
  openHours: string;
};

// Sample restaurant data
const initialRestaurants = [
  {
    id: 1,
    name: "Пушкин",
    cuisine: "Русская",
    rating: 4.8,
    priceLevel: "₽₽₽",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    address: "Москва, Тверской бульвар, 26А",
    openHours: "12:00 - 00:00"
  },
  {
    id: 2,
    name: "Сахалин",
    cuisine: "Морепродукты",
    rating: 4.7,
    priceLevel: "₽₽₽₽",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    address: "Москва, Смоленская площадь, 3",
    openHours: "12:00 - 00:00"
  },
  {
    id: 3,
    name: "Белуга",
    cuisine: "Русская, Европейская",
    rating: 4.9,
    priceLevel: "₽₽₽₽",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    address: "Москва, ул. Моховая, 15/1",
    openHours: "12:00 - 00:00"
  },
  {
    id: 4,
    name: "Северяне",
    cuisine: "Скандинавская",
    rating: 4.5,
    priceLevel: "₽₽",
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    address: "Москва, Большая Никитская улица, 12",
    openHours: "12:00 - 00:00"
  },
  {
    id: 5,
    name: "Twins Garden",
    cuisine: "Современная русская",
    rating: 4.9,
    priceLevel: "₽₽₽₽",
    image: "https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    address: "Москва, Страстной бульвар, 8А",
    openHours: "18:00 - 00:00"
  },
  {
    id: 6,
    name: "Горыныч",
    cuisine: "Русская, Пиццерия",
    rating: 4.6,
    priceLevel: "₽₽₽",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    address: "Москва, Рождественский бульвар, 1",
    openHours: "12:00 - 00:00"
  }
];

export type FilterOptions = {
  search: string;
  location: string;
  cuisines: string[];
  priceRange: [number, number];
  sortBy: string;
};

const RestaurantsPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [restaurants] = useState<Restaurant[]>(initialRestaurants);
  
  // Parse query params to initialize filters
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const cuisineParam = searchParams.get('cuisine') || '';
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: searchQuery,
    location: '',
    cuisines: cuisineParam ? [cuisineParam] : [],
    priceRange: [1, 4],
    sortBy: 'rating'
  });
  
  const [visibleCount, setVisibleCount] = useState(4);

  // Apply filters to the restaurants
  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];
    
    // Filter by search term
    if (filterOptions.search) {
      const searchLower = filterOptions.search.toLowerCase();
      result = result.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchLower) ||
        restaurant.cuisine.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by location - improved
    if (filterOptions.location && filterOptions.location !== 'all') {
      // Map location values to actual city names in addresses
      const locationMappings = {
        'moscow': 'Москва',
        'spb': 'Санкт-Петербург',
        'kazan': 'Казань',
        'sochi': 'Сочи',
        'novosibirsk': 'Новосибирск'
      };
      
      const cityName = locationMappings[filterOptions.location as keyof typeof locationMappings];
      if (cityName) {
        result = result.filter(restaurant => 
          restaurant.address.includes(cityName)
        );
      }
    }
    
    // Filter by cuisine
    if (filterOptions.cuisines.length > 0) {
      result = result.filter(restaurant => {
        // Check if any of the selected cuisines match the restaurant's cuisine
        return filterOptions.cuisines.some(cuisine => 
          restaurant.cuisine.includes(cuisine)
        );
      });
    }
    
    // Filter by price range
    const [minPrice, maxPrice] = filterOptions.priceRange;
    result = result.filter(restaurant => {
      const priceCount = restaurant.priceLevel.length;
      return priceCount >= minPrice && priceCount <= maxPrice;
    });
    
    // Sort results
    switch (filterOptions.sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_asc':
        result.sort((a, b) => a.priceLevel.length - b.priceLevel.length);
        break;
      case 'price_desc':
        result.sort((a, b) => b.priceLevel.length - a.priceLevel.length);
        break;
      case 'popularity':
        // For demo purposes, we sort by id as a proxy for popularity
        result.sort((a, b) => a.id - b.id);
        break;
      default:
        break;
    }
    
    return result;
  }, [restaurants, filterOptions]);

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
    toast({
      title: "Фильтры применены",
      description: "Список ресторанов обновлен",
    });
  };

  const handleShowMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredRestaurants.length));
  };

  const displayedRestaurants = filteredRestaurants.slice(0, visibleCount);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-heading font-bold">Рестораны</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">Найдите и забронируйте столик в лучших ресторанах</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="md:w-1/4">
          <RestaurantFilters 
            initialFilters={filterOptions}
            onApplyFilters={handleApplyFilters}
          />
        </div>
        
        <div className="md:w-3/4">
          {displayedRestaurants.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <h3 className="text-lg md:text-xl font-medium mb-2">Рестораны не найдены</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Попробуйте изменить параметры фильтров</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {displayedRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          )}
          
          {visibleCount < filteredRestaurants.length && (
            <div className="mt-6 md:mt-8 flex justify-center">
              <Button variant="outline" onClick={handleShowMore} className="text-xs sm:text-sm">Показать ещё</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
