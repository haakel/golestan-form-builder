
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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

// گروه‌بندی فیلدها برای فرم چندبخشی
const groupFields = (fields: FormField[]): FormField[][] => {
  // بخش اول: ایمیل و نام
  // بخش دوم: بقیه فیلدها (مانند رضایت و شماره تماس)
  const firstGroup = fields.filter((_, index) => index < 2);
  const secondGroup = fields.filter((_, index) => index >= 2);
  
  return [firstGroup, secondGroup];
};

const PersianForm: React.FC<PersianFormProps> = ({ fields, button, progress }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [progressValue, setProgressValue] = useState(progress.value);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // تقسیم فیلدها به چند بخش
  const formSteps = groupFields(fields);
  const totalSteps = formSteps.length;
  
  useEffect(() => {
    // انیمیشن ظاهر شدن فرم
    const timer = setTimeout(() => {
      setIsFormVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // به‌روزرسانی مقدار پیشرفت بر اساس مرحله فعلی
    if (isCompleted) {
      setProgressValue(100);
    } else {
      const stepProgress = (currentStep / totalSteps) * 100;
      setProgressValue(progress.value + stepProgress);
    }
  }, [currentStep, progress.value, totalSteps, isCompleted]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < totalSteps - 1) {
      // رفتن به مرحله بعدی
      setCurrentStep(prev => prev + 1);
      toast.success("بخش اول با موفقیت ثبت شد", {
        position: "bottom-center",
        duration: 3000,
      });
    } else {
      // پایان فرم
      setIsCompleted(true);
      setProgressValue(100);
      toast.success("فرم با موفقیت ارسال شد", {
        position: "bottom-center",
        duration: 3000,
      });
      console.log("Form submitted:", formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // فیلدهای مرحله فعلی
  const currentFields = formSteps[currentStep] || [];
  
  // عنوان مرحله
  const getStepTitle = () => {
    if (isCompleted) {
      return "تکمیل فرم";
    }
    return currentStep === 0 
      ? "اطلاعات شخصی" 
      : "اطلاعات تکمیلی";
  };

  // متن دکمه بر اساس مرحله
  const getButtonText = () => {
    return currentStep < totalSteps - 1 
      ? "مرحله بعدی" 
      : button.text;
  };

  // نمایش بخش تشکر
  const renderThankYouSection = () => {
    return (
      <div className="text-center space-y-6 py-8 animate-fade-in">
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <Check className="h-16 w-16 text-green-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-persian-text">با تشکر از ثبت اطلاعات شما</h2>
        <p className="text-persian-text opacity-75">
          اطلاعات شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.
        </p>
        <button
          onClick={() => {
            setIsCompleted(false);
            setCurrentStep(0);
            setFormData({});
            setProgressValue(progress.value);
          }}
          className="mt-6 py-2 px-4 bg-persian-button text-white rounded-md hover:bg-persian-buttonHover transition-colors duration-300"
        >
          بازگشت به فرم
        </button>
      </div>
    );
  };

  return (
    <div className={cn(
      "w-full max-w-md mx-auto p-6 rtl transition-all duration-500 transform",
      isFormVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2 text-persian-text animate-fade-in">{getStepTitle()}</h2>
        
        {progress.show && (
          <div className="space-y-2">
            <Progress 
              value={progressValue} 
              className="h-2 bg-gray-100"
            />
            <p className="text-xs text-persian-text">پیشرفت: {Math.round(progressValue)}%</p>
            {!isCompleted && <p className="text-xs text-persian-text text-opacity-70">مرحله {currentStep + 1} از {totalSteps}</p>}
          </div>
        )}
      </div>
      
      {isCompleted ? renderThankYouSection() : (
        <form onSubmit={handleSubmit} className="persian-form space-y-6">
          {currentFields.map((field, index) => (
            <div 
              key={`step-${currentStep}-field-${index}`} 
              className="space-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <label htmlFor={`field-${currentStep}-${index}`} className="text-persian-text block font-medium">
                {field.label}
              </label>
              <input
                id={`field-${currentStep}-${index}`}
                type={field.type}
                name={`field-${currentStep}-${index}`}
                placeholder={field.placeholder}
                value={formData[`field-${currentStep}-${index}`] || ""}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-persian-button focus:border-transparent transition-all hover:shadow-md"
                required
              />
            </div>
          ))}
          
          <div className="flex justify-between gap-4 mt-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex-1 py-3 px-4 rounded-md bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
              >
                بازگشت
              </button>
            )}
            
            <button
              type="submit"
              style={{ backgroundColor: button.color }}
              className={cn(
                "py-3 px-4 rounded-md text-white font-medium hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg",
                currentStep === 0 ? "w-full" : "flex-1"
              )}
            >
              {getButtonText()}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PersianForm;
