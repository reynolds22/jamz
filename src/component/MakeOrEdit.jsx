import React, { useState, useEffect } from "react";
import "./MakeEditStyle.css";

function MakeOrEdit({ onSubmit, playlistToEdit }) {
    const [token, setToken] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [tracks, setTracks] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("");

    // First useEffect: Fetch Spotify API token and set playlist to edit
    useEffect(() => {
        async function GetAPI() {
            const clientId = "6bbfda15553946d29326923d4beb6817";
            const clientSecret = "88b9f1d47ec24fc7bd3be7d80f2f076f";
            const encodedData = btoa(`${clientId}:${clientSecret}`);

            try {
                const response = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${encodedData}`
                    },
                    body: 'grant_type=client_credentials'
                });

                const data = await response.json();
                setToken(data.access_token);
            } catch (e) {
                console.error('Error fetching the token:', e);
            }
        }

        GetAPI();

        // Set playlist to edit
        if (playlistToEdit) {
            setPlaylist(Array.isArray(playlistToEdit.tracks) ? playlistToEdit.tracks : []);
            setPlaylistName(playlistToEdit.name || "");
        }
    }, [playlistToEdit]);

    // Handle search
    const handleSearch = async () => {
        if (!token || !searchTerm) return;

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            setTracks(data.tracks.items);
        } catch (e) {
            console.error('Error searching tracks:', e);
        }
    };

    // Handle key down
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // Handle click on track
    const handleClick = (track) => {
        setPlaylist((prevPlaylist) => {
            const updatedPlaylist = [...prevPlaylist, track];
            return updatedPlaylist;
        });
    };

    // Handle remove track
    const handleRemove = (track) => {
        setPlaylist((prevPlaylist) => {
            const updatedPlaylist = prevPlaylist.filter((song) => song.id !== track.id);
            return updatedPlaylist;
        });
    };

    // Handle submit
    const handleSubmit = () => {
        if (playlistName && playlist.length > 0) {
            const newPlaylist = { name: playlistName, tracks: playlist };
            onSubmit(newPlaylist);
        }
    };

    return (
        <div className="ME-container">
            <div className="search-bar">
                <input
                    placeholder="Search song/artist"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="edit-container">
                <div className="search-results">
                    <h2>Results</h2>
                    {
                        tracks.map(track => (
                            <div className="r-card" key={track.id}>
                                <img
                                    id="album"
                                    src={track.album.images[0]?.url}
                                    alt={`${track.name} album cover`}
                                />
                                <div className="name/artist">
                                    <h3>{track.name}</h3>
                                    <h4>{track.artists[0].name}</h4>
                                </div>
                                <h5 onClick={() => handleClick(track)}>+</h5>
                            </div>
                        ))
                    }
                </div>
                <div className="edit-and-make">
                    <input
                        className="playlist-name"
                        placeholder="Playlist Name"
                        value={playlistName}
                        onChange={(letter) => setPlaylistName(letter.target.value)}
                    />
                    {
                        playlist.map((track, index) => (
                            <div className="r-card" key={index}>
                                <img
                                    id="album"
                                    src={track.album.images[0]?.url}
                                    alt={`${track.name} album cover`}
                                />
                                <div className="name/artist">
                                    <h3>{track.name}</h3>
                                    <h4>{track.artists[0].name}</h4>
                                </div>
                                <h5 onClick={() => handleRemove(track)}>-</h5>
                            </div>
                        ))
                    }
                    <button
                        onClick={handleSubmit}
                        className="submit-playlit"
                    >Submit Playlist</button>
                </div>
            </div>
        </div>
    );
}

export default MakeOrEdit;
