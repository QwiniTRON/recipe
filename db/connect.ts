import keys from '../keys/default';
import pgPromise from 'pg-promise';

const dbPort = keys.dbPort;
const dbName = keys.dbName;
const dbPassword = keys.dbPassword;
const dbHost = process.env.IS_DOCKER? 'postgres' : keys.dbHost;
const dbDatabase = keys.dbDatabse;

console.log(process.env.dbTest);


const pgp = pgPromise();
const db = pgp(`postgres://${dbName}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`);

export default db;