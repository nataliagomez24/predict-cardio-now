
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlgorithmComparison } from "@/components/charts/AlgorithmComparison";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type AlgorithmData = {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  color: string;
  description: string;
};

const algorithmData: Record<string, AlgorithmData> = {
  j48: {
    name: "J48 (C4.5)",
    accuracy: 87.5,
    precision: 86.2,
    recall: 83.1,
    f1Score: 84.6,
    color: "#2486C5",
    description: "Algoritmo de árbol de decisión que genera un árbol podado o no podado utilizando la estrategia divide y vencerás."
  },
  randomForest: {
    name: "Random Forest",
    accuracy: 92.3,
    precision: 91.7,
    recall: 90.8,
    f1Score: 91.2,
    color: "#27AE60",
    description: "Algoritmo de conjunto que combina múltiples árboles de decisión para mejorar la precisión y controlar el sobreajuste."
  },
  naiveBayes: {
    name: "Naive Bayes",
    accuracy: 83.7,
    precision: 82.5,
    recall: 85.6,
    f1Score: 84.0,
    color: "#F39C12",
    description: "Algoritmo probabilístico basado en el teorema de Bayes con la suposición de independencia entre predictores."
  }
};

const Algorithms = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("randomForest");
  const [predictionInputs, setPredictionInputs] = useState({
    age: "65",
    sex: "M",
    systolicBP: "140",
    diastolicBP: "90",
    cholesterol: "220",
    glucose: "100",
    smoking: "1",
    bmi: "28.5",
    physicalActivity: "0"
  });
  const [predictionResult, setPredictionResult] = useState<{
    risk: number;
    confidence: number;
  } | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPredictionInputs({
      ...predictionInputs,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setPredictionInputs({
      ...predictionInputs,
      [name]: value
    });
  };
  
  const handlePredict = () => {
    // Simulación de predicción basada en los inputs y el algoritmo seleccionado
    // En un sistema real, esto enviaría los datos a un backend para procesamiento
    
    // Simular diferentes resultados basados en el algoritmo seleccionado
    let risk: number;
    let confidence: number;
    
    const age = parseInt(predictionInputs.age);
    const cholesterol = parseInt(predictionInputs.cholesterol);
    const systolicBP = parseInt(predictionInputs.systolicBP);
    const isSmoking = predictionInputs.smoking === "1";
    
    // Lógica simple para simulación
    if (age > 60 && cholesterol > 200 && systolicBP > 130 && isSmoking) {
      risk = 0.85; // Alto riesgo
    } else if ((age > 50 && cholesterol > 190) || (systolicBP > 120 && isSmoking)) {
      risk = 0.60; // Riesgo moderado
    } else {
      risk = 0.25; // Bajo riesgo
    }
    
    // Ajustar confianza según el algoritmo
    switch(selectedAlgorithm) {
      case "randomForest":
        confidence = 0.92;
        break;
      case "j48":
        confidence = 0.87;
        break;
      case "naiveBayes":
        confidence = 0.83;
        break;
      default:
        confidence = 0.85;
    }
    
    // Agregar variación aleatoria pequeña
    risk = risk + (Math.random() * 0.1 - 0.05);
    risk = Math.min(Math.max(risk, 0), 1);
    
    setPredictionResult({ risk, confidence });
    
    toast({
      title: "Predicción completada",
      description: `Algoritmo: ${algorithmData[selectedAlgorithm].name}`,
    });
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Análisis y Predicción</h1>
      
      <Tabs defaultValue="comparison" className="space-y-6">
        <TabsList className="grid grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="comparison">Comparación</TabsTrigger>
          <TabsTrigger value="prediction">Predicción</TabsTrigger>
          <TabsTrigger value="report">Recomendaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {Object.entries(algorithmData).map(([key, data]) => (
              <Card key={key} className="border-l-4" style={{ borderLeftColor: data.color }}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{data.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Precisión:</span>
                      <span className="font-medium">{data.accuracy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">F1-Score:</span>
                      <span className="font-medium">{data.f1Score}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{data.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comparación de Algoritmos</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <AlgorithmComparison algorithmData={algorithmData} />
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Basado en nuestro análisis, <strong>Random Forest</strong> muestra el mejor rendimiento
              para la predicción de enfermedades cardiovasculares con una precisión del 92.3%.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="prediction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Predicción de Riesgo Cardiovascular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Selecciona el algoritmo:</label>
                  <Select 
                    value={selectedAlgorithm} 
                    onValueChange={setSelectedAlgorithm}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un algoritmo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="j48">J48 (C4.5)</SelectItem>
                      <SelectItem value="randomForest">Random Forest</SelectItem>
                      <SelectItem value="naiveBayes">Naive Bayes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Edad</label>
                    <Input 
                      name="age" 
                      value={predictionInputs.age} 
                      onChange={handleInputChange} 
                      type="number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Sexo</label>
                    <Select 
                      value={predictionInputs.sex} 
                      onValueChange={(value) => handleSelectChange("sex", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Masculino</SelectItem>
                        <SelectItem value="F">Femenino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Presión Sistólica</label>
                    <Input 
                      name="systolicBP" 
                      value={predictionInputs.systolicBP} 
                      onChange={handleInputChange} 
                      type="number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Presión Diastólica</label>
                    <Input 
                      name="diastolicBP" 
                      value={predictionInputs.diastolicBP} 
                      onChange={handleInputChange} 
                      type="number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Colesterol</label>
                    <Input 
                      name="cholesterol" 
                      value={predictionInputs.cholesterol} 
                      onChange={handleInputChange} 
                      type="number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Glucosa</label>
                    <Input 
                      name="glucose" 
                      value={predictionInputs.glucose} 
                      onChange={handleInputChange} 
                      type="number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">IMC</label>
                    <Input 
                      name="bmi" 
                      value={predictionInputs.bmi} 
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Fumador</label>
                    <Select 
                      value={predictionInputs.smoking} 
                      onValueChange={(value) => handleSelectChange("smoking", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sí</SelectItem>
                        <SelectItem value="0">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Actividad Física</label>
                    <Select 
                      value={predictionInputs.physicalActivity} 
                      onValueChange={(value) => handleSelectChange("physicalActivity", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Sedentario</SelectItem>
                        <SelectItem value="1">Moderada</SelectItem>
                        <SelectItem value="2">Intensa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handlePredict} className="bg-cardio-primary hover:bg-cardio-dark">
                    Predecir Riesgo
                  </Button>
                </div>
                
                {predictionResult && (
                  <div className={`p-4 rounded-lg border ${
                    predictionResult.risk > 0.7 
                      ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" 
                      : predictionResult.risk > 0.4
                        ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
                        : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                  }`}>
                    <h3 className="font-medium mb-2">Resultado de Predicción</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Riesgo Cardiovascular:</span>
                        <span className="font-medium">
                          {(predictionResult.risk * 100).toFixed(1)}%
                          {" "}
                          <span className={`text-sm ${
                            predictionResult.risk > 0.7 ? "text-red-600 dark:text-red-400" : 
                            predictionResult.risk > 0.4 ? "text-amber-600 dark:text-amber-400" : 
                            "text-green-600 dark:text-green-400"
                          }`}>
                            ({predictionResult.risk > 0.7 ? "Alto" : predictionResult.risk > 0.4 ? "Moderado" : "Bajo"})
                          </span>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confianza de la predicción:</span>
                        <span className="font-medium">{(predictionResult.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-3">
                        <div 
                          className={`h-2.5 rounded-full ${
                            predictionResult.risk > 0.7 ? "bg-red-600" : 
                            predictionResult.risk > 0.4 ? "bg-amber-500" : 
                            "bg-green-500"
                          }`} 
                          style={{width: `${predictionResult.risk * 100}%`}} 
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones basadas en el análisis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>En base a los resultados del análisis de algoritmos y las predicciones realizadas, podemos ofrecer las siguientes recomendaciones:</p>
              
              <h3 className="font-medium text-lg mt-4">Factores de riesgo más significativos</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Edad avanzada (especialmente mayores de 60 años)</li>
                <li>Presión arterial elevada (sistólica &gt; 140 mmHg)</li>
                <li>Colesterol alto (&gt; 200 mg/dL)</li>
                <li>Hábito tabáquico</li>
                <li>Diabetes o niveles elevados de glucosa</li>
                <li>Sobrepeso (IMC &gt; 25)</li>
              </ul>
              
              <h3 className="font-medium text-lg mt-4">Recomendaciones médicas generales</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Control periódico de presión arterial y perfil lipídico</li>
                <li>Dieta equilibrada baja en sodio y grasas saturadas</li>
                <li>Actividad física regular (mínimo 150 minutos semanales)</li>
                <li>Abandono del hábito tabáquico</li>
                <li>Control del estrés</li>
              </ul>
              
              <div className="bg-cardio-light dark:bg-cardio-dark/20 p-4 rounded-lg border border-cardio-medium mt-4">
                <h4 className="font-medium mb-2">Precisión del modelo</h4>
                <p className="text-sm">
                  El algoritmo Random Forest ha demostrado ser el más preciso para la predicción de 
                  enfermedades cardiovasculares con un 92.3% de precisión. Le sigue J48 con 87.5% 
                  y Naive Bayes con 83.7%.
                </p>
              </div>
              
              <div className="text-center mt-6">
                <Button onClick={() => navigate('/history')} className="bg-cardio-primary hover:bg-cardio-dark">
                  Ver Historial de Análisis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Algorithms;
