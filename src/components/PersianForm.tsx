
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("فرم با موفقیت ارسال شد");
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rtl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2 text-persian-text">فرم ثبت نام</h2>
        {progress.show && (
          <div className="space-y-2">
            <Progress value={progress.value} className="h-2 bg-gray-100" indicatorClassName="bg-persian-progress" />
            <p className="text-xs text-persian-text">پیشرفت: {progress.value}%</p>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="persian-form space-y-6">
        {fields.map((field, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={`field-${index}`} className="text-persian-text">
              {field.label}
            </label>
            <input
              id={`field-${index}`}
              type={field.type}
              name={`field-${index}`}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-persian-button focus:border-transparent"
              required
            />
          </div>
        ))}
        
        <button
          type="submit"
          style={{ 
            backgroundColor: button.color,
          }}
          className="w-full py-3 px-4 rounded-md text-white font-medium hover:bg-persian-buttonHover transition-colors duration-300"
        >
          {button.text}
        </button>
      </form>
    </div>
  );
};

export default PersianForm;
