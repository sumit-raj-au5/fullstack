import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search'
import InboxIcon from '@mui/icons-material/Inbox';
import {Avatar} from "@mui/material"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

function Header() {
  const user = useSelector(selectUser);
  return (
    <header>
      <div className='header-container'>
        <div className='header-left'>
        <Link to={'/'}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Stack_Overflow_logo.svg/1200px-Stack_Overflow_logo.svg.png?20150916153754" alt="logo" />
          </Link>
          <h3>Products</h3>
        </div>

        <div className='header-middle'>
          <div className="header-search-container">
            <SearchIcon/>
            <input type="text" name="search" id="search" placeholder='Search Questions' />
          </div>
        </div>

        <div className='header-right'>
            <div className="header-right-container">
             <span onClick={()=>{
               signOut(auth);
             }}><Avatar src={user?.photo}/></span> 
              <InboxIcon />
              <svg aria-hidden="true" className="svg-icon iconStackExchange" width="18" height="18" viewBox="0 0 18 18">
              <path d="M15 1H3a2 2 0 0 0-2 2v2h16V3a2 2 0 0 0-2-2ZM1 13c0 1.1.9 2 2 2h8v3l3-3h1a2 2 0 0 0 2-2v-2H1v2Zm16-7H1v4h16V6Z"></path>
              </svg>
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header