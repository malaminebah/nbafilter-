import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Rechercher..." }) => {
  return (
    <div className="bg-grey-200">
      <div className="container  flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
        />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;