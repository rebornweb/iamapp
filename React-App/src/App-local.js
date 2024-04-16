import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5062/api/StoredProcedures")
      .then(response => response.json())
      .then(json => setData(json))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>Employee Data</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Master Incumbency</th>
                <th>SPID</th>
                <th>Employee Number</th>
                <th>Title</th>
                <th>Surname</th>
                <th>First Name</th>
                <th>Second Name</th>
                <th>Sex Code</th>
                <th>Employment Date</th>
                <th>Date of Term</th>
                <th>Birth Date</th>
                <th>Preferred Given</th>
                <th>QCT No</th>
                <th>QCT Expiry</th>
                <th>Incumbency From Date</th>
                <th>Incumbency From Time</th>
                <th>Incumbency Nbr</th>
                <th>Incumbency End Date</th>
                <th>Incumbency Reason Code</th>
                <th>Incumbency Status Code</th>
                <th>Incumbency Active FTE</th>
                <th>Incumbency Override FTE</th>
                <th>Incumbency Title Code</th>
                <th>Incumbency Position Code</th>
                <th>Incumbency Position Type</th>
                <th>Incumbency Job Code</th>
                <th>Occup Group Desc</th>
                <th>Incumbency Org Unit Code</th>
                <th>Pay Suspend</th>
                <th>Incumbency Comment</th>
                <th>Incumbency Confirmed Proposed</th>
                <th>Mobile Phone Number</th>
                <th>MFA Email Address</th>
                <th>Incumbency Title Description</th>
                <th>Incumbency Award Level</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.ID}</td>
                  <td>{item.IS_MASTER_INCUMBENCY}</td>
                  <td>{item.SPID}</td>
                  <td>{item.EMPLOYEE_NUMBER}</td>
                  <td>{item.TITLE}</td>
                  <td>{item.SURNAME}</td>
                  <td>{item.FIRST_NAME}</td>
                  <td>{item.SECOND_NAME}</td>
                  <td>{item.SEX_CODE}</td>
                  <td>{item.EMPLOYMENT_DATE}</td>
                  <td>{item.DATE_OF_TERM}</td>
                  <td>{item.BIRTH_DATE}</td>
                  <td>{item.PREFERRED_GIVEN}</td>
                  <td>{item.QCT_NO}</td>
                  <td>{item.QCT_EXPIRY}</td>
                  <td>{item.INCUMBENCY_FROM_DATE}</td>
                  <td>{item.INCUMBENCY_FROM_TIME}</td>
                  <td>{item.INCUMBENCY_NBR}</td>
                  <td>{item.INCUMBENCY_END_DATE}</td>
                  <td>{item.INCUMBENCY_REASON_CODE}</td>
                  <td>{item.INCUMBENCY_STATUS_CODE}</td>
                  <td>{item.INCUMBENCY_ACTIVE_FTE}</td>
                  <td>{item.INCUMBENCY_OVERRIDE_FTE}</td>
                  <td>{item.INCUMBENCY_TITLE_CODE}</td>
                  <td>{item.INCUMBENCY_POSITION_CODE}</td>
                  <td>{item.INCUMBENCY_POSITION_TYPE}</td>
                  <td>{item.INCUMBENCY_JOB_CODE}</td>
                  <td>{item.OCCUP_GROUP_DESC}</td>
                  <td>{item.INCUMBENCY_ORG_UNIT_CODE}</td>
                  <td>{item.PAY_SUSPEND}</td>
                  <td>{item.INCUMBENCY_COMMENT}</td>
                  <td>{item.INCUMBENCY_CONFIRMED_PROPOSED}</td>
                  <td>{item.MOBILE_PHONE_NUMBER}</td>
                  <td>{item.MFA_EMAIL_ADDRESS}</td>
                  <td>{item.INCUMBENCY_TITLE_DESCRIPTION}</td>
                  <td>{item.INCUMBENCY_AWARD_LEVEL}</td>
                  <td>{item.ts}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default App;
