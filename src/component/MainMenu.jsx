import React, {useState, useEffect} from "react";
import MakeOrEdit from "./MakeOrEdit";

function MainMenu(){

    const [beingWorked, setBeingWorked] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [playlistToEdit, setPlaylistToEdit] = useState(null);

    useEffect(() => {
        const savedPlaylists = localStorage.getItem("playlists");
        if(savedPlaylists){
            setPlaylists(JSON.parse(savedPlaylists));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("platlists", JSON.stringify(playlists));
    }, [playlists]);

    const handleOnClick = () => {

        setBeingWorked(!beingWorked);
    };  

    const addPlaylist = (newPlaylist) => {
        if (playlistToEdit) {
            setPlaylists(playlists.map(playlist => 
                playlist.name === playlistToEdit.name ? newPlaylist : playlist
            ));
        } else {
            setPlaylists([...playlists, newPlaylist]);
        }
        setBeingWorked(false);
        setCurrentPlaylist(newPlaylist);
    };

    const handlePlaylistClicked = (playlist) => {
        setCurrentPlaylist(playlist);
    };

    const handleBack = () => {
        setCurrentPlaylist(null);
    };

    const handleEdit = () => {
        setPlaylistToEdit(currentPlaylist);
        setBeingWorked(true);
    };

    const handleDelete = () => {
        setPlaylists(playlists.filter(playlist => playlist.name !== currentPlaylist.name));
        setCurrentPlaylist(null);
    };
    
    if (beingWorked){
        return <MakeOrEdit onSubmit={addPlaylist} playlistToEdit={playlistToEdit} />;
    }; 

    if (currentPlaylist){
        return (
            <div className="playlist-edit">
                <div className="top-options">
                    <button onClick={handleBack}>Back</button>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                <div className="playlist-info">
                    <div className="big-picture">
                        {currentPlaylist.tracks[0] && (
                            <img
                                src={currentPlaylist.tracks[0].album.images[0]?.url}
                                alt={`${currentPlaylist.tracks[0].name} album cover`}
                                id="album"
                            />
                        )}
                    </div>
                    <h2>{currentPlaylist.name}</h2>
                    <button>Play</button>
                    <button>Shuffle</button>
                </div>
                <div className="playlist-songs">
                    {currentPlaylist.tracks.map((track, index) => (
                        <div key={index} className="track-item">
                            <img 
                                id="album" 
                                src={track.album.images[0]?.url} 
                                alt={`${track.name} album cover`} 
                            />
                            <h3>{track.name}</h3>
                            <h4>{track.artists[0].name}</h4>
                        </div>
                    ))}
                </div>
            </div>
        );
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
                            onClick={() => handlePlaylistClicked(playlist)}
                        >
                            {
                                playlist.tracks[0] && (
                                <img
                                    src={playlist.tracks[0].album.images[0]?.url}
                                    alt={`${playlist.tracks[0].name} album cover`}
                                    id="album"
                                />
                            )}
                            <h2>{playlist.name}</h2>
                            <h1>^</h1>
                            <h3>{`${playlist.tracks.length} Song`}</h3>
                        </div>
                    )))
                }
            </div>
        </div>
    );
};

export default MainMenu;