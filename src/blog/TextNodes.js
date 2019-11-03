import React from 'react';
import NodeType from './NodeType';

const TextNodes = ({ node }) => {

  const content = node.content.map((item) => item);

  const textnode = content.map((textNode, index) => (
    <NodeType key={index} node={textNode} />
  ));

  return textnode;
};

export default TextNodes;
