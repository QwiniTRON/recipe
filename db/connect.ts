import keys from '../keys/default';
import pgPromise from 'pg-promise';

const dbPort = keys.dbPort;
const dbName = keys.dbName;
const dbPassword = keys.dbPassword;
const dbHost = process.env.IS_DOCKER? 'db' : keys.dbHost;
const dbDatabase = keys.dbDatabse;

const connectString = `postgres://${dbName}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;

console.log('DATABASE STRING ' + connectString);

const pgp = pgPromise();
const db = pgp(connectString);

export default db;