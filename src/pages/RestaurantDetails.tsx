
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Phone, 
  Globe, 
  Clock, 
  DollarSign,
  Users,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Utensils
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';

// Пример данных о ресторане
const restaurantData = {
  id: 1,
  name: "Пушкин",
  description: "Легендарный ресторан русской кухни в Москве, воссоздающий атмосферу дворянской усадьбы XIX века. Здесь гости могут насладиться классическими русскими блюдами, приготовленными по старинным рецептам, в интерьере, напоминающем библиотеку аристократического дома с антикварной мебелью, книжными полками и камином.",
  cuisine: "Русская",
  rating: 4.8,
  reviewCount: 1245,
  priceLevel: "₽₽₽",
  address: "Москва, Тверской бульвар, 26А",
  phone: "+7 (495) 123-45-67",
  website: "https://cafe-pushkin.ru",
  openHours: "12:00 - 00:00",
  images: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  ],
  menu: [
    {
      category: "Закуски",
      items: [
        { name: "Оливье с телятиной", price: 850, description: "Классический русский салат с телячьим языком и перепелиными яйцами." },
        { name: "Сельдь под шубой", price: 720, description: "Традиционный слоеный салат с филе сельди, овощами и майонезом." },
        { name: "Борщ с пампушками", price: 890, description: "Наваристый борщ с говядиной, подается с чесночными пампушками и сметаной." }
      ]
    },
    {
      category: "Основные блюда",
      items: [
        { name: "Бефстроганов с картофельным пюре", price: 1450, description: "Нежная говядина в сливочном соусе с грибами." },
        { name: "Котлеты Пожарские", price: 1250, description: "Нежные куриные котлеты в хрустящей панировке с картофельным пюре." },
        { name: "Стерлядь в шампанском", price: 2300, description: "Филе стерляди, приготовленное на пару в соусе из шампанского." }
      ]
    },
    {
      category: "Десерты",
      items: [
        { name: "Медовик", price: 650, description: "Традиционный слоеный медовый торт со сметанным кремом." },
        { name: "Анна Павлова", price: 750, description: "Воздушное безе с ванильным кремом и свежими ягодами." },
        { name: "Сырники со сметаной", price: 580, description: "Домашние сырники из творога, подаются со сметаной и вареньем." }
      ]
    }
  ],
  reviews: [
    { id: 1, author: "Александр", rating: 5, date: "15.07.2023", text: "Потрясающее обслуживание и атмосфера. Блюда выше всяких похвал!" },
    { id: 2, author: "Елена", rating: 4, date: "03.06.2023", text: "Очень вкусно, но цены высоковаты. Тем не менее, стоит посетить." },
    { id: 3, author: "Михаил", rating: 5, date: "22.05.2023", text: "Одно из лучших заведений в Москве. Рекомендую бефстроганов и медовик!" }
  ]
};

