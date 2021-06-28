import React from 'react';
import './App.css';

function App() {
  const [suggestions, setSuggestions] = React.useState([]);

  function fetchSuggestions(query) {
    const urlParams = new URLSearchParams();
    urlParams.append('query', query);
    fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?${urlParams}`)
      .then((resp) => resp.json())
      .then((newSuggestions) => setSuggestions(newSuggestions));
  }

  function handleInputChange(ev) {
    fetchSuggestions(ev.target.value);
  }

  return (
    <div className="ac__container">
      <input type="text" className="ac__input" onChange={handleInputChange} />
      {!!suggestions.length && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion) => {
            return (
              <li key={suggestion.name} className="suggestion-list-item">
                {suggestion.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
