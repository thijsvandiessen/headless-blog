import React from 'react';
import TextNodes from './TextNodes';
import TextNode from './TextNode';
import Hyperlink from './Hyperlink';
import Block from './Block';
import Nodes from './Nodes';

const NodeType = ({ node }) => {
  const state = {
    'text': <TextNode node={node} />,
    'hyperlink': <Hyperlink node={node} />,
    'heading-1': <h1><TextNodes node={node} /></h1>,
    'heading-2': <h2><TextNodes node={node} /></h2>,
    'heading-3': <h3><TextNodes node={node} /></h3>,
    'heading-4': <h4><TextNodes node={node} /></h4>,
    'heading-5': <h5><TextNodes node={node} /></h5>,
    'heading-6': <h6><TextNodes node={node} /></h6>,
    'paragraph': <p><TextNodes node={node} /></p>,
    'list-item': <li><Nodes node={node} /></li>,
    'unordered-list': <ul><Nodes node={node} /></ul>,
    'ordered-list': <ol><Nodes node={node} /></ol>,
    'blockquote': <blockquote><Nodes node={node} /></blockquote>,
    'hr': <hr />,
    'embedded-asset-block': <Block node={node} />,
  };

  // node type not supported
  if (!state[node.nodeType]) return null;

  return state[node.nodeType];
}

export default NodeType;