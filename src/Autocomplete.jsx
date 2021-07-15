import React from 'react';
import classNames from 'classnames';

import './Autocomplete.css';

function Autocomplete({ id, onInputChange, renderItem, ...inputProps }) {
  const [suggestions, setSuggestions] = React.useState([]);
  const [userInput, setUserInput] = React.useState('');
  const [hoveredItemIndex, setHoveredItemIndex] = React.useState(-1);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const isSuggestionListVisible = !!suggestions.length && showSuggestions;
  const inputId = id ?? 'ac-input';
  const listId = id ? `${id}-list` : 'ac-list';

  function fetchSuggestions(query) {
    onInputChange(query)
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
    // to force show the suggestions if user starts typing again
    // after selecting an item.
    if (!showSuggestions) {
      setShowSuggestions(true);
    }
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

  function handleKeyDown(ev) {
    let newHoveredIndex = -1;
    switch (ev.key) {
      case 'Escape':
        ev.preventDefault();
        // hide the list if visible, else, clear the input
        if (showSuggestions) {
          setShowSuggestions(false);
        } else {
          setUserInput('');
        }
        return;
      case 'Enter':
        if (hoveredItemIndex !== -1 && hoveredItemIndex < suggestions.length) {
          ev.preventDefault();
          handleItemSelect(hoveredItemIndex);
          return;
        }
        break;
      case 'ArrowUp': {
        // if already at the first item, goto the last item
        if (hoveredItemIndex === 0) {
          newHoveredIndex = suggestions.length - 1;
        } else {
          newHoveredIndex = hoveredItemIndex - 1;
        }
        break;
      }
      case 'Home': {
        newHoveredIndex = 0;
        break;
      }
      case 'ArrowDown': {
        // if there are suggestions but the list is hidden, open the list again.
        if (suggestions.length && !showSuggestions) {
          ev.preventDefault();
          setShowSuggestions(true);
          return;
        }
        // if already at the last item, goto the first item
        if (hoveredItemIndex === suggestions.length - 1) {
          newHoveredIndex = 0;
        } else {
          newHoveredIndex = hoveredItemIndex + 1;
        }
        break;
      }
      case 'End': {
        newHoveredIndex = suggestions.length - 1;
        break;
      }
      default:
        break;
    }
    // update the UI if value changes
    if (newHoveredIndex !== -1) {
      ev.preventDefault();
      setHoveredItemIndex(newHoveredIndex);
    }
  }

  React.useEffect(() => setUserInput(selectedItem?.name ?? ''), [selectedItem]);

  return (
    <div className="ac__container">
      <input
        {...inputProps}
        id={inputId}
        type="text"
        className="ac__input"
        value={userInput}
        aria-haspopup
        aria-autocomplete="list"
        aria-controls={listId}
        aria-activedescendant={
          hoveredItemIndex !== -1
            ? `${inputId}-item-${hoveredItemIndex}`
            : undefined
        }
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
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
                id={`${inputId}-item-${index}`}
                role="option"
                className={classNames('suggestion-list-item', {
                  'suggestion-list-item--hovered': isHovered,
                  'suggestion-list-item--selected': isSelected,
                })}
                aria-selected={isSelected}
                onMouseOver={() => setHoveredItemIndex(index)}
                onClick={() => handleItemSelect(index)}
              >
                {renderItem(suggestion)}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Autocomplete;
