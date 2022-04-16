import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/MenuBar/SideBar';
import Header from '../../components/Header/Header';

function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className={isSidebarOpen ? 'sidebar_on' : ''}>
      <SideBar />
      <Header title="案場總覽" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Outlet />
    </div>
  );
}

export default MainPage;
