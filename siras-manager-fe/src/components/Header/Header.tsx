import React from 'react';
import LogoImg from '../../img/logo_white_words.png';
import MenuOpenImg from '../../img/menu_open.png';
import MenuCloseImg from '../../img/menu_close.png';
import RingImg from '../../img/ring.png';
import SearchImg from '../../img/search.png';

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
      <img src={LogoImg} alt="logo" className="sideBar_logo" />
      <h1 className="overview_header_text">{title}</h1>
      <div>
        <img src={RingImg} alt="alert" className="ring_icon" />
        <img src={SearchImg} alt="search" className="search_icon" />
      </div>
    </div>
  );
}

export default Header;
