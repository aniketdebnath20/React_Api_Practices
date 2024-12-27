import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'

const App = () => {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const pokemonfetchdata = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      // console.log(data);

      const pokemonAcualData = data.results.map(async (curElm) => {
        const res = await fetch(curElm.url);
        const data = await res.json();
        return data
      })

      // console.log(pokemonAcualData);

      const detailedResponses = await Promise.all(pokemonAcualData);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);


    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }

  }


  useEffect(() => {
    pokemonfetchdata();
  }, [])


  const SearchPokemon = pokemon.filter((curData) => 
    curData.name.toLowerCase().includes(search.toLowerCase())
  )


  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }


  return (
    <>

      <header>
        <h1> Lets Catch Pokémon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='container grid-three-cols'>
        {SearchPokemon.map((curPokemon) => {
          return (
            <PokemonCard key={curPokemon.id} pokemon={curPokemon} />
          )
        })}
      </div>
    </>
  )
}

export default App