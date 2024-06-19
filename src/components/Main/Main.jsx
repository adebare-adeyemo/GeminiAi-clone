import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'


const Main = () => {

    // const {onSent, recentPrompt,showResult,loading,resultData,setInput, input} = useContext(Context)
    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)
  return (
    <div className='main'>
        {/* the topmost like nav div on the main page */}
        <div className="nav">
            <p>Gemini</p>
            {/* the user icon */}
            <img src={assets.user_icon} alt="" />
        </div>

        {/* the main container having the greeting */}
         
         <div className='main-container'>
            
            {/* the showResult hides the hello jad and the cards so as to allow result to be showed  */}
            
            {!showResult
            ?
            <>
                 <div className="greet">
                <p><span>Hello, Jad.</span></p>
                <p>How can i help you today?</p>
            </div>

            {/* the flex card after the nav like bar */}

            <div className="cards">

                {/* the first flexbox */}

                <div className="card">
                    <p>Suggest beautiful places to see an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                
                {/* the second flex box  */}

                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                
                {/* the third flex box */}

                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>

                {/* the fourth flex box */}

                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            

            </div>
            </>

            // this is the div that display the result after the hello jad and cards have been hidden
            
            : <div className='result'> 
                <div className='result-title'>
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ? <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                   
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }

                </div>
            </div>
            }


             {/* the bottom part for the search box */}

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e) =>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                    {/* the bottom three images  */}
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {/* hiddes the icon if nothing is time on click on the icon loads the result   */}
                        {input? <img onClick={() => onSent()}  src={assets.send_icon} alt="" />:null}
                    </div>

                </div>
                <p className="bottom-info">Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini</p>
            </div>

         </div>
    </div>
  )
}

export default Main