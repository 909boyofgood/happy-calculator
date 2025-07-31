import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from 'sonner';
import App from "./App";
import "./index.css";
import "./i18n"; // 导入i18n配置

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
