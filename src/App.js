import React, { useState, useEffect } from 'react';
import * as contentful from 'contentful';
import Blog from './blog/Blog';
import './App.css';

const client = contentful.createClient({
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESSTOKEN,
  environment: 'master', // defaults to 'master' if not set
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
})

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
