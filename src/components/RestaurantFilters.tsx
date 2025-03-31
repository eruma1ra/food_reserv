
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const RestaurantFilters = () => {
  const [priceRange, setPriceRange] = React.useState([1, 4]);
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);

  const cuisines = [
    'Русская', 'Итальянская', 'Японская', 'Китайская', 'Французская',
    'Грузинская', 'Мексиканская', 'Индийская', 'Средиземноморская'
  ];

  const handleCuisineToggle = (cuisine: string) => {
    setActiveFilters(prev => 
      prev.includes(cuisine) 
        ? prev.filter(c => c !== cuisine) 
        : [...prev, cuisine]
    );
  };

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <h2 className="font-heading text-lg font-bold mb-4">Фильтры</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Поиск по названию" 
            className="pl-10" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Местоположение</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Выберите город" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="moscow">Москва</SelectItem>
              <SelectItem value="spb">Санкт-Петербург</SelectItem>
              <SelectItem value="kazan">Казань</SelectItem>
              <SelectItem value="sochi">Сочи</SelectItem>
              <SelectItem value="novosibirsk">Новосибирск</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Кухня</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Выбрать кухню</span>
                <Filter className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <div className="p-4 max-h-[300px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {cuisines.map(cuisine => (
                    <div
                      key={cuisine}
                      className={`
                        px-3 py-2 rounded-md text-sm cursor-pointer transition-colors
                        ${activeFilters.includes(cuisine) 
                          ? 'bg-primary/20 text-primary' 
                          : 'hover:bg-muted'}
                      `}
                      onClick={() => handleCuisineToggle(cuisine)}
                    >
                      {cuisine}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {activeFilters.map(filter => (
                <Badge key={filter} variant="secondary" className="bg-primary/10 text-primary">
                  {filter}
                  <button
                    className="ml-1 hover:text-destructive"
                    onClick={() => handleCuisineToggle(filter)}
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Ценовая категория</label>
          <div className="px-2">
            <Slider
              defaultValue={[1, 4]}
              max={4}
              min={1}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₽</span>
              <span>₽₽</span>
              <span>₽₽₽</span>
              <span>₽₽₽₽</span>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Сортировать по</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Выберите сортировку" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Рейтингу (высокий → низкий)</SelectItem>
              <SelectItem value="price_asc">Цене (низкая → высокая)</SelectItem>
              <SelectItem value="price_desc">Цене (высокая → низкая)</SelectItem>
              <SelectItem value="popularity">Популярности</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full">Применить фильтры</Button>
      </div>
    </div>
  );
};

export default RestaurantFilters;
