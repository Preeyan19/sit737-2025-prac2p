const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo-service:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.get('/', (req, res) => res.send('Hello from Node.js app on GCP Kubernetes!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));