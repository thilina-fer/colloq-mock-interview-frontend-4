import React from "react";
import { colors } from "../../theme/color";
import Header from "../../component/dashboard/Header";
import UserInfo from "../../component/dashboard/UserInfo";
import NavigationBar from "../../component/dashboard/NavigationBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen w-full relative bg-[#FDFDFD] transition-all duration-300">
      
      <style>{`
        @keyframes fadeSlideUp { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fadeSlideUp { animation: fadeSlideUp 0.8s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
      `}</style>

      <Header />

      <main className="w-full flex justify-center pt-20 md:pt-24">
        
        <div className="w-full max-w-7xl px-4 md:px-12">
          
          <UserInfo />

          <NavigationBar />

          <section className="w-full mt-6 md:mt-8 animate-fadeSlideUp delay-200 mb-12 min-h-[250px] md:min-h-[300px] border-2 border-dashed border-gray-100 rounded-2xl md:rounded-3xl flex items-center justify-center p-6 text-center">
            <p className="text-xs md:text-sm font-medium text-gray-400">
              Select a tab from the navigation bar to view content.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;