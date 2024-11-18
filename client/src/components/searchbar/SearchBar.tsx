import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBarInput from './SearchBarInput';
import SearchBarButton from './SearchBarButton';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
  width: 300px;
  height: 40px;
  background-color: #38393d;
  box-sizing: border-box;
  border-radius: 10px;
  align-items: center;
  display: flex;
  position: relative;
  transition: box-shadow 0.3s ease;
  &:hover {
  }
`;

interface SearchBarProps {
  defaultValue?: string;
  handleChange?: (data: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultValue = '', handleChange }) => {
  const [inputData, setInputData] = useState<string>(defaultValue);
  const navigate = useNavigate();

  const searchWithData = (inputData: string) => {
    navigate('/movies', { state: { searchData: inputData } });
    if (handleChange) {
      handleChange(inputData);
    }
  };

  const handleKeyup = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchWithData(inputData);
    }
  };

  return (
    <div>
      <SearchBarContainer onKeyUp={handleKeyup as React.KeyboardEventHandler<HTMLDivElement>}>
        <SearchBarButton pressButton={() => searchWithData(inputData)} />
        <div style={{ flexGrow: 1, marginRight: 25 }}>
          <SearchBarInput defaultValue={defaultValue} onSubmitData={setInputData} />
        </div>
      </SearchBarContainer>
    </div>
  );
};

export default SearchBar;
