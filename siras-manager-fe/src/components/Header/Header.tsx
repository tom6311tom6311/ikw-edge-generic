type HeaderProps = {
  title: string;
};

const Header = ({ title }:HeaderProps) => (
  <div className='header'>
    <img src={require('../../img/menu.png')} alt='menu' className='menu_icon'/>
    <h1 className='overview_header_text'>{title}</h1>
    <img src={require('../../img/user.png')} alt='user' className='user_icon'/>
  </div>
);

export default Header;
