const {
  APP_NAME,
  NODE_ENV,
  JWT_ALGORITHM,
  JWT_EXP,
  JWT_SECRET,
  L_AWS_ACCESS_KEY,
  L_AWS_SECRET,
  L_AWS_REGION,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

let credentials = '';

if(DB_HOST && DB_PORT && DB_PASSWORD) {
  credentials = `${DB_HOST}:${DB_PORT}:${encodeURIComponent(DB_PASSWORD)}@`;
}

const baseSettings  = {
  app:{
    NAME: APP_NAME || 'sample-service',
    ENV: NODE_ENV || 'development'
  },
  aws: {
    AWS_SECRET: L_AWS_SECRET,
    AWS_ACCESS_KEY: L_AWS_ACCESS_KEY,
    AWS_REGION: L_AWS_REGION,
  },
  mongo: {
      url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${NODE_ENV}-${DB_NAME}` || `mongodb://localhost/${NODE_ENV}-${APP_NAME}`,
      host: `${DB_HOST}` || 'mongodb://localhost/user-service'
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



