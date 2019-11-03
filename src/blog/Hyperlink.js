import React from 'react';
import TextNode from './TextNode';

const Hyperlink = ({ node }) => (
  <a href={node.data.uri && node.data.uri}><TextNode node={node.content && node.content[0]} /></a>
)

export default Hyperlink;