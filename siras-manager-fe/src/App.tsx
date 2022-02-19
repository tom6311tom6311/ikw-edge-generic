import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import store from './store';
import Header from './components/Header/Header';
import SiteListPage from './containers/SiteListPage/SiteListPage';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header title="魚電養殖管理" />
      <Routes>
        <Route path="*" element={<SiteListPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)

export default App;
