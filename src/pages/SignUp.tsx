
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SignUp = () => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-heading">Создание аккаунта</CardTitle>
          <CardDescription>
            Зарегистрируйтесь, чтобы бронировать столики и оставлять отзывы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="user">Пользователь</TabsTrigger>
              <TabsTrigger value="restaurant">Ресторан</TabsTrigger>
            </TabsList>
            
            <TabsContent value="user" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" placeholder="Иван" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input id="lastName" placeholder="Петров" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="name@example.com" type="email" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" placeholder="+7 (___) ___-__-__" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" placeholder="••••••••" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input id="confirmPassword" placeholder="••••••••" type="password" />
              </div>
            </TabsContent>
            
            <TabsContent value="restaurant" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Название ресторана</Label>
                <Input id="restaurantName" placeholder="Ваш ресторан" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurantAddress">Адрес</Label>
                <Input id="restaurantAddress" placeholder="г. Москва, ул. Примерная, д. 1" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurantEmail">Email</Label>
                <Input id="restaurantEmail" placeholder="restaurant@example.com" type="email" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurantPhone">Телефон</Label>
                <Input id="restaurantPhone" placeholder="+7 (___) ___-__-__" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurantPassword">Пароль</Label>
                <Input id="restaurantPassword" placeholder="••••••••" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurantConfirmPassword">Подтвердите пароль</Label>
                <Input id="restaurantConfirmPassword" placeholder="••••••••" type="password" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">Зарегистрироваться</Button>
          <div className="text-sm text-muted-foreground text-center">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Войти
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
