const http = require('http');
const fs = require('fs');
const axios = require('axios')

let pokemones = [];
let pokeArreglo = [];

async function pokemonesGet() {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
    return data.results
}

async function getData(name) {
    const { data } = await
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return data
}

pokemonesGet().then((results) => {
    results.forEach((p) => {
        let pokemonName = p.name
        pokemones.push(getData(pokemonName))
    })

    Promise.all(pokemones).then((data) => {
        data.forEach((p) => {
            pokeArreglo.push({nombre: p.name, img: p.sprites.front_default});
        });
    });
});

