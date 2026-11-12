// console.log(
//   "%c 4.4.3.Складні форми + \n 4.4.4.Генерація Id елементів форми + \n 4.4.5.Радіокнопки + \n 4.4.6.Чекбокси  + \n 4.4.7.Селект ",
//   "color: white; background-color: #D33F49",
// );

import React, { Component } from "react";
import { ComplexForms } from '@/components/ComplexForms/ComplexForms.jsx';
import { ComplexFormsGenerationID } from '@/components/ComplexFormsGenerationID/ComplexFormsGenerationID.jsx';
import { ComplexFormsGenerationIDRadioButton } from '@/components/ComplexFormsGenerationIDRadioButton/ComplexFormsGenerationIDRadioButton.jsx';
import { ComplexFormsGenerationIDRadioButtonCheckboxesSelect } from '@/components/ComplexFormsGenerationIDRadioButtonCheckboxesSelect/ComplexFormsGenerationIDRadioButtonCheckboxesSelect.jsx';
import { Modal } from '@/components/Modal/Modal.jsx';
import { ColorBoxLifeCycle } from '@/components/ColorBoxLifeCycle/ColorBoxLifeCycle.jsx';
import { ClockClass } from '@/components/Clock/ClockClass.jsx';
// import css from "./AppComplexForms.module.css";

const colorBoxOptions = [
  { label: 'red', color: '#ff0000' },
  { label: 'orange', color: '#ffa500' },
  { label: 'yellow', color: '#ffff00' },
  { label: 'green', color: '#008000' },
  { label: 'lightblue', color: '#add8e6' },
  { label: 'blue', color: '#3131ff' },
  { label: 'violet', color: '#ee82ee' },
];


export class AppComplexForms extends Component {
  state = {
    formInputLogin: "",
    formInputPassword: "",
    formRadioButtonExperience: "",
    formSelectAge: "",
    showModal: false, //! контроль відкриття/закриття модального вікна
  };

  submitForm = (data) => {
    console.log("✅Дані форми:", data);
    this.setState({
      formInputLogin: data.inputLogin,
      formInputPassword: data.inputPassword,
      formRadioButtonExperience: data.experience,
      formSelectAge: data.age
    });
  };

  //! Відкриття/закриття модального вікна
  // toggleModal = () => { //? без деструктурізації
  //   this.setState(prevState => ({
  //     showModal: !prevState.showModal
  //   }));
  // };
  toggleModal = () => { //? з деструктурізацією
    console.log("🌀toggleModal");
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
  };

  render() {
    const {
      formInputLogin,
      formInputPassword,
      formRadioButtonExperience,
      formSelectAge,
      showModal, //! контроль відкриття/закриття модального вікна
    } = this.state;

    console.log("----------------------------------------------");
    console.log("✅Значення в App formInputLogin:", formInputLogin);
    console.log("✅Значення в App formInputPassword:", formInputPassword);
    console.log("✅Значення в App formRadioButtonExperience:", formRadioButtonExperience);
    console.log("✅Значення в App formSelectAge:", formSelectAge);
    console.log("❇️Контроль відкриття/закриття модального вікна:", showModal);
    console.log("______________________________________________");

    return (
      <>
        {/*//! 4.4.3.Складні форми */}
        {/* <ComplexForms
          // onSubmit={values => console.log(values)}
          onSubmit={this.submitForm}
        /> */}
        {/*//! + 4.4.4.Генерація Id елементів форми */}
        {/* <ComplexFormsGenerationID onSubmit={this.submitForm} /> */}
        {/* <ComplexFormsGenerationID onSubmit={this.submitForm} /> */}
        {/*//! + 4.4.5.Радіокнопки */}
        {/* <ComplexFormsGenerationIDRadioButton onSubmit={this.submitForm} /> */}
        {/*//! + 4.4.6.Чекбокси + 4.4.7.Селект */}
        {/* <ComplexFormsGenerationIDRadioButtonCheckboxesSelect onSubmit={this.submitForm} /> */}
        {/*//! Модальне вікно */}
        {/* <Modal /> */}
        {/* {showModal && <Modal />} */}
        <button
          type="button"
          onClick={this.toggleModal}
        >
          Відкрити модалку
        </button>
        {showModal &&
          // <Modal>
          <Modal onClose={this.toggleModal} >
            <h1>Це контент модалки як children</h1>
            <p>Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Omnis consequatur
              commodi ad totam doloremque nulla
              accusantium maiores eum deserunt
              ullam maxime architecto, iure voluptatum,
              ipsum laudantium recusandae reprehenderit
              corrupti. Molestias?
            </p>
            <button
              type="button"
              onClick={this.toggleModal}
            >
              Закрити модалку
            </button>
          </Modal>}
        {/*//! Color Boxes */}
        <ColorBoxLifeCycle colorBoxes={colorBoxOptions} />
        {/*//! Таймер */}
        {/* <button
          type="button"
          onClick={this.toggleModal}
        >
          Старт/Стоп таймер
        </button> */}
        {/* {showModal &&<ClockClass />} */}
      </>
    );
  }
};
