import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

interface AccordionProps {
  row: { [key: string]: string | number | object };
  tableIndex: number;
  rowIndex: number;
  spidIndex: number;
}

const AccordionComponent: React.FC<AccordionProps> = ({ row, tableIndex, rowIndex, spidIndex }) => {
  // Check if the row object is empty
  const isEmptyRow = Object.keys(row).length === 0;

  if (isEmptyRow) {
    return null; // Skip rendering if the row object is empty
  }

  // Define the content for the <h4> tag as a ReactNode
  const headerContent = (
    <>
      {Object.keys(row)[0]} {row['GivenName'] || row['FirstName']} {row['Surname'] || row['sn']}
    </>
  );

  return (
    <Container>
      <Accordion>
        <Accordion.Item eventKey={`accordion-${tableIndex}-${rowIndex}-${spidIndex}`}>
          <Accordion.Header>
            <div>
              {/* Use the headerContent variable as the content of the <h4> tag */}
              <h4>{headerContent}</h4>
            </div>
          </Accordion.Header>
          <Accordion.Body>
          <div>
          {Object.keys(row).map((key, index) => (
            <div key={index}>
              <span><strong>{key}: </strong></span>
              <span>{typeof row[key] === 'object' ? JSON.stringify(row[key]) : String(row[key])}</span>
            </div>
          ))}
        </div>

          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default AccordionComponent;
