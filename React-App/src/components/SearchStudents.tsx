import React, { FC, useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
  searchFields: string[];
  onSearch: (key: string, value: string) => void;
  loading: boolean;
  hidden: boolean;
}

const SearchStudents: FC<Props> = ({ searchFields, onSearch, loading, hidden }) => {
  const [searchKey, setSearchKey] = useState('uid');
  const [searchValue, setSearchValue] = useState('');

  const handleSelectKey = (key: string) => {
    setSearchKey(key);
  };

  const handleSearch = () => {
      // Trim any leading or trailing spaces from searchValue
    const trimmedSearchValue = searchValue.trim();
    console.log('Performing search...');
    console.log('Search Key:', searchKey);
    console.log('Search Value:', trimmedSearchValue);

    // Call the onSearch function with searchKey and trimmedSearchValue
    onSearch(searchKey, trimmedSearchValue);
  };

  return (
    <>
      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title={searchKey}
          id="input-group-dropdown-1"
        >
          {searchFields && searchFields.map((field) => (
            <Dropdown.Item
              key={field}
              onClick={() => handleSelectKey(field)}
            >
              {field}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <Form.Control
          placeholder="Enter search value..."
          aria-label="Text input with 2 dropdown buttons"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Button variant="outline-secondary" onClick={handleSearch} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="grow" variant="primary" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </>
          ) : (
            'Search'
          )}
        </Button>
      </InputGroup>
    </>
  );
};

export default SearchStudents;
