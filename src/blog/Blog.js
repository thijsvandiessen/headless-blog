import React from 'react';
import Article from './Article';

const Blog = ({ posts }) => {
  const blogPosts = posts.map(article => (
    <Article
      key={article.sys.id}
      title={article.fields.title}
      nodes={article.fields.article.content}
      metadata={article.sys}
    />
  ))

  return blogPosts;
}

export default Blog;