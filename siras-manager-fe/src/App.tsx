import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Header from './components/Header/Header';
import OverviewListPage from './containers/OverviewListPage/OverviewListPage';

const App = () => (
  <BrowserRouter>
    <Header title="魚電養殖管理" />
    <Routes>
      <Route path="*" element={<OverviewListPage />} />
    </Routes>
  </BrowserRouter>
)

export default App;
