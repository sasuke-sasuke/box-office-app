import { useState } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChangeHandler = e => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchTerm}`
    );
    const data = await response.json();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={searchTerm} onChange={onChangeHandler} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Home;
