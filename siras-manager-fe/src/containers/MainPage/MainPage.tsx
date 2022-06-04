import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import NavUtils from '../../utils/NavUtils';
import { useLogoutMutation } from '../../commonApis/LogoutMutation.graphql.generated';
import SideBar from '../../components/MenuBar/SideBar';
import Header from '../../components/Header/Header';

function MainPage() {
  const params = useParams();
  const [logoutMutation, { data }] = useLogoutMutation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // remove the session token when logout succeeded
  useEffect(() => {
    if (data?.logout === true) {
      localStorage.removeItem('x-token');
      window.location.replace('/login');
    }
  }, [data]);

  return (
    <div className={isSidebarOpen ? 'sidebar_on' : ''}>
      <SideBar menuContent={NavUtils.renderMenuContent(params, logoutMutation)} />
      <Header title="案場總覽" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Outlet />
    </div>
  );
}

export default MainPage;
