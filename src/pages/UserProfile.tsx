
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Clock, Calendar, MapPin, Edit, User, Settings, LogOut, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const UserProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bookings");
  
  const [userInfo, setUserInfo] = useState({
    firstName: 'Иван',
    lastName: 'Петров',
    email: 'ivan@example.com',
    phone: '+7 (901) 123-45-67'
  });
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [userBookings, setUserBookings] = useState([
    {
      id: 1,
      restaurant: "Пушкин",
      date: "25 сентября 2023",
      time: "19:00",
      guests: 2,
      status: "confirmed", // confirmed, completed, cancelled
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      restaurant: "Горыныч",
      date: "30 сентября 2023",
      time: "20:00",
      guests: 4,
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      restaurant: "Twins Garden",
      date: "15 сентября 2023",
      time: "18:30",
      guests: 3,
      status: "completed",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ]);

  const handleEditBooking = (id: number) => {
    toast({
      title: "Редактирование бронирования",
      description: `Бронирование #${id} открыто для изменения.`
    });
  };

  const handleCancelBooking = (id: number) => {
    setUserBookings(userBookings.map(booking => 
      booking.id === id ? { ...booking, status: "cancelled" } : booking
    ));
    toast({
      title: "Бронирование отменено",
      description: "Ваше бронирование было успешно отменено."
    });
  };

  const handleReviewSubmit = (id: number) => {
    toast({
      title: "Отзыв отправлен",
      description: "Спасибо за ваш отзыв! Он поможет другим гостям выбрать ресторан."
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные были успешно сохранены."
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Пароль изменен",
      description: "Ваш пароль был успешно изменен."
    });
  };

  const handleDeleteAccount = () => {
    setIsDeleteDialogOpen(false);
    toast({
      title: "Аккаунт удален",
      description: "Ваш аккаунт был успешно удален. Перенаправление на главную..."
    });
    setTimeout(() => navigate('/'), 2000);
  };

  const handleLogout = () => {
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы."
    });
    navigate('/');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Handle sidebar navigation button clicks
  const handleSidebarClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <Card className="border-border">
            <CardHeader>
              <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-2">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardTitle className="text-center">{userInfo.firstName} {userInfo.lastName}</CardTitle>
              <CardDescription className="text-center">{userInfo.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button 
                  variant={activeTab === "bookings" ? "secondary" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => handleSidebarClick("bookings")}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Мои бронирования
                </Button>
                <Button 
                  variant={activeTab === "profile" ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => handleSidebarClick("profile")}
                >
                  <User className="mr-2 h-5 w-5" />
                  Профиль
                </Button>
                <Button 
                  variant={activeTab === "settings" ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => handleSidebarClick("settings")}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Настройки
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
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-8">
              <TabsTrigger value="bookings">Мои бронирования</TabsTrigger>
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings">
              <h2 className="text-2xl font-heading font-bold mb-6">Мои бронирования</h2>
              
              {userBookings.length > 0 ? (
                <div className="space-y-6">
                  {userBookings.map((booking) => (
                    <Card key={booking.id} className="border-border hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4">
                            <img
                              src={booking.image}
                              alt={booking.restaurant}
                              className="h-full w-full object-cover md:rounded-l-lg"
                              style={{ maxHeight: '200px' }}
                            />
                          </div>
                          <div className="p-6 md:w-3/4 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between">
                                <h3 className="text-xl font-heading font-semibold mb-2">
                                  {booking.restaurant}
                                </h3>
                                <div className={`
                                  px-3 py-1 text-xs rounded-full
                                  ${
                                    booking.status === 'confirmed' 
                                      ? 'bg-primary/10 text-primary' 
                                      : booking.status === 'completed' 
                                        ? 'bg-green-500/10 text-green-500'
                                        : 'bg-red-500/10 text-red-500'
                                  }
                                `}>
                                  {booking.status === 'confirmed' 
                                    ? 'Подтверждено' 
                                    : booking.status === 'completed' 
                                      ? 'Завершено'
                                      : 'Отменено'}
                                </div>
                              </div>
                              
                              <div className="space-y-2 mt-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>{booking.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4 mr-2" />
                                  <span>{booking.time}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <User className="h-4 w-4 mr-2" />
                                  <span>{booking.guests} {booking.guests === 1 ? 'гость' : 'гостя'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-4 mt-6">
                              {booking.status === 'confirmed' && (
                                <>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="flex items-center"
                                    onClick={() => handleEditBooking(booking.id)}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Изменить
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                                    onClick={() => handleCancelBooking(booking.id)}
                                  >
                                    Отменить
                                  </Button>
                                </>
                              )}
                              {booking.status === 'completed' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleReviewSubmit(booking.id)}
                                >
                                  Оставить отзыв
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Нет бронирований</h3>
                  <p className="text-muted-foreground mb-6">
                    У вас пока нет забронированных столиков
                  </p>
                  <Button asChild>
                    <a href="/restaurants">Найти ресторан</a>
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="profile">
              <h2 className="text-2xl font-heading font-bold mb-6">Личные данные</h2>
              
              <Card className="border-border">
                <CardContent className="pt-6">
                  <form className="space-y-6" onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Имя</Label>
                        <Input 
                          id="firstName" 
                          value={userInfo.firstName}
                          onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Фамилия</Label>
                        <Input 
                          id="lastName" 
                          value={userInfo.lastName}
                          onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input 
                        id="phone" 
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      />
                    </div>
                    
                    <Button type="submit">Сохранить изменения</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <h2 className="text-2xl font-heading font-bold mb-6">Настройки учётной записи</h2>
              
              <Card className="border-border mb-8">
                <CardHeader>
                  <CardTitle>Безопасность</CardTitle>
                  <CardDescription>
                    Управление паролем и безопасностью вашего аккаунта
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handlePasswordChange}>
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Текущий пароль</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Новый пароль</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button type="submit">Изменить пароль</Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Удаление аккаунта</CardTitle>
                  <CardDescription>
                    Удаление аккаунта приведет к потере всех данных и истории бронирований
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="destructive"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    Удалить аккаунт
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы действительно хотите удалить аккаунт?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие невозможно отменить. Вы потеряете все данные, включая историю бронирований и настройки профиля.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить навсегда
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserProfile;
