import PostBox from "./PostBox";
import {Post} from "./App";


export default function Tester(){

    return(
        <main className="app">
            <section className="postSection">
                <PostBox />
                <Post data={{post:"TESTING POST", date:"Today", time:"Now", author:"Server"}}></Post>
                <Post data={{post:"TESTING POST", date:"Today", time:"Now", author:"Server"}}></Post>
                <Post data={{post:"TESTING POST", date:"Today", time:"Now", author:"Server"}}></Post>
                <Post data={{post:"TESTING POST", date:"Today", time:"Now", author:"Server"}}></Post>
                <Post data={{post:"TESTING POST", date:"Today", time:"Now", author:"Server"}}></Post>

                <p className="bedrock">You've reached the bottom! Better turn back.</p>
            </section>
            
        </main>
        
    )
}

