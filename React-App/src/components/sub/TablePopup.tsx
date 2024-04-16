import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

interface TablePopupProps {
  dataSets: { [key: string]: string | number }[][];
  row: { [key: string]: string | number };
  show: boolean;
  handleClose: () => void;
}

const TablePopup: React.FC<TablePopupProps> = ({ dataSets, row, show, handleClose }) => {
  console.log('TablePopup render: show is', show);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Tables</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dataSets.map((resultSet, tableIndex) => {
          // Filter out [object Object] values and keys with non-string/number values
          const validKeys = Object.keys(resultSet[0]).filter(key => {
            const value = resultSet[0][key];
            return typeof value === 'string' || typeof value === 'number';
          });

          if (validKeys.length === 0) return null; // Skip rendering if no valid keys

          return (
            <div key={tableIndex}>
              <div key={0}>
                <h5>{validKeys[0]} {resultSet[0]['GivenName'] || resultSet[0]['FirstName']} {resultSet[0]['Surname'] || resultSet[0]['sn']}</h5>
                <Table striped bordered hover responsive="xl">
                  <tbody>
                    {validKeys.map((key, keyIndex) => (
                      <tr key={keyIndex}>
                        <td>{key}</td>
                        <td>{String(resultSet[0][key])}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TablePopup;
