import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../../img/logo_h.png';

function SideBar() {
  return (
    <div className="sidebar_wrapper">
      <div className="sidebar_container">
        <div className="sidebar_header">
          <img src={LogoImg} alt="logo" className="sidebar_logo" />
        </div>
        <Link to="/">
          <div className="sidebar_item_container" style={{ marginTop: '10px' }}><p className="sidebar_item_p">案場總覽</p></div>
        </Link>
        <div className="sidebar_item_container"><p className="sidebar_item_p">GIS圖台</p></div>
        <div className="sidebar_item_container" style={{ borderWidth: '0' }}><p className="sidebar_item_p">市場資訊</p></div>
      </div>
    </div>
  );
}

export default SideBar;
