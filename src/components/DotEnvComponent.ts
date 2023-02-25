import "dotenv/config";

const DotenvComponent = {
    API_DATABASE_URL: process.env.API_DATABASE_URL,
    API_PORT: process.env.API_PORT,
    LOGGER_ENVIRONMENT: process.env.LOGGER_ENVIRONMENT,
    LOGGER_LEVEL: process.env.LOGGER_LEVEL,
    LOGGER_SERVICE_NAME: process.env.LOGGER_SERVICE_NAME
};

export default DotenvComponent;