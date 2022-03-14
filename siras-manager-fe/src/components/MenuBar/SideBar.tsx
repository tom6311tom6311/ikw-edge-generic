import * as React from 'react';

// const sidBarState:boolean
// const switchSidebar:Function


export default function SideBar (props:{isPad:boolean, sidebarState:boolean, switchSidebar:Function, changePageName:Function}) {
  const {
    isPad,
    sidebarState,
    switchSidebar,
    changePageName
  } = props
  
  return (
    isPad?
    <div className='sideBar_background'>
      <div className='sideBar_container'>
        <div className='sideBar_header'>
          <img src={require('../../img/logo_white_words.png')} alt='sideBar logo' onClick={() => {changePageName('SiteListPage'); switchSidebar(false)}} className='sideBar_logo'/>
          <img src={require('../../img/close_white.png')} alt='sideBar close' onClick={() => switchSidebar(false)} className='sideBar_close_button'/>
        </div>
        <div className='sideBar_item_container' style={{marginTop:'10px'}}><p className='sideBar_item_p' onClick={() => {changePageName('SiteListPage'); switchSidebar(false)}}>案場總覽</p></div>
        <div className='sideBar_item_container'><p className='sideBar_item_p'>GIS圖台</p></div>
        <div className='sideBar_item_container' style={{borderWidth:'0'}}><p className='sideBar_item_p'>市場資訊</p></div>
      </div>
    </div>:
    sidebarState?
    <div className='sideBar_background'>
      <div className='sideBar_container'>
        <div className='sideBar_header'>
          <img src={require('../../img/logo_white_words.png')} alt='sideBar logo' onClick={() => {changePageName('SiteListPage'); switchSidebar(false)}} className='sideBar_logo'/>
          <img src={require('../../img/close_white.png')} alt='sideBar close' onClick={() => switchSidebar(false)} className='sideBar_close_button'/>
        </div>
        <div className='sideBar_item_container' style={{marginTop:'10px'}}><p className='sideBar_item_p' onClick={() => {changePageName('SiteListPage'); switchSidebar(false)}}>案場總覽</p></div>
        <div className='sideBar_item_container'><p className='sideBar_item_p'>GIS圖台</p></div>
        <div className='sideBar_item_container' style={{borderWidth:'0'}}><p className='sideBar_item_p'>市場資訊</p></div>
      </div>
    </div>:
    <div></div>
  );
}
