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
        {dataSets.map((resultSet, tableIndex) => (
          <div key={tableIndex}>
            {resultSet.length > 0 && (
              <div key={0}>
                <h5>{Object.keys(resultSet[0])[0]} {resultSet[0]['GivenName'] || resultSet[0]['FirstName']} {resultSet[0]['Surname'] || resultSet[0]['sn']}</h5>
                <Table striped bordered hover responsive="md">
                  <tbody>
                    {Object.keys(resultSet[0]).map((key, keyIndex) => (
                      <tr key={keyIndex}>
                        <td>{key}</td>
                        <td>{String(resultSet[0][key])}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
            {tableIndex !== dataSets.length - 1 && <hr />}
          </div>
        ))}
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
