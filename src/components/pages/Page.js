import { useSelector } from 'react-redux';
import DashBoard from './dashboard/DashBoard';
import Table from './table/Table';
import './Page.css';

function Page(){
  const menuSelected = useSelector(state => state.menu.value);
  return (
    <div className='mtc-pg'>
      {menuSelected === "Dashboard" ? <DashBoard /> : <Table />}
    </div>
  );
}

export default Page;