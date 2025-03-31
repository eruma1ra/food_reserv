
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogIn, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
          <form onSubmit={handleSearch} className="relative w-full md:w-80 flex">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Поиск ресторанов" 
              className="pl-10 bg-muted w-full pr-16" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="default" 
              size="sm" 
              className="absolute right-0 top-0 bottom-0 rounded-l-none"
            >
              Найти
            </Button>
          </form>
          
          <nav className="flex items-center gap-2 md:gap-4">
            <Link to="/restaurants" className="text-white hover:text-primary hover:underline hover:decoration-primary hover:decoration-2 px-4 py-2 transition-colors">
              Рестораны
            </Link>
            <Link to="/about" className="text-white hover:text-primary hover:underline hover:decoration-primary hover:decoration-2 px-4 py-2 transition-colors">
              О сервисе
            </Link>
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
