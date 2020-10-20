const MongoClient = require('mongodb').MongoClient;
const chalk = require('chalk');
const config = require('./config');

const USE_LOCALHOST =
  process.env.USE_LOCALHOST !== undefined ? process.env.USE_LOCALHOST : true;

const client = new MongoClient(
  !USE_LOCALHOST
    ? `mongodb+srv://${config.mongo_db_admin_user}:${config.mongo_db_admin_user_password}@apoorv-db.mw9mr.mongodb.net/${config.mongo_db_name}?retryWrites=true&w=majority`
    : config.mongo_localhost_conn_uri,
  { useNewUrlParser: true }
);

client.connect(function (err) {
  if (err) {
    console.log(chalk.red("Couldn't connect to mongodb.", err));
    process.exit(-1);
  }
  console.log(chalk.green('Connected to Database.'));
});

module.exports = client;
