const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT ?? 14001;

const AppConfig = {
  BACKEND: {
    PORT: BACKEND_PORT,
    URL: `http://${window.location.hostname}:${BACKEND_PORT}/graphql`,
  },
};

export default AppConfig;
