import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Provider eka import kala

// Google Console eken gaththa Client ID eka methanata danna
const GOOGLE_CLIENT_ID = "1090742228955-btaulko38jbnn63v7qjq2cdog2r26mki.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
