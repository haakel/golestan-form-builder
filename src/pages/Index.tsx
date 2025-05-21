
import React from "react";
import WatercolorBackground from "@/components/WatercolorBackground";
import PersianForm from "@/components/PersianForm";

const Index = () => {
  const formFields = [
    // بخش اول: اطلاعات شخصی
    {
      label: "ایمیل",
      type: "email",
      placeholder: "ایمیل خود را وارد کنید",
    },
    {
      label: "نام",
      type: "text",
      placeholder: "نام خود را وارد کنید",
    },
    // بخش دوم: اطلاعات تکمیلی
    {
      label: "رضایت‌نامه",
      type: "checkbox",
      placeholder: "با قوانین موافقم",
    },
    {
      label: "شماره تماس",
      type: "tel",
      placeholder: "شماره تماس خود را وارد کنید",
    }
  ];

  const buttonConfig = {
    text: "تایید",
    color: "#800080",
  };

  const progressConfig = {
    show: true,
    value: 10, // مقدار اولیه پیشرفت
  };

  return (
    <WatercolorBackground>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="bg-white bg-opacity-80 rounded-xl shadow-xl p-6 w-full max-w-md backdrop-blur-sm animate-scale-in transition-all duration-500 hover:shadow-2xl">
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
