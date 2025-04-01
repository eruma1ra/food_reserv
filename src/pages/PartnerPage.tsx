
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Check, Clock, Users, BarChart3, Laptop } from 'lucide-react';

const PartnerPage = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена",
      description: "Мы свяжемся с вами в ближайшее время для обсуждения деталей сотрудничества.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">Станьте партнером ТолькоРесторан</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Присоединяйтесь к нашей платформе и увеличьте поток ваших гостей уже сегодня
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-border">
            <CardHeader className="text-center pb-2">
              <Clock className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle>Упрощение процессов</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Управляйте бронированиями онлайн и освободите время для гостей
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader className="text-center pb-2">
              <Users className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle>Больше гостей</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Привлекайте новых гостей и увеличивайте заполняемость ресторана
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader className="text-center pb-2">
              <BarChart3 className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle>Аналитика</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              Получайте детальную статистику о ваших гостях и бронированиях
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-heading font-bold mb-6">Преимущества партнерства</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="mr-4 mt-1 bg-primary/10 p-1 rounded-full">
                <Check className="h-5 w-5 text-primary" />
              </span>
              <div>
                <h3 className="font-medium mb-1">Удобная панель управления</h3>
                <p className="text-muted-foreground">
                  Простой и интуитивно понятный интерфейс для управления бронированиями, меню и отзывами
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="mr-4 mt-1 bg-primary/10 p-1 rounded-full">
                <Check className="h-5 w-5 text-primary" />
              </span>
              <div>
                <h3 className="font-medium mb-1">Маркетинг и продвижение</h3>
                <p className="text-muted-foreground">
                  Мы продвигаем ваш ресторан среди нашей активной аудитории потенциальных гостей
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="mr-4 mt-1 bg-primary/10 p-1 rounded-full">
                <Check className="h-5 w-5 text-primary" />
              </span>
              <div>
                <h3 className="font-medium mb-1">Отчеты и анализ</h3>
                <p className="text-muted-foreground">
                  Получайте еженедельные отчеты о бронированиях, загруженности и предпочтениях гостей
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <span className="mr-4 mt-1 bg-primary/10 p-1 rounded-full">
                <Check className="h-5 w-5 text-primary" />
              </span>
              <div>
                <h3 className="font-medium mb-1">Техническая поддержка</h3>
                <p className="text-muted-foreground">
                  Наша команда поддержки доступна 24/7 для решения любых вопросов
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Заполните форму для партнерства</CardTitle>
            <CardDescription>
              Мы свяжемся с вами для обсуждения деталей сотрудничества
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="restaurant-name">Название ресторана</Label>
                <Input id="restaurant-name" placeholder="Введите название вашего ресторана" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Контактное лицо</Label>
                  <Input id="contact-name" placeholder="Ваше имя и фамилия" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Должность</Label>
                  <Input id="position" placeholder="Ваша должность" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" placeholder="+7 (___) ___-__-__" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Адрес ресторана</Label>
                <Input id="address" placeholder="Город, улица, дом" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Дополнительная информация</Label>
                <Textarea 
                  id="message" 
                  placeholder="Расскажите кратко о вашем ресторане и почему вы хотите стать партнером"
                  rows={4}
                />
              </div>
              
              <Button type="submit" className="w-full">Отправить заявку</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerPage;
