const express = require('express');
const winston = require('winston');

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

// Function to validate inputs
const validateInputs = (num1, num2) => {
  if (isNaN(num1) || isNaN(num2)) {
    throw new Error('Invalid input: Parameters must be numbers');
  }
};

// Arithmetic operations
app.get('/:operation', (req, res) => {
  const { operation } = req.params;
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  try {
    validateInputs(num1, num2);
    let result;

    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) throw new Error('Cannot divide by zero');
        result = num1 / num2;
        break;
      default:
        throw new Error('Invalid operation. Use add, subtract, multiply, or divide');
    }

    logger.info(`Operation: ${operation}, Inputs: ${num1}, ${num2}, Result: ${result}`);
    res.json({ operation, num1, num2, result });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  logger.info(`Calculator microservice running on http://localhost:${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
