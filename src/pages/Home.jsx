import { useState } from 'react';
import { searchForShows } from '../utils/tvmaze';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);

  const onChangeHandler = e => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      setApiDataError(null);
      const result = await searchForShows(searchTerm);
      setApiData(result);
    } catch (err) {
      setApiDataError(err);
    }
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occured: {apiDataError.message}</div>;
    }

    if (apiData) {
      return apiData.map(data => (
        <div key={data.show.id}>{data.show.name}</div>
      ));
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={searchTerm} onChange={onChangeHandler} />
        <button type="submit">Search</button>
      </form>

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
