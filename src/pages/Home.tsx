
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Upload, ChartBar, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeartMonitorImage from "../assets/heart-monitor.svg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-cardio-primary to-cardio-accent bg-clip-text text-transparent">
            CardioPredict
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Sistema predictivo de enfermedades cardiovasculares usando algoritmos avanzados de machine learning
        </p>
      </section>

      <div className="max-w-3xl mx-auto">
        <img 
          src={HeartMonitorImage} 
          alt="Monitor cardíaco" 
          className="w-full h-24 object-contain my-6"
        />

        <Card className="border-cardio-medium bg-cardio-light dark:bg-cardio-dark/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-cardio-primary flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h2 className="font-medium text-lg">¿Cómo funciona?</h2>
                <p className="text-muted-foreground">
                  CardioPredict analiza datos de pacientes utilizando algoritmos avanzados de machine learning
                  como J48, Random Forest y Naive Bayes para predecir con precisión el riesgo de enfermedades cardiovasculares.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="stats-card bg-white dark:bg-gray-900 text-center">
            <div className="bg-cardio-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Upload className="h-5 w-5 text-cardio-primary" />
            </div>
            <h3 className="font-medium">Sube tus datos</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Carga tu dataset para análisis inmediato
            </p>
          </div>

          <div className="stats-card bg-white dark:bg-gray-900 text-center">
            <div className="bg-cardio-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ChartBar className="h-5 w-5 text-cardio-primary" />
            </div>
            <h3 className="font-medium">Compara algoritmos</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Analiza qué modelo predictivo es más preciso
            </p>
          </div>

          <div className="stats-card bg-white dark:bg-gray-900 text-center">
            <div className="bg-cardio-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <HeartPulse className="h-5 w-5 text-cardio-primary" />
            </div>
            <h3 className="font-medium">Recibe recomendaciones</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Obtén consejos personalizados según los resultados
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={() => navigate('/upload')} 
            className="bg-cardio-primary hover:bg-cardio-dark"
            size="lg"
          >
            <Upload className="mr-2 h-4 w-4" /> Comenzar ahora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
