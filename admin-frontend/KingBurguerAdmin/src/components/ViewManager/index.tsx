import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Teste from "../../pages/Teste";
import AddHamburguer from "../../pages/Add";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import LoginPage from "../../pages/Login";

export default function ViewManager() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Teste />} />
        <Route path="/menu" element={<AddHamburguer />} />
        <Route path="/metrics" element={<h1>Metricas</h1>} />
        
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
