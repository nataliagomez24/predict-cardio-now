
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cardio-light dark:bg-gray-900 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-cardio-primary/20 flex items-center justify-center animate-pulse">
            <HeartPulse className="h-10 w-10 text-cardio-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-medium mb-4">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <Button 
          onClick={() => navigate('/')} 
          className="bg-cardio-primary hover:bg-cardio-dark"
          size="lg"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
