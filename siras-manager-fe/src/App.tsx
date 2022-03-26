import React, { useState } from 'react';
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
import SideBar from './components/MenuBar/SideBar';
import SiteManagementPage from './containers/SiteManagementPage/SiteManagementPage';

const client = new ApolloClient({
  uri: AppConfig.BACKEND.URL,
  cache: new InMemoryCache()
});

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className={isSidebarOpen ? 'sidebar_on' : ''}>
          <SideBar />
          <Header title="案場總覽" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
          <Routes>
            <Route path="/site/:siteId" element={<SiteManagementPage />} />
            <Route path="*" element={<SiteListPage />} />:
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
