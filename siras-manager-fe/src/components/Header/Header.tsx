type HeaderProps = {
  title: string;
  switchSidebar: Function;
  sidebarState:Boolean;
};
// const {
//   switchSidebar
// } = props
const Header = ({ title, switchSidebar, sidebarState }:HeaderProps) => (
  <div className={sidebarState?'header sidebar_on':'header'}>
    <img src={require('../../img/menu_pad.png')} onClick={()=>switchSidebar(true)} alt='menu' className='menu_icon'/>
    <h1 className='overview_header_text'>{title}</h1>
    <div>
      <img src={require('../../img/ring.png')} alt='alert' className='ring_icon'/>
      <img src={require('../../img/search.png')} alt='search' className='search_icon'/>
    </div>
  </div>
);

export default Header;
