import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";
import profile from "./profileData.json";
import PostBox from "./PostBox";



var serverUrl = process.env.REACT_APP_SERVER_URL;


function App() {

  const [content, setContent] = useState({ posts: [{ post: "Loading ... ", date: "Today", time: "Now", author: "Server" }] })

  useEffect(() => {
    axios.get(serverUrl).then((res) => { setContent(res.data); }).catch(err => { console.log(`Error: ${err}`); });
  }, [])

  return (
    <main className="app">
      <aside className="welcome">
        <h1>Hamel Blogger</h1>
        <p>Hello and welcome to the personal blog of </p>
        <h2>Matthew Hamel</h2>
        <p>This blog was made using React and a server backend in JavaScript.</p>
        <p>check out the code for this project </p>
        <a>HERE</a>
      </aside>

      <section className="postSection">
         <PostBox />

        {content.posts.map((obj, index)=>{
          return (<Post key={index} data={obj}/>);
        })}


        <p className="bedrock">You've reached the bottom! Better turn back.</p>
      </section>

      <aside className="links">
        <h2>Links</h2>
        <ul>
          <li onClick={()=>window.open("https://www.matthewhamel.dev")}>MatthewHamel.dev</li>
          <li onClick={()=>window.open("https://github.com/MDHamel")}>GitHub</li>
          <li onClick={()=>window.open("https://www.linkedin.com/in/mattdhamel/")}>LinkedIn</li>
        </ul>
      </aside>

    </main>
  );
}


export const Post = (props) => {
  return (
    <div className="post">
      <div className="author">
        <img classname src={profile[props.data.author].profpic} />
        <p>{props.data.author}</p>
      </div>
      <p className="text">{props.data.post}</p>
      <p className="timestamp">Posted on <b>{props.data.date}</b> at <b>{props.data.time}</b></p>
    </div>
  )
}



export default App;
