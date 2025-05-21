
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadIcon, FileText, CircleCheck, CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"];
    const fileType = selectedFile.type;

    if (!validTypes.includes(fileType)) {
      toast({
        title: "Formato no compatible",
        description: "Por favor, selecciona un archivo Excel o CSV.",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulamos el procesamiento del archivo
    setTimeout(() => {
      toast({
        title: "Archivo procesado correctamente",
        description: "Los datos han sido cargados para análisis.",
      });
      setIsUploading(false);
      navigate('/algorithms');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Subir Dataset</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Carga tus datos para análisis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging 
                ? "border-cardio-primary bg-cardio-primary/10" 
                : file 
                  ? "border-cardio-accent bg-cardio-accent/10" 
                  : "border-gray-300 hover:border-cardio-primary"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              {file ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="h-12 w-12 rounded-full bg-cardio-accent/20 flex items-center justify-center">
                    <CircleCheck className="h-8 w-8 text-cardio-accent" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-cardio-primary" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Tamaño: {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-full bg-cardio-primary/20 flex items-center justify-center mx-auto">
                    <UploadIcon className="h-6 w-6 text-cardio-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Arrastra y suelta tu archivo aquí</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      o haz clic para seleccionar un archivo
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      Archivos soportados: .xlsx, .xls, .csv
                    </p>
                  </div>
                </>
              )}
              <div>
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept=".xlsx,.xls,.csv"
                />
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  {file ? "Cambiar archivo" : "Seleccionar archivo"}
                </Button>
              </div>
            </div>
          </div>

          {file && (
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setFile(null)}
              >
                <CircleX className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
              <Button 
                onClick={handleUpload} 
                disabled={isUploading}
                className="bg-cardio-primary hover:bg-cardio-dark"
              >
                {isUploading ? "Procesando..." : "Procesar Datos"}
              </Button>
            </div>
          )}

          <div className="border rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <span className="font-medium">Importante:</span> El dataset debe incluir columnas como edad, sexo, presión arterial, colesterol, frecuencia cardíaca y otros factores de riesgo cardiovascular para obtener resultados precisos.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-sm text-muted-foreground">
        <p className="mb-2"><strong>Ejemplo de formato esperado:</strong></p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border p-2">Edad</th>
                <th className="border p-2">Sexo</th>
                <th className="border p-2">Presión Sistólica</th>
                <th className="border p-2">Presión Diastólica</th>
                <th className="border p-2">Colesterol</th>
                <th className="border p-2">Glucosa</th>
                <th className="border p-2">Fumador</th>
                <th className="border p-2">Riesgo CVD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">65</td>
                <td className="border p-2">M</td>
                <td className="border p-2">145</td>
                <td className="border p-2">85</td>
                <td className="border p-2">240</td>
                <td className="border p-2">110</td>
                <td className="border p-2">1</td>
                <td className="border p-2">1</td>
              </tr>
              <tr>
                <td className="border p-2">42</td>
                <td className="border p-2">F</td>
                <td className="border p-2">120</td>
                <td className="border p-2">80</td>
                <td className="border p-2">185</td>
                <td className="border p-2">95</td>
                <td className="border p-2">0</td>
                <td className="border p-2">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Upload;
