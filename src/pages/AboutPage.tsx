
import React from 'react';
import { MapPin, Phone, Mail, Clock, Users, Award, Shield, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Заголовок секции */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">О сервисе «ТолькоРесторан»</h1>
        <div className="h-1 w-24 bg-primary mx-auto"></div>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Простой и удобный сервис для бронирования столиков в лучших ресторанах России
        </p>
      </div>

      {/* Основная информация */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="text-3xl font-heading font-bold mb-6">Наша миссия</h2>
          <p className="text-lg mb-6 text-muted-foreground">
            «ТолькоРесторан» — это сервис, объединяющий рестораны и гостей на одной платформе. 
            Мы стремимся сделать процесс бронирования столиков максимально простым и удобным, 
            позволяя гостям находить идеальное место для любого случая, а ресторанам — 
            эффективно управлять загрузкой зала.
          </p>
          <p className="text-lg text-muted-foreground">
            Наша цель — создать экосистему, в которой каждый ресторан найдет своего гостя, 
            а каждый гость — свой идеальный ресторан. Мы верим, что технологии должны не заменять, 
            а дополнять гастрономический опыт, делая его доступнее и комфортнее для всех.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
            alt="Ресторан" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Преимущества */}
      <section className="mb-20">
        <h2 className="text-3xl font-heading font-bold mb-12 text-center">Почему выбирают нас</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-card border border-border card-hover">
            <CardContent className="pt-8 pb-6 px-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Экономия времени</h3>
              <p className="text-muted-foreground">
                Забронируйте столик за 30 секунд без звонков и ожидания на линии
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border card-hover">
            <CardContent className="pt-8 pb-6 px-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Большой выбор</h3>
              <p className="text-muted-foreground">
                Более 5000 ресторанов по всей России с подробным описанием и меню
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border card-hover">
            <CardContent className="pt-8 pb-6 px-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Честные отзывы</h3>
              <p className="text-muted-foreground">
                Только реальные отзывы от посетителей, которые посетили ресторан
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border card-hover">
            <CardContent className="pt-8 pb-6 px-6 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Гарантия брони</h3>
              <p className="text-muted-foreground">
                Подтверждение бронирования и гарантия столика при использовании сервиса
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* История компании */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-heading font-bold mb-6">История компании</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Компания «ТолькоРесторан» была основана в 2020 году группой энтузиастов ресторанного
                бизнеса и IT-специалистов, которые столкнулись с проблемой неэффективного распределения
                гостей в ресторанах.
              </p>
              <p>
                Начав с нескольких партнеров в Москве, мы быстро расширились на всю Россию. Сегодня на
                нашей платформе представлено более 5000 ресторанов в 50 городах, и эти цифры продолжают расти.
              </p>
              <p>
                Наша команда состоит из специалистов с опытом работы как в IT-сфере, так и в ресторанном
                бизнесе, что позволяет нам создавать продукт, учитывающий потребности обеих сторон.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              alt="История компании"
              className="rounded-lg h-64 object-cover w-full"
            />
            <img 
              src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              alt="Команда"
              className="rounded-lg h-64 object-cover w-full"
            />
            <img 
              src="https://images.unsplash.com/photo-1539183204366-63a0589187ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              alt="Офис"
              className="rounded-lg h-64 object-cover w-full"
            />
            <img 
              src="https://images.unsplash.com/photo-1532347922424-c652d9b7208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              alt="Технологии"
              className="rounded-lg h-64 object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* Для ресторанов и пользователей */}
      <section className="mb-20">
        <h2 className="text-3xl font-heading font-bold mb-12 text-center">Как это работает</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="bg-card border border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-primary/10 p-6 border-b border-border">
                <h3 className="text-2xl font-heading font-bold mb-2">Для ресторанов</h3>
                <p className="text-muted-foreground">Увеличьте загрузку вашего заведения с нашим сервисом</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Регистрация</h4>
                    <p className="text-muted-foreground">Зарегистрируйтесь как партнер и заполните профиль вашего ресторана</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Настройка столиков</h4>
                    <p className="text-muted-foreground">Добавьте информацию о количестве и типах столиков, настройте расписание</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Получение бронирований</h4>
                    <p className="text-muted-foreground">Принимайте бронирования и управляйте ими в личном кабинете</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <a href="/partners" className="text-primary hover:underline font-medium flex items-center gap-1">
                    Стать партнером <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-primary/10 p-6 border-b border-border">
                <h3 className="text-2xl font-heading font-bold mb-2">Для гостей</h3>
                <p className="text-muted-foreground">Бронируйте столики в любимых ресторанах быстро и удобно</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Поиск</h4>
                    <p className="text-muted-foreground">Найдите подходящий ресторан по расположению, кухне или другим критериям</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Бронирование</h4>
                    <p className="text-muted-foreground">Выберите дату, время и количество гостей для бронирования</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Подтверждение</h4>
                    <p className="text-muted-foreground">Получите мгновенное подтверждение бронирования на email или в приложении</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <a href="/restaurants" className="text-primary hover:underline font-medium flex items-center gap-1">
                    Найти ресторан <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Контакты */}
      <section className="mb-20">
        <h2 className="text-3xl font-heading font-bold mb-12 text-center">Контактная информация</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="bg-card border border-border h-full">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold mb-6">Свяжитесь с нами</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Адрес</h4>
                    <p className="text-muted-foreground">г. Москва, ул. Ресторанная, 1, этаж 5, офис 501</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Телефон</h4>
                    <p className="text-muted-foreground">+7 (800) 123-45-67</p>
                    <p className="text-muted-foreground">+7 (495) 123-45-67 (для Москвы)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <p className="text-muted-foreground">info@tolkorestoran.ru</p>
                    <p className="text-muted-foreground">support@tolkorestoran.ru (для поддержки)</p>
                    <p className="text-muted-foreground">partners@tolkorestoran.ru (для партнеров)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Режим работы</h4>
                    <p className="text-muted-foreground">Пн–Пт: 9:00–20:00</p>
                    <p className="text-muted-foreground">Сб: 10:00–18:00</p>
                    <p className="text-muted-foreground">Вс: выходной</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="h-96 md:h-auto rounded-lg overflow-hidden border border-border">
            {/* Здесь будет карта или изображение - заменитель карты */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.397087666581!2d37.62503931574228!3d55.75639998055643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1620840301247!5m2!1sru!2sru" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen 
              loading="lazy">
            </iframe>
          </div>
        </div>
      </section>

      {/* FAQ секция */}
      <section>
        <h2 className="text-3xl font-heading font-bold mb-12 text-center">Часто задаваемые вопросы</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-bold text-xl mb-3">Как отменить бронирование?</h3>
            <p className="text-muted-foreground">
              Отмена бронирования доступна в личном кабинете в разделе «Мои бронирования». Выберите нужное 
              бронирование и нажмите кнопку «Отменить». Обратите внимание на правила отмены конкретного ресторана.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-bold text-xl mb-3">Могу ли я изменить время бронирования?</h3>
            <p className="text-muted-foreground">
              Да, вы можете изменить время или дату бронирования в личном кабинете, если до него осталось 
              более 2 часов. В противном случае рекомендуем связаться с рестораном напрямую.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-bold text-xl mb-3">Нужно ли подтверждать бронирование?</h3>
            <p className="text-muted-foreground">
              Большинство ресторанов автоматически подтверждают бронирование через нашу систему. В некоторых случаях 
              ресторан может связаться с вами для дополнительного подтверждения.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-bold text-xl mb-3">Есть ли комиссия за бронирование?</h3>
            <p className="text-muted-foreground">
              Нет, сервис бронирования полностью бесплатный для гостей. Мы не взимаем комиссию за использование 
              нашей платформы.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-bold text-xl mb-3">Как стать партнером сервиса?</h3>
            <p className="text-muted-foreground">
              Чтобы стать партнером, перейдите в раздел «Для ресторанов» и заполните форму заявки. Наш 
              менеджер свяжется с вами в течение 24 часов.
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-heading font-bold text-xl mb-3">Что делать, если я опаздываю?</h3>
            <p className="text-muted-foreground">
              Если вы опаздываете более чем на 15 минут, рекомендуем позвонить в ресторан напрямую. 
              Контактные данные ресторана доступны в подтверждении бронирования.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
