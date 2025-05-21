
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

// Datos simulados de historial
const historyData = [
  {
    id: 1,
    date: "2025-05-18",
    fileName: "cardio_data_2025.xlsx",
    algorithm: "Random Forest",
    accuracy: 92.3,
    result: "Riesgo Alto",
    riskLevel: "high",
  },
  {
    id: 2,
    date: "2025-05-15",
    fileName: "patient_screening_may.csv",
    algorithm: "J48",
    accuracy: 87.1,
    result: "Riesgo Moderado",
    riskLevel: "medium",
  },
  {
    id: 3,
    date: "2025-05-10",
    fileName: "heart_study_group.xlsx",
    algorithm: "Naive Bayes",
    accuracy: 83.5,
    result: "Riesgo Bajo",
    riskLevel: "low",
  },
  {
    id: 4,
    date: "2025-05-05",
    fileName: "medical_records_q1.xlsx",
    algorithm: "Random Forest",
    accuracy: 91.8,
    result: "Riesgo Moderado",
    riskLevel: "medium",
  }
];

// Datos simulados para las estadísticas
const statisticsData = {
  totalAnalyses: 24,
  averageAccuracy: 89.7,
  mostAccurateAlgorithm: "Random Forest",
  algorithmDistribution: {
    randomForest: 12,
    j48: 8,
    naiveBayes: 4
  },
  riskDistribution: {
    high: 7,
    medium: 10,
    low: 7
  }
};

const History = () => {
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  function getRiskBadgeColor(riskLevel: string) {
    switch(riskLevel) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Historial de Análisis</h1>
      
      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="history">Registros</TabsTrigger>
          <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          <div className="space-y-4">
            {historyData.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 bg-cardio-light dark:bg-cardio-dark/40 p-4 flex flex-col justify-center items-center">
                    <div className="flex items-center space-x-2 text-cardio-primary mb-2">
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">{formatDate(item.date)}</span>
                    </div>
                    <Badge className={`${getRiskBadgeColor(item.riskLevel)}`}>{item.result}</Badge>
                  </div>
                  
                  <CardContent className="md:w-3/4 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Archivo</p>
                        <p className="font-medium truncate">{item.fileName}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Algoritmo</p>
                        <p className="font-medium">{item.algorithm}</p>
                      </div>
                      
                      <div className="col-span-1 md:col-span-2">
                        <p className="text-sm text-muted-foreground">Precisión del modelo</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div 
                              className="bg-cardio-primary h-2.5 rounded-full" 
                              style={{width: `${item.accuracy}%`}} 
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{item.accuracy}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="stats-card bg-white dark:bg-gray-900 text-center">
                    <span className="text-3xl font-bold text-cardio-primary">
                      {statisticsData.totalAnalyses}
                    </span>
                    <p className="text-sm text-muted-foreground">Total de análisis</p>
                  </div>
                  
                  <div className="stats-card bg-white dark:bg-gray-900 text-center">
                    <span className="text-3xl font-bold text-cardio-primary">
                      {statisticsData.averageAccuracy}%
                    </span>
                    <p className="text-sm text-muted-foreground">Precisión media</p>
                  </div>
                </div>
                
                <div className="stats-card bg-white dark:bg-gray-900 text-center py-4">
                  <p className="text-sm text-muted-foreground">Algoritmo más preciso</p>
                  <span className="text-xl font-medium text-cardio-primary">
                    {statisticsData.mostAccurateAlgorithm}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribución de Algoritmos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-cardio-primary mr-2"></span>
                      Random Forest
                    </span>
                    <span>{statisticsData.algorithmDistribution.randomForest}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div 
                      className="bg-cardio-primary h-2 rounded-full" 
                      style={{width: `${(statisticsData.algorithmDistribution.randomForest / statisticsData.totalAnalyses) * 100}%`}} 
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-cardio-accent mr-2"></span>
                      J48
                    </span>
                    <span>{statisticsData.algorithmDistribution.j48}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div 
                      className="bg-cardio-accent h-2 rounded-full" 
                      style={{width: `${(statisticsData.algorithmDistribution.j48 / statisticsData.totalAnalyses) * 100}%`}} 
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-cardio-warning mr-2"></span>
                      Naive Bayes
                    </span>
                    <span>{statisticsData.algorithmDistribution.naiveBayes}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div 
                      className="bg-cardio-warning h-2 rounded-full" 
                      style={{width: `${(statisticsData.algorithmDistribution.naiveBayes / statisticsData.totalAnalyses) * 100}%`}} 
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Distribución de Nivel de Riesgo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="stats-card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-center">
                    <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {statisticsData.riskDistribution.high}
                    </span>
                    <p className="text-sm text-red-800 dark:text-red-300">Riesgo Alto</p>
                  </div>
                  
                  <div className="stats-card bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-center">
                    <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                      {statisticsData.riskDistribution.medium}
                    </span>
                    <p className="text-sm text-amber-800 dark:text-amber-300">Riesgo Moderado</p>
                  </div>
                  
                  <div className="stats-card bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-center">
                    <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {statisticsData.riskDistribution.low}
                    </span>
                    <p className="text-sm text-green-800 dark:text-green-300">Riesgo Bajo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
