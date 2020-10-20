const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));

const dbConn = require('./database');

const USE_LOCALHOST =
  process.env.USE_LOCALHOST !== undefined ? process.env.USE_LOCALHOST : true;

const db_name = !USE_LOCALHOST
  ? config.mongo_db_name
  : config.mongo_localhost_db_name;

const collection_name = !USE_LOCALHOST
  ? config.mongo_collection_name
  : config.mongo_localhost_collection_name;

app.use(express.static(path.join(__dirname, '../client')));

app.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/', 'index.html'));
});

app.post('/detail_post', async function (req, res) {
  if (!dbConn.isConnected)
    res.json({
      code: 500,
      message: 'Database connection is not yet established.'
    });
  response = {
    Fullname: req.body.name,
    Email: req.body.email,
    Message: req.body.message,
    Phone: req.body.phone
  };
  try {
    const queryResponse = await dbConn
      .db(db_name)
      .collection(collection_name)
      .insertOne(response);
    if (queryResponse.result.ok) {
      console.log(chalk.green('Data inserted successfully.'));
      console.log(response);
      res.json({ code: 200, message: 'Form submitted successfully.' });
    } else {
      console.log(chalk.green('Error occurred, unable to save data.'));
      res.json({
        code: 500,
        message: 'Unable to submit the form at this moment.'
      });
    }
  } catch (err) {
    console.log(chalk.red('Error occured: ', err));
  }
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s//register', host, port);
});
