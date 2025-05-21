
import { HeartPulse } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-6 px-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <HeartPulse className="h-5 w-5 text-cardio-primary mr-2" />
          <span className="text-sm font-medium text-cardio-primary">CardioPredict</span>
          <span className="text-xs text-muted-foreground ml-2">© {new Date().getFullYear()}</span>
        </div>
        <div className="text-xs text-muted-foreground text-center md:text-right">
          <p>Sistema predictivo de enfermedades cardiovasculares con algoritmos de machine learning</p>
          <p>J48 · Random Forest · Naive Bayes</p>
        </div>
      </div>
    </footer>
  );
}
