import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import AppConfig from './const/AppConfig';
import Login from './containers/LoginPage/LoginPage';
import MainPage from './containers/MainPage/MainPage';
import SiteListPage from './containers/SiteListPage/SiteListPage';
import SiteStatusPage from './containers/SiteStatusPage/SiteStatusPage';
import SiteInfoPage from './containers/SiteInfoPage/SiteInfoPage';
import SirasListPage from './containers/SirasListPage/SirasListPage';
import SirasStatusPage from './containers/SirasStatusPage/SirasStatusPage';
import SirasOpPage from './components/SirasOpPage/SirasOpPage';
import SirasFeedingReportListPage from './containers/SirasFeedingReportListPage/SirasFeedingReportListPage';
import SirasFeedingReportCreatePage from './containers/SirasFeedingReportCreatePage/SirasFeedingReportCreatePage';
import SirasHealthReportListPage from './containers/SirasHealthReportListPage/SirasHealthReportListPage';
import CameraOverview from './components/CameraOverview/CameraOverview';
import MapPage from './containers/MapPage/MapPage';

const httpLink = createHttpLink({
  uri: AppConfig.BACKEND.GQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('x-token') || '';
  return {
    headers: {
      ...headers,
      'x-token': token,
    },
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions?.code === 401) {
        window.location.replace('/login');
      }
    });
  }
});

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<MainPage />}>
            <Route path="map" element={<MapPage />} />
            <Route path="site/:siteId/siras/:sirasId">
              <Route path="op/:opId" element={<SirasOpPage />} />
              <Route path="reports">
                <Route path="feeding">
                  <Route path="create" element={<SirasFeedingReportCreatePage />} />
                  <Route path="*" element={<SirasFeedingReportListPage />} />
                  <Route index element={<SirasFeedingReportListPage />} />
                </Route>
                <Route path="health">
                  <Route path="*" element={<SirasHealthReportListPage />} />
                  <Route index element={<SirasHealthReportListPage />} />
                </Route>
              </Route>
              <Route path="*" element={<SirasStatusPage />} />
              <Route index element={<SirasStatusPage />} />
            </Route>
            <Route path="site/:siteId">
              <Route path="sirases" element={<SirasListPage />} />
              <Route path="camera/:cameraId" element={<CameraOverview />} />
              <Route path="info" element={<SiteInfoPage />} />
              <Route path="*" element={<SiteStatusPage />} />
              <Route index element={<SiteStatusPage />} />
            </Route>
            <Route path="*" element={<SiteListPage />} />
            <Route index element={<SiteListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
