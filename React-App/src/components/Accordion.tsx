import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

interface AccordionProps {
  row: { [key: string]: string | number };
  tableIndex: number;
  rowIndex: number;
  spidIndex: number;
}

const AccordionComponent: React.FC<AccordionProps> = ({ row, tableIndex, rowIndex, spidIndex }) => {
  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey={`accordion-${tableIndex}-${rowIndex}-${spidIndex}`}>
          <Accordion.Header><h4>{Object.keys(row)[0]} {row['GivenName'] || row['FirstName']} {row['Surname'] || row['sn']}</h4></Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover responsive='md'>
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
    </Container>
  );
}

export default AccordionComponent;
