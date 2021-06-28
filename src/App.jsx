import React from 'react';
import classNames from 'classnames';

import './App.css';

function App() {
  const [suggestions, setSuggestions] = React.useState([]);
  const [userInput, setUserInput] = React.useState('');
  const [hoveredItemIndex, setHoveredItemIndex] = React.useState(-1);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const isSuggestionListVisible = !!suggestions.length && showSuggestions;
  const inputId = 'ac-input';
  const listId = 'ac-list';

  function fetchSuggestions(query) {
    const urlParams = new URLSearchParams();
    urlParams.append('query', query);
    fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?${urlParams}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error();
        }
        return resp.json();
      })
      .then((newSuggestions) => {
        setHoveredItemIndex(0);
        setSuggestions(newSuggestions);
      })
      .catch(() => {
        setHoveredItemIndex(-1);
        setSuggestions([]);
      });
  }

  function handleInputChange(ev) {
    setUserInput(ev.target.value);
    fetchSuggestions(ev.target.value);
  }

  function handleItemSelect(index) {
    const selectedItem = suggestions[index];
    if (!selectedItem) {
      return;
    }
    setSelectedItem(selectedItem);
    setShowSuggestions(false);
  }

  React.useEffect(() => setUserInput(selectedItem?.name ?? ''), [selectedItem]);

  return (
    <div className="ac__container">
      <input
        id={inputId}
        type="text"
        className="ac__input"
        value={userInput}
        aria-haspopup
        aria-label="Search for companies"
        aria-autocomplete="list"
        aria-controls={listId}
        aria-activedescendant={
          hoveredItemIndex !== -1 ? `ac-item-${hoveredItemIndex}` : undefined
        }
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
      />
      <ul
        id={listId}
        aria-label="Company suggestion list"
        role="listbox"
        className={classNames('suggestion-list', {
          'suggestion-list--hidden': !isSuggestionListVisible,
        })}
        onMouseOut={() => setHoveredItemIndex(-1)}
      >
        {isSuggestionListVisible &&
          suggestions.map((suggestion, index) => {
            const isHovered = hoveredItemIndex === index;
            const isSelected = selectedItem?.name === suggestion.name;
            return (
              <li
                key={suggestion.name}
                id={`ac-item-${index}`}
                role="option"
                className={classNames('suggestion-list-item', {
                  'suggestion-list-item--hovered': isHovered,
                  'suggestion-list-item--selected': isSelected,
                })}
                aria-selected={isSelected}
                onMouseOver={() => setHoveredItemIndex(index)}
                onClick={() => handleItemSelect(index)}
              >
                {suggestion.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
