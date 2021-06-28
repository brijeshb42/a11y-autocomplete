import React from 'react';
import classNames from 'classnames';

import './App.css';

function App() {
  const [suggestions, setSuggestions] = React.useState([]);
  const [userInput, setUserInput] = React.useState('');
  const [hoveredItemIndex, setHoveredItemIndex] = React.useState(-1);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  function fetchSuggestions(query) {
    const urlParams = new URLSearchParams();
    urlParams.append('query', query);
    fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?${urlParams}`)
      .then((resp) => resp.json())
      .then((newSuggestions) => setSuggestions(newSuggestions));
  }

  function handleInputChange(ev) {
    setUserInput(ev.target.value);
    fetchSuggestions(ev.target.value);
  }

  function handleItemSelect(index) {
    const selectedItem = suggestions[index];
    if (!items) {
      return;
    }
    setSelectedItem(selectedItem);
    setShowSuggestions(false);
  }

  React.useEffect(() => setUserInput(selectedItem?.name ?? ''), [selectedItem]);

  return (
    <div className="ac__container">
      <input
        type="text"
        className="ac__input"
        value={userInput}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
      />
      {!!suggestions.length && showSuggestions && (
        <ul
          className="suggestion-list"
          onMouseOut={() => setHoveredItemIndex(-1)}
        >
          {suggestions.map((suggestion, index) => {
            return (
              <li
                key={suggestion.name}
                className={classNames('suggestion-list-item', {
                  'suggestion-list-item--hovered': hoveredItemIndex === index,
                  'suggestion-list-item--selected':
                    selectedItem?.name === suggestion.name,
                })}
                onMouseOver={() => setHoveredItemIndex(index)}
                onClick={() => handleItemSelect(index)}
              >
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
