import { useState } from 'react';
import { searchForShows, searchForPeople } from '../utils/tvmaze';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const onChangeHandler = e => {
    setSearchTerm(e.target.value);
  };

  const onRadioChange = e => {
    setSearchOption(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      setApiDataError(null);

      if (searchOption === 'shows') {
        const result = await searchForShows(searchTerm);
        setApiData(result);
      } else {
        const result = await searchForPeople(searchTerm);
        setApiData(result);
      }
    } catch (err) {
      setApiDataError(err);
    }
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occured: {apiDataError.message}</div>;
    }

    if (apiData) {
      return apiData[0].show
        ? apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
        : apiData.map(data => (
            <div key={data.person.id}>{data.person.name}</div>
          ));
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={searchTerm} onChange={onChangeHandler} />
        <button type="submit">Search</button>

        <label>
          Shows
          <input
            type="radio"
            name="search-options"
            value="shows"
            checked={searchOption === 'shows'}
            onChange={onRadioChange}
          />
        </label>

        <label>
          Actors
          <input
            type="radio"
            name="search-options"
            value="actors"
            checked={searchOption === 'actors'}
            onChange={onRadioChange}
          />
        </label>
      </form>

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
