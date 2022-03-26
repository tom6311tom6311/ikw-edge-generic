import LogoImg from '../../img/logo_white_words.png';
import MenuOpenImg from '../../img/menu_open.png';
import MenuCloseImg from '../../img/menu_close.png';

type HeaderProps = {
  title: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};
const Header = ({ title, isSidebarOpen, toggleSidebar }:HeaderProps) => (
  <div className="header">
    <img src={isSidebarOpen ? MenuOpenImg : MenuCloseImg} onClick={toggleSidebar} alt='menu' className='menu_icon'/>
    <img src={LogoImg} alt='logo' className='sideBar_logo'/>
    <h1 className='overview_header_text'>{title}</h1>
    <div>
      <img src={require('../../img/ring.png')} alt='alert' className='ring_icon'/>
      <img src={require('../../img/search.png')} alt='search' className='search_icon'/>
    </div>
  </div>
);

export default Header;
