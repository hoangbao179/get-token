require('dotenv').config();

module.exports = {
    GOLOGIN_API_URL: process.env.GOLOGIN_API_URL,
    LOCAL_GOLOGIN_URL: process.env.LOCAL_GOLOGIN_URL,
    PROXY_API_URL: process.env.URL_GET_DATA_ROTATING_PROXY,
    GOLOGIN_TOKEN: process.env.GOLOGIN_TOKEN,
    PROXY_KEY: process.env.PROXY_KEY
};