
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface PatientData {
  age: string;
  sex: string;
  systolic: string;
  diastolic: string;
  cholesterol: string;
  glucose: string;
  smoker: boolean;
}

interface ManualDataInputProps {
  onDataSubmit: (data: PatientData) => void;
}

const ManualDataInput: React.FC<ManualDataInputProps> = ({ onDataSubmit }) => {
  const [formData, setFormData] = useState<PatientData>({
    age: "",
    sex: "M",
    systolic: "",
    diastolic: "",
    cholesterol: "",
    glucose: "",
    smoker: false,
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = () => {
    setFormData({
      ...formData,
      smoker: !formData.smoker,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ["age", "systolic", "diastolic", "cholesterol", "glucose"];
    const missingFields = requiredFields.filter(field => !formData[field as keyof PatientData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Faltan datos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Submit data
    onDataSubmit(formData);
    
    // Navigate to algorithms page
    setTimeout(() => {
      toast({
        title: "Datos procesados correctamente",
        description: "Los datos han sido preparados para análisis.",
      });
      navigate('/algorithms');
    }, 1000);
  };

  return (
    <Card>
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium">
                Edad <span className="text-red-500">*</span>
              </Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="18"
                max="120"
                value={formData.age}
                onChange={handleChange}
                placeholder="Ej: 45"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sex" className="text-sm font-medium">
                Sexo <span className="text-red-500">*</span>
              </Label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="systolic" className="text-sm font-medium">
                Presión Sistólica (mmHg) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="systolic"
                name="systolic"
                type="number"
                min="80"
                max="220"
                value={formData.systolic}
                onChange={handleChange}
                placeholder="Ej: 120"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diastolic" className="text-sm font-medium">
                Presión Diastólica (mmHg) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="diastolic"
                name="diastolic"
                type="number"
                min="40"
                max="130"
                value={formData.diastolic}
                onChange={handleChange}
                placeholder="Ej: 80"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cholesterol" className="text-sm font-medium">
                Colesterol (mg/dL) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cholesterol"
                name="cholesterol"
                type="number"
                min="100"
                max="500"
                value={formData.cholesterol}
                onChange={handleChange}
                placeholder="Ej: 180"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="glucose" className="text-sm font-medium">
                Glucosa (mg/dL) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="glucose"
                name="glucose"
                type="number"
                min="50"
                max="400"
                value={formData.glucose}
                onChange={handleChange}
                placeholder="Ej: 90"
              />
            </div>

            <div className="space-y-2 flex items-center justify-between pt-6">
              <Label htmlFor="smoker" className="text-sm font-medium">
                ¿Fumador?
              </Label>
              <Switch
                id="smoker"
                checked={formData.smoker}
                onCheckedChange={handleSwitchChange}
              />
            </div>
          </div>

          <div className="text-xs text-muted-foreground mt-4">
            <span className="text-red-500">*</span> Campos obligatorios
          </div>

          <Button type="submit" className="w-full bg-cardio-primary hover:bg-cardio-dark">
            Procesar Datos
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManualDataInput;
