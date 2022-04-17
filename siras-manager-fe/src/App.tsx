import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import AppConfig from './const/AppConfig';
import Login from './components/Login/Login';
import MainPage from './containers/MainPage/MainPage';
import SiteListPage from './containers/SiteListPage/SiteListPage';
import SirasListTab from './containers/SirasListPage/SirasListPage';
import SiteStatusTab from './containers/SiteStatusPage/SiteStatusPage';

const httpLink = createHttpLink({
  uri: AppConfig.BACKEND.URL,
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<MainPage />}>
            <Route path="site/:siteId">
              <Route path="siras" element={<SirasListTab />} />
              <Route path="*" element={<SiteStatusTab />} />
              <Route index element={<SiteStatusTab />} />
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
