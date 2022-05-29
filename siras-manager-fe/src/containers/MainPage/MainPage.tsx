import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLogoutMutation } from './LogoutMutation.graphql.generated';
import SideBar from '../../components/MenuBar/SideBar';
import Header from '../../components/Header/Header';

function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const [logoutMutation, { data }] = useLogoutMutation();

  // remove the session token when logout succeeded
  useEffect(() => {
    if (data?.logout === true) {
      localStorage.removeItem('x-token');
      window.location.replace('/login');
    }
  }, [data]);

  return (
    <div className={isSidebarOpen ? 'sidebar_on' : ''}>
      <SideBar onLogout={logoutMutation} />
      <Header title="案場總覽" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Outlet />
    </div>
  );
}

export default MainPage;
