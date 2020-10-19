const MongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');
const config = require('./config');

let db = null;

MongoClient.connect(
  `${config.mongo_conn_uri}/${config.mongo_db_name}`,
  function (err, db) {
    if (err) {
      console.log(chalk.red("Couldn't connect to mongodb."));
      process.exit(-1);
    }
    console.log(chalk.green('Connected to Database.'));
    db = db;
  }
);

module.exports = db;
