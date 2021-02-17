import React from "react";
//Agregamos nuestro modulo de css
import style from "./recipe.module.css"

const Recipe = (props) => {

    return(
        <div className={style.recipe}>
            <h1 >{props.title}</h1>
            <ul>
                {props.ingredients.map((ingredient) =>(

                        <li>{ingredient.text}</li>
                    )
                )}

            </ul>
            <p>Calories: {props.calories.toFixed(2)}</p>
            <img className={style.image} src={props.image} alt="food"/>
        </div>
    )
};

export default Recipe