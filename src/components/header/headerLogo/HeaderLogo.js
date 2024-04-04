import logo from '../../../assets/img/logo.png';
import './HeaderLogo.css';

function HeaderLogo() {
  return (
    <div className='mtc-hd-lg'>
      <div className='mtc-hd-lg-icn'>
        <img src={logo} alt='logo' className='mtc-hd-logo-img'/>
      </div>
      <div className='mtc-hd-lg-txt'>Metrics</div>
      <div className='clrboth'></div>    
    </div>     
  );
}

export default HeaderLogo;