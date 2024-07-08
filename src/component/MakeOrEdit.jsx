import React, {useState, useEffect} from "react";

function MakeOrEdit({onSubmit, playlistToEdit}){

    const [token, setToken] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [tracks, setTracks] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
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

        if (playlistToEdit) {
            setPlaylist(Array.isArray(playlistToEdit.tracks) ? playlistToEdit.tracks : []);
            setPlaylistName(playlistToEdit.name || "");
        }
    }, [playlistToEdit]);

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

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClick = (track) => {
        setPlaylist((prevPlaylist) => {
            const updatedPlaylist = [...prevPlaylist, track];
            console.log('Updated playlist after adding:', updatedPlaylist);
            return updatedPlaylist;
        });
    };

    const handleRemove = (track) => {
        setPlaylist((prevPlaylist) => {
            const updatedPlaylist = prevPlaylist.filter((song) => song.id !== track.id);
            console.log('Updated playlist after removing:', updatedPlaylist);
            return updatedPlaylist;
        });
    };

    const handleSubmit = () => {
        if (playlistName && playlist.length > 0) {
            const newPlaylist = { name: playlistName, tracks: playlist };
            onSubmit(newPlaylist);
        }
    };

    console.log('Rendering MakeOrEdit with playlist:', playlist);


    return (
        <div className="M&E-container">
            <div className="search-bar">
                <input 
                    placeholder="Search song"
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="edit-container">
                <div className="search-results">
                    <h2>Results</h2>
                    {
                        tracks.map(track => (
                            <div key={track.id}>
                                <img 
                                    id="album" 
                                    src={track.album.images[0]?.url} alt={`${track.name} album cover`} 
                                />
                                <h3>{track.name}</h3>
                                <h5 onClick={() => handleClick(track)}>+</h5>
                                <h4>{track.artists[0].name}</h4>
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
                            <div key={index}>
                                <img 
                                    id="album" 
                                    src={track.album.images[0]?.url} alt={`${track.name} album cover`} 
                                />
                                <h3>{track.name}</h3>
                                <h5 onClick={() => handleRemove(track)}>-</h5>
                                <h4>{track.artists[0].name}</h4>
                            </div>
                        ))
                    }
                    <button 
                        onClick={handleSubmit} 
                        className="submit-playlit"
                    >Submit</button>
                </div>
            </div>
        </div>
    );
};

export default MakeOrEdit;