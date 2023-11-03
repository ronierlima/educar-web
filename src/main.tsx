import { ConfigProvider } from "antd";
import ptBR from 'antd/locale/pt_BR';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: "#044cf4" } }} locale={ptBR}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
