import React from 'react'
import './SideBar.css'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { IconButton, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SideChat from './SideChat';
const SideBar = () => {
    return (
        <div className='sidebar'>
           
           <div className="sideBar_header">
               <div className="header_left">
               <Avatar></Avatar>  
               </div>
               <div className="header_right">
                    <IconButton>
                       <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>    
                    </IconButton>
               </div>
           </div>
           <div className="search">
                 
               <div className="search_centre">
                 <div><SearchIcon/></div>
                 <div><input className="search_centerDeep" type="text" placeholder={` search`} /></div>
               </div>
               
           </div>
           <div className='side_chat'>
                 <SideChat/>
                 <SideChat/>
                 <SideChat/>
                 <SideChat/>
                 <SideChat/>

           </div>

        </div>
    )
}

export default SideBar
