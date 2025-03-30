const express = require('express'); 
const winston = require('winston'); // Import Winston for logging
const bodyParser = require('body-parser'); 

// Initialize Express app
const app = express();
const PORT = 3000; 

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.json(), 
  defaultMeta: { service: 'calculator-microservice' }, 
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), 
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), 
    new winston.transports.File({ filename: 'logs/combined.log' }) 
  ],
});

// Middleware for logging requests
app.use((req, res, next) => {
  
  logger.info(`Request: ${req.method} ${req.url} from ${req.ip}`);
  next(); 
});

app.use(bodyParser.json()); 

// Function to validate inputs (for GET requests)
const validateInputs = (num1, num2) => {
  
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error('Invalid input: Parameters must be numbers'); // Throw an error if either input is not a number
  }
};

// Arithmetic operations (GET requests)
app.get('/add', (req, res) => {
  // Define a GET route for addition
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2); 

  try {
    validateInputs(num1, num2); 
    const result = num1 + num2; 
    logger.info(`Addition: ${num1} + ${num2} = ${result}`); // Log the operation and result
    res.json({ operation: 'add', num1, num2, result }); // Send the result as a JSON response
  } catch (error) {
    logger.error(`Error: ${error.message}`); //log error
    res.status(400).json({ error: error.message }); // Send an error response with a 400 status code
  }
});

app.get('/subtract', (req, res) => {
  // Define a GET route for subtraction
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  try {
    validateInputs(num1, num2);
    const result = num1 - num2;
    logger.info(`Subtraction: ${num1} - ${num2} = ${result}`);
    res.json({ operation: 'subtract', num1, num2, result });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

app.get('/multiply', (req, res) => {
  // Define a GET route for multiplication
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  try {
    validateInputs(num1, num2);
    const result = num1 * num2;
    logger.info(`Multiplication: ${num1} * ${num2} = ${result}`);
    res.json({ operation: 'multiply', num1, num2, result });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

app.get('/divide', (req, res) => {
  // Define a GET route for division
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  try {
    validateInputs(num1, num2);
    if (num2 === 0) throw new Error('Cannot divide by zero'); // Check for division by zero
    const result = num1 / num2;
    logger.info(`Division: ${num1} / ${num2} = ${result}`);
    res.json({ operation: 'divide', num1, num2, result });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

// Additional Operations (GET requests)
app.get('/exponentiate', (req, res) => {
  // Define a GET route for exponentiation
  const base = parseFloat(req.query.base); 
  const exponent = parseFloat(req.query.exponent); 

  try {
    validateInputs(base, exponent); // Validate the base and exponent
    const result = Math.pow(base, exponent); // Calculate the exponentiation
    logger.info(`Exponentiation: ${base} ^ ${exponent} = ${result}`);
    res.json({ operation: 'exponentiate', base, exponent, result });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

app.get('/modulo', (req, res) => {
  // Define a GET route for modulo operation
  const dividend = parseFloat(req.query.dividend); // Extract the dividend from the query string
  const divisor = parseFloat(req.query.divisor); // Extract the divisor from the query string

  try {
    validateInputs(dividend, divisor); // Validate the dividend and divisor
    const result = dividend % divisor; // Calculate the modulo
    logger.info(`Modulo: ${dividend} % ${divisor} = ${result}`);
    res.json({ operation: 'modulo', dividend, divisor, result });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

// Square Root (POST request)
app.post('/squareRoot', (req, res) => {
  // Define a POST route for square root calculation
  const { number } = req.body; // Extract the number from the request body

  if (typeof number !== 'number') {
    return res.status(400).send('Invalid input'); // Check if the input is a number
  }
  if (number < 0) {
    return res.status(400).send('Cannot calculate square root of a negative number'); // Check for negative input
  }

  const result = Math.sqrt(number); // Calculate the square root
  logger.info(`Square Root: sqrt(${number}) = ${result}`);
  res.json({ result }); // Send the result as a JSON response
});

// Start server
app.listen(PORT, () => {
  // Start the server and listen on the specified port
  logger.info(`Calculator microservice running on http://localhost:${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});