
"use strict";

(function () {

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  let selectedPokemon = getParameterByName('pokemon');

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
        let pokemonData = document.getElementById('pokemon-data');
        pokemonData.style.display = 'block';
        pokemonData.innerHTML = JSON.stringify(pokemon, null, 2);
        console.log(pokemon.name);
        console.log(pokemon.sprites.front_default);
        let pokemonName = document.getElementById('pokemon-name');
        pokemonName.innerHTML = pokemon.name;
        let pokemonImage = document.getElementById('pokemon-image');
        pokemonImage.style.display = 'none';
        pokemonImage.addEventListener('load', function () {
          pokemonImage.style.display = 'block';
        });
        pokemonImage.title = JSON.stringify(pokemon.abilities);
        pokemonImage.src = pokemon.sprites.front_default;
        let pokemonTypes = document.getElementById('pokemon-types');
        pokemonTypes.innerHTML = '';
        pokemon.types.forEach(function (t) {
          let typeItem = document.createElement('li');
          typeItem.innerHTML = t.type.name;
          pokemonTypes.appendChild(typeItem);
        });
      })
      .catch(function (err) {
        console.log(err);
        document.getElementById('pokemon-name').innerHTML = selectedPokemon;
        document.getElementById('pokemon-image').style.display = 'none';
        document.getElementById('pokemon-types').innerHTML = '';
        document.getElementById('pokemon-data').innerHTML = 'Pokemon not found';
      });
  }

  // The following code will fetch the list of pokemon from the pokemon api at the url - https://pokeapi.co/api/v2/pokemon?limit=10000

  fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let pokemon = data.results;
      pokemon.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        } else {
          return 1;
        }
      });
      let pokemonList = document.getElementById('pokemon-list');
      pokemon.forEach(function (p) {
        let optionItem = document.createElement('option');
        optionItem.innerHTML = p.name;
        optionItem.value = p.name;
        if (selectedPokemon === p.name) {
          optionItem.selected = true;
        }
        pokemonList.appendChild(optionItem);
      });
      pokemonList.addEventListener('change', function () {
        let localSelectedPokemon = pokemonList.value;
        window.location = `?pokemon=${localSelectedPokemon}`;
      });
    })
    .catch(function (err) {
      console.log(err);
    });

  if (selectedPokemon) {
    console.log(selectedPokemon);
    showOnePokemon(selectedPokemon);
  } else {
    window.location = "?pokemon=pikachu";
  }

})();
