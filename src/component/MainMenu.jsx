import React, {useState} from "react";
import MakeOrEdit from "./MakeOrEdit";

function MainMenu(){

    const [beingWorked, setBeingWorked] = useState(false);

    function handleOnClick(){
        setBeingWorked(!beingWorked);
    };  
    
    if (beingWorked){
        return <MakeOrEdit />;
    }; 

    return (
        <div className="main-container">
            <button onClick={handleOnClick}>Create A Playlist</button>
            <div className="playlist-cards">
                <h3>thing</h3>
                <h3>thing</h3>
                <h3>thing</h3>
            </div>
        </div>
    );
};
 
export default MainMenu;