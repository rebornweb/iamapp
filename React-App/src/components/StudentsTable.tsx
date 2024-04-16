import React, { FC, useState } from 'react';
import { Table, Form, Col, Row, Button, Toast, Pagination, CloseButton } from 'react-bootstrap';
import UIDChange from './sub/UIDChange';

interface StudentData {
  [key: string]: string | undefined;
}

interface Props {
  data: StudentData[];
}

const StudentsTable: FC<Props> = ({ data}) => {
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // State to manage visibility of columns
  const [columnVisibility, setColumnVisibility] = useState<{ [key: string]: boolean }>({});

  // Checking nulls and undefined data
  const exportedData = data.map(row => ({
    givenName: row.givenName || '',
    sn: row.sn || '',
    uid: row.uid || '',
  }));

  if (!data || data.length === 0) {
    return <p>No User found</p>;
  }

  const getColumnsWithValues = () => {
    // Get all column keys from the first row
    const columns = Object.keys(data[0]);

    // Filter out columns with all empty values
    return columns.filter(column => data.some(row => row[column] !== null && row[column] !== undefined && row[column] !== ''));
  };

  const columnsWithValues = getColumnsWithValues();

  const handleColumnVisibilityChange = (column: string) => {
    setColumnVisibility(prevState => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h4>FIM SPOT:</h4>
      <Form>
        {columnsWithValues.map(column => (
          <Form.Check
            inline
            key={column}
            type="checkbox"
            label={column}
            checked={!columnVisibility[column]}
            onChange={() => handleColumnVisibilityChange(column)}
          />
        ))}
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columnsWithValues.map(column => !columnVisibility[column] && <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              {columnsWithValues.map((column, columnIndex) => (
                !columnVisibility[column] && <td key={columnIndex}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Here you can render another component and pass the export data to it */}
      <Row>
        <Col md={6} className="mb-2">
          <Button variant='primary' onClick={toggleShowA} className="mb-2">
            Click to Change UID
          </Button>
          <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto">Change UID</strong>
              <small>
              {exportedData.length > 0 && (
                <span>{`${exportedData[0].givenName} ${exportedData[0].sn}`}</span>
              )}
            </small>

            </Toast.Header>
            <Toast.Body>
              {exportedData.every(item => item.givenName && item.sn && item.uid) ? (
                <UIDChange exportedData={exportedData} />
              ) : (
                <p>Some data is missing. Cannot render UIDChange component.</p>
              )}
            </Toast.Body>
          </Toast>
        </Col>
      </Row>

      <div>
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
            <Pagination.Item
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              active={pageNumber === currentPage}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default StudentsTable;
