import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import AppConfig from './const/AppConfig';
import Header from './components/Header/Header';
import SiteListPage from './containers/SiteListPage/SiteListPage';

console.log(AppConfig.BACKEND.URL);

const client = new ApolloClient({
  uri: AppConfig.BACKEND.URL,
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Header title="魚電養殖管理" />
      <Routes>
        <Route path="*" element={<SiteListPage />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
)

export default App;
