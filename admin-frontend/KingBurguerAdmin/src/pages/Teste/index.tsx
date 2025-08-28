import React, { useEffect, useState } from "react";
import Button from "../../components/Buttons";
import "./style.css";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Table from "../../components/Table/Hamburguer";
import useToast from "../../hooks/useToast";
import Checkbox from "../../components/Checkbox";
import { InputNumber } from "../../components/Inputs/Number";




export default function Teste() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const {showToast} = useToast()

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoading(false);
      
    }, 1500);

    return () => clearTimeout(timerId);
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <Error />;

  return (
    <div className="test-zone">
      <div className="table-upper">
        <h1>Procurar lanche</h1>
      </div>
      <Table /> 
    
    </div>
  );
}
