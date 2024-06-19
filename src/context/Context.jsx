import React, { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    // You can perform asynchronous operations within useEffect or directly in the function
    // collects input from the input box and save it  
    const [input, setInput] = useState("");
    // the input data will be saved here and displayed on the webpage
    const[recentPrompt, setRecentPrompt]= useState("");
    // display all the previously searched result
    const [prevPrompts, setPrevPrompts] = useState([]);
    // once it is true it hides hello jad and every word there and replaces it with the result  
    const [showResult, setShowResult]= useState(false);
    // this will handle the loading anikmation while searching for the answer to the question 
    const [loading, setLoading] = useState(false);
    // this will display result on the webpage
    const [resultData, setResultData] = useState("");
   
    // gives the parargraph typing effect
    const delayPara = (index,nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        },75*index) 
    }
// enables the newchart div to work
    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }
    const onSent = async (prompt) => {
        // change prompt to input so we get our input instead
        setResultData("")//when we finish searching it reset the previous data so new ones can be searched
        setLoading(true)//for the loading animation
        setShowResult(true) //to show the result on the full webpage
       let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt)  
        }

        else
        {
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
        

       
        // split the response and format it 
        let responseArray = response.split("**");
        let newResponse="" ;
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");

        let newResponseArray = newResponse2.split(" ");
        for (let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        // setResultData(newResponse2)//after get the result for our search 
        setLoading(false)//the animation stop here
        setInput("")//resey the input field

    }



    // Invoke onSent function with initial prompt
   

    const contextValue = {
        // Define your context value here if needed
            prevPrompts,
            setPrevPrompts,
            onSent,
            setRecentPrompt,
            recentPrompt,
            showResult,
            loading,
            resultData,
             input,
             setInput,
             newChat
         };
    

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;
