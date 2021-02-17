//useEffect y useState son react hooks
import React, {useEffect, useState} from "react";
import './App.css';
import Recipe from "./Recipe";

//otra forma de crear componentes mediante arrow keys, en cualquier caso se pueden utilizar cualquiera de las 2
const App = () =>{

  const APP_ID = "bdb2ac17";
  const APPLICATION_KEY = "01352d3ffa23146c41b4051b5912f61f";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("chicken");



 // const [counter, setCounter] = useState(0);

  //El useEffect funciona por defecto de forma de que cada vez que nuestra pagina se renderiza el useEffect se
    // ejecutara tambien osea useEffect se ejecutara cada vez que haya un cambio en la pagina, en pocas palabras
    // cada vez que el valor de una variable de estado cambie y tambien si damos refresh a la pagina
    //si solo quiero que se active una sola vez cuando la pagina se renderize la primera vez (cuando la pagina se recargue)
    // o cada vez que se le de a refresh, para esto le mandamos como segundo argumento un arreglo vacio
    //Como el useEffect normalmente se utiliza para trabajar con API por tal razon solo queremos que se ejecute una sola vez

    useEffect( () => {
        console.log("Effect has been run");

        getRecipes();

        //lo correcto es que al arreglo vacio le pasemos un estado para que cada vez que este estado cambie el
        // useEffect se ejecute, en este caso se ejecutara cada vez que  se presione el boton search lo cual actualizara
        //El searchQuery
        // para hacer busqueda en tiempor real, tambien se podria cada vez que search cambie, pero debido al limite del
        //API esto no es una buena idea
    }, [searchQuery]);

    //De esta forma hago una funcion que haga llamadas asincronas el async y await se utiliza normalmente con los promises
    //para que estas sean mas faciles de trabajar
    const getRecipes = async () =>{

        //Se debe de poner await a la hora de recibir el request
        const response = await fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APPLICATION_KEY}`);

        //recibo la data y la convierto a json antes de guardarla
        const data = await response.json();

        //Accedo al elemento hits de estos datos que aqui estan las recetas
        setRecipes(data.hits);
    };

    const updateSearch = event =>{

        // el target.value es el valor que el usuario digito y siempre que digite algo lo agregare al search
        setSearch(event.target.value);
    };

    const getSearch = event =>{

        //Con esto evito el refresh de la pagina a la hora de hacer submit
        event.preventDefault();

        setSearchQuery(search);
        //para que se borre el texto luego de hacer la busqueda
        setSearch("");
    };

  return(
      <div className="App">

        {/*  Se ejecutara el getSearch cuando se presione el button de buscar ya que el button es de type submit*/}
        <form onSubmit={getSearch} className="search-form">
          {/*  Al poner onchange esto indica que cada vez que agregue una letra la funcion definida en onchage se ejectutara*/}
          <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit">
              Search
          </button>
        </form>
          {/*<h1 onClick={()=>{setCounter(counter+1)}}>{counter}</h1>*/}

          {/*Debo de agregar key a la hora de utilizar map e iterar elementos para evitar error de each unique child
          el key debe ser un identificador unico*/}
          {/*Se pueden poner los parentesis o no ponerse en el map*/}
          <div className="recipes">
              {recipes.map((recipe)=>(
                  <Recipe

                      key={recipe.recipe.label}
                      title={recipe.recipe.label}
                      calories={recipe.recipe.calories}
                      image={recipe.recipe.image}
                      ingredients={recipe.recipe.ingredients}
                  />
              ))}
          </div>
      </div>
  )
}

export default App;
