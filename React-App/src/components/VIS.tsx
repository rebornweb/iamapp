import React, { useState, useEffect } from 'react';
import {InputGroup, Card, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { SERVER_URL_MIIS, SERVER_URL_VIS } from '../config';

const server = SERVER_URL_VIS;

interface VISProps {
  exportedData: any[]; 
  onExportedDataChange: (newExportedData: any[]) => void;
}

const VIS: React.FC<VISProps> = ({ exportedData, onExportedDataChange }) => {
  const [uidParam, setUidParam] = useState<string>(''); // Initialize uidParam with an empty string
  const [data, setData] = useState<any>(null);
  const [showData, setShowData] = useState<boolean>(false); // Initialize showData to false

  // Set uidParam to the exportedData.uid value on component mount or when exportedData changes
  useEffect(() => {
    if (exportedData.length > 0) {
      setUidParam(exportedData[0].uid || ''); // Use the uid value from the first item in exportedData
    }
  }, [exportedData]);

  // Fetch data whenever uidParam changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${server}/api/VIS?samAccountName=${uidParam}`);
        const responseData = await response.json();
        setData(responseData.objectsWithSamAccountName || []);
      } catch (error) {
        console.error('Error fetching data:', error);
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
    setShowData((prevState) => !prevState); // Toggle the showData state
  };

  return (
    <div>
       <h4>VIS</h4>
      <InputGroup className="mb-3">
        {/* Button component to toggle visibility */}
        <Button onClick={toggleDataVisibility}>
          {showData ? 'Hide Data' : 'Show Data'}
        </Button>
        <Form.Control
          className='ldapInputs'
          type="text"
          value={uidParam}
          onChange={handleInputChange}
          placeholder="Please search with Account search"
          disabled={true}
        />
      </InputGroup>
     
      {showData && (
        <div>
          <h4>VIS Details</h4>
          <div>
            {data.map((user: any, index: number) => (
              <Card>
              <Card.Body>
              <span key={index}>
                <p>
                  <Card.Title>Name: {user.displayName}</Card.Title>
                </p>
                <p>
                  <strong>Email:</strong> {user.mail}
                </p>
                <p>
                  <strong>Title:</strong> {user.title}
                </p>
                <p>
                  <strong>Distinguished Name:</strong> {user.distinguishedName}
                
                </p>
                <p>
                  <strong>GUID: </strong> {user.EQUniqueID}
                </p>

                <p>
                  <strong>Centre Code:</strong> {user.EQCentreCode}
                </p>

                <p>
                  <strong>Created:</strong> {user.whenCreated}
                </p>
                <p>
                  <strong>Changed:</strong> {user.whenChanged}
                </p>
                {/* Add more fields here as needed */}
              </span>
              </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VIS;
