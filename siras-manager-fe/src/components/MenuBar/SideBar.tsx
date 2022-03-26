import * as React from 'react';

// const sidBarState:boolean
// const switchSidebar:Function


export default function SideBar (props:{ sidebarState:boolean, switchSidebar:Function, changePageName:Function}) {
  const {
    sidebarState,
    switchSidebar,
    changePageName
  } = props
  
  return (
    sidebarState?
    <div className='sideBar_background'>
      <div className='sideBar_container'>
        <div className='sideBar_header'>
        </div>
        <div className='sideBar_item_container' style={{marginTop:'10px'}}><p className='sideBar_item_p' onClick={() => {changePageName('SiteListPage'); switchSidebar(false)}}>案場總覽</p></div>
        <div className='sideBar_item_container'><p className='sideBar_item_p'>GIS圖台</p></div>
        <div className='sideBar_item_container' style={{borderWidth:'0'}}><p className='sideBar_item_p'>市場資訊</p></div>
      </div>
    </div>:
    <div></div>
  );
}
