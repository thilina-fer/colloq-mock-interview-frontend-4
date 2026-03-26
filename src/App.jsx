import React from "react";
import { Toaster } from "react-hot-toast";
import AppRouter from "./Routing/AppRouter";

function App() {
  return (
    <>
      {/* Toaster eka app eke uda harin thiyanne mehemai. 
          Mulu app ekema ona thanaka dan toast pennanna puluwan! */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000, // Thathpara 3kin auto close wenawa
          style: {
            background: "#333", // Dark theme ekata match wena background eka
            color: "#fff",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            border: "1px solid #444", // Podi border ekak lassanata
          },
          success: {
            iconTheme: {
              primary: "#ea580c", // Oyage theme eke orange color eka
              secondary: "#fff",
            },
          },
        }}
      />

      <AppRouter />
    </>
  );
}

export default App;
