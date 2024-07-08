import React, {useState} from "react";
import MainMenu from "./MainMenu";
import "./styles.css";

function Jamz(){

    // const [playList, setPlayList] = useState([]);

    return (
        <div className="container">
            <header>
                <h1>JAMZ</h1>
            </header>
            <main>
                <MainMenu />
            </main>
            <footer>
                <p>By ZR</p>
                <p>Jul 8th 2024</p>
            </footer>
        </div>
    ); 
};

export default Jamz;
