import React from "react";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "rgba(0,0,0,0.2)" }}
      onClick={onClick}
    >
      &lt;
    </div>
  );
};

export default PrevArrow;
