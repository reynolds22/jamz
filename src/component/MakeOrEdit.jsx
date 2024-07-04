import React from "react";

function MakeOrEdit(){
    return (
        <div className="M&E-container">
            <div className="search-bar">
                <input/>
                <button>Search</button>
            </div>
            <div className="edit-container">
                <div className="search-results">
                    <h2>Results</h2>
                    <h4>song +</h4>
                    <h4>song +</h4>
                    <h4>song +</h4>
                    <h4>song +</h4>
                    <h4>song +</h4>
                </div>
                <div className="edit-and-make">
                    <input/>
                    <p>added song -</p>
                    <p>added song -</p>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default MakeOrEdit;
