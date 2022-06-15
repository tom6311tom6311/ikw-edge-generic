import React from 'react';
import MenuOpenImg from '../../img/menu_open.png';
import MenuCloseImg from '../../img/menu_close.png';

type HeaderProps = {
  title: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

function Header({ title, isSidebarOpen, toggleSidebar }:HeaderProps) {
  return (
    <div className="o-header">
      <button className="c-header__button" type="button" onClick={toggleSidebar}>
        <img src={isSidebarOpen ? MenuOpenImg : MenuCloseImg} alt="menu" className="c-menu-icon" />
      </button>
      <h1 className="c-header__text">{title}</h1>
    </div>
  );
}

export default Header;
