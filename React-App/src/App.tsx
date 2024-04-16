import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Layout from './components/Layout';
import LostAndFound from './components/LostandFound';
import { SERVER_URL_MIIS, SERVER_URL_VIS } from './config';
const server = SERVER_URL_MIIS;


// Define the IData interface
interface IData {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  createdAt: Date;
}

function App() {
  // Update useState to use IData interface for data1 and data2
  const [data1, setData1] = useState<IData>({
    id: 0,
    name: '',
    description: '',
    imageUrl: '',
    createdAt: new Date(),
  });
  const [data2, setData2] = useState<IData>({
    id: 0,
    name: '',
    description: '',
    imageUrl: '',
    createdAt: new Date(),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hidden, setHidden] = useState<boolean>(true);


  const fetchDataForSpid1 = (spid1: string) => {
    if (!spid1) {
      setError('SPID field is required.');
      return;
    }
    setLoading(true);
    fetch(`${server}/api/SidebySide/sideBySide?spid1=${spid1}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        console.log('Fetch spid 1:', json); // Log the JSON response
        setData1(json);
        setError('');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError('There was a problem fetching the data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
        setHidden(false);
      });
  };

  const fetchDataForSpid2 = (spid2: string) => {
    if (!spid2) {
      setError('SPID field is required.');
      return;
    }
    setLoading(true);
    fetch(`${server}/api/SidebySide2/sideBySide?spid2=${spid2}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(json => {
        console.log('Fetch spid 2:', json); // Log the JSON response
        setData2(json);
        setError('');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError('There was a problem fetching the data. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
        setHidden(false);
      });
  };

  useEffect(() => {
    fetchDataForSpid1(''); // Fetch data for spid1
    fetchDataForSpid2(''); // Fetch data for spid2
  }, []);

  console.log('Data 1:', data1);
  console.log('Data 2:', data2);

  const handleSubmit = (uid: string) => {

    // Handle form submission with UID
    console.log('Submitting UID:', uid);
  };

  return (
    <Router>
      <Layout>
      <Routes>
        
        <Route
          path="/"
          element={
            <Home
              data1={data1}
              data2={data2}
              onSubmit={fetchDataForSpid1}
              fetchDataForSpid2={fetchDataForSpid2}
              loading={loading}
              hidden={hidden}
            />
          }
        />

        <Route path="/LostandFound"
                  element={
                    <LostAndFound 
                    />
                  }
        />
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
