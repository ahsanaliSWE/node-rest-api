// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerSpec } = require('./swagger'); // Import the Swagger setup file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Your API routes
app.use('/api', require('./routes/app')); // Example: assuming your API routes are defined in './routes/app.js'

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
