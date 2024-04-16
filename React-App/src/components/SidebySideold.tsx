import React, { useState } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface RowData {
  [key: string]: string | number | undefined;
}

interface DataObject {
  [key: string]: RowData[];
}

interface Props {
  data: DataObject;
  onSubmit: (spid1: string) => void;
  fetchDataForSpid2: (spid2: string) => void;
}

const SidebySide: React.FC<Props> = ({ data, onSubmit, fetchDataForSpid2 }) => {
  const [spid1, setSpid1] = useState('');
  const [spid2, setSpid2] = useState('');

  const handleChangeSpid1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpid1(e.target.value);
  };

  const handleChangeSpid2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpid2(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(spid1);
    fetchDataForSpid2(spid2);
    console.log('Spid one: ' + spid1);
    console.log('Spid two: ' + spid2);
  };

  return (
    <div className="container mt-4">
      <Header />
      <Navigation />
      <div className="mb-3">
        <h2>Side by Side</h2>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={spid1}
            onChange={handleChangeSpid1}
            placeholder="Enter SPID 1"
          />
          <input
            type="text"
            className="form-control"
            value={spid2}
            onChange={handleChangeSpid2}
            placeholder="Enter SPID 2"
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {Object.keys(data).map((tableIndex, index, array) => {
          const resultSet = data[tableIndex];
          console.log('ResultSet', resultSet); // Log the resultSet
          return (
            <Container>
              <div key={tableIndex}>
                {resultSet.map((row, rowIndex) => (
                  <div key={rowIndex}>
                    <Row>
                      <Col>
                        <Accordion>
                          <Accordion.Item eventKey={`accordion-${tableIndex}-${rowIndex}-1`}>
                            <Accordion.Header>
                              <h4>
                                {Object.keys(row)[0]} {row['GivenName'] || row['FirstName']} {row['Surname'] || row['sn']}
                              </h4>
                            </Accordion.Header>
                            <Accordion.Body>
                              <Table striped bordered hover>
                                <tbody>
                                  {Object.keys(row).map((key, index) => (
                                    <tr key={index}>
                                      <td>{key}</td>
                                      <td>{String(row[key])}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                      <Col>
                        <Accordion>
                          <Accordion.Item eventKey={`accordion-${tableIndex}-${rowIndex}-2`}>
                            <Accordion.Header>
                              <h4>
                                {Object.keys(row)[0]} {row['GivenName'] || row['FirstName']} {row['Surname'] || row['sn']}
                              </h4>
                            </Accordion.Header>
                            <Accordion.Body>
                              <Table striped bordered hover>
                                <tbody>
                                  {Object.keys(row).map((key, index) => (
                                    <tr key={index}>
                                      <td>{key}</td>
                                      <td>{String(row[key])}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                    </Row>
                  </div>
                ))}
                {index !== array.length - 1 && <hr />}
              </div>
            </Container>
          );
        })}
      </div>
    </div>
  );
};

export default SidebySide;
