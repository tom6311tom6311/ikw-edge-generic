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
import SideBar from './components/MenuBar/SideBar';
import SiteManagementPage from './containers/SiteManagementPage/SiteManagementPage';
import MediaQuery from './components/MediaQuery/MediaQuery';

const client = new ApolloClient({
  uri: AppConfig.BACKEND.URL,
  cache: new InMemoryCache()
});

const App = () => {
  const isPad = MediaQuery('(min-width: 600px)');
  const [sidebarState, switchSidebar] = React.useState(isPad)
  const [pageName, changePageName] = React.useState('SiteListPage')
  const [displaySite, changeDisplaySite] = React.useState('None')
  
  return(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <SideBar isPad={isPad} sidebarState={sidebarState} switchSidebar={switchSidebar} changePageName={changePageName} />
        <Header title="案場總覽" isPad={isPad} switchSidebar={switchSidebar}/>
        <Routes>
          {
            pageName === 'SiteListPage'?<Route path="*" element={<SiteListPage changePageName={changePageName} changeDisplaySite={changeDisplaySite} />} />:
            pageName === 'SiteManagementPage'?<Route path="*" element={<SiteManagementPage displaySite={displaySite} />} />:
            <div></div>
          }
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
