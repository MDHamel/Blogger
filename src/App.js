import axios from "axios";
import { useEffect, useState } from "react";

import "./App.css";
import profile from "./profileData.json";
import PostBox from "./PostBox";

var serverUrl = process.env.REACT_APP_SERVER_URL;


function App() {

  const [content, setContent] = useState({posts:[{post:"Loading ... ", date:"Today", time:"Now", author:"Server"}]})

  useEffect(() => {
    axios.get(serverUrl).then((res)=>{setContent(res.data);}).catch(err=>{console.log(`Error: ${err}`);});
  }, [])
  
  return (
    <main className="app">
      <aside className="filters">
        <p>Filters WIP</p>
      </aside>

      <section className="postSection">
         <PostBox />

        {content.posts.map((obj, index)=>{
          return (<Post key={index} data={obj}/>);
        })}


        <p className="bedrock">You've reached the bottom! Better turn back.</p>
      </section>

      <aside className="links"> 
        <p>Links to sites WIP</p>
      </aside>
    </main>
  );
}


export const Post = (props) =>{
  return(
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
