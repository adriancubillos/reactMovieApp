import React from 'react';

export default function SearchBox({ searchValue, setSearchValue }) {
  return (
    <div className="col col-sm-4">
      <input
        className="form-control"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Type to search..."
      ></input>
    </div>
  );
}
