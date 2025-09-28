import React from "react";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "rgba(0,0,0,0.2)" }}
      onClick={onClick}
    >
      &gt;
    </div>
  );
}

export default NextArrow;