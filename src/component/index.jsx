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
        </div>
    ); 
};

export default Jamz;
