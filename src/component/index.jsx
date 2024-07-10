import React from "react";
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
                <MainMenu />
            </main>
            <footer>
                <p>By ZR</p>
                <p>Jul 9th 2024</p>
            </footer>
        </div>
    ); 
};

export default Jamz;
