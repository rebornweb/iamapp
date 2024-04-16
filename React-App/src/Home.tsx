import React, { FC, useState, useEffect } from 'react';
import { Container, Row, Col, Form, CloseButton } from 'react-bootstrap';
import SearchStaff from './components/SearchStaff';
import SearchStudents from './components/SearchStudents';
import StaffTable from './components/StaffTable'; 
import StudentsTable from './components/StudentsTable'; 
import SidebySide from './components/SidebySide';
import Iddir from './components/Iddir';
import IdentityOverride from './components/IDoverride';
import VIS from './components/VIS';
import { SERVER_URL_MIIS, SERVER_URL_VIS } from './config';

const server = SERVER_URL_MIIS;

interface HomeProps {
  data1: any; // Adjust the type according to your data structure
  data2: any; // Adjust the type according to your data structure
  onSubmit: (spid1: string) => void;
  fetchDataForSpid2: (spid2: string) => void;
  loading: boolean;
  hidden: boolean;
}

const Home: FC<HomeProps> = ({ data1, data2, onSubmit, fetchDataForSpid2 }) => {
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isStaffSearch, setIsStaffSearch] = useState(true);
  const [isStudentSearch, setIsStudentSearch] = useState(false);
  const [exportedData, setExportedData] = useState<any[]>([]);

  const handleExportedDataChange = (newExportedData: any[]) => {
    setExportedData(newExportedData);
  };

  const handleStaffCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsStaffSearch(e.target.checked);
    setIsStudentSearch(false);
  };

  const handleStudentCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsStudentSearch(e.target.checked);
    setIsStaffSearch(false);
  };

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setSearchResult(data);
      setExportedData(data);
      setError(null);
    } catch (error:any) {
      console.error('Error during fetch operation:', error.message);
      setError('Please enter user details');
    } finally {
      setLoading(false);
      setHidden(false);
    }
  };
  
  useEffect(() => {
    if (isStaffSearch) {
      fetchData(`${server}/SearchStaff/User`);
    } else if (isStudentSearch) {
      fetchData(`${server}/SearchStudents/User`);
    }
  }, [isStaffSearch, isStudentSearch]);

  return (
    <Container fluid="md">
      <h3>Account Search</h3>
      <Form.Check
        type="checkbox"
        id="staffSearchCheckbox"
        label="Search Staff"
        checked={isStaffSearch}
        onChange={handleStaffCheckboxChange}
      />
      <Form.Check
        type="checkbox"
        id="studentSearchCheckbox"
        label="Search Students"
        checked={isStudentSearch}
        onChange={handleStudentCheckboxChange}
      />

      {isStaffSearch && (
        <SearchStaff
          searchFields={['uid', 'idmspid', 'idmGUID', 'employeenumber', 'givenname', 'idmpreferredname', 'sn']}
          onSearch={(searchValue, searchField) => fetchData(`${server}/SearchStaff/User?searchValue=${encodeURIComponent(searchField)}&searchField=${encodeURIComponent(searchValue)}`)}
          loading={loading}
          hidden={hidden}
        />
      )}
      {isStudentSearch && (
        <SearchStudents
          searchFields={['uid', 'idmspid', 'idmGUID', 'idmEQID', 'givenname', 'idmpreferredname', 'sn']}
          onSearch={(searchValue, searchField) =>
            fetchData(`${server}/SearchStudents/User?searchValue=${encodeURIComponent(searchField)}&searchField=${encodeURIComponent(searchValue)}`)
          }
          loading={loading}
          hidden={hidden}
        />
      )}

{loading && <p>Loading...</p>}
{error && <p>{error}</p>}
{searchResult && isStaffSearch && Array.isArray(searchResult) && <StaffTable data={searchResult} />}

{searchResult && isStudentSearch && Array.isArray(searchResult) && <StudentsTable data={searchResult} />}



      <Row>
        <Col>
          <Iddir exportedData={exportedData} onExportedDataChange={handleExportedDataChange} />
        </Col>
        <Col>
          <VIS exportedData={exportedData} onExportedDataChange={handleExportedDataChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <IdentityOverride exportedData={exportedData} onExportedDataChange={handleExportedDataChange} />
        </Col>
        <Col>
          <SidebySide
            data1={data1}
            data2={data2}
            onSubmit={onSubmit}
            fetchDataForSpid2={fetchDataForSpid2}
            loading={loading}
            hidden={hidden}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
