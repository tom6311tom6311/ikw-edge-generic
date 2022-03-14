type HeaderProps = {
  title: string;
  switchSidebar: Function;
  isPad: boolean;
};
// const {
//   switchSidebar
// } = props
const Header = ({ title, switchSidebar, isPad }:HeaderProps) => (
  <div className='header'>
    <img src={isPad?require('../../img/menu_pad.png'):require('../../img/menu.png')} onClick={()=>switchSidebar(true)} alt='menu' className='menu_icon'/>
    <h1 className='overview_header_text'>{title}</h1>
    {isPad?
    <div>
      <img src={require('../../img/ring.png')} alt='alert' className='ring_icon'/>
      <img src={require('../../img/search.png')} alt='search' className='search_icon'/>
    </div>:
    <div>
    <img src={require('../../img/ring.png')} alt='alert' className='ring_icon'/>
    <img src={require('../../img/search.png')} alt='search' className='search_icon'/>
  </div>
    }
    
  </div>
);

export default Header;
