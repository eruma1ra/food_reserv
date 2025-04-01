
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type RestaurantCardProps = {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  priceLevel: string;
  image: string;
  address: string;
  openHours: string;
};

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
    <Link to={`/restaurant/${id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow border-border">
        <div className="relative h-48">
          <img 
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 flex gap-1">
            <Badge variant="outline" className="bg-background/70 backdrop-blur-sm">
              {priceLevel}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-medium text-lg">{name}</h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          
          <Badge variant="secondary" className="mb-3">
            {cuisine}
          </Badge>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{address}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{openHours}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
