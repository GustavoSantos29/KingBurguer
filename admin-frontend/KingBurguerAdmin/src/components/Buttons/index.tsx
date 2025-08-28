import React from "react";
import "./style.css";

type ButtonVariant = "outlined" | "filled";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  onClick?: () => void;
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disable?: boolean;
}

export default function Button({
  onClick,
  children,
  variant = "filled",
  size = "medium",
  disable = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`button ${variant} ${size} ${disable? "disable" : ""}`}
      disabled={disable}
    >
      {children}
    </button>
  );
}
