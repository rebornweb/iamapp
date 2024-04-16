import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { SERVER_URL_MIIS, SERVER_URL_VIS } from '../config';
const server = SERVER_URL_VIS;

const LostAndFound: React.FC = () => {
  const [uid, setUid] = useState<string>(''); // State for uid input value
  const [searchResult, setSearchResult] = useState<any>(null); // State to store fetched data
  const [loading, setLoading] = useState<boolean>(false); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to store error message

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true

    try {
      const response = await fetch(`${server}/api/LostandFound?uid=${uid}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.commonNames);
      setSearchResult(data); // Update searchResult with fetched data
      setError(null); // Clear any previous error
    } catch (error) {
      setError('There was a problem fetching the data. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after fetch operation
    }
  };

  return (
    <div>
      <h1>Lost and Found Search</h1>
      <form onSubmit={handleSubmit}>
      <InputGroup>
        <label htmlFor="uidInput">Enter UID:</label>
        <Form.Control
          type="text"
          id="uidInput"
          
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <Button type="submit" disabled={!uid.trim()}>{loading ? 'Loading...' : 'Search Lost and Found'}</Button>
      </InputGroup>
      </form>
      {error && <p>Error: {error}</p>}
      {searchResult && searchResult.success && (
        <div>
          <h2>Search Result</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Object Count</td>
                <td>{searchResult.objectCount}</td>
              </tr>
              <tr>
                <td>Common Names</td>
                <td>{searchResult.commonNames.join(', ')}</td>
              </tr>
              <tr>
                <td>Distinguished Names</td>
                <td>{searchResult.distinguishedNames.join(', ')}</td>
              </tr>
              <tr>
                <td>UIDs</td>
                <td>{searchResult.uids.join(', ')}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default LostAndFound;
