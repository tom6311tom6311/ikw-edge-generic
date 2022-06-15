import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import NavUtils from '../../utils/NavUtils';
import { useLogoutMutation } from '../../commonApis/LogoutMutation.graphql.generated';
import { useGetNavHierarchyQuery } from '../../commonApis/GetNavHierarchyQuery.graphql.generated';
import SideBar, { MenuContentItem } from '../../components/MenuBar/SideBar';
import Header from '../../components/Header/Header';

function MainPage() {
  const params = useParams();
  const [logoutMutation, { data: logoutResult }] = useLogoutMutation();
  const { loading, error, data: getNavHierarchyResult } = useGetNavHierarchyQuery();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuContent, setMenuContent] = useState<MenuContentItem[]>([]);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (loading || error || !getNavHierarchyResult?.sites) {
      return;
    }
    const { sites: navHierarchy } = getNavHierarchyResult;
    setMenuContent(NavUtils.renderMenuContent(params, navHierarchy, logoutMutation));
  }, [params, loading, error, getNavHierarchyResult, logoutMutation]);

  // remove the session token when logout succeeded
  useEffect(() => {
    if (logoutResult?.logout === true) {
      localStorage.removeItem('x-token');
      window.location.replace('/login');
    }
  }, [logoutResult]);

  return (
    <div className={isSidebarOpen ? 'is-sidebar-on' : ''}>
      <SideBar menuContent={menuContent} />
      <Header title="案場總覽" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Outlet />
    </div>
  );
}

export default MainPage;
