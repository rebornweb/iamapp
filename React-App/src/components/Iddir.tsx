import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner from react-bootstrap
import { SERVER_URL_MIIS, SERVER_URL_VIS } from '../config';
const server = SERVER_URL_VIS;

interface IddirProps {
  exportedData: any[]; // Adjust the type according to your data structure
  onExportedDataChange: (newExportedData: any[]) => void;
}

const Iddir: React.FC<IddirProps> = ({ exportedData, onExportedDataChange }) => {
  const [uidParam, setUidParam] = useState<string>('');
  const [data, setData] = useState<any>(null);
  const [showData, setShowData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Initialize isLoading state

  useEffect(() => {
    if (exportedData.length > 0) {
      setUidParam(exportedData[0].uid || '');
    }
  }, [exportedData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set isLoading to true when fetching data
      try {
        const response = await fetch(`${server}/api/ADLDS?uidParam=${uidParam}`);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set isLoading to false after fetching data (whether successful or not)
      }
    };

    if (uidParam.trim() !== '') {
      fetchData();
    }
  }, [uidParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUidParam(e.target.value);
  };

  const toggleDataVisibility = () => {
    setShowData((prevState) => !prevState);
  };

  return (
    <div>
      <h4>IDDIR</h4>
      <InputGroup className="mb-3">
        <Button onClick={toggleDataVisibility}>
          {showData ? 'Hide Data' : 'Show Data'}
        </Button>
        <Form.Control
          className='ldapInputs'
          type="text"
          value={uidParam}
          onChange={handleInputChange}
          disabled={true}
          placeholder="Please search with Account search"
        />
      </InputGroup>

      {isLoading ? ( // Show the Spinner while isLoading is true
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : showData && data && data.success ? (
        <div>
          <h5>IDDIR Details</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.objects[0]).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{JSON.stringify(value)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Iddir;
