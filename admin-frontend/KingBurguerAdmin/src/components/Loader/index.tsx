import React from "react";
import { ThreeDot } from "react-loading-indicators";
import "./style.css";
import Navbar from "../Navbar";

export default function Loader() {
  return (
    <div className="loading-zone">
      <ThreeDot
        variant="pulsate"
        color="#585858"
        size="large"
        text="Carregando..."
        textColor=""
      />
    </div>
  );
}
