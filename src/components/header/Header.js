import Menu from '../menu/Menu';
import HeaderLogo from './headerLogo/HeaderLogo';
import HeaderSearch from './headerSearch/HeaderSearch';
import './Header.css';

function Header() {
  return (
    <>
      <div className='mtc-hd'>
        <div className='mtc-hd-center'>
          <HeaderLogo />
          <div style={{display:"none"}}>
            <HeaderSearch />      
          </div>
          <div className='clrboth'></div>
        </div>  
        <div className='mtc-mn-bg'>  
          <div className='container-center'>  
            <div className='mtc-mn'>
              <Menu />
            </div> 
          </div> 
        </div> 
      </div>
    </>
  );
}

export default Header;
