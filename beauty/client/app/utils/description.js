/**
 * 
 * @param { content } param0 
 * @returns 
 */

import React from "react";

const DescriptionComponent = ({ content }) => {
  return (
    <p dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default DescriptionComponent;
