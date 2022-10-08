const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT ?? 14001;
const BACKEND_URL = `http://${window.location.hostname}:${BACKEND_PORT}`;

const AppConfig = {
  BACKEND: {
    PORT: BACKEND_PORT,
    URL: BACKEND_URL,
    GQL_URL: `${BACKEND_URL}/graphql`,
  },
  TIMING: {
    IMG_REFRESH_PERIOD: 30000, // ms
  },
};

export default AppConfig;
