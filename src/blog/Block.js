import React from 'react';

const Block = ({ node }) => {

  // only image/jpeg is supported right now
  if (node.data.target.fields.file.contentType === "image/jpeg") {
    return (
      <img
        src={node.data.target.fields.file.url}
        alt={node.data.target.fields.desc ? node.data.target.fields.desc : ''}
      />
    )
  }

  // else
  return null;
};

export default Block;