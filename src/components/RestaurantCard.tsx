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

// Enhanced reliable fallback images for different restaurants
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

// Special fallback images for specific restaurants that have issues
const RESTAURANT_SPECIFIC_FALLBACKS = {
  "Twins Garden": "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "Белуга": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "Горыныч": "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "Северяне": "https://images.unsplash.com/photo-1543826173-70651703c5a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
  // Enhanced fallback mechanism with restaurant-specific images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // First try a restaurant-specific fallback if available
    if (RESTAURANT_SPECIFIC_FALLBACKS[name as keyof typeof RESTAURANT_SPECIFIC_FALLBACKS]) {
      e.currentTarget.src = RESTAURANT_SPECIFIC_FALLBACKS[name as keyof typeof RESTAURANT_SPECIFIC_FALLBACKS];
    } else {
      // Otherwise get a deterministic fallback based on restaurant ID
      const fallbackIndex = id % FALLBACK_IMAGES.length;
      e.currentTarget.src = FALLBACK_IMAGES[fallbackIndex];
    }
    
    // Apply a second fallback if the first one fails
    e.currentTarget.onerror = () => {
      e.currentTarget.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
      // Remove the handler to prevent infinite loop if even this fails
      e.currentTarget.onerror = null;
    };
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
