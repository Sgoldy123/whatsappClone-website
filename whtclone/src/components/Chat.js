import React, { useState } from 'react'
import { Avatar,IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachmentIcon from '@material-ui/icons/Attachment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Chat.css'
import Button from '@material-ui/core/Button';
import axios from 'axios'
const Chat = ({messages}) => {

    const [input,setInput]=useState({
        message:'',
        recieved:false,
        timeStamp:new Date().toString(),
        name:'sahil'
    })

    const submitHandler=(e)=>{
          e.preventDefault();
          axios.post('http://localhost:9000/message/new',input)
          
          
    }


    return (
        <div className='chat'>
            <div className="chat_header">
                <div> <Avatar/> </div>
                <div className='Chat_content' >
                   <h3>Name</h3>
                   <p>Last Scene</p>
                </div>
                <div className='chat_icon'>
                      <IconButton> <SearchIcon/></IconButton>
                      <IconButton><AttachmentIcon/></IconButton>
                      <IconButton><MoreVertIcon/></IconButton>
                </div>
            </div>
            <div className="chat_body">

            {
                messages.map((message)=>(
                         

                    <p className={`chat_message ${message.recieved && "chat_messageReciever"}`}>
                   <span className='chat_name'>{message.name}</span>
                   {message.message}
                   <span className="chat_timestamp">
                       {message.timeStamp}
                   </span>
                   </p>

                ))
            }
                
               
               
                
            </div>
            <div className='chat_footer'>
                     <input type='text' onChange={(e)=>{
                         setInput({...input,message:e.target.value})
                     }}  placeholder='Type a message..'/>
                     <Button onClick={submitHandler} variant="contained">Send</Button>

            </div>
        </div>
    )
}

export default Chat
