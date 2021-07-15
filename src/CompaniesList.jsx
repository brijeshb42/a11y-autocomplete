import * as React from 'react';
import Autocomplete from './Autocomplete';

import './CompaniesList.css';

export default function CompaniesList() {
  function handleUserInput(input) {
    const urlParams = new URLSearchParams();
    urlParams.append('query', input);
    return fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?${urlParams}`
    ).then((resp) => {
      if (!resp.ok) {
        throw new Error();
      }
      return resp.json();
    });
  }

  function renderItem(suggestion) {
    return (
      <span className="companies-suggestion-item">
        <img
          className="companies-suggestion-item__logo"
          width="20"
          height="20"
          src={suggestion.logo}
        />
        {suggestion.name}
      </span>
    );
  }

  return (
    <div>
      <div>
        <label htmlFor="companies-input">Search companies</label>
      </div>
      <Autocomplete
        id="companies-input"
        renderItem={renderItem}
        onInputChange={handleUserInput}
      />
    </div>
  );
}
