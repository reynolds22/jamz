import React, {useState} from "react";
import MainMenu from "./MainMenu";
import "./styles.css";

function Jamz(){
// Renders the header and footer on all pages, along with Rendering the MainMenu component.
    return (
        <div className="container">
            <header>
                <h1>JAM</h1>
                <p>Z</p>
            </header>
            <main>
                <h2 id="title-phrase">Welcome! Here are your playlists</h2>
                <MainMenu />
                    <p>This is a app/site called Jamz is a music playlist making app that saves playlists. You are able to name, edit and add/remove songs.</p>
            </main>
            <footer>
                <p>By ZR</p>
                <p>Jul 8th 2024</p>
            </footer>
        </div>
    ); 
};

export default Jamz;
