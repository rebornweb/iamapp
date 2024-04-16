import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { SERVER_URL_MIIS, SERVER_URL_VIS } from '../../config';
const server = SERVER_URL_MIIS;

interface ExportedData {
  givenName: string;
  sn: string;
  uid: string;
}

const UIDChange: React.FC<{ exportedData: ExportedData[] }> = ({ exportedData }) => {
  const [givenName, setGivenName] = useState('');
  const [sn, setSn] = useState('');
  const [defaultUID, setDefaultUID] = useState('');
  const [prefixUID, setPrefixUID] = useState('');
  const [commitUID, setCommitUID] = useState('');
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastPotentialUID, setLastPotentialUID] = useState<string>('');

  useEffect(() => {
    if (exportedData.length > 0) {
      const { givenName, sn, uid } = exportedData[0];
      setGivenName(givenName);
      setSn(sn);
      setDefaultUID(uid);
    }
  }, [exportedData]);

  const handleChangePrefixUID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrefixUID(e.target.value);
  };

  const handleChangeCommitUID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommitUID(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prefixUID && !commitUID) {
      setError('Please fill out either Prefix UID or Commit UID.');
      return;
    }
    try {
      const response = await fetch(`${server}/api/UIDChange/uidchange?oldUID=${defaultUID}&newUID=${prefixUID}&confirmUID=${commitUID}`);
      const data = await response.json();
      setResponseData(data);
      setError(null);
      extractLastPotentialUID(data);
    } catch (error) {
      setError('Please fill out either Prefix UID or Commit UID.');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${server}/api/UIDChange/uidchange?oldUID=${defaultUID}&newUID=${prefixUID}`);
      const data = await response.json();
      setResponseData(data);
      setError(null);
      extractLastPotentialUID(data);
    } catch (error) {
      setError('Please fill out either Prefix UID or Commit UID.');
    }
  };

  const extractLastPotentialUID = (data: any) => {
    if (data && data.length > 0) {
      const lastItem = data[data.length - 1];
      if (lastItem && Array.isArray(lastItem)) {
        const lastPotentialUID = lastItem[lastItem.length - 1].POTENTIAL_UID.trim();
        setLastPotentialUID(lastPotentialUID);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="givenName">
          <Form.Label>Given Name:</Form.Label>
          <Form.Control type="text" value={givenName} disabled />
        </Form.Group>

        <Form.Group controlId="sn">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" value={sn} disabled />
        </Form.Group>

        <Form.Group controlId="defaultUID">
          <Form.Label>Default UID:</Form.Label>
          <Form.Control type="text" value={defaultUID} disabled />
        </Form.Group>

        <Form.Group controlId="prefixUID">
          <Form.Label>Prefix UID:</Form.Label>
          <Form.Control
            type="text"
            value={prefixUID}
            onChange={handleChangePrefixUID}
          />
          <br />
          <Button variant="outline-info" onClick={handleSearch}>
            Check
          </Button>
        </Form.Group>
        <hr />
        <Form.Group controlId="commitUID">
          <Form.Label>Commit UID:</Form.Label>

          {lastPotentialUID && (
            <div>
              <strong>Potential UID: {lastPotentialUID}</strong>
            </div>
          )}
          <Form.Control
            type="text"
            value={commitUID}
            onChange={handleChangeCommitUID}
          />
        </Form.Group>
        <br />

        <Button variant="outline-success" type="submit">
          Submit
        </Button>
        {(!prefixUID && !commitUID) && <div>Please fill out either Prefix UID or Commit UID.</div>}
      </Form>
      <hr />      
      {responseData && (
        
        <div className='text-success'>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      
    </div>
  );
};

export default UIDChange;
