
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type AlgorithmData = {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  color: string;
  description: string;
};

interface AlgorithmComparisonProps {
  algorithmData: Record<string, AlgorithmData>;
}

export function AlgorithmComparison({ algorithmData }: AlgorithmComparisonProps) {
  // Preparar datos para gráficas
  const chartData = Object.values(algorithmData).map(algorithm => ({
    name: algorithm.name,
    Precisión: algorithm.accuracy,
    "Valor-P": algorithm.precision,
    Recall: algorithm.recall,
    "F1-Score": algorithm.f1Score,
    color: algorithm.color
  }));
  
  const metricData = [
    { name: 'Precisión', J48: algorithmData.j48.accuracy, 'Random Forest': algorithmData.randomForest.accuracy, 'Naive Bayes': algorithmData.naiveBayes.accuracy },
    { name: 'Valor-P', J48: algorithmData.j48.precision, 'Random Forest': algorithmData.randomForest.precision, 'Naive Bayes': algorithmData.naiveBayes.precision },
    { name: 'Recall', J48: algorithmData.j48.recall, 'Random Forest': algorithmData.randomForest.recall, 'Naive Bayes': algorithmData.naiveBayes.recall },
    { name: 'F1-Score', J48: algorithmData.j48.f1Score, 'Random Forest': algorithmData.randomForest.f1Score, 'Naive Bayes': algorithmData.naiveBayes.f1Score },
  ];

  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={metricData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, '']}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Bar dataKey="J48" fill={algorithmData.j48.color} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Random Forest" fill={algorithmData.randomForest.color} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Naive Bayes" fill={algorithmData.naiveBayes.color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
