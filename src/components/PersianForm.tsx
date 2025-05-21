
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FormField {
  label: string;
  type: string;
  placeholder: string;
}

interface ButtonProps {
  text: string;
  color: string;
}

interface ProgressProps {
  show: boolean;
  value: number;
}

interface PersianFormProps {
  fields: FormField[];
  button: ButtonProps;
  progress: ProgressProps;
}

const PersianForm: React.FC<PersianFormProps> = ({ fields, button, progress }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [progressValue, setProgressValue] = useState(progress.value);
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  useEffect(() => {
    // Animate form appearance
    const timer = setTimeout(() => {
      setIsFormVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgressValue(prevValue => {
        if (prevValue < 100) {
          const newValue = prevValue + 1;
          return newValue > 100 ? 100 : newValue;
        }
        return prevValue;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("فرم با موفقیت ارسال شد", {
      position: "bottom-center",
      duration: 3000,
    });
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={cn(
      "w-full max-w-md mx-auto p-6 rtl transition-all duration-500 transform",
      isFormVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2 text-persian-text animate-fade-in">فرم ثبت نام</h2>
        {progress.show && (
          <div className="space-y-2">
            <Progress 
              value={progressValue} 
              className="h-2 bg-gray-100"
              // Fixed the error by removing indicatorClassName and using inline styles
            />
            <p className="text-xs text-persian-text">پیشرفت: {progressValue}%</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="persian-form space-y-6">
        {fields.map((field, index) => (
          <div 
            key={index} 
            className="space-y-2 animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <label htmlFor={`field-${index}`} className="text-persian-text block font-medium">
              {field.label}
            </label>
            <input
              id={`field-${index}`}
              type={field.type}
              name={`field-${index}`}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-persian-button focus:border-transparent transition-all hover:shadow-md"
              required
            />
          </div>
        ))}
        
        <button
          type="submit"
          style={{ backgroundColor: button.color }}
          className="w-full py-3 px-4 rounded-md text-white font-medium hover:bg-persian-buttonHover transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in"
        >
          {button.text}
        </button>
      </form>
    </div>
  );
};

export default PersianForm;
