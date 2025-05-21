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
import { 
  Heart, 
  Activity, 
  Utensils, 
  Check, 
  X, 
  ArrowRight, 
  Medal,
  CircleAlert 
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-cardio-primary" />
                Recomendaciones personalizadas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {predictionResult ? (
                <>
                  <div className={`p-4 rounded-lg border ${
                    predictionResult.risk > 0.7 
                      ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800" 
                      : predictionResult.risk > 0.4
                        ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
                        : "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                  }`}>
                    <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                      {predictionResult.risk > 0.7 ? (
                        <CircleAlert className="h-5 w-5 text-red-500" />
                      ) : predictionResult.risk > 0.4 ? (
                        <CircleAlert className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      Evaluación de riesgo: {' '}
                      <span className={`${
                        predictionResult.risk > 0.7 ? "text-red-600 dark:text-red-400" : 
                        predictionResult.risk > 0.4 ? "text-amber-600 dark:text-amber-400" : 
                        "text-green-600 dark:text-green-400"
                      }`}>
                        {predictionResult.risk > 0.7 ? "Alto" : predictionResult.risk > 0.4 ? "Moderado" : "Bajo"}
                      </span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Basado en los datos proporcionados y analizados con el algoritmo {algorithmData[selectedAlgorithm].name}.
                      Confianza de la predicción: {(predictionResult.confidence * 100).toFixed(1)}%.
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
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
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg flex items-center gap-2">
                      <Medal className="h-5 w-5 text-cardio-accent" />
                      Plan de acción personalizado
                    </h3>
                    
                    <Carousel className="w-full">
                      <CarouselContent>
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Utensils className="h-4 w-4 text-cardio-primary" />
                                Alimentación
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Reduce el consumo de sodio a menos de 2,300mg por día</li>
                                <li>Aumenta la ingesta de frutas y verduras (5 porciones diarias)</li>
                                <li>Limita las grasas saturadas y trans</li>
                                <li>Consume pescados ricos en omega-3 al menos dos veces por semana</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                        
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Activity className="h-4 w-4 text-cardio-accent" />
                                Actividad física
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Realiza al menos 150 minutos de actividad aeróbica moderada semanalmente</li>
                                <li>Incorpora ejercicios de fortalecimiento muscular 2 veces por semana</li>
                                <li>Evita periodos prolongados de inactividad</li>
                                <li>Camina al menos 30 minutos diarios</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                        
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Heart className="h-4 w-4 text-red-500" />
                                Hábitos saludables
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Si fumas, busca ayuda para dejarlo</li>
                                <li>Limita el consumo de alcohol</li>
                                <li>Gestiona el estrés con técnicas de relajación</li>
                                <li>Mantén un peso saludable (IMC entre 18.5-24.9)</li>
                                <li>Asegúrate de dormir 7-8 horas diarias</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      </CarouselContent>
                      <div className="hidden md:flex justify-end gap-2 mt-4">
                        <CarouselPrevious />
                        <CarouselNext />
                      </div>
                    </Carousel>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-cardio-primary" />
                        Valores óptimos recomendados
                      </h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Indicador</TableHead>
                            <TableHead>Valor objetivo</TableHead>
                            <TableHead>Su valor</TableHead>
                            <TableHead className="text-right">Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Presión arterial</TableCell>
                            <TableCell>&lt;120/80 mmHg</TableCell>
                            <TableCell>{predictionInputs.systolicBP}/{predictionInputs.diastolicBP} mmHg</TableCell>
                            <TableCell className="text-right">
                              {parseInt(predictionInputs.systolicBP) < 120 && parseInt(predictionInputs.diastolicBP) < 80 ? (
                                <Check className="h-4 w-4 text-green-500 ml-auto" />
                              ) : (
                                <X className="h-4 w-4 text-red-500 ml-auto" />
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Colesterol total</TableCell>
                            <TableCell>&lt;200 mg/dL</TableCell>
                            <TableCell>{predictionInputs.cholesterol} mg/dL</TableCell>
                            <TableCell className="text-right">
                              {parseInt(predictionInputs.cholesterol) < 200 ? (
                                <Check className="h-4 w-4 text-green-500 ml-auto" />
                              ) : (
                                <X className="h-4 w-4 text-red-500 ml-auto" />
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Glucosa en ayunas</TableCell>
                            <TableCell>&lt;100 mg/dL</TableCell>
                            <TableCell>{predictionInputs.glucose} mg/dL</TableCell>
                            <TableCell className="text-right">
                              {parseInt(predictionInputs.glucose) < 100 ? (
                                <Check className="h-4 w-4 text-green-500 ml-auto" />
                              ) : (
                                <X className="h-4 w-4 text-red-500 ml-auto" />
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>IMC</TableCell>
                            <TableCell>18.5-24.9</TableCell>
                            <TableCell>{predictionInputs.bmi}</TableCell>
                            <TableCell className="text-right">
                              {parseFloat(predictionInputs.bmi) >= 18.5 && parseFloat(predictionInputs.bmi) < 25 ? (
                                <Check className="h-4 w-4 text-green-500 ml-auto" />
                              ) : (
                                <X className="h-4 w-4 text-red-500 ml-auto" />
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    
                    <div className="mt-6 border-t pt-4">
                      <h3 className="font-medium mb-2">Factores de riesgo identificados</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {parseInt(predictionInputs.age) > 60 && (
                          <div className="flex items-center gap-2 p-2 border rounded-lg bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30">
                            <CircleAlert className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Edad avanzada (mayor a 60 años)</span>
                          </div>
                        )}
                        {parseInt(predictionInputs.systolicBP) > 130 && (
                          <div className="flex items-center gap-2 p-2 border rounded-lg bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30">
                            <CircleAlert className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Presión arterial elevada</span>
                          </div>
                        )}
                        {parseInt(predictionInputs.cholesterol) > 200 && (
                          <div className="flex items-center gap-2 p-2 border rounded-lg bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30">
                            <CircleAlert className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Colesterol elevado</span>
                          </div>
                        )}
                        {parseInt(predictionInputs.glucose) > 100 && (
                          <div className="flex items-center gap-2 p-2 border rounded-lg bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30">
                            <CircleAlert className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Glucosa elevada</span>
                          </div>
                        )}
                        {parseFloat(predictionInputs.bmi) > 25 && (
                          <div className="flex items-center gap-2 p-2 border rounded-lg bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30">
                            <CircleAlert className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Sobrepeso/Obesidad</span>
                          </div>
                        )}
                        {predictionInputs.smoking === "1" && (
                          <div className="flex items-center gap-2 p-2 border rounded-lg bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30">
                            <CircleAlert className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Tabaquismo</span>
                          </div>
                        )}
                        {predictionInputs.physicalActivity === "0" && (
                          <div className="flex items-center gap-2 p-2 border rounded-lg bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30">
                            <CircleAlert className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Sedentarismo</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Para obtener recomendaciones personalizadas, primero realiza una predicción en la pestaña "Predicción".
                  </p>
                  <Button 
                    onClick={() => document.querySelector('[value="prediction"]')?.dispatchEvent(new Event('click'))} 
                    className="mt-4 bg-cardio-primary hover:bg-cardio-dark"
                  >
                    Ir a Predicción
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <div className="border-t pt-4 mt-6">
                <h3 className="font-medium text-lg mb-2">Precisión del modelo</h3>
                <p className="text-sm mb-2">
                  El algoritmo {algorithmData[selectedAlgorithm]?.name || "Random Forest"} ha demostrado ser el más preciso para la predicción de 
                  enfermedades cardiovasculares con un {algorithmData[selectedAlgorithm]?.accuracy || "92.3"}% de precisión.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  {Object.entries(algorithmData).map(([key, data]) => (
                    <div key={key} className="flex items-center gap-2 border rounded-lg p-3">
                      <div className="h-4 w-4 rounded-full" style={{ backgroundColor: data.color }}></div>
                      <div className="text-sm">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-xs text-muted-foreground">Precisión: {data.accuracy}%</p>
                      </div>
                    </div>
                  ))}
                </div>
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
