import React from "react";
import { ToastContainer } from "react-toastify";
import "./main.scss";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./routers/AppRouter";

const App: React.FC = () => {
  return (
    <main>
      <AppRouter />
      <ToastContainer />
    </main>
  );
};

export default App;
