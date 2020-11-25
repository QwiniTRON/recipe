type KyesType = {
  PORT: string,
  dbPort: string,
  dbName: string,
  dbPassword: string,
  dbHost: string,
  dbDatabse: string,
  secretKey: string
}

let keys: KyesType;

if(process.env.NODE_ENV === 'production') {
  keys = require('./prod').default;
} else {
  keys = require('./dev').default;
}

export default keys;