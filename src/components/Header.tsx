
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, LogIn, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-background border-b border-border py-4">
      <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">ТР</span>
            </div>
            <span className="text-xl font-heading font-bold text-gradient">ТолькоРесторан</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center mt-4 md:mt-0 w-full md:w-auto gap-4`}>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Поиск ресторанов" 
              className="pl-10 bg-muted w-full" 
            />
          </div>
          
          <nav className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" asChild className="text-white hover:bg-primary hover:text-white transition-colors">
              <Link to="/restaurants">Рестораны</Link>
            </Button>
            <Button variant="ghost" asChild className="text-white hover:bg-primary hover:text-white transition-colors">
              <Link to="/about">О сервисе</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Войти</span>
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to="/signup" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Регистрация</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
