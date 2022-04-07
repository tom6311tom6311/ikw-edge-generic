import React from 'react';
import LogoImg from '../../img/logo_white_words.png';
import MenuOpenImg from '../../img/menu_open.png';
import MenuCloseImg from '../../img/menu_close.png';

type HeaderProps = {
  title: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

function Header({ title, isSidebarOpen, toggleSidebar }:HeaderProps) {
  return (
    <div className="header">
      <button className="menu_button" type="button" onClick={toggleSidebar}>
        <img src={isSidebarOpen ? MenuOpenImg : MenuCloseImg} alt="menu" className="menu_icon" />
      </button>
      <img src={LogoImg} alt="logo" className="sidebar_logo" />
      <h1 className="overview_header_text">{title}</h1>
    </div>
  );
}

export default Header;
