import axios from "axios";
import { useState } from "react";
import "./App.css";


export default function PostBox() {
    let maxCharCount = 250;
    const [charCount, setCharCount] = useState(0);
    const allowedKeys = [8, 37, 38, 39, 40];
    let charPer = charCount / maxCharCount * 100;

    const [loginReveal, setReveal] = useState(false);

    const charCounter = (e) => {
        setCharCount(e.target.outerText.length);
    };

    const inputHandler = (e) => {
        setCharCount(e.target.innerText.length);
        if (e.target.innerText.length == maxCharCount && !allowedKeys.includes(e.keyCode)) {
            e.preventDefault();
        }
    }

    const onPost = (e) => {
        const postText = e.target.parentNode.parentNode.querySelector(".postInput").innerText;
        if (postText.length == 0) {
            console.log("Too short, post not submitted.")
            return;
        }

        const d = new Date();
        const min = d.getMinutes() < 10 ? "0" + d.getMinutes().toString() : d.getMinutes().toString();
        const time = `${d.getHours() <= 12 ? d.getHours() : d.getHours() - 12}:${min} ${d.getHours() > 12 ? "PM" : "AM"}`

        const post = {
            post: postText,
            time: time,
            date: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`,
            author: "Matt Hamel"
        };

        console.log(JSON.stringify(post));
        axios.post(process.env.REACT_APP_SERVER_URL, JSON.stringify(post)).then((res) => { console.log(res); e.target.parentNode.parentNode.querySelector(".postInput").innerText = ""; setCharCount(0); }).catch((err) => {
            console.log("ERROR", err.response.status);
            if (err.response.status === 401) {
                setReveal(true);
            }
        });
    }

    const pasteChange = (e) => {
        //prevent default behavior as it is not desired
        e.preventDefault();

        //get the selection range, depending on which way the user highlights the text chagnes which variable is the start and end
        var focus = window.getSelection().focusOffset;
        var anchor = window.getSelection().anchorOffset;

        var start, end;

        //thankfully, the smaller number is the start and the bigger is the end
        if (focus < anchor) {
            start = focus;
            end = anchor;
        } else {
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

        r.setStart(e.target.childNodes[0], start + text.length);
        r.setEnd(e.target.childNodes[0], start + text.length)

        sel.removeAllRanges();
        window.getSelection().addRange(r);

    };

    return (
        <div className="newPostBox">
            <Login reveal={loginReveal} setReveal={setReveal} />
            <span id="text" className="postInput" role="textbox" contentEditable onKeyDown={inputHandler} onKeyUp={charCounter} onPaste={pasteChange} onDrop={(e) => { e.preventDefault(); }}></span>
            <div className="bottom">
                <section className="charCountSection">
                    <p>{charCount}/{maxCharCount}</p>
                    <figure className="barBack">
                        <div className={"charCountBar " + (charPer == 100 ? "red" : "blue")} style={{ width: `${charPer}%` }} />
                    </figure>
                </section>
                <span className="button" onClick={onPost}>Post</span>
            </div>
        </div>
    )
};


function Login(props) {

    const loginpost = () => {

        console.log(document.getElementById("uname").value)
        console.log(document.getElementById("password").value)

        const info = {
            user: document.getElementById("uname").value,
            password: document.getElementById("password").value
        }

        axios.post(process.env.REACT_APP_LOGIN_URL, JSON.stringify(info)).then((res) => { console.log(res); props.setReveal(false); }).catch((err) => {
            console.log("ERROR", err.response);
        });
    }

    return (
        <section className={"login " + (props.reveal ? "visible" : "hidden")}>
            <form>
                <label for="uname">Username</label><br />
                <input type="text" id="uname" /><br />
                <label for="password">Password</label><br />
                <input type="password" id="password" />
            </form>
            <div className="bottom">

                <span className="button" onClick={loginpost}>Login</span>
                <span className="button" onClick={() => { props.setReveal(false) }} style={{ backgroundColor: "#778" }}>Cancel</span>
            </div>

        </section>
    )
}