
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  priceLevel: string;
  image: string;
  address: string;
  openHours: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  cuisine,
  rating,
  priceLevel,
  image,
  address,
  openHours
}) => {
  return (
    <Link
      to={`/restaurant/${id}`}
      className="block"
    >
      <div className="bg-card rounded-lg overflow-hidden border border-border card-hover">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{rating}</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-heading font-bold text-lg">{name}</h3>
            <Badge variant="outline">{priceLevel}</Badge>
          </div>
          
          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <Utensils className="h-4 w-4" />
            <span className="text-sm">{cuisine}</span>
          </div>
          
          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{address}</span>
          </div>
          
          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{openHours}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
