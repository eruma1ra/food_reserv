
import React from 'react';
import { Button } from '@/components/ui/button';
import RestaurantCard from '@/components/RestaurantCard';
import RestaurantFilters from '@/components/RestaurantFilters';

const restaurants = [
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

const RestaurantsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold">Рестораны</h1>
        <p className="text-muted-foreground mt-2">Найдите и забронируйте столик в лучших ресторанах</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <RestaurantFilters />
        </div>
        
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline">Показать ещё</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
