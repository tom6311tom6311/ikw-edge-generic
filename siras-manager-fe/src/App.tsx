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

const client = new ApolloClient({
  uri: AppConfig.BACKEND.URL,
  cache: new InMemoryCache()
});

const App = () => {
  const [sidebarState, switchSidebar] = React.useState(false)
  const [pageName, changePageName] = React.useState('SiteListPage')
  const [displaySite, changeDisplaySite] = React.useState('None')
  
  return(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <SideBar sidebarState={sidebarState} switchSidebar={switchSidebar} changePageName={changePageName} />
        <Header sidebarState={sidebarState} title="案場總覽" switchSidebar={switchSidebar}/>
        <Routes>
          {
            pageName === 'SiteListPage'?<Route path="*" element={<SiteListPage sideBarState={sidebarState} changePageName={changePageName} changeDisplaySite={changeDisplaySite} />} />:
            pageName === 'SiteManagementPage'?<Route path="*" element={<SiteManagementPage sideBarState={sidebarState} displaySite={displaySite} />} />:
            <div></div>
          }
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
