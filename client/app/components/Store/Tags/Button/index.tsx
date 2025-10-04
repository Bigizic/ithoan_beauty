import React from "react";

interface ButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
  type?: "primary" | "secondary" | string;
  fontSize?: string;
  inlineElement?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    text,
    className,
    onClick,
    type = "primary",
    fontSize = "11px",
    inlineElement,
    ...restProps
  } = props;

  return (
    <button
      className={`${type} ${className || ''} flex items-center`}
      style={{
        fontSize: fontSize
      }}
      onClick={onClick}
      {...restProps}
    >
      {inlineElement &&
        <span className="mr-1">
          {inlineElement}
        </span>
      }
      {text}
    </button>
  );
};

export default Button;