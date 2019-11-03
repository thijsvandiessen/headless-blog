import React from 'react';
import NodeType from './NodeType';

const Article = ({ nodes, title, metadata, }) => {
  const types = nodes.map((node, index) => (
    <NodeType node={node} key={index} />
  ))

  return (
    <article className="blogPost">
      {types}
    </article>
  );
}

export default Article;
