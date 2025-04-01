
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return <footer className="py-10 mt-16 bg-[#0f0f0f]/[0.31]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">ТР</span>
              </div>
              <span className="text-xl font-heading font-bold text-gradient">ТолькоРесторан</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Сервис бронирования столиков в лучших ресторанах России
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Клиентам</h3>
            <ul className="space-y-2">
              <li><Link to="/restaurants" className="text-muted-foreground hover:text-primary transition-colors">Рестораны</Link></li>
              <li><Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">Мои бронирования</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">О сервисе</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Часто задаваемые вопросы</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Ресторанам</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Стать партнером</Link></li>
              <li><Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors">Панель ресторана</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Аналитика</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Помощь</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Email: info@tolkorestoran.ru</li>
              <li className="text-muted-foreground">Телефон: +7 (800) 123-45-67</li>
              <li className="text-muted-foreground">Адрес: г. Москва, ул. Ресторанная, 1</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ТолькоРесторан. Все права защищены.</p>
        </div>
      </div>
    </footer>;
};

export default Footer;
