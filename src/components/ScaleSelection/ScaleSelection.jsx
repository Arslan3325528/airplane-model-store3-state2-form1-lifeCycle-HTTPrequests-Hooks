import React, { Component } from "react";

// import aircrafts from '@/json/aircrafts.json'; //! передаємо, як props

import css from "./ScaleSelection.module.css";


//? Підняття стану та передача пропсів батьківському компоненту
//! Компонент-клас
export class ScaleSelection extends Component {
  state = {
    // modelScale: "all", //! масштаб моделі
    modelScale: this.props.modelScale, //! масштаб моделі
    // modelsSelectedScale: [] //! масив моделей обраного масштабу
  };

  //! 🔄 Для пепререндеру
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modelScale !== this.props.modelScale) {
      this.setState({
        modelScale:
          this.props.modelScale
      });
    };
  };

  handleChangeModelScale = (event) => {
    // console.log("Зміна масштабу моделі");
    // console.log("event.currentTarget:", event.currentTarget);
    // console.log("event.currentTarget.name:", event.currentTarget.name);
    // console.log("event.currentTarget.value:", event.currentTarget.value);

    //! Деструктуризуємо:
    const { name, value } = event.currentTarget;

    //! Деструктуризуємо props:
    const {
      aircrafts,
      onGetModelsSelectedScale
    } = this.props;

    //! Знаходимо масив моделей обраного масштабу
    const modelsSelectedScale =
      value === "all"
        ? aircrafts
        : aircrafts.filter(aircraft => aircraft.model.scale.some(item => item === Number(value)));

    //! Зберігаємо значення інпутів в state, використовуючи властивості об'єкта, що обчислюються
    this.setState({
      [name]: value,
      // modelsSelectedScale,
    });

    onGetModelsSelectedScale(modelsSelectedScale, value); //! підняття стану + передача modelsSelectedScale та value в App.jsx
  }

  render() {
    const {
      modelScale, //! масштаб моделі
      // modelsSelectedScale //! масив моделей обраного масштабу
    } = this.state;

    const {
      isLocked, //! тригер: "якщо активна кнопка «Кошик»"
      aircrafts //! початково сортований вхідний масив УСІХ моделей
    } = this.props;

    
    //todo: Set – це спеціальна колекція JavaScript, яка зберігає унікальні значення
    // const numbers = [1, 2, 2, 3, 3, 3];
    // const uniqueNumbers = new Set(numbers);
    // console.log("🔺🔺🔺uniqueNumbers:", uniqueNumbers); //todo: Set(3) {1, 2, 3}
    //! Формуємо диапазон(масив) значень для select з допоогою Set
    const brandSelectionOption =
      [
        // "all",
        ...new Set(
        aircrafts.flatMap(aircraft => aircraft.model.scale)
        ),
        32
      ].sort((a, b) => b - a);

    console.log("******************************************************");
    console.log("📕Масштаб моделі:", modelScale);
    // console.log("📕Масив моделей обраного масштабу:", modelsSelectedScale);
    console.log("📕Диапазон(масив) значень для select:", brandSelectionOption);
    console.log("******************************************************");

    return (
      <div className={css.scaleSelectionBox}>
        {!isLocked && 
          <>
            <h3 className={css.scaleSelectionTitle}>Оберіть масштаб моделі:</h3>
            <label>
              {/* масштаб моделі */}
              <select
                className={css.scaleSelectionSelect}
                name="modelScale"
                // value={this.props.modelScale ? modelScale : "all"}
                value={modelScale}
                onChange={this.handleChangeModelScale}
                disabled={isLocked} //! блокування, якщо активна кнопка «Кошик»
              >
                <option className={css.scaleSelectionOption} value="all">Всі</option>
                {/* <option className={css.scaleSelectionOption} value="200">1:200</option>
                <option className={css.scaleSelectionOption} value="144">1:144</option>
                <option className={css.scaleSelectionOption} value="100">1:100</option>
                <option className={css.scaleSelectionOption} value="72">1:72</option>
                <option className={css.scaleSelectionOption} value="60">1:60</option>
                <option className={css.scaleSelectionOption} value="48">1:48</option>
                <option className={css.scaleSelectionOption} value="32">1:32</option> */}
              {/* //! Формуємо динамічну розмітку значень select */}
              {brandSelectionOption.map((brand) => (
                <option className={css.scaleSelectionOption} key={brand} value={String(brand)}>{brand}</option>
              ))}
              </select>
            </label>
          </>
        }
      </div>
    )
  }
};
