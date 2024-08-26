import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/certificates');
        setCertificates(response.data);
      } catch (err) {
        setError('Failed to fetch certificates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Certificate Verification System</h1>
        </header>
        <main>
          <p>Loading certificates...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Certificate Verification System</h1>
        </header>
        <main>
          <p>{error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Certificate Verification System</h1>
      </header>
      <main>
        <h2>Available Certificates</h2>
        {certificates.length > 0 ? (
          <ul>
            {certificates.map((cert) => (
              <li key={cert._id}>
                <strong>Student Name:</strong> {cert.studentName} <br />
                <strong>Certificate ID:</strong> {cert.certificateID} <br />
                <strong>Internship Domain:</strong> {cert.internshipDomain} <br />
                <strong>Internship Dates:</strong> {cert.internshipStartDate} to {cert.internshipEndDate}
              </li>
            ))}
          </ul>
        ) : (
          <p>No certificates found.</p>
        )}
      </main>
    </div>
  );
}

export default App;