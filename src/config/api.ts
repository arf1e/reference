const PRODUCTION = 'https://library.egorushque.com/api/v1/';
const DEVELOPMENT = 'http://localhost:1337/api/v1/';

const urlMapper = {
  production: PRODUCTION,
  development: DEVELOPMENT,
  test: DEVELOPMENT,
};

export const API_URL = urlMapper[process.env.NODE_ENV] || DEVELOPMENT;
