
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { 
  Calendar, 
  Clock, 
  User, 
  Check,
  X, 
  BarChart3, 
  Settings,
  LogOut, 
  Edit, 
  ImagePlus,
  Utensils,
  BookOpen,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const initialBookings = [
  {
    id: 1,
    customer: "Иван Петров",
    date: "25.09.2023",
    time: "19:00",
    guests: 2,
    status: "pending",
    phone: "+7 (901) 123-45-67"
  },
  {
    id: 2,
    customer: "Анна Сидорова",
    date: "25.09.2023",
    time: "20:30",
    guests: 4,
    status: "confirmed",
    phone: "+7 (902) 123-45-67"
  },
  {
    id: 3,
    customer: "Максим Кузнецов",
    date: "26.09.2023",
    time: "18:00",
    guests: 3,
    status: "pending",
    phone: "+7 (903) 123-45-67"
  },
  {
    id: 4,
    customer: "Елена Смирнова",
    date: "26.09.2023",
    time: "19:30",
    guests: 2,
    status: "confirmed",
    phone: "+7 (904) 123-45-67"
  },
  {
    id: 5,
    customer: "Алексей Попов",
    date: "27.09.2023",
    time: "20:00",
    guests: 6,
    status: "pending",
    phone: "+7 (905) 123-45-67"
  }
];

const initialRestaurantInfo = {
  name: "Пушкин",
  address: "Москва, Тверской бульвар, 26А",
  phone: "+7 (495) 123-45-67",
  email: "info@pushkin.ru",
  website: "https://cafe-pushkin.ru",
  cuisine: "Русская",
  description: "Легендарный ресторан русской кухни в Москве, воссоздающий атмосферу дворянской усадьбы XIX века. Здесь гости могут насладиться классическими русскими блюдами, приготовленными по старинным рецептам, в интерьере, напоминающем библиотеку аристократического дома с антикварной мебелью, книжными полками и камином.",
  openTime: "12:00",
  closeTime: "00:00"
};

const AdminPanel = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(initialBookings);
  const [restaurantInfo, setRestaurantInfo] = useState(initialRestaurantInfo);
  const [dishes, setDishes] = useState([
    {
      id: 1,
      category: "Закуски",
      items: [
        { id: 1, name: "Оливье с телятиной", price: 850, description: "Классический русский салат с телячьим языком и перепелиными яйцами." },
        { id: 2, name: "Сельдь под шубой", price: 720, description: "Традиционный слоеный салат с филе сельди, овощами и майонезом." },
      ]
    },
    {
      id: 2,
      category: "Основные блюда",
      items: [
        { id: 3, name: "Бефстроганов с картофельным пюре", price: 1450, description: "Нежная говядина в сливочном соусе с грибами." }
      ]
    }
  ]);
  
  // Dialogs state
  const [editBookingDialog, setEditBookingDialog] = useState({ open: false, bookingId: null });
  const [editTableDialog, setEditTableDialog] = useState({ open: false, tableId: null });
  const [addTableDialog, setAddTableDialog] = useState(false);
  const [addDishDialog, setAddDishDialog] = useState({ open: false, categoryId: null });
  const [editDishDialog, setEditDishDialog] = useState({ open: false, categoryId: null, dishId: null });
  const [editCategoryDialog, setEditCategoryDialog] = useState({ open: false, categoryId: null });
  
  // New dish form state
  const [newDish, setNewDish] = useState({ name: "", price: "", description: "" });
  
  // New category name state
  const [newCategoryName, setNewCategoryName] = useState("");
  
  // Handle booking confirmation
  const handleConfirmBooking = (id: number) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: "confirmed" } : booking
    ));
    toast({
      title: "Бронирование подтверждено",
      description: "Уведомление было отправлено клиенту.",
    });
  };
  
  // Handle booking rejection
  const handleRejectBooking = (id: number) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    toast({
      title: "Бронирование отклонено",
      description: "Бронирование было отклонено и удалено из списка.",
    });
  };
  
  // Handle opening booking edit dialog
  const handleOpenEditBooking = (id: number) => {
    setEditBookingDialog({ open: true, bookingId: id });
  };
  
  // Handle saving edited booking
  const handleSaveBooking = () => {
    setEditBookingDialog({ open: false, bookingId: null });
    toast({
      title: "Бронирование изменено",
      description: "Информация о бронировании обновлена.",
    });
  };
  
  // Handle table configuration
  const handleConfigTable = (id: number) => {
    setEditTableDialog({ open: true, tableId: id });
  };
  
  // Handle saving table configuration
  const handleSaveTable = () => {
    setEditTableDialog({ open: false, tableId: null });
    toast({
      title: "Настройки столика сохранены",
      description: "Конфигурация столика обновлена.",
    });
  };
  
  // Handle adding a new table
  const handleAddTable = () => {
    setAddTableDialog(false);
    toast({
      title: "Столик добавлен",
      description: "Новый столик добавлен в систему.",
    });
  };
  
  // Handle form submission for restaurant profile
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Профиль обновлен",
      description: "Данные о ресторане были успешно сохранены.",
    });
  };
  
  // Handle photo deletion
  const handleDeletePhoto = (index: number) => {
    toast({
      title: "Фото удалено",
      description: "Фотография была успешно удалена.",
    });
  };
  
  // Handle photo upload
  const handleAddPhoto = () => {
    toast({
      title: "Загрузка фото",
      description: "Фотография была успешно загружена.",
    });
  };

  // Handle dish removal
  const handleRemoveDish = (categoryId: number, dishId: number) => {
    setDishes(dishes.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.filter(item => item.id !== dishId)
        };
      }
      return category;
    }));
    toast({
      title: "Блюдо удалено",
      description: "Блюдо было успешно удалено из меню.",
    });
  };
  
  // Handle dish editing
  const handleEditDish = (categoryId: number, dishId: number) => {
    setEditDishDialog({ open: true, categoryId, dishId });
  };
  
  // Handle saving edited dish
  const handleSaveDish = () => {
    setEditDishDialog({ open: false, categoryId: null, dishId: null });
    toast({
      title: "Блюдо обновлено",
      description: "Информация о блюде успешно обновлена.",
    });
  };
  
  // Handle adding a dish
  const handleAddDish = (categoryId: number) => {
    setAddDishDialog({ open: true, categoryId });
  };
  
  // Handle saving new dish
  const handleSaveNewDish = () => {
    const categoryId = addDishDialog.categoryId;
    if (categoryId) {
      const newDishItem = {
        id: Date.now(),
        name: newDish.name,
        price: parseFloat(newDish.price),
        description: newDish.description
      };
      
      setDishes(dishes.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: [...category.items, newDishItem]
          };
        }
        return category;
      }));
    }
    
    setAddDishDialog({ open: false, categoryId: null });
    setNewDish({ name: "", price: "", description: "" });
    
    toast({
      title: "Блюдо добавлено",
      description: "Новое блюдо успешно добавлено в меню.",
    });
  };

  // Handle category editing
  const handleEditCategory = (categoryId: number) => {
    const category = dishes.find(c => c.id === categoryId);
    if (category) {
      setNewCategoryName(category.category);
      setEditCategoryDialog({ open: true, categoryId });
    }
  };
  
  // Handle saving edited category
  const handleSaveCategory = () => {
    const categoryId = editCategoryDialog.categoryId;
    if (categoryId) {
      setDishes(dishes.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            category: newCategoryName
          };
        }
        return category;
      }));
    }
    
    setEditCategoryDialog({ open: false, categoryId: null });
    setNewCategoryName("");
    
    toast({
      title: "Категория обновлена",
      description: "Название категории успешно изменено.",
    });
  };

  // Handle adding a category
  const handleAddCategory = () => {
    const newCategory = {
      id: Date.now(),
      category: "Новая категория",
      items: []
    };
    setDishes([...dishes, newCategory]);
    toast({
      title: "Категория добавлена",
      description: "Новая категория блюд была добавлена.",
    });
  };
  
  // Handle logout
  const handleLogout = () => {
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы.",
    });
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-center">Ресторан "{restaurantInfo.name}"</CardTitle>
              <CardDescription className="text-center">Панель администратора</CardDescription>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#bookings" className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Бронирования
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#tables" className="flex items-center">
                    <Utensils className="mr-2 h-5 w-5" />
                    Столики
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#profile" className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Профиль ресторана
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#analytics" className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Аналитика
                  </a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#settings" className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Настройки
                  </a>
                </Button>
                <Separator />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Выйти
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-3/4">
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="bookings">Бронирования</TabsTrigger>
              <TabsTrigger value="tables">Столики</TabsTrigger>
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold">Управление бронированиями</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Сегодня
                  </Button>
                </div>
              </div>
              
              <Card className="border-border">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Гость</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Время</TableHead>
                        <TableHead>Гостей</TableHead>
                        <TableHead>Телефон</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.customer}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>{booking.time}</TableCell>
                          <TableCell>{booking.guests}</TableCell>
                          <TableCell>{booking.phone}</TableCell>
                          <TableCell>
                            <div className={`
                              px-2 py-1 text-xs rounded-full w-fit
                              ${
                                booking.status === 'confirmed' 
                                  ? 'bg-green-500/10 text-green-500' 
                                  : 'bg-yellow-500/10 text-yellow-500'
                              }
                            `}>
                              {booking.status === 'confirmed' ? 'Подтверждено' : 'Ожидание'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              {booking.status === 'pending' && (
                                <>
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 text-green-500" 
                                    onClick={() => handleConfirmBooking(booking.id)}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    size="icon" 
                                    variant="ghost" 
                                    className="h-8 w-8 text-destructive" 
                                    onClick={() => handleRejectBooking(booking.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-8 w-8"
                                onClick={() => handleOpenEditBooking(booking.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tables">
              <h2 className="text-2xl font-heading font-bold mb-6">Управление столиками</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[2, 4, 2, 6, 4, 8].map((seats, index) => (
                  <Card key={index} className="border-border">
                    <CardHeader>
                      <CardTitle>Столик №{index + 1}</CardTitle>
                      <CardDescription>
                        {seats} {seats === 1 ? 'место' : 'места'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Статус:
                          <span className="ml-2 inline-block px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                            Доступен
                          </span>
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleConfigTable(index + 1)}
                        >
                          Настроить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-border border-dashed">
                  <CardContent className="flex flex-col items-center justify-center h-full py-8">
                    <Button 
                      variant="ghost" 
                      className="h-10 w-10 rounded-full"
                      onClick={() => setAddTableDialog(true)}
                    >
                      <Plus className="h-6 w-6" />
                    </Button>
                    <p className="mt-2 text-sm text-muted-foreground">Добавить столик</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <h2 className="text-2xl font-heading font-bold mb-6">Профиль ресторана</h2>
              
              <div className="space-y-8">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Основная информация</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6" onSubmit={handleProfileSubmit}>
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-name">Название ресторана</Label>
                        <Input 
                          id="restaurant-name" 
                          value={restaurantInfo.name} 
                          onChange={(e) => setRestaurantInfo({...restaurantInfo, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-address">Адрес</Label>
                        <Input 
                          id="restaurant-address" 
                          value={restaurantInfo.address}
                          onChange={(e) => setRestaurantInfo({...restaurantInfo, address: e.target.value})}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-phone">Телефон</Label>
                          <Input 
                            id="restaurant-phone" 
                            value={restaurantInfo.phone}
                            onChange={(e) => setRestaurantInfo({...restaurantInfo, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-email">Email</Label>
                          <Input 
                            id="restaurant-email" 
                            value={restaurantInfo.email}
                            type="email"
                            onChange={(e) => setRestaurantInfo({...restaurantInfo, email: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-website">Сайт</Label>
                        <Input 
                          id="restaurant-website" 
                          value={restaurantInfo.website}
                          onChange={(e) => setRestaurantInfo({...restaurantInfo, website: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-cuisine">Кухня</Label>
                        <Input 
                          id="restaurant-cuisine" 
                          value={restaurantInfo.cuisine}
                          onChange={(e) => setRestaurantInfo({...restaurantInfo, cuisine: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-description">Описание</Label>
                        <Textarea 
                          id="restaurant-description" 
                          rows={5}
                          value={restaurantInfo.description}
                          onChange={(e) => setRestaurantInfo({...restaurantInfo, description: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Часы работы</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <Input 
                              placeholder="Открытие, например: 10:00" 
                              value={restaurantInfo.openTime}
                              onChange={(e) => setRestaurantInfo({...restaurantInfo, openTime: e.target.value})}
                            />
                          </div>
                          <div>
                            <Input 
                              placeholder="Закрытие, например: 22:00" 
                              value={restaurantInfo.closeTime}
                              onChange={(e) => setRestaurantInfo({...restaurantInfo, closeTime: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button type="submit">Сохранить изменения</Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Фотографии</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((_, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={`https://images.unsplash.com/photo-${index === 0 ? '1517248135467-4c7edcad34c4' : index === 1 ? '1544148103-0773bf10d330' : '1550966871-3ed3cdb5ed0c'}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80`}
                            className="w-full h-40 object-cover rounded-md"
                            alt={`Фото ресторана ${index + 1}`}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-white"
                              onClick={() => handleDeletePhoto(index)}
                            >
                              <X className="h-6 w-6" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border border-dashed border-border rounded-md h-40 flex flex-col items-center justify-center">
                        <Button 
                          variant="ghost"
                          onClick={handleAddPhoto}
                        >
                          <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Добавить фото</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Меню</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {dishes.map((category) => (
                        <div key={category.id}>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <h3 className="font-medium">{category.category}</h3>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-2 h-8 w-8 p-0"
                                onClick={() => handleEditCategory(category.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAddDish(category.id)}
                            >
                              Добавить блюдо
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            {category.items.map((item) => (
                              <Card className="border-border" key={item.id}>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">{item.name}</h4>
                                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                    </div>
                                    <div className="font-medium text-primary">{item.price} ₽</div>
                                  </div>
                                  <div className="flex justify-end mt-2">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 px-2"
                                      onClick={() => handleEditDish(category.id, item.id)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 px-2 text-destructive"
                                      onClick={() => handleRemoveDish(category.id, item.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          
                          {category.id !== dishes[dishes.length - 1].id && <Separator className="my-6" />}
                        </div>
                      ))}
                      
                      <Button className="w-full" onClick={handleAddCategory}>Добавить категорию</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <h2 className="text-2xl font-heading font-bold mb-6">Аналитика</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Бронирований за месяц</p>
                      <p className="text-4xl font-bold mt-2">158</p>
                      <p className="text-sm text-green-500 mt-2">+12% с прошлого месяца</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Средняя заполняемость</p>
                      <p className="text-4xl font-bold mt-2">76%</p>
                      <p className="text-sm text-green-500 mt-2">+5% с прошлого месяца</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Отмены бронирований</p>
                      <p className="text-4xl font-bold mt-2">7%</p>
                      <p className="text-sm text-green-500 mt-2">-2% с прошлого месяца</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Статистика бронирований</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border border-border rounded-md">
                    <p className="text-muted-foreground">Графики будут добавлены позже</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Edit Booking Dialog */}
      <Dialog open={editBookingDialog.open} onOpenChange={(open) => setEditBookingDialog({ ...editBookingDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать бронирование</DialogTitle>
            <DialogDescription>
              Внесите необходимые изменения в информацию о бронировании
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-date">Дата</Label>
              <Input id="edit-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-time">Время</Label>
              <Input id="edit-time" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-guests">Количество гостей</Label>
              <Input id="edit-guests" type="number" min="1" max="20" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-table">Столик</Label>
              <Input id="edit-table" type="number" min="1" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditBookingDialog({ open: false, bookingId: null })}>
              Отмена
            </Button>
            <Button type="button" onClick={handleSaveBooking}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Table Dialog */}
      <Dialog open={editTableDialog.open} onOpenChange={(open) => setEditTableDialog({ ...editTableDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Настройка столика #{editTableDialog.tableId}</DialogTitle>
            <DialogDescription>
              Измените параметры столика
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="table-seats">Количество мест</Label>
              <Input id="table-seats" type="number" min="1" max="20" defaultValue="4" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="table-zone">Зона</Label>
              <Input id="table-zone" defaultValue="Основной зал" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="table-status">Статус</Label>
              <select id="table-status" className="w-full border border-border rounded-md p-2">
                <option value="available">Доступен</option>
                <option value="reserved">Зарезервирован</option>
                <option value="maintenance">На обслуживании</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditTableDialog({ open: false, tableId: null })}>
              Отмена
            </Button>
            <Button type="button" onClick={handleSaveTable}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Table Dialog */}
      <Dialog open={addTableDialog} onOpenChange={setAddTableDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить столик</DialogTitle>
            <DialogDescription>
              Укажите параметры нового столика
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-table-number">Номер столика</Label>
              <Input id="new-table-number" type="number" min="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-table-seats">Количество мест</Label>
              <Input id="new-table-seats" type="number" min="1" max="20" defaultValue="2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-table-zone">Зона</Label>
              <Input id="new-table-zone" defaultValue="Основной зал" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setAddTableDialog(false)}>
              Отмена
            </Button>
            <Button type="button" onClick={handleAddTable}>
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dish Dialog */}
      <Dialog open={editDishDialog.open} onOpenChange={(open) => setEditDishDialog({ ...editDishDialog, open, categoryId: open ? editDishDialog.categoryId : null, dishId: open ? editDishDialog.dishId : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать блюдо</DialogTitle>
            <DialogDescription>
              Измените информацию о блюде
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-dish-name">Название</Label>
              <Input id="edit-dish-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-dish-price">Цена (₽)</Label>
              <Input id="edit-dish-price" type="number" min="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-dish-description">Описание</Label>
              <Textarea id="edit-dish-description" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditDishDialog({ open: false, categoryId: null, dishId: null })}>
              Отмена
            </Button>
            <Button type="button" onClick={handleSaveDish}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Dish Dialog */}
      <Dialog open={addDishDialog.open} onOpenChange={(open) => setAddDishDialog({ ...addDishDialog, open, categoryId: open ? addDishDialog.categoryId : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить блюдо</DialogTitle>
            <DialogDescription>
              Введите информацию о новом блюде
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-dish-name">Название</Label>
              <Input 
                id="new-dish-name" 
                value={newDish.name}
                onChange={(e) => setNewDish({...newDish, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-dish-price">Цена (₽)</Label>
              <Input 
                id="new-dish-price" 
                type="number" 
                min="0"
                value={newDish.price}
                onChange={(e) => setNewDish({...newDish, price: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-dish-description">Описание</Label>
              <Textarea 
                id="new-dish-description" 
                rows={3}
                value={newDish.description}
                onChange={(e) => setNewDish({...newDish, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setAddDishDialog({ open: false, categoryId: null })}>
              Отмена
            </Button>
            <Button type="button" onClick={handleSaveNewDish}>
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Category Dialog */}
      <Dialog open={editCategoryDialog.open} onOpenChange={(open) => setEditCategoryDialog({ ...editCategoryDialog, open, categoryId: open ? editCategoryDialog.categoryId : null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изменить категорию</DialogTitle>
            <DialogDescription>
              Введите новое название категории
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Название категории</Label>
              <Input 
                id="category-name" 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditCategoryDialog({ open: false, categoryId: null })}>
              Отмена
            </Button>
            <Button type="button" onClick={handleSaveCategory}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
