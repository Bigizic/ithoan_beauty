/**
 * 
 * @param {*} param0 
 * @returns 
 */

import React from "react";


export const Shimmer = ({ width = '100px', height = '20px' }) => {
    return (
      <div
        style={{
          width,
          height,
          background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
          borderRadius: '4px',
        }}
      />
    );
  };
  