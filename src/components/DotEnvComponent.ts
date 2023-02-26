import "dotenv/config";

const DotenvComponent = {
    API_DATABASE_URL: process.env.API_DATABASE_URL,
    PORT: process.env.PORT,
    LOGGER_ENVIRONMENT: process.env.LOGGER_ENVIRONMENT,
    LOGGER_LEVEL: process.env.LOGGER_LEVEL,
    LOGGER_SERVICE_NAME: process.env.LOGGER_SERVICE_NAME,
    API_CRYPTO_KEY: process.env.API_CRYPTO_KEY,
    API_JWT_KEY: process.env.API_JWT_KEY
};

export default DotenvComponent;