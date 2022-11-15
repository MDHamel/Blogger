import PostBox from "./PostBox";
import { Post } from "./App";
import "./App.css"


export default function Tester() {

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
                <Post data={{ post: "TESTING POST", date: "Today", time: "Now", author: "Server" }}></Post>
                <Post data={{ post: "TESTING POST", date: "Today", time: "Now", author: "Server" }}></Post>
                <Post data={{ post: "TESTING POST", date: "Today", time: "Now", author: "Server" }}></Post>
                <Post data={{ post: "TESTING POST", date: "Today", time: "Now", author: "Server" }}></Post>
                <Post data={{ post: "TESTING POST", date: "Today", time: "Now", author: "Server" }}></Post>

                <p className="bedrock">You've reached the bottom! Better turn back.</p>
            </section>

            <aside className="links">
                <h2>Links to sites WIP</h2>
                <ul>
                    <li>MatthewHamel.dev</li>
                    <li>GitHub</li>
                    <li>LinkedIn</li>
                    <li>In Development</li>
                </ul>
            </aside>

        </main>

    )
}

