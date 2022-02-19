import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import store from './store';
import Header from './components/Header/Header';
import SiteListPage from './containers/SiteListPage/SiteListPage';

const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Header title="魚電養殖管理" />
        <Routes>
          <Route path="*" element={<SiteListPage />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

export default App;
