
"use strict";

(function () {
  // Your code here
  console.log("started...");

  function showOnePokemon(pokemon) {

    let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    // the following will fetch the details of one pokemon
    fetch(pokemonUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let pokemon = data;
        console.log(pokemon.name);
        console.log(pokemon.sprites.front_default);
        let pokemonName = document.getElementById('pokemon-name');
        pokemonName.innerHTML = pokemon.name;
        let pokemonImage = document.getElementById('pokemon-image');
        pokemonImage.title = JSON.stringify(pokemon.abilities);
        pokemonImage.src = pokemon.sprites.front_default;
      })
      .catch(function (err) {
        console.log(err);
      });


  }

  // The following code will fetch the list of pokemon from the pokemon api at the url - https://pokeapi.co/api/v2/pokemon?limit=10000

  fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      let pokemon = data.results;
      // console.log(pokemon);
      // console.log(pokemon[0].name);
      // console.log(pokemon[0].url);
      let pokemonList = document.getElementById('pokemon-list');
      pokemon.forEach(function (p) {
        // console.log(p.name);
        let listItem = document.createElement('li');
        listItem.addEventListener('click', function () {
          showOnePokemon(p.name);
        });
        listItem.innerHTML = p.name;
        pokemonList.appendChild(listItem);
      });
    })
    .catch(function (err) {
      console.log(err);
    });


})();
