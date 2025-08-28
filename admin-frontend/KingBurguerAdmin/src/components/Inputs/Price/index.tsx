import React, { useState } from "react";
import "./style.css";

interface InputPriceProps {
  placeholder?: string;
  valorInicial?: string;
}

export function InputPrice({
  placeholder,
  valorInicial = "",
}: InputPriceProps) {
  const [valor, setValor] = useState(valorInicial);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valorDigitado = event.target.value;

    const regex = /^[0-9]*(,?[0-9]{0,2})$/;

    if (regex.test(valorDigitado)) {
      setValor(valorDigitado);
    }
  };

  return (
    <input
      type="text"
      className="price"
      value={valor}
      onChange={handleChange}
      placeholder={placeholder}
      inputMode="decimal"
    />
  );
}
