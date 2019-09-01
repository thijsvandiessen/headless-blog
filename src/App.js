import React, { useState, useEffect } from 'react';
import * as contentful from 'contentful';
import './App.css';

const client = contentful.createClient({
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESSTOKEN,
  environment: 'master', // defaults to 'master' if not set
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
})

const Text = ({ node }) => {

  if (!node.marks) return node.value;

  const marks = node.marks.map((item) => {
    return item.type
  });

  const bold = (value) => <strong>{value}</strong>;
  const italic = (value) => <em>{value}</em>;
  const underline = (value) => <span className="underline">{value}</span>;
  const code = (value) => <code>{value}</code>;

  // empty paragraph
  if (!node.value) return <br />;

  // no styling
  if (!marks) return node.value;

  // length === 1
  if (marks.includes('bold') && marks.length === 1) return bold(node.value);
  if (marks.includes('italic') && marks.length === 1) return italic(node.value);
  if (marks.includes('underline') && marks.length === 1) return underline(node.value);

  // code can't have combined styles
  if (marks.includes('code')) return code(node.value);

  // length === 2
  if (marks.includes('bold') && marks.includes('italic') && marks.length === 2) return bold(italic(node.value));
  if (marks.includes('bold') && marks.includes('underline') && marks.length === 2) return bold(underline(node.value));
  if (marks.includes('italic') && marks.includes('underline') && marks.length === 2) return italic(underline(node.value));

  // length === 3
  if (marks.includes('bold') && marks.includes('italic') && marks.includes('underline') && marks.length === 3) return bold(italic(underline((node.value))));

  // not supported styling
  return node.value;
};

const Hyperlink = ({ node }) => (
  <a href={node.data.uri && node.data.uri}><Text node={node.content && node.content[0]} /></a>
)

const Block = ({ node }) => {

  // image/jpeg
  if (node.data.target.fields.file.contentType === "image/jpeg") {
    return (<img src={node.data.target.fields.file.url} alt={node.data.target.fields.desc} />)
  }

  // else
  return null;
};

const TextNodes = ({ node }) => {

  const content = node.content.map((item) => item);

  const textnode = content.map((textNode, index) => (
    <NodeType key={index} node={textNode} />
  ));

  return textnode;
};

const Nodes = ({ node }) => {

  const content = node.content.map((item) => item);

  const nodes = content.map((node, index) => (
    <NodeType key={index} node={node} />
  ));

  return nodes;
};

const NodeType = ({ node }) => {

  const state = {
    'text': <Text node={node} />,
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


const Article = ({ nodes, title }) => {

  console.log(title, nodes)

  const types = nodes.map((node, index) => (
    <NodeType node={node} key={index} />
  ))

  return (
    <article className="blogPost">
      {types}
    </article>
  );
}

const Blog = ({ posts }) => {

  const blogPosts = posts.map(article => (
    <Article
      key={article.sys.id}
      title={article.fields.title}
      nodes={article.fields.article.content}
    />
  ))

  return blogPosts;
}

const App = () => {

  const [entries, setEntries] = useState();

  useEffect(() => {

    client.getEntries({
      content_type: 'blogpost'
    })
      .then((response) => {
        setEntries(response.items)
      })
      .catch(console.error)

  }, []);

  return (
    <div className="App">
      {entries ? <Blog posts={entries} /> : <p>Loading...</p>}
    </div>);
}

export default App;
