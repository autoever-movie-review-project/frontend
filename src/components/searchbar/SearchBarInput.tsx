import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

const SearchBarInputField = styled.input`
  text-align: left;
  color: ${theme.colors.grayLight};
  height: 40px;
  font-size: 17px;
  width: 100%;
  background-color: transparent;
  outline: transparent;
  border: 0;
  flex-grow: 1;
  padding: 0 0;
`;

interface SearchBarInputProps {
  defaultValue?: string;
  onSubmitData: (data: string) => void;
}

const SearchBarInput: React.FC<SearchBarInputProps> = ({ defaultValue = '', onSubmitData }) => {
  const defaultPlaceholder = '콘텐츠,  태그 검색';
  const [placeHolder, setPlaceHolder] = useState<string>(defaultPlaceholder);

  return (
    <div>
      <SearchBarInputField
        type="text"
        placeholder={placeHolder}
        onClick={() => {
          setPlaceHolder('');
        }}
        onChange={(e) => onSubmitData(e.target.value)}
        onBlur={() => {
          setPlaceHolder(defaultPlaceholder);
        }}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default SearchBarInput;
