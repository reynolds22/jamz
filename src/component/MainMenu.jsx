import React, {useState} from "react";
import MakeOrEdit from "./MakeOrEdit";

function MainMenu(){

    const [beingWorked, setBeingWorked] = useState(false);
    const [playlists, setPlaylists] = useState([]);

    const handleOnClick = () => {
        setBeingWorked(!beingWorked);
    };  

    const addPlaylist = (newPlaylist) => {
        setPlaylists([...playlists, newPlaylist]);
        setBeingWorked(false);
    };
    
    if (beingWorked){
        return <MakeOrEdit onSubmit={addPlaylist} />;
    }; 

    return (
        <div className="main-container">
            <button onClick={handleOnClick}>Create A Playlist</button>
            <div className="playlist-cards">
                {
                    playlists.length === 0 
                    ? <h2>No Playlists Made yet</h2> 
                    : (playlists.map((playlist, index) => (
                        <div 
                            key={index} 
                            className="playlist-card"
                        >
                            <h2>{playlist.name}</h2>
                            <h3>{`${playlist.tracks.length} Song`}</h3>
                        </div>
                    )))
                }
            </div>
        </div>
    );
};
 
export default MainMenu;