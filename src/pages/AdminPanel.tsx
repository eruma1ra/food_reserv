
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
  BookOpen
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

const bookings = [
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

const AdminPanel = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-center">Ресторан "Пушкин"</CardTitle>
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
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
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
                                  <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500">
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button size="icon" variant="ghost" className="h-8 w-8">
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
                        <Button variant="outline" size="sm">
                          Настроить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-border border-dashed">
                  <CardContent className="flex flex-col items-center justify-center h-full py-8">
                    <Button variant="ghost" className="h-10 w-10 rounded-full">
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
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-name">Название ресторана</Label>
                        <Input id="restaurant-name" defaultValue="Пушкин" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-address">Адрес</Label>
                        <Input id="restaurant-address" defaultValue="Москва, Тверской бульвар, 26А" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-phone">Телефон</Label>
                          <Input id="restaurant-phone" defaultValue="+7 (495) 123-45-67" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-email">Email</Label>
                          <Input id="restaurant-email" defaultValue="info@pushkin.ru" type="email" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-website">Сайт</Label>
                        <Input id="restaurant-website" defaultValue="https://cafe-pushkin.ru" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-cuisine">Кухня</Label>
                        <Input id="restaurant-cuisine" defaultValue="Русская" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-description">Описание</Label>
                        <Textarea 
                          id="restaurant-description" 
                          rows={5}
                          defaultValue="Легендарный ресторан русской кухни в Москве, воссоздающий атмосферу дворянской усадьбы XIX века. Здесь гости могут насладиться классическими русскими блюдами, приготовленными по старинным рецептам, в интерьере, напоминающем библиотеку аристократического дома с антикварной мебелью, книжными полками и камином."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Часы работы</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <Input placeholder="Открытие, например: 10:00" defaultValue="12:00" />
                          </div>
                          <div>
                            <Input placeholder="Закрытие, например: 22:00" defaultValue="00:00" />
                          </div>
                        </div>
                      </div>
                      
                      <Button>Сохранить изменения</Button>
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
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="text-white">
                              <X className="h-6 w-6" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border border-dashed border-border rounded-md h-40 flex flex-col items-center justify-center">
                        <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Добавить фото</p>
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
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Закуски</h3>
                          <Button variant="outline" size="sm">
                            Добавить блюдо
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <Card className="border-border">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">Оливье с телятиной</h4>
                                  <p className="text-sm text-muted-foreground mt-1">Классический русский салат с телячьим языком и перепелиными яйцами.</p>
                                </div>
                                <div className="font-medium text-primary">850 ₽</div>
                              </div>
                              <div className="flex justify-end mt-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-border">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">Сельдь под шубой</h4>
                                  <p className="text-sm text-muted-foreground mt-1">Традиционный слоеный салат с филе сельди, овощами и майонезом.</p>
                                </div>
                                <div className="font-medium text-primary">720 ₽</div>
                              </div>
                              <div className="flex justify-end mt-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Основные блюда</h3>
                          <Button variant="outline" size="sm">
                            Добавить блюдо
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <Card className="border-border">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">Бефстроганов с картофельным пюре</h4>
                                  <p className="text-sm text-muted-foreground mt-1">Нежная говядина в сливочном соусе с грибами.</p>
                                </div>
                                <div className="font-medium text-primary">1450 ₽</div>
                              </div>
                              <div className="flex justify-end mt-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <Button className="w-full">Добавить категорию</Button>
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
    </div>
  );
};

// Иконка Plus для кнопки добавления
function Plus(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

export default AdminPanel;
