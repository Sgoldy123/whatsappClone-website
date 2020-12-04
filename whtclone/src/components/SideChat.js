import React from 'react'
import './SideChat.css'
import { Avatar } from '@material-ui/core';

const SideChat = () => {
    return (
        <div className='sideChat'>
            <div className='sideChat_left'><Avatar/></div>
            <div className='sideChat_right'>
             <h2>name</h2>
             <p>chat</p>
            </div>
        </div>
    )
}

export default SideChat
