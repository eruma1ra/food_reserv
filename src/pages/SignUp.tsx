import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    contactName: "",
    position: "",
    address: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("user");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(\+7|8)\d{10}$/;

    if (!emailPattern.test(formData.email)) {
      setErrorMessage("Некорректный формат email");
      return false;
    }

    if (!phonePattern.test(formData.phone)) {
      setErrorMessage(
        "Номер телефона должен начинаться с +7 или 8 и содержать 11 цифр"
      );
      return false;
    }

    if (
      activeTab === "user" &&
      formData.password !== formData.confirmPassword
    ) {
      setErrorMessage("Пароли не совпадают");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const endpoint =
      activeTab === "user" ? "/api/signup" : "/api/restaurant-signup";

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка регистрации");
      }

      navigate("/login", {
        state: {
          registrationSuccess: true,
          email: formData.email,
        },
      });
    } catch (error) {
      console.error("Ошибка:", error);
      setErrorMessage(error.message || "Ошибка подключения к серверу");
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-heading">
            Создание аккаунта
          </CardTitle>
          <CardDescription>
            Зарегистрируйтесь, чтобы бронировать столики и оставлять отзывы
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="user">Пользователь</TabsTrigger>
              <TabsTrigger value="restaurant">Ресторан</TabsTrigger>
            </TabsList>

            <TabsContent value="user" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    placeholder="Иван"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    placeholder="Петров"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="restaurant" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurantName">Название ресторана</Label>
                <Input
                  id="restaurantName"
                  placeholder="Введите название ресторана"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName">Контактное лицо</Label>
                <Input
                  id="contactName"
                  placeholder="Иван Петров"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Должность</Label>
                <Input
                  id="position"
                  placeholder="Менеджер"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input
                  id="address"
                  placeholder="Введите адрес ресторана"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Сообщение</Label>
                <Input
                  id="message"
                  placeholder="Введите сообщение"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </TabsContent>
          </Tabs>

          {errorMessage && (
            <div className="text-red-500 text-center mt-4">{errorMessage}</div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleSubmit}>
            Зарегистрироваться
          </Button>
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
