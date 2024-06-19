import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'

const Siderbar = () => {

    // about to make use of a state
    const [extended, setExtended] = useState(false)
    // to store all the recently searched result in recent
    const{onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context)

    // enables you to click the recent search item and go back to them
    const loadPrompt = async(prompt) => {
        setRecentPrompt
        await onSent(prompt)
    }
  return (
    // the side bar part of the code
    <div className='sidebar'>
        <div className='top'>
            <img onClick={() => setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
            {/* the plus icon and the new chat i */}
            <div onClick={()=>newChat()}  className='new-chat'>
                <img src={assets.plus_icon} alt="" />
                {extended?<p>New Chat</p> :null} 
            </div>
            {/* recent chat and message icon */}
            {extended
            ?<div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompts.map((item,index)=>{
                    return (
                    <div onClick={()=>loadPrompt(item)} className="recent-entry">
                        <img src={assets.message_icon} alt="" />
                        <p>{item.slice(0,18)}</p>
                     </div>
                    )
                })}
                
            </div>
            :null
        }
        </div>
        {/* the bottom part of the program */}
        <div className='bottom'>
            {/* the help and icon */}
            <div className="botton-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extended?<p>Help</p>:null}
            </div>

            {/* the activity and icon */}
            <div className="botton-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extended?<p>Activity</p>:null}
            </div>

            {/* the setting and icon */}
            <div className="botton-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended?<p>Setting</p>:null}
            </div>
        </div>
    </div>
  )
}

export default Siderbar