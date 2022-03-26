import * as React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => (
  <div className='sideBar_wrapper'>
    <div className='sideBar_container'>
      <div className='sideBar_header'>
      </div>
      <Link to="/">
        <div className='sideBar_item_container' style={{marginTop:'10px'}}><p className='sideBar_item_p'>案場總覽</p></div>
      </Link>
      <div className='sideBar_item_container'><p className='sideBar_item_p'>GIS圖台</p></div>
      <div className='sideBar_item_container' style={{borderWidth:'0'}}><p className='sideBar_item_p'>市場資訊</p></div>
    </div>
  </div>
);

export default SideBar;
