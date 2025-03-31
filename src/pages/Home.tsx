import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Star, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import RestaurantCard from '@/components/RestaurantCard';

const featuredRestaurants = [{
  id: 1,
  name: "Пушкин",
  cuisine: "Русская",
  rating: 4.8,
  priceLevel: "₽₽₽",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  address: "Москва, Тверской бульвар, 26А",
  openHours: "12:00 - 00:00"
}, {
  id: 2,
  name: "Сахалин",
  cuisine: "Морепродукты",
  rating: 4.7,
  priceLevel: "₽₽₽₽",
  image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  address: "Москва, Смоленская площадь, 3",
  openHours: "12:00 - 00:00"
}, {
  id: 3,
  name: "Белуга",
  cuisine: "Русская, Европейская",
  rating: 4.9,
  priceLevel: "₽₽₽₽",
  image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  address: "Москва, ул. Моховая, 15/1",
  openHours: "12:00 - 00:00"
}];

const popularCuisines = [{
  name: "Русская",
  icon: "🥟"
}, {
  name: "Итальянская",
  icon: "🍝"
}, {
  name: "Японская",
  icon: "🍣"
}, {
  name: "Грузинская",
  icon: "🥘"
}, {
  name: "Мексиканская",
  icon: "🌮"
}, {
  name: "Французская",
  icon: "🥐"
}];

const Home = () => {
  return <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-36 text-white" style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')`
    }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Бронирование столиков в лучших ресторанах
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-3xl mx-auto">
            Найдите идеальный ресторан для любого случая и забронируйте столик в несколько кликов
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex items-stretch">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input type="text" placeholder="Поиск ресторана или кухни" className="pl-10 pr-4 h-12 rounded-l-lg bg-background/80 backdrop-blur-sm border-r-0" />
              </div>
              <Button className="rounded-l-none px-6 text-base h-12">Найти</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cuisines Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold">Популярные кухни</h2>
          <Button variant="link" asChild className="text-primary">
            <Link to="/cuisines" className="flex items-center">
              Все кухни <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {popularCuisines.map((cuisine, index) => <Link to={`/restaurants?cuisine=${cuisine.name}`} key={index} className="bg-card hover:bg-card/80 rounded-lg p-4 text-center transition-all border border-border card-hover">
              <span className="text-4xl block mb-2">{cuisine.icon}</span>
              <span className="font-medium">{cuisine.name}</span>
            </Link>)}
        </div>
      </section>

      {/* Featured Restaurants Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold">Рекомендуемые рестораны</h2>
            <Button variant="link" asChild className="text-primary">
              <Link to="/restaurants" className="flex items-center">
                Все рестораны <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRestaurants.map(restaurant => <RestaurantCard key={restaurant.id} {...restaurant} />)}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-12 text-center">Почему ТолькоРесторан</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card border border-border">
            <CardContent className="pt-8 pb-6 px-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Мгновенное бронирование</h3>
              <p className="text-muted-foreground">
                Забронируйте столик в любимом ресторане за считанные секунды без звонков и ожидания
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="pt-8 pb-6 px-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Проверенные рестораны</h3>
              <p className="text-muted-foreground">
                Честные отзывы и рейтинги от реальных посетителей помогут сделать лучший выбор
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardContent className="pt-8 pb-6 px-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Специальные предложения</h3>
              <p className="text-muted-foreground">
                Эксклюзивные акции и скидки для пользователей нашего сервиса
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-inherit">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Готовы попробовать?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам довольных клиентов, которые уже используют наш сервис для бронирования столиков
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/restaurants" className="px-8">
                Найти ресторан
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/signup" className="px-8">
                Зарегистрироваться
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;
