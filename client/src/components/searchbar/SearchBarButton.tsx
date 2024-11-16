import React from 'react';
import SearchIcon from 'assets/Search.svg';

interface SearchBarButtonProps {
  pressButton: () => void;
}

const SearchBarButton: React.FC<SearchBarButtonProps> = ({ pressButton }) => {
  return (
    <div>
      <div
        style={{ width: 50, height: 50, position: 'relative', left: 0, opacity: 0.6, cursor: 'pointer' }}
        onClick={pressButton}
      >
        <div style={{ width: 50, height: 50, left: 0, position: 'absolute' }}></div>
        <img
          src={SearchIcon}
          alt="search"
          style={{ width: 33.72, height: 33.72, left: 7.5, top: 7.5, position: 'absolute' }}
        />
      </div>
    </div>
  );
};

export default SearchBarButton;
