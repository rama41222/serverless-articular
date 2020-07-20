const {
  APP_NAME,
  NODE_ENV,
  JWT_ALGORITHM,
  JWT_EXP,
  JWT_SECRET,
  L_AWS_ACCESS_KEY,
  L_AWS_SECRET,
  DYANMODB_TABLE,
  L_AWS_REGION,
  DB_HOST,
  DB_PORT
} = process.env;

const baseSettings  = {
  app:{
    NAME: APP_NAME || 'sample-service',
    ENV: NODE_ENV || 'development'
  },
  aws: {
    dynamo: {
      AWS_SECRET: L_AWS_SECRET,
      AWS_ACCESS_KEY: L_AWS_ACCESS_KEY,
      DYANMODB_TABLE: DYANMODB_TABLE,
      AWS_REGION: L_AWS_REGION,
      DB_HOST: DB_HOST,
      DB_PORT: DB_PORT
    }
  },
  jwt: {
    algorithm: JWT_ALGORITHM || 'HS256',
    secret: JWT_SECRET,
    exp: JWT_EXP
  },
  hash: {
    saltRounds: 3,
  },
};

module.exports = Object.freeze(baseSettings);



