import axios from "axios";
import { useState } from "react";
import "./App.css";

var serverUrl = process.env.REACT_APP_SERVER_URL;

export default function PostBox() {
    let maxCharCount = 250;
    const [charCount, setCharCount] = useState(0);
    const allowedKeys = [8, 37,38,39,40];
    let charPer = charCount/maxCharCount * 100;

    const charCounter = (e) => {
        setCharCount(e.target.outerText.length);
    };

    const inputHandler = (e) => {
        setCharCount(e.target.innerText.length);
        if(e.target.innerText.length == maxCharCount && !allowedKeys.includes(e.keyCode)){
            e.preventDefault();
        }
    }

    const onPost = (e) =>{
        const postText = e.target.parentNode.parentNode.querySelector(".postInput").innerText;
        

        const d = new Date();
        const time = `${d.getHours() <= 12?d.getHours():d.getHours()-12}:${d.getMinutes()} ${d.getHours() > 12?"PM":"AM"}`

        const post = {
            post: postText,
            time: time,
            date: `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`,
            author: "Matt Hamel"
        };

        console.log(JSON.stringify(post));
        axios.post(serverUrl, JSON.stringify(post)).then((res)=>{console.log(res);e.target.parentNode.parentNode.querySelector(".postInput").innerText = "";setCharCount(0);}).catch((err)=>{console.log("ERROR", err)});
    } 

    const pasteChange = (e) =>{
        //prevent default behavior as it is not desired
        e.preventDefault();

        //get the selection range, depending on which way the user highlights the text chagnes which variable is the start and end
        var focus = window.getSelection().focusOffset;
        var anchor = window.getSelection().anchorOffset;

        var start, end;

        //thankfully, the smaller number is the start and the bigger is the end
        if(focus < anchor){
            start = focus;
            end = anchor;
        }else{
            start = anchor;
            end = focus
        }

        //get clipboard as plain text, remove content that would go over the char limit but add in the content that is being removed
        var text = e.clipboardData.getData('text/plain');
        text = text.substring(0, maxCharCount - charCount + (end - start));

        //change the inner text to the current text, with the selected bit cut out and the new text
        var curText = e.target.innerText;
        e.target.innerText = curText.substring(0, start) + text + curText.substring(end);
        setCharCount(e.target.outerText.length);
        
        //alot of work to make the cursor go to then end of the pasted content @ _ @
        var sel = window.getSelection();
        var r = document.createRange();

        r.setStart(e.target.childNodes[0], start+text.length);
        r.setEnd(e.target.childNodes[0], start+text.length)

        sel.removeAllRanges();
        window.getSelection().addRange(r);

    };

    return(
      <div className="newPostBox">
            <span id="text" className="postInput" role="textbox" contentEditable onKeyDown={inputHandler} onKeyUp={charCounter} onPaste={pasteChange} onDrop={(e)=>{e.preventDefault();}}></span>
            <div className="bottom">
                <section className="charCountSection">
                    <p>{charCount}/{maxCharCount}</p>
                    <figure className="barBack">
                        <div className={"charCountBar " + (charPer == 100? "red" : "blue")} style={{width:`${charPer}%`}}/>
                    </figure>
                </section>
                <span className="newPostButton" onClick={onPost}>Post</span>
            </div>
      </div>
    )
  };