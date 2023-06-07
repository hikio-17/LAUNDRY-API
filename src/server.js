/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable import/no-dynamic-require */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const db = require('./models');
const logger = require('./middleware/logger');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

/** MIDDLEWARE */
app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** MAIN ROUTE */
const routesDir = path.join(__dirname, 'routes');
fs.readdirSync(routesDir).map((r) => {
  app.use('/api', require(`${routesDir}/${r}`));
});

/** ROUTE DOCUMENTATION API */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/** ROUTE ERROR HANDLER */
app.use(errorHandler);

/** CONNECT TO DB AND RUN SERVER */
const PORT = process.env.PORT || 5000;

db.sequelize.authenticate().then(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});