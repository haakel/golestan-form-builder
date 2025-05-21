
import React from "react";
import WatercolorBackground from "@/components/WatercolorBackground";
import PersianForm from "@/components/PersianForm";

const Index = () => {
  const formFields = [
    {
      label: "ایمیل",
      type: "email",
      placeholder: "test",
    },
    {
      label: "نام",
      type: "text",
      placeholder: "test",
    }
  ];

  const buttonConfig = {
    text: "تایید",
    color: "#800080",
  };

  const progressConfig = {
    show: true,
    value: 5,
  };

  return (
    <WatercolorBackground>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-80 rounded-xl shadow-xl p-6 w-full max-w-md">
          <PersianForm 
            fields={formFields}
            button={buttonConfig}
            progress={progressConfig}
          />
        </div>
      </div>
    </WatercolorBackground>
  );
};

export default Index;
