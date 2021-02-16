import React from "react";

const Recipe = (props) => {

    return(
        <div className="App">
            <h1>{props.title}</h1>
            <p>{props.calories.toFixed(2)}</p>
            <img src={props.image} alt="image"/>
        </div>
    )
};

export default Recipe