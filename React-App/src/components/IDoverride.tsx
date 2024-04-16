import React, { useState, useEffect } from 'react';
import {Form, Button, InputGroup} from 'react-bootstrap';
import { SERVER_URL_MIIS } from '../config';
const server = SERVER_URL_MIIS;

interface IDOverrideProps {
  exportedData: any[]; 
  onExportedDataChange: (newExportedData: any[]) => void;

}

interface OverrideProps{
  givenName: string;
  idmPreferredName: string;
  sn: string;
  idmGUID: string;
  idmStatus: string;
  description: string;
  createdAt: string;
  active: string | number;
  lastUpdated: string;
}

const IdentityOverride: React.FC<IDOverrideProps> = ({ exportedData, onExportedDataChange }) => {
const [guidParam, setGuidParam] = useState<string>('');
const [responseData, setResponseData] = useState<any>(null); 

  

  useEffect(() => {
    if (exportedData.length > 0) {
      setGuidParam(exportedData[0].idmGUID || '');
    }
  }, [exportedData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuidParam(e.target.value);
  };

  const fetchDataOnClick = async () => {
    if (guidParam.trim() !== '') {
      console.log('Fetching data...');
      try {
        const response = await fetch(`${server}/IdentityOverride/User?searchValue=${guidParam}&searchField=idmGUID`);
        const responseData = await response.json();
        console.log('ID Override response:', responseData);
        setResponseData(responseData); // Update the responseData state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div>
      <h4>Overrides:</h4>

      <InputGroup className="mb-3">
      <Button variant="primary" onClick={fetchDataOnClick}>Check for overrides</Button>
      <Form.Control type="text" value={guidParam} onChange={handleInputChange} placeholder="Please search with Account search" />
      </InputGroup>


    {responseData && responseData.length > 0 ? (
  <div>
    <h5>IDOverride Information</h5>
    {/* Render fetched data directly */}
    <pre>
      {responseData.map((item: OverrideProps, index: number) => (
        <div key={index}  className='text-danger'>
          <p>givenName: {item.givenName}</p>
          <p>idmPreferredName: {item.idmPreferredName}</p>
          <p>sn: {item.sn}</p>
          <p>idmGUID: {item.idmGUID}</p>
          <p>idmStatus: {item.idmStatus}</p>
          <p>description: {item.description}</p>
          <p>createdAt: {item.createdAt}</p>
          <p>active: {item.active}</p>
          <p>lastUpdated: {item.lastUpdated}</p>
        </div>
      ))}
    </pre>
  </div>
) : (
  <div>
    {guidParam.trim() !== '' ? (
      <p>No override found</p>
    ) : (
      <p>Click to see if there is an override</p>
    )}
  </div>
)}



    </div>
  );
};

export default IdentityOverride;
