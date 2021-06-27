import React from 'react';
import './App.css';

function App() {
  return (
    <div className="ac__container">
      <input type="text" className="ac__input" />
      <ul className="suggestion-list">
        <li className="suggestion-list-item">Suggestion 1</li>
        <li className="suggestion-list-item suggestion-list-item--selected">
          Suggestion 2
        </li>
        <li className="suggestion-list-item">Suggestion 3</li>
        <li className="suggestion-list-item">Suggestion 4</li>
        <li className="suggestion-list-item suggestion-list-item--hovered">
          Suggestion 5
        </li>
        <li className="suggestion-list-item">Suggestion 6</li>
        <li className="suggestion-list-item">Suggestion 7</li>
        <li className="suggestion-list-item">Suggestion 8</li>
        <li className="suggestion-list-item">Suggestion 9</li>
        <li className="suggestion-list-item">Suggestion 10</li>
      </ul>
    </div>
  );
}

export default App;
