/* eslint-disable import/no-dynamic-require */
const express = require('express');
const fs = require('fs');
const path = require('path');
const ClientError = require('./exeptions/ClientError');
const db = require('./models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routesDir = path.join(__dirname, 'routes');
fs.readdirSync(routesDir).map((r) => {
  app.use('/api', require(`${routesDir}/${r}`));
});

app.use((err, req, res, next) => {
  console.log(err instanceof ClientError);
  if (err instanceof ClientError) {
    res.status(err.statusCode).json({
      status: 'fail',
      message: err.message,
    });
    return;
  }
  console.log(err);
  res.status(500).send({
    status: 'error',
    message: err || 'Internal server error',
  });
  next();
});

const PORT = 5000;

db.sequelize.authenticate().then(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});