// Функция для отображения звездного рейтинга
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>('19:00');
  const [guests, setGuests] = useState<string>('2');
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % restaurantData.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + restaurantData.images.length) % restaurantData.images.length);
  };
  
  return (
    <div>
      {/* Hero Section with Carousel */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={restaurantData.images[currentImageIndex]}
          alt={restaurantData.name}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="bg-background/20 backdrop-blur-sm text-white border-none">
                {restaurantData.cuisine}
              </Badge>
              <Badge variant="outline" className="bg-background/20 backdrop-blur-sm text-white border-none">
                {restaurantData.priceLevel}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">
              {restaurantData.name}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-white">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{restaurantData.rating}</span>
                <span className="text-white/70">({restaurantData.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-5 w-5 text-white/70" />
                <span>{restaurantData.address}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <Tabs defaultValue="overview">
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="menu">Меню</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <section>
                  <h2 className="text-2xl font-heading font-bold mb-4">О ресторане</h2>
                  <p className="text-muted-foreground mb-6">{restaurantData.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Часы работы</h3>
                        <p className="text-muted-foreground">{restaurantData.openHours}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Телефон</h3>
                        <p className="text-muted-foreground">{restaurantData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Адрес</h3>
                        <p className="text-muted-foreground">{restaurantData.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-medium">Сайт</h3>
                        <a 
                          href={restaurantData.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary hover:underline"
                        >
                          {restaurantData.website.replace('https://', '')}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Gallery */}
                  <h2 className="text-2xl font-heading font-bold mb-4">Галерея</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {restaurantData.images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden h-60">
                        <img 
                          src={image} 
                          alt={`${restaurantData.name} - фото ${index + 1}`} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="menu">
                <section>
                  <h2 className="text-2xl font-heading font-bold mb-6">Меню</h2>
                  
                  <div className="space-y-8">
                    {restaurantData.menu.map((category) => (
                      <div key={category.category}>
                        <h3 className="text-xl font-heading font-semibold mb-4 flex items-center">
                          <Utensils className="h-5 w-5 mr-2 text-primary" />
                          {category.category}
                        </h3>
                        <div className="space-y-4">
                          {category.items.map((item) => (
                            <div 
                              key={item.name}
                              className="p-4 border border-border rounded-lg bg-card"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                </div>
                                <div className="font-medium text-primary">{item.price} ₽</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>
              
              <TabsContent value="reviews">
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-heading font-bold">
                      Отзывы
                      <span className="ml-2 text-lg text-muted-foreground">
                        ({restaurantData.reviewCount})
                      </span>
                    </h2>
                    <Button disabled>Оставить отзыв</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 mb-8">
                    {restaurantData.reviews.map((review) => (
                      <div 
                        key={review.id} 
                        className="p-6 border border-border rounded-lg bg-card"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{review.author}</h4>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                          <RatingStars rating={review.rating} />
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - Booking Form */}
          <div className="md:w-1/3">
            <Card className="sticky top-8 border border-border">
              <CardContent className="pt-6">
                <h3 className="text-xl font-heading font-bold mb-6">Забронировать столик</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label>Дата</Label>
                    <div className="mt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP', { locale: ru }) : 'Выберите дату'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="p-0">
                          <DialogHeader className="p-4 border-b">
                            <DialogTitle>Выберите дату</DialogTitle>
                          </DialogHeader>
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            locale={ru}
                            initialFocus
                            className="p-4"
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Время</Label>
                    <Select defaultValue={time} onValueChange={setTime}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите время" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12:00">12:00</SelectItem>
                        <SelectItem value="13:00">13:00</SelectItem>
                        <SelectItem value="14:00">14:00</SelectItem>
                        <SelectItem value="15:00">15:00</SelectItem>
                        <SelectItem value="16:00">16:00</SelectItem>
                        <SelectItem value="17:00">17:00</SelectItem>
                        <SelectItem value="18:00">18:00</SelectItem>
                        <SelectItem value="19:00">19:00</SelectItem>
                        <SelectItem value="20:00">20:00</SelectItem>
                        <SelectItem value="21:00">21:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Количество гостей</Label>
                    <Select defaultValue={guests} onValueChange={setGuests}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите количество гостей" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 гость</SelectItem>
                        <SelectItem value="2">2 гостя</SelectItem>
                        <SelectItem value="3">3 гостя</SelectItem>
                        <SelectItem value="4">4 гостя</SelectItem>
                        <SelectItem value="5">5 гостей</SelectItem>
                        <SelectItem value="6">6 гостей</SelectItem>
                        <SelectItem value="7">7 гостей</SelectItem>
                        <SelectItem value="8">8 гостей</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Имя</Label>
                    <Input placeholder="Введите ваше имя" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label>Телефон</Label>
                    <Input placeholder="+7 (___) ___-__-__" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label>Комментарий (необязательно)</Label>
                    <Input placeholder="Особые пожелания" className="mt-1" />
                  </div>
                  
                  <Button className="w-full">Забронировать</Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая на кнопку, вы соглашаетесь с условиями бронирования
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
