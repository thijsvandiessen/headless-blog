import React from 'react';

const TextNode = ({ node }) => {

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
  if (marks.includes('bold')
    && marks.length === 1) return bold(node.value);
  if (marks.includes('italic')
    && marks.length === 1) return italic(node.value);
  if (marks.includes('underline')
    && marks.length === 1) return underline(node.value);

  // code can't have combined styles
  if (marks.includes('code')) return code(node.value);

  // length === 2
  if (marks.includes('bold')
    && marks.includes('italic')
    && marks.length === 2) return bold(italic(node.value));
  if (marks.includes('bold')
    && marks.includes('underline')
    && marks.length === 2) return bold(underline(node.value));
  if (marks.includes('italic')
    && marks.includes('underline')
    && marks.length === 2) return italic(underline(node.value));

  // length === 3
  if (marks.includes('bold')
    && marks.includes('italic')
    && marks.includes('underline')
    && marks.length === 3) return bold(italic(underline((node.value))));

  // not supported styling
  return node.value;
};

export default TextNode;
