
import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
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
import { FilterOptions } from '@/pages/RestaurantsPage';

interface RestaurantFiltersProps {
  initialFilters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

const RestaurantFilters = ({ initialFilters, onApplyFilters }: RestaurantFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  
  // Update local filters when initialFilters changes
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const cuisines = [
    'Русская', 'Итальянская', 'Японская', 'Китайская', 'Французская',
    'Грузинская', 'Мексиканская', 'Индийская', 'Средиземноморская', 'Морепродукты', 
    'Европейская', 'Скандинавская', 'Современная русская', 'Пиццерия'
  ];

  const handleCuisineToggle = (cuisine: string) => {
    setFilters(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine) 
        ? prev.cuisines.filter(c => c !== cuisine) 
        : [...prev.cuisines, cuisine]
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleLocationChange = (value: string) => {
    setFilters(prev => ({ ...prev, location: value }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    // Ensure we always have exactly two values for the price range
    let priceRange: [number, number] = [1, 4];
    if (value.length >= 2) {
      priceRange = [value[0], value[1]];
    } else if (value.length === 1) {
      priceRange = [value[0], 4];
    }
    
    setFilters(prev => ({ ...prev, priceRange }));
  };

  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, sortBy: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    const resetFilters: FilterOptions = {
      search: '',
      location: '',
      cuisines: [],
      priceRange: [1, 4],
      sortBy: 'rating'
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-heading text-lg font-bold">Фильтры</h2>
        {(filters.search || filters.location || filters.cuisines.length > 0 || 
          filters.priceRange[0] !== 1 || filters.priceRange[1] !== 4) && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetFilters} 
            className="text-xs flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Сбросить
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Поиск по названию" 
            className="pl-10" 
            value={filters.search}
            onChange={handleSearch}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Местоположение</label>
          <Select 
            value={filters.location} 
            onValueChange={handleLocationChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите город" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все города</SelectItem>
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
                <span>{filters.cuisines.length > 0 ? `Выбрано: ${filters.cuisines.length}` : 'Выбрать кухню'}</span>
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
                        ${filters.cuisines.includes(cuisine) 
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
          
          {filters.cuisines.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.cuisines.map(cuisine => (
                <Badge key={cuisine} variant="secondary" className="bg-primary/10 text-primary">
                  {cuisine}
                  <button
                    className="ml-1 hover:text-destructive"
                    onClick={() => handleCuisineToggle(cuisine)}
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
              max={4}
              min={1}
              step={1}
              value={filters.priceRange}
              onValueChange={(value) => handlePriceRangeChange(value as [number, number])}
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
          <Select 
            value={filters.sortBy} 
            onValueChange={handleSortChange}
          >
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
        
        <Button className="w-full" onClick={handleApplyFilters}>Применить фильтры</Button>
      </div>
    </div>
  );
};

export default RestaurantFilters;
