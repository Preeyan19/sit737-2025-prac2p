const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;  // Changed to 3001

app.use(express.json());

// MongoDB connection details from environment variables
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;
const mongoHost = process.env.MONGO_HOST || 'mongodb-service';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoDB = process.env.MONGO_DB || 'testdb';

// MongoDB URI for connection
const mongoURI = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${mongoDB}?authSource=admin`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define the Item model for MongoDB
const Item = mongoose.model('Item', new mongoose.Schema({
  name: String,
  value: Number,
}));

// Root route to avoid "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Welcome to the MongoDB API. Use /items to interact with items.');
});

// Get all items
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Create a new item
app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  const saved = await newItem.save();
  res.json(saved);
});

// Update an existing item
app.put('/items/:id', async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete an item
app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
