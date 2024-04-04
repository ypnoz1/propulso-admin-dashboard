
import { useSelector, useDispatch } from 'react-redux';
import { updateMenuTab } from '../../redux/Store';
import './Menu.css';

function Menu() {
  const dispatch = useDispatch();
  const menuSelected = useSelector(state => state.menu.value);
  const menuText = ["Dashboard", "Table"];

  const changeTab = (name) => {
    dispatch(updateMenuTab(name));
  }

  return (
    <ul className='mtc-hd-mn-ul'>
      {menuText.map((name, index) => {
        return (
          <li key={index} onClick={() => changeTab(name)} className={menuSelected === name ? 'mtc-hd-mn-li-on' : ''}>{name}</li>
        )
      })}
    </ul>
  );
}

export default Menu;
