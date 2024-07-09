import React, {useState, useEffect} from "react";
import MakeOrEdit from "./MakeOrEdit";

function MainMenu(){
// states
    const [beingWorked, setBeingWorked] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [playlistToEdit, setPlaylistToEdit] = useState(null);


// Load playlists from local storage on initial render
    useEffect(() => {
        const savedPlaylists = localStorage.getItem("playlists");
        if(savedPlaylists){
            setPlaylists(JSON.parse(savedPlaylists));
        }
    }, []);


// Save playlists to local storage whenever playlists state changes
    useEffect(() => {
        localStorage.setItem("platlists", JSON.stringify(playlists));
    }, [playlists]);


// togle to a playlist being edited or made.
    const handleOnClick = () => {
        setBeingWorked(true);
        setPlaylistToEdit(null);
    };  

// Adds the new playlist to current playlist if any along with if its being edited.
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

// when a playlist is clicked this sets the playlist that was selected.
    const handlePlaylistClicked = (playlist) => {
        setCurrentPlaylist(playlist);
    };

// when in the veiw playlist screen this will send you back the the main menu return
    const handleBack = () => {
        setCurrentPlaylist(null);
    };

// togles the current playlist to be edited in the MakeOrEdit component.
    const handleEdit = () => {
        setPlaylistToEdit(currentPlaylist);
        setBeingWorked(true);
    };

// When the delete button is hit it filters through the playlist and filters out the current one.
    const handleDelete = () => {
        setPlaylists(playlists.filter(playlist => playlist.name !== currentPlaylist.name));
        setCurrentPlaylist(null);
    };
    
// if a playlist is being made or edited it sends you to the Make OrEdit component.
    if (beingWorked){
        return <MakeOrEdit onSubmit={addPlaylist} playlistToEdit={playlistToEdit} />;
    }; 

// if you are just veiwing the playlist for any reason it will display the playlist to be viewed. this certinly should have been another component looking back just to make thigs look more simple but it still worked out.
    if (currentPlaylist){
        return (
            <div className="playlist-edit">
                <div className="top-options">
                    <button onClick={handleBack}>Back to main menu</button>
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

// Actual return for the MainMenu component and pulls everything together. 
    return (
        <div className="main-container">
            <button onClick={handleOnClick}>
                <div className="plus">+</div>
                <div className="words">Create A Playlist...</div>
            </button>
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
                            <div>
                                <h3>{playlist.name}</h3>
                                <h4>{`${playlist.tracks.length} Song`}</h4>
                            </div>
                            <h1>^</h1>
                        </div>
                    )))
                }
            </div>
        </div>
    );
};

export default MainMenu;