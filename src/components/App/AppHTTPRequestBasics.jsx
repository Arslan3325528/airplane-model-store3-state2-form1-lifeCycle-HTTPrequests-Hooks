// console.log(
//   "%c 6.1.Основи HTTP-запитів у React",
//   "color: white; background-color: #D33F49",
// );

// https://pokeapi.co/
// https://pokeapi.co/api/v2/pokemon

import React, { Component } from "react";
import css from "./AppHTTPRequestBasics.module.css";


export class AppHTTPRequestBasics extends Component {
  state = {
    pokemon: null, //! об'єкт з даними про Покемона
    loading: false //! індикатор завантаження (лоадер)
  };

  componentDidMount() {
    this.setState({ loading: true }); //! індикатор завантаження (лоадер) = true

    setTimeout(() => { //! імітуємо час завантаження даних
      fetch("https://pokeapi.co/api/v2/pokemon/ditto")
        .then(res => res.json())
        // .then(pokemon => console.log("pokemon:", pokemon))
        .then(pokemon => this.setState({ pokemon }))
        .finally(() => this.setState({ loading: false })); //! індикатор завантаження (лоадер) = false
    }, 2000);
  };

  render() {
    const {
      pokemon, //! {🐷} об'єкт з даними про Покемона
      loading  //! ⏳ індикатор завантаження (лоадер)
    } = this.state;

    console.log("----------------------------------------------");
    console.log("✅{🐷} Покемон-об'єкт:", pokemon);

    // console.log("✅🐷 Покемон-ім'я:", pokemon.name); //! ❌ - так буде помилка при першому render
    console.log("✅🐷 Покемон-ім'я(1):", pokemon && pokemon.name); //!-(1) ✅
    //! ✅ або більш сучасний варіант:
    console.log("✅🐷 Покемон-ім'я(2):", pokemon?.name); //!-(2) ✅
    
    console.log("✅⏳ Індикатор завантаження (лоадер):", loading);
    console.log("----------------------------------------------");

    return (
      <div className={css.mainContainer} >
        {loading && <h1 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h1>}
        {pokemon && (
          <div className={css.pokemonContainer}>
            Тут буде покемон після фетчу і коли він запишеться в state:
            <p><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
          </div>
        )}
      </div>
    );
  };
};
