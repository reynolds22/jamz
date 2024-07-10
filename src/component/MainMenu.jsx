import React, { useState, useEffect } from "react";
import MakeOrEdit from "./MakeOrEdit";

function MainMenu() {
  const [beingWorked, setBeingWorked] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [playlistToEdit, setPlaylistToEdit] = useState(null);

  // Load playlists from local storage on initial render
  useEffect(() => {
    const savedPlaylists = localStorage.getItem("playlists");
    if (savedPlaylists) {
      setPlaylists(JSON.parse(savedPlaylists));
    }
  }, []);

  // Save playlists to local storage whenever playlists state changes
  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  const handleOnClick = () => {
    setBeingWorked(true);
    setPlaylistToEdit(null);
  };

  const addPlaylist = (newPlaylist) => {
    if (playlistToEdit) {
      setPlaylists(playlists.map((playlist) =>
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

  if (beingWorked) {
    return <MakeOrEdit onSubmit={addPlaylist} playlistToEdit={playlistToEdit} />;
  }

  if (currentPlaylist) {
    return (
      <div className="playlist-edit">
        <div className="top-options">
          <button className="button-one" onClick={handleBack}>Main Menu</button>
          <button className="button-two" onClick={handleEdit}>Edit</button>
          <button className="button-three" onClick={handleDelete}>Delete</button>
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
          <div className="buttons">
            <button className="b-one">&#9654; Play</button>
            <button className="b-two">&#8646; Shuffle</button>
          </div>
          <h5 className="whats-working">This part of the app/site does not have working buttons for play and shuffle these are for looks. Along with any of the songs are not able to be listened to.</h5>
        </div>
        <div className="playlist-songs">
          {currentPlaylist.tracks.map((track, index) => (
            <div key={index} className="track-item">
              <img
                id="album"
                src={track.album.images[0]?.url}
                alt={`${track.name} album cover`}
              />
              <div>
                <h3>{track.name}</h3>
                <h4>{track.artists[0].name}</h4>
              </div>
              <h2>...</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 id="title-phrase">Welcome! Here are your playlists</h2>
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
                    <h4>{`${playlist.tracks.length} Song${playlist.tracks.length > 1 ? 's' : ''}`}</h4>
                  </div>
                  <h1>^</h1>
                </div>
              )))
          }
        </div>
      </div>
      <p>This is an app/site called Jamz, a music playlist making app that saves playlists. You are able to name, edit, and add/remove songs.</p>
    </div>
  );
}

export default MainMenu;
