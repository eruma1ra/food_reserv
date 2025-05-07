
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-heading mb-6">Страница не найдена</p>
        <p className="text-muted-foreground mb-8">
          Страница, которую вы ищете, не существует или была перемещена.
        </p>
        <Button asChild size="lg">
          <Link to="/">На главную</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
