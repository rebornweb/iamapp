import React, { useState } from 'react';
import AccordionComponent from './sub/Accordion';
import TablePopup from './sub/TablePopup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

{/*Prop parent is Home.tsx drilled from there*/}
interface Props {
  data1: any;
  data2: any;
  onSubmit: (spid1: string) => void;
  fetchDataForSpid2: (spid2: string) => void;
  loading: boolean;
  hidden: boolean;
}

const SidebySide: React.FC<Props> = ({
  data1,
  data2,
  onSubmit,
  fetchDataForSpid2,
  loading,
  hidden,
}) => {
  const [spid1, setSpid1] = useState('');
  const [spid2, setSpid2] = useState('');
  const [showSection1, setShowSection1] = useState(false); // State for showing/hiding section 1
  const [showSection2, setShowSection2] = useState(false); // State for showing/hiding section 2
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isToggled2, setIsToggled2] = useState(false);
  const toggleShowA = () => setIsToggled(false); // Update isToggled state to hide the first toast
  const toggleShowB = () => setIsToggled2(false); // Update isToggled2 state to hide the second toast

  const [isToggledMain, setIsToggledMain] = useState(true);
  const toggleShowMain = () => setIsToggledMain(false); // Update isToggled2 state to hide the second toast



  const handleShowModal = () => { console.log('handleShowModal: setting showModal to true'); setShowModal(true); }
  const handleCloseModal = () => { console.log('handleShowModal: setting showModal to true'); setShowModal(false); }
  const handleShowModal2 = () => { console.log('handleShowModal card 2: setting showModal to true'); setShowModal2(true); }
  const handleCloseModal2 = () => { console.log('handleShowModal card 2: setting showModal to true'); setShowModal2(false); }

  const handleToggleClick = () => {
    // This could be setting another state to show the "Open" button
    setIsToggled(true); // Assuming you have a state called isToggled
  };

  const handleToggleClick2 = () => {
    // This could be setting another state to show the "Open" button
    setIsToggled2(true); // Assuming you have a state called isToggled
  };

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
    setIsToggled(!!spid1); // Set isToggled based on whether spid1 is filled
    setIsToggled2(!!spid2); 
  };

  return (
    <Container fluid="md">
      <div className="mb-3">
       <Row>
        <Col> 
        <Toast show={isToggledMain} onClose={toggleShowMain} >
          <Toast.Header>
        <strong>Side by Side</strong>

        </Toast.Header>
          <Toast.Body>
        <>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter SPID 1"
              aria-label="Enter SPID 1"
              aria-describedby="basic-addon1"
              value={spid1}
              onChange={handleChangeSpid1}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Enter SPID 2"
              aria-label="Enter SPID 2"
              aria-describedby="basic-addon1"
              value={spid2}
              onChange={handleChangeSpid2}
            />
          </InputGroup>
        </>
        <div className="input-group">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </>
            ) : (
              'Submit'
            )}

          </button>
        </div>
                </Toast.Body>

              </Toast>
         </Col>
        </Row>
          {/* Toast for SPID 1 */}
          <Row>

          <Col md={6} className="mb-2">

             <Toast show={isToggled} onClose={toggleShowA}>
             <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
           <strong className="me-auto">{`${data1 && data1.length > 0 && data1[0][0]?.GivenName} ${data1 && data1.length > 0 && data1[0][0]?.sn}`}</strong>
            <small>{spid1}</small>
          </Toast.Header>
            <Toast.Body>
              {isToggled && 
                            
              <Button
                variant="primary"
                onClick={() => {
                  handleShowModal();
                  setShowSection1(true); // Show the section when opening the modal
                }}
              >
                Open
              </Button>
              
              }

              {spid1 && <Button onClick={() => { setShowSection1(!showSection1); handleToggleClick(); }}
                variant="primary" hidden={hidden}>{showSection1 ? "Close" : "Expand"}</Button>}


              {/* Conditional rendering for section 1 */}
     
          {showSection1 && Object.keys(data1).map((tableIndex: string, index: number, array: string[]) => {
            const resultSet1 = data1[tableIndex];
            return (
              <section key={tableIndex}>
                <div>
                  {resultSet1.map((row: { [key: string]: string | number }, rowIndex: number) => (
                    <div key={rowIndex}>
                      <TablePopup
                        dataSets={[...data1]}
                        row={row}
                        show={showModal}
                        handleClose={handleCloseModal}
                        
                      />
                      <AccordionComponent
                        row={row}
                        tableIndex={Number(tableIndex)} // Convert tableIndex to number
                        rowIndex={rowIndex}
                        spidIndex={1} // For SPID 1
                      />
                    </div>
                  ))}
                  {index !== array.length - 1}
      </div>
    </section>
  );
})}             
                </Toast.Body>
            </Toast>
          </Col>

          {/* Toast for SPID 2 */}
          <Col md={6} className="mb-2">

        <Toast show={isToggled2} onClose={toggleShowB}>
            <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">{`${data2 && data2.length > 0 && data2[0][0]?.GivenName} ${data2 && data2.length > 0 && data2[0][0]?.sn}`}</strong>

          <small>{spid2}</small>
        </Toast.Header>
            <Toast.Body>
              {isToggled2 && 
              
                  <Button
                  variant="primary"
                  onClick={() => {
                    handleShowModal2();
                    setShowSection2(true); // Show the section when opening the modal
                  }}
                >
                  Open
                </Button>
                            
              }

                {spid2 && (
                    <Button
                        onClick={() => {
                            setShowSection2(!showSection2);
                            handleToggleClick2();
                        }}
                        variant="primary"
                        hidden={hidden}
                    >
                        {showSection2 ? "Close" : "Expand"}
                    </Button>
                )}


                {/* Conditional rendering for section 2 */}
                {showSection2 && Object.keys(data2).map((tableIndex: string, index: number, array: string[]) => {
                  const resultSet2 = data2[tableIndex];
                  return (
                    <section key={tableIndex}>
                      <div>
                        {resultSet2.map((row: { [key: string]: string | number }, rowIndex: number) => (
                          <div key={rowIndex}>
                            <TablePopup
                              dataSets={[...data2]}
                              row={row}
                              show={showModal2}
                              handleClose={handleCloseModal2}
                            />
                            <AccordionComponent
                              row={row}
                              tableIndex={Number(tableIndex)} // Convert tableIndex to number
                              rowIndex={rowIndex}
                              spidIndex={2} // For SPID2
                            />
                          </div>
                        ))}
                  {index !== array.length - 1}
      </div>
    </section>
  );
})}
                 </Toast.Body>
            </Toast>
          </Col>

          </Row>
      </div>
    </Container>
  );
}

export default SidebySide;
