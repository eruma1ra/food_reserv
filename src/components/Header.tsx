
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

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
        
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center mt-4 md:mt-0 w-full md:w-auto gap-2`}>
          <nav className="flex items-center gap-0.5 md:gap-2">
            <Link to="/restaurants" className="text-white hover:text-primary hover:underline hover:decoration-primary hover:decoration-2 px-2 py-2 text-xs whitespace-nowrap transition-colors">
              Рестораны
            </Link>
            <Link to="/about" className="text-white hover:text-primary hover:underline hover:decoration-primary hover:decoration-2 px-2 py-2 text-xs whitespace-nowrap transition-colors">
              О&nbsp;сервисе
            </Link>
            <Button variant="outline" size="sm" asChild className="text-xs px-2">
              <Link to="/login" className="flex items-center gap-1">
                <span>Войти</span>
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild className="text-xs px-2">
              <Link to="/signup" className="flex items-center gap-1">
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
