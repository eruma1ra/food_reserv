
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
  // Fallback image if the provided one fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";
  };
  
  return (
    <Link to={`/restaurant/${id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow border-border card-hover">
        <div className="relative">
          <AspectRatio ratio={16/9}>
            <img 
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              onError={handleImageError}
              loading="lazy"
            />
          </AspectRatio>
          <div className="absolute top-3 right-3 flex gap-1">
            <Badge variant="outline" className="bg-background/70 backdrop-blur-sm">
              {priceLevel}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-medium text-lg truncate">{name}</h3>
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
              <span className="truncate">{address}</span>
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
