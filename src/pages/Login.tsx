import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка входа");
      }

      // Устанавливаем флаг аутентификации и сохраняем email
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInEmail", formData.email);

      // Успешный вход - переходим на страницу профиля
      navigate("/profile");
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
            Вход в аккаунт
          </CardTitle>
          <CardDescription>
            Войдите в свой аккаунт, чтобы продолжить
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Пароль</Label>
              <Button variant="link" className="p-0 h-auto text-sm">
                Забыли пароль?
              </Button>
            </div>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label
              htmlFor="remember"
              className="text-sm font-normal cursor-pointer"
            >
              Запомнить меня
            </Label>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center mt-4">{errorMessage}</div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={handleSubmit}>
            Войти
          </Button>
          <div className="text-sm text-muted-foreground text-center">
            Нет аккаунта?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Зарегистрироваться
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
