const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

 
const certificates = [
    {
        _id: 1,
        studentName: 'John Doe',
        certificateID: '12345',
        internshipDomain: 'Web Development',
        internshipStartDate: '2023-01-01',
        internshipEndDate: '2023-03-01',
    },
    {
        _id: 2,
        studentName: 'Jane Smith',
        certificateID: '67890',
        internshipDomain: 'Data Science',
        internshipStartDate: '2023-02-01',
        internshipEndDate: '2023-04-01',
    },
  
];

// API route to get all certificates
app.get('/api/certificates', (req, res) => {
    res.json(certificates);
});

// API route to get a certificate by ID
app.get('/api/certificates/:id', (req, res) => {
    const certificate = certificates.find(cert => cert._id === parseInt(req.params.id));
    if (certificate) {
        res.json(certificate);
    } else {
        res.status(404).json({ message: 'Certificate not found' });
    }
});

// API route to create a new certificate 
app.post('/api/certificates', (req, res) => {
    const newCertificate = {
        _id: certificates.length + 1,
        studentName: req.body.studentName,
        certificateID: req.body.certificateID,
        internshipDomain: req.body.internshipDomain,
        internshipStartDate: req.body.internshipStartDate,
        internshipEndDate: req.body.internshipEndDate,
    };
    certificates.push(newCertificate);
    res.status(201).json(newCertificate);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));