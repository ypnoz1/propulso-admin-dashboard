import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import './HeaderSearch.css';

function HeaderSearch() {
  const [query, setQuery] = useState('');
  return (        
    <div className='mtc-hd-src'>
      <div className='mtc-hd-src-inp'>
        <input type='text' 
          placeholder='Search user...'
          value={query} 
          name='query' 
          onChange={(e) => setQuery(e.target.value)}
          maxLength={40}
          className='mtc-hd-inp'
        />
      </div> 
      <div className='mtc-hd-src-icn'>
        <div className='mtc-hd-icn'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>   
      <div className='clrboth'></div>
    </div>   
  );
}

export default HeaderSearch;
