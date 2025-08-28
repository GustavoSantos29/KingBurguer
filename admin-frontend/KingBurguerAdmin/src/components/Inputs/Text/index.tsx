import React from "react";
import './style.css'
interface InputTextProps {
  id: string;
  value?: string;
  // handleChange: () => void;
  label?: string
  svg?: React.ReactNode
}

export default function InputText({ id, value, label,svg }: InputTextProps) {
  return (
    <div className="input-container">
      <input
        type="text"
        id={id}
        className="input-text"
        value={value}
        // onChange={handleChange}
        placeholder=" "
      />
      <label className='input-label' htmlFor={id}>
        <span className="input-span">{svg}</span>
        <p className="label-text">{label}</p> 
      </label>
    </div>
  );
}
