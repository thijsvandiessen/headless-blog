import React from 'react';
import NodeType from './NodeType';

const Nodes = ({ node }) => {

  const content = node.content.map((item) => item);

  const nodes = content.map((node, index) => (
    <NodeType key={index} node={node} />
  ));

  return nodes;
};

export default Nodes;
