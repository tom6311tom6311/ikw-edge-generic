import logoImg from '../../img/logo_white_words.png';
import menuIcon_open from '../../img/menu_open.png';
import menuIcon_close from '../../img/menu_close.png';

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
    <img src={sidebarState?menuIcon_open:menuIcon_close} onClick={()=>switchSidebar(true)} alt='menu' className='menu_icon'/>
    <img src={logoImg} alt='logo' className='sideBar_logo'/>
    <h1 className='overview_header_text'>{title}</h1>
    <div>
      <img src={require('../../img/ring.png')} alt='alert' className='ring_icon'/>
      <img src={require('../../img/search.png')} alt='search' className='search_icon'/>
    </div>
  </div>
);

export default Header;
