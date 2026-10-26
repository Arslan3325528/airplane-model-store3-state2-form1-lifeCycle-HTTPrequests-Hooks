import React, { Component } from "react";
import debounce from "lodash.debounce";
// import axios from "axios";

import { ModalRegistrationIdentification } from '@/components/ModalRegistrationIdentification/ModalRegistrationIdentification.jsx';
import { RegistrationIdentification } from '@/components/RegistrationIdentification/RegistrationIdentification.jsx';
import { FormChoiceRegistrationOrIdentification } from '@/components/FormChoiceRegistrationOrIdentification/FormChoiceRegistrationOrIdentification.jsx';
import { FormRegistration } from '@/components/FormRegistration/FormRegistration.jsx';
import { FormIdentification} from '@/components/FormIdentification/FormIdentification.jsx';
import { ScaleSelection } from '@/components/ScaleSelection/ScaleSelection.jsx';
import { Filter } from '@/components/Filter/Filter.jsx';
import { Sorter } from '@/components/Sorter/Sorter.jsx';
import { Section } from '@/components/Section/Section.jsx';
import { PlanesList } from '@/components/PlanesList/PlanesList.jsx';

//!  this.state.aircrafts  + this.state.users --> запити з json-server + методи-обгортки для запитів
import {
  fetchAircrafts,
  fetchUsersAircrafts,
  updateUserSelectedModels,
  updateUsers,
  loadInitialData,
  updateUserInDatabase
} from "@/services";



//! Компонент-клас
export class App extends Component {
  state = {
    aircrafts: [], //? початковий масив aircraftsArr з json-server
    aircraftsArr: [], //? запис початкового масиву aircrafts в aircraftsArr
    aircraftsTitle: "Магазин моделей літальних апаратів",
    activeButton: "allButton", //! візуалізація активної кнопки
    indicesSelectedModels: [], //! масив індексів обраних моделей
    selectedModels: [], //! масив обраних моделей
    isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
    inputSearchValue: "", //! значення inputSearch
    aircraftsArrAfterFiltration: [],  //? дубльоване значення aircraftsArr після фільтрації
    radioButtonValue: "brief", //! значення параметра для пошуку/фільтрації радіо-кнопки
    inputSearchPlaceholder: "Введіть назву ЛА", //! значення placeholder для inputSearch
    inputSearchValueTrigger: false, //! тригер для коректної роботи інпуту після очищення
    modelsSelectedScale: [], //? масив моделей обраного масштабу
    modelScale: "all", //! початковий масштаб моделі в ScaleSelection
    showModal: true, //! контроль відкриття/закриття модального вікна
    users: [], //? масив з даними користувачів
    activeUser: null, //! 🗣 активний (авторизований) користувач
    activeUserId: JSON.parse(localStorage.getItem("activeUserId")) || null, //? #️⃣🗣 id Активного (авторизованого) користувача
    modalType: "",  //! 🧾 індикатор типу модального вікна
    isCartButtonDisabled: true,  //! 🔐 тригер блокування кнопки «Кошик»
    loader: false, //! ⏳ індикатор завантаження (лоадер)
    error: null, //! ❌ обробка помилок
  };

  //? ❗️ Для componentDidMount:
  
  //? Робимо два HTTP-запита на json-server: "http://localhost:3000/aircrafts" і "http://localhost:3000/usersAircrafts"
  //* todo: NEW (з розділенням логіки)
  


  componentDidMount = async () => {
    //! Завантаження початкових даних з json-server: aircrafts + users
    
    //* 1. Вмикаємо лоадер перед HTTP-запитами
    this.setState({ loader: true });

    //* 2. Отримуємо результат завантаження
    //? Вся логіка початкового завантаження знаходитьсяу окремому методі: loadInitialData
    //! Метод виконує HTTP-запити, робить затримку та повертає результат.
    //! State тут НЕ змінюємо.
    //? Робимо два HTTP-запита на json-server: "http://localhost:3000/aircrafts" і "http://localhost:3000/usersAircrafts"
    //? Імпортуємо loadInitialData з "@/services/aircraftsLoadData.js"
    const { aircrafts, users, error } = await loadInitialData(fetchAircrafts, fetchUsersAircrafts, 3000); 
    
    //* 3. Обробляємо результат завантаження
    //! 1. Якщо під час HTTP-запитів виникла помилка
    if (error) {
        this.setState({
          loader: false,
          error,
        });
        return;
    };

    //! 2. Визначаємо активного користувача за id з localStorage
    const activeUserId = this.state.activeUserId;
    const activeUser = users.find(user => user.id === activeUserId);
    console.log("componentDidMount_🗣 Активний користувач:", activeUser);

    //! 3. Якщо користувача з таким id більше не існує, видаляємо його id з localStorage
    if (!activeUser) localStorage.removeItem("activeUserId");
    
    //! 4. Формуємо масиви обраних моделей
    const indicesSelectedModels = activeUser?.indicesSelectedModels ?? [];
    const selectedModels = indicesSelectedModels
      .flatMap(id => aircrafts.filter(aircraft => aircraft.id === id))
      .sort((a, b) => a.name.brief.localeCompare(b.name.brief));

    //! 5. Оновлюємо state після отримання даних
    this.setState({
      //! Початкові масиви всіх моделей
      aircrafts,
      aircraftsArr: aircrafts,
      aircraftsArrAfterFiltration: aircrafts,
      modelsSelectedScale: aircrafts,
      
      //! Список користувачів із сервера
      users,
      
      //! Дані активного користувача
      activeUser: activeUser ?? null,
      activeUserId: activeUser ? activeUser.id : null,
      
      //! Обрані моделі користувача
      indicesSelectedModels,
      selectedModels,
      
      //! Стан інтерфейсу
      isCartButtonDisabled: !activeUser,
      showModal: activeUser ? false : this.state.showModal,
      
      //! Завантаження завершено
      loader: false,
      error: null,
    });
  };

  //? ❗️ Для componentDidUpdate:
  //? Логіка запиту на http://localhost:3000/usersAircrafts/id для зміни indicesSelectedModels знаходитьсяу окремому методі
  // updateUserInDatabase = async () => {
  //   const { activeUser, indicesSelectedModels } = this.state;
  //   try {
  //     await updateUserSelectedModels(activeUser?.id, indicesSelectedModels);
  //     console.log("✅indicesSelectedModels успішно оновлено!:", indicesSelectedModels);
  //   } catch (error) {
  //     console.error("❌ Помилка оновлення користувача:", error);
  //   };
  // }; //? імпортуємо updateUserInDatabase з "@/services/aircraftsLoadData.js"

  //! 3.localStorage - Оновлення(синхронізація) localStorage при кожній зміні indicesSelectedModels
  componentDidUpdate(prevProps, prevState) {
    //todo-1_OLD: indicesSelectedModels
    // if (localStorage.getItem("indicesSelectedModels") && prevState.indicesSelectedModels !== this.state.indicesSelectedModels) {
    //   console.log("✅✅✅ Перезаписуємо localStorage 'indicesSelectedModels_componentDidUpdate");
    //   localStorage.setItem("indicesSelectedModels", JSON.stringify(this.state.indicesSelectedModels));
    // };

    //todo-2_OLD: indicesSelectedModels
    // if (this.state.activeUser && prevState.indicesSelectedModels !== this.state.indicesSelectedModels) {
    //   // localStorage.setItem("indicesSelectedModels", JSON.stringify(this.state.indicesSelectedModels));
    //   // console.log("✅✅✅ Перезаписуємо localStorage 'indicesSelectedModels_componentDidUpdate");
    //   console.log("❌❌❌ НЕ Перезаписуємо localStorage 'indicesSelectedModels_componentDidUpdate");
    //   // localStorage.setItem("indicesSelectedModels", JSON.stringify(this.state.indicesSelectedModels));
    //   // this.setState({
    //   //   selectedModels: this.state.indicesSelectedModels.flatMap(id =>
    //   //     this.state.aircrafts.filter((el) => id === el.id))
    //   //     .sort((a, b) => a.name.brief.localeCompare(b.name.brief)), //! з сортуванням за полем "name.brief"
    //   //   activeUser: { ...this.state.activeUser, indicesSelectedModels: this.state.indicesSelectedModels },
    //   //   users: prevState.users.map((user, index) =>
    //   //     index === this.state.activeUserId
    //   //     ? { ...this.state.activeUser, indicesSelectedModels: this.state.indicesSelectedModels }
    //   //     : user)
    //   // });
    // };

    //? todo-3_NEW: indicesSelectedModels
    // if (this.state.activeUser && prevState.indicesSelectedModels !== this.state.indicesSelectedModels) {
    if (
      // this.state.activeUser
      // &&
      prevState.activeUser === this.state.activeUser
      &&
      prevState.indicesSelectedModels !== this.state.indicesSelectedModels
      &&
      (prevState.indicesSelectedModels.length || this.state.indicesSelectedModels.length)
    ) {
      console.log("❓ prevState.activeUser:", prevState.activeUser);
      console.log("❓ this.state.activeUser:", this.state.activeUser);
      console.log("❓ prevState.indicesSelectedModels:", prevState.indicesSelectedModels);
      console.log("❓ this.state.indicesSelectedModels:", this.state.indicesSelectedModels);
      console.log('✅🖍 componentDidUpdate_Перезаписуємо indicesSelectedModels в "http://localhost:3000/usersAircrafts/userId"');
      // this.updateUserInDatabase();
      updateUserInDatabase(this.state.activeUser, this.state.indicesSelectedModels, updateUserSelectedModels); //? імпортуємо updateUserInDatabase з "@/services/aircraftsLoadData.js"
    };
  
    //todo: users
    if (prevState.users !== this.state.users) {
      // console.log("✅🖍✅🖍 Перезаписуємо localStorage 'users_componentDidUpdate");
      // localStorage.setItem("users", JSON.stringify(this.state.users));
      console.log("❌🖍 componentDidUpdate_НЕ Перезаписуємо users в localStorage");
    };

  };


  allFiltration = () => {
    //! Прокрутити сторінку вгору
    this.windowSrollTo();
    console.log("Клік в кнопку ВСІ");
    console.log("allAircrafts:", this.state.aircrafts);
    this.setState({
      // aircraftsArr: this.state.aircrafts,
      aircraftsArr: this.state.modelsSelectedScale, //! з додаванням вибору моделей певного масштабу
      aircraftsTitle: "Магазин моделей літальних апаратів",
      activeButton: "allButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      // totalTypes: this.state.aircrafts.length, //! кількість типів ЛА (всіх літальних апаратів)
      // aircraftsArrAfterFiltration: this.state.aircrafts,  //! дубльоване значення aircraftsArr після фільтрації
      aircraftsArrAfterFiltration: this.state.modelsSelectedScale,  //! дубльоване значення aircraftsArr після фільтрації з додаванням вибору моделей певного масштабу
      inputSearchValue: "", //! значення inputSearch
    });
    // console.log("✈️✈️✈️totalModels:", this.getTotalModels()); //! тимчасово
  };


  planeFiltration = () => {
    //! Прокрутити сторінку вгору
    this.windowSrollTo();
    console.log("Клік в кнопку Літаки");
    // const onlyPlanes = this.state.aircrafts.filter(aircraft => aircraft.aircraftType === "plane");
    const onlyPlanes = this.state.modelsSelectedScale.filter(aircraft => aircraft.aircraftType === "plane"); //! з додаванням вибору моделей певного масштабу
    console.log("onlyPlanes:", onlyPlanes);
    this.setState({
      aircraftsArr: onlyPlanes,
      aircraftsTitle: "Магазин моделей літаків",
      activeButton: "planeButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      // totalTypes: onlyPlanes.length, //! кількість типів ЛА (літаків)
      aircraftsArrAfterFiltration: onlyPlanes,  //! дубльоване значення aircraftsArr після фільтрації
      inputSearchValue: "", //! значення inputSearch
    });
  };


  biplaneFiltration = () => {
    //! Прокрутити сторінку вгору
    this.windowSrollTo();
    console.log("Клік в кнопку Біплани");
    // const onlyBiplane = this.state.aircrafts.filter(aircraft => aircraft.aircraftType === "biplane");
    const onlyBiplane = this.state.modelsSelectedScale.filter(aircraft => aircraft.aircraftType === "biplane"); //! з додаванням вибору моделей певного масштабу
    console.log("onlyBiplane:", onlyBiplane);
    this.setState({
      aircraftsArr: onlyBiplane,
      aircraftsTitle: "Магазин моделей біпланів",
      activeButton: "biplaneButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      // totalTypes: onlyBiplane.length, //! кількість типів ЛА (біпланів)
      aircraftsArrAfterFiltration: onlyBiplane,  //! дубльоване значення aircraftsArr після фільтрації
      inputSearchValue: "", //! значення inputSearch
    });
  };


  helicopterFiltration = () => {
    //! Прокрутити сторінку вгору
    this.windowSrollTo();
    console.log("Клік в кнопку Вертольоти");
    // const onlyHelicopters = this.state.aircrafts.filter(aircraft => aircraft.aircraftType === "helicopter");
    const onlyHelicopters = this.state.modelsSelectedScale.filter(aircraft => aircraft.aircraftType === "helicopter"); //! з додаванням вибору моделей певного масштабу
    console.log("onlyHelicopters:", onlyHelicopters);
    this.setState({
      aircraftsArr: onlyHelicopters,
      aircraftsTitle: "Магазин моделей вертольотів",
      activeButton: "helicopterButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      // totalTypes: onlyHelicopters.length, //! кількість типів ЛА (вертольотів)
      aircraftsArrAfterFiltration: onlyHelicopters,  //! дубльоване значення aircraftsArr після фільтрації
      inputSearchValue: "", //! значення inputSearch
    });
  };


  //! Формуємо(оновлюємо) масив обраних моделей [selectedModels] зберігаючи його в state:
  //*✅ Так додає останній елемент
  // updateSelectedModels = () => {
  //   this.setState(prevState => ({
  //     selectedModels:
  //       prevState.indicesSelectedModels.flatMap(id => this.state.aircrafts.filter((el) => id === el.id))
  //       .sort((a, b) => a.name.brief.localeCompare(b.name.brief)), //! з сортуванням за полем "name.brief"
  //     // activeUser: {...prevState.activeUser, indicesSelectedModels: this.state.indicesSelectedModels},
  //   }));
  // };


  //! Обробка кнопок-фільтрів
  cartFiltration = () => {
    //! Прокрутити сторінку вгору
    console.log("Клік в кнопку Кошик");
    this.windowSrollTo();
    // this.updateSelectedModels(); 
    // Формуємо(оновлюємо) масив обраних моделей [selectedModels] не зберігаючи його в state:
    // const selectedModels = this.state.indicesSelectedModels.flatMap(id => this.state.aircrafts.filter((el) => id === el.id));
    // console.log("selectedModels:", selectedModels);
    this.setState({
      // selectedModels,
      // aircraftsArr: selectedModels,
      // aircraftsArr: this.updateSelectedModels(), //! вже не треба, якщо є isCartButton
      aircraftsTitle: "Мої обрані моделі",
      activeButton: "cartButton", //! візуалізація активної кнопки
      isCartButton: true, //! тригер: "якщо активна кнопка «Кошик»"
      inputSearchValue: "", //! значення inputSearch
      aircraftsArrAfterFiltration: this.state.selectedModels,  //! дубльоване значення aircraftsArr після фільтрації
    });
  };


  //! Обробка кліка на кнопці <Додати до кошику>
  //todo: OLD
  // getActiveId = id => {
  //   console.log('🆔Індекс обраної моделі ("id"):', id); //!
  //   this.setState((prevState) => {
  //     //! Перевіряємо наявність елемента зі значенням <id> у масиві індексів обраних моделей [indicesSelectedModels]
  //     const exists = this.state.indicesSelectedModels.includes(id);
  //     if (exists) {
  //       console.log("Такий індекс моделі вже є,тоді ВИДАЛЯЄМО його!❌");
  //     } else {
  //       console.log("Такого індекса моделі ще немає,тоді ДОДАЄМО його!✅");
  //     };
  //     return {
  //       // inputSearchValue: "",
  //       indicesSelectedModels:
  //         exists
  //           // ? this.state.indicesSelectedModels.filter(item => item !== id)
  //           ? prevState.indicesSelectedModels.filter(item => item !== id)
  //           // : [...prevState.indicesSelectedModels, id] //! без сортування
  //           // : [...this.state.indicesSelectedModels, id].sort((a, b) => a - b), //! сортування за id
  //           : [...prevState.indicesSelectedModels, id].sort((a, b) => a - b), //! сортування за id
  //       // selectedModels: updateSelectedModels(prevState.indicesSelectedModels, this.state.aircrafts), //!❌ так НЕ додає останній елемент
  //     };
  //   });
  //   this.updateSelectedModels(); //*✅ так додає останній елемент
  // };

  //todo: NEW
  getActiveId = id => {
    console.log('🆔Індекс обраної моделі ("id"):', id); //!
    this.setState(prevState => {
      //! Перевіряємо наявність елемента зі значенням <id> у масиві індексів обраних моделей [indicesSelectedModels]
      const exists = prevState.indicesSelectedModels.includes(id);
      if (exists) {
        console.log("Такий індекс моделі вже є,тоді ВИДАЛЯЄМО його!❌");
      } else {
        console.log("Такого індекса моделі ще немає,тоді ДОДАЄМО його!✅");
      };

      const indicesSelectedModels = exists
        ? prevState.indicesSelectedModels.filter(item => item !== id)
        : [...prevState.indicesSelectedModels, id].sort((a, b) => a - b);

      const selectedModels = indicesSelectedModels.flatMap(selectedId => prevState.aircrafts.filter(aircraft => aircraft.id === selectedId))
        .sort((a, b) => a.name.brief.localeCompare(b.name.brief)
      );

      //! Змінюємо indicesSelectedModels в activeUser
      const activeUser = this.state.activeUser
      activeUser.indicesSelectedModels = indicesSelectedModels;

      //! Змінюємо indicesSelectedModels в users
      const users = this.state.users;
      // console.log('👤👥users:', users); //!
      const index = users.findIndex(user => user.id === this.state.activeUserId);
      users[index].indicesSelectedModels = indicesSelectedModels;

      return {
        indicesSelectedModels,
        selectedModels,
        activeUser,
        users
      };
    });
  };


  //! ВСЯ логіка фільтрації для обробки введених даних для пошуку(фільтрації)
  performSearch = textInput => {
    const prevArray =
      this.state.isCartButton
        ? this.state.indicesSelectedModels.flatMap(id => this.state.aircrafts.filter((el) => id === el.id))
          .sort((a, b) => a.name.brief.localeCompare(b.name.brief)) //! з сортуванням за полем "name.brief"
        // ? this.state.selectedModels
        : this.state.aircraftsArrAfterFiltration

    const inputSearchValueBrief = prevArray.filter(
      aircraft => aircraft.name.brief.toLowerCase().startsWith(textInput.trim().toLowerCase())
    );
    const inputSearchValueNickname = prevArray.filter(
      aircraft => aircraft.name.nickname.toLowerCase().includes(textInput.trim().toLowerCase())
    );
    const inputSearchValueCountry = prevArray.filter(
      // aircraft => aircraft.info.country.toLowerCase().startsWith(textInput.trim().toLowerCase())
      aircraft => aircraft.info.countries.some(country => country.toLowerCase().startsWith(textInput.trim().toLowerCase()))
    );
    const inputSearchValueYear = prevArray.filter(
      aircraft => String(aircraft.info.year).startsWith((textInput.trim()))
    );

    // console.log("⏰⏰⏰inputSearchValueYear:", inputSearchValueYear);
    // console.log("⏰⏰⏰inputSearchValueCountry:", inputSearchValueCountry);

    let result = [];

    switch (this.state.radioButtonValue) {
      case "brief":
        result = inputSearchValueBrief;
        break;
      case "nickname":
        result = inputSearchValueNickname;
        break;
      case "country":
        result = inputSearchValueCountry;
        break;
      case "year":
        result = inputSearchValueYear;
        break;
      default:
        fieldValue = "";
    };

    this.setState({
      aircraftsArr: result,
      selectedModels: result,
      inputSearchValueTrigger: false //! тригер для коректної роботи інпуту після очищення
    });
  };


  //! Створюємо debounce як class property:
  debouncedSearch = debounce((text) => {
    console.log("⏰debounce_text", text);
    this.performSearch(text);
  }, 500);


  //! Обробка введених даних для пошуку(фільтрації) карток за ім'ям або іншими параметрами
  handleChangeInputSearchValue = event => {
    console.log("Подія onChange в inputSearch");
    const textInput = event.target.value;

    this.setState({
      inputSearchValue: textInput,
      inputSearchValueTrigger: true, //! тригер для коректної роботи інпуту після очищення
    });

    //todo: ❌ Без debounce:
    // this.performSearch(textInput); 

    //! ✅ Запуск debounce з логікою фільтрації:
    this.debouncedSearch(textInput);
  };


  //! Припинення debounce:
  componentWillUnmount() {
    this.debouncedSearch.cancel();
  };


  //! Обробка введених даних: значення параметра для пошуку/фільтрації радіо-кнопки
  handleChangeRadioButtonValue = event => {
    console.log("Подія checked");

    this.setState({
      inputSearchValue: "",
      aircraftsArr: this.state.aircraftsArrAfterFiltration, //! ❓❓❓
      selectedModels:
        this.state.indicesSelectedModels.flatMap(id => this.state.aircrafts.filter((el) => id === el.id))
        .sort((a, b) => a.name.brief.localeCompare(b.name.brief)) //! з сортуванням за полем "name.brief",
    });

    const radioButtonValue = event.target.value;
    let inputSearchPlaceholder = "";

    switch (radioButtonValue) {
      case "brief":
        inputSearchPlaceholder = "Введіть назву ЛА";
        break;
      case "nickname":
        inputSearchPlaceholder = "Введіть прізвисько ЛА";
        break;
      case "country":
        inputSearchPlaceholder = "Введіть країну виробник ЛА";
        break;
      case "year":
        inputSearchPlaceholder = "Введіть рік випуску ЛА";
        break;
      default:
        inputSearchPlaceholder = "";
    };

    this.setState({
      radioButtonValue,
      inputSearchPlaceholder
    });
  };


  //! Функція яка отримує масив моделей обраного масштабу з компоненту ScaleSelection та додає його в state
  getModelsSelectedScale = modelsScale => {
    // console.log("📗Масив моделей обраного масштабу :", modelsScale);

    //! Умови за допомогою switch, які відобрадають стан кнопок-фільтрів
    let result = [];
    switch (this.state.activeButton) {
      case "allButton":
        result = modelsScale;
        break;
      case "planeButton":
        result = modelsScale.filter(aircraft => aircraft.aircraftType === "plane");
        break;
      case "biplaneButton":
        result = modelsScale.filter(aircraft => aircraft.aircraftType === "biplane");
        break;
      case "helicopterButton":
        result = modelsScale.filter(aircraft => aircraft.aircraftType === "helicopter");
        break;
      default:
        fieldValue = "";
    };

    this.setState({
      modelsSelectedScale: modelsScale,
      aircraftsArr: result,
      aircraftsArrAfterFiltration: result,
      inputSearchValue: "", //! значення inputSearch
    });
  };


  //! Відкриття/закриття модального вікна
  toggleModal = (event) => {
    console.log("🌀toggleModal:", event)
    //! Перевірка: яка кнопка була натиснута - Registration або Login або Backdrop або ESC(undefined)
    const modalType = 
      event
        ? event.currentTarget.textContent
        : undefined
    
    console.log("modalType:", modalType)
    
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));

    if (modalType === "Registration" || modalType === "Login") {
      this.setState({
        showModal: true,
        modalType,
      });
    } else {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        modalType: ""
      }));
    };
  };


  //! Приймаємо об'ект з даних користувача з форми Реєстрації
  // submitForm = (data) => {
  submitForm = async (newUser) => { //? робимо метод асинхронним 
    console.log("✅submitForm_👤об'ект даних нового користувача:", newUser);

    //? NEW
    //? Тут можна використати Метод-обгортку: loadData(fetchData)
    //? з папки services/aircraftsLoadData.js
    //? для отримання даних за допомогою колбек функції fetchData(),
    //? але потрібно його доробити, 
    //? бо для updateUsers(newUser) не потрібен return fetchData(). 
    //? Тому залишаємо такий варіант:
    try {
      //? Додаємо нового користувача в db "usersAircrafts" на json-server
      // await axios.post("http://localhost:3000/usersAircraftsTest", newUser);
      await updateUsers(newUser);

      //? Отримуємо оновлений список користувачів з db "usersAircrafts" на json-server
      // const response = await axios.get("http://localhost:3000/usersAircraftsTest");
      // console.log('✅submitForm_👨‍👩‍👦‍👦"свіженки" users_response.data', response.data);
      const users = await fetchUsersAircrafts();
      console.log('✅submitForm_👨‍👩‍👦‍👦"свіженки" users_response.data', users);

      //? Оновлюємо список користувачів users в State
      this.setState({
        // users: response.data,
        users,
      });

    } catch (error) {
      console.log('❌ Помилка запита users "http://localhost:3000/usersAircrafts":', error);
    };

    this.setState(prevState => ({
      aircraftsArr: this.state.aircrafts, //! 
      aircraftsTitle: "Магазин моделей літальних апаратів",
      activeButton: "allButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      aircraftsArrAfterFiltration: this.state.aircrafts,  //! дубльоване значення aircraftsArr після фільтрації
      inputSearchValue: "", //! значення inputSearch
      radioButtonValue: "brief", //! значення параметра для пошуку/фільтрації радіо-кнопки
      inputSearchPlaceholder: "Введіть назву ЛА", //! значення placeholder для inputSearch
      inputSearchValueTrigger: false, //! тригер для коректної роботи інпуту після очищення
      modelsSelectedScale: this.state.aircrafts, //! масив моделей обраного масштабу
      modelScale: "_", //! початковий масштаб моделі в ScaleSelection (для перерендеру)
      // showModal: true,
      // users: [...prevState.users, data], //? це оновлення users робимо вище, відразу після отримання відповіді response.data з json-server
      modalType: "Login", //! для подальшого вікриття форми Ідентифікації/Аутентифікації (Login) користувача
    }));

    //! Прокрутити сторінку вгору
    this.windowSrollTo();
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
  };


  //! Вхід в обліковий запис ✅
  // accountLogin = ({ userEmail }) => {
  accountLogin = (userEmail, users) => { //? додатково передати "свіженких" users
    console.log("🙆‍♂️Вхід в обліковий запис:", userEmail, users); //!
    
    // const users = JSON.parse(localStorage.getItem("users"));

    const activeUser = users.find(user => user.userEmail === userEmail);
    console.log("❗️🗣 Активний (авторизований) користувач__accountLogin:", activeUser); //!

    // const activeUserId = users.findIndex(user => user.userEmail === userEmail);
    const activeUserId = activeUser.id;  //? new
    console.log("#️⃣🗣 id активного (авторизованого) користувача_accountLogin:", activeUserId); //!

    // localStorage.setItem("indicesSelectedModels", JSON.stringify(activeUser.indicesSelectedModels)); //? НЕ створюємо масив індексів обраних моделей активного (авторизованого) користувача в localStorage
    localStorage.setItem("activeUserId", JSON.stringify(activeUserId)); //? new - додаємо id активного (авторизованого) користувача в localStorage
    
    // activeUser.isActive = true;
    console.log('"свіженки "users__accountLogin:', users); 
    // localStorage.setItem("users", JSON.stringify(users));

    this.setState({
      aircraftsArr: this.state.aircrafts, //! 
      aircraftsTitle: "Магазин моделей літальних апаратів",
      activeButton: "allButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      aircraftsArrAfterFiltration: this.state.aircrafts,  //! дубльоване значення aircraftsArr після фільтрації
      inputSearchValue: "", //! значення inputSearch
      radioButtonValue: "brief", //! значення параметра для пошуку/фільтрації радіо-кнопки
      inputSearchPlaceholder: "Введіть назву ЛА", //! значення placeholder для inputSearch
      inputSearchValueTrigger: false, //! тригер для коректної роботи інпуту після очищення
      modelsSelectedScale: this.state.aircrafts, //! масив моделей обраного масштабу
      modelScale: "__", //! початковий масштаб моделі в ScaleSelection (для перерендеру)
      // showModal: !this.state.showModal, //todo: var.2 закриваємо модалку  
      users,  
      activeUser,
      activeUserId,
      isCartButtonDisabled: false,
      // indicesSelectedModels: JSON.parse(localStorage.getItem("indicesSelectedModels")) || [], //! масив індексів обраних моделей
      indicesSelectedModels: activeUser.indicesSelectedModels, //? масив індексів обраних моделей
      // selectedModels:
      //   (JSON.parse(localStorage.getItem("indicesSelectedModels")) || [])
      //     .flatMap(id => this.state.aircrafts.filter((el) => id === el.id))
      //     .sort((a, b) => a.name.brief.localeCompare(b.name.brief)), //! масив обраних моделей
      selectedModels: activeUser.indicesSelectedModels
          .flatMap(id => this.state.aircrafts.filter((el) => id === el.id))
          .sort((a, b) => a.name.brief.localeCompare(b.name.brief)), //? масив обраних моделей
    });

    // this.toggleModal(); //todo: var.3 закриваємо модалку

    //! Прокрутити сторінку вгору
    this.windowSrollTo();
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });
  };


  //! Завершення сеансу облікового запису
  signOut = () => {
    console.log("⬇️Sign Out");
    // localStorage.removeItem("indicesSelectedModels"); //! видаляємо масив індексів обраних моделей активного (авторизованого) користувача
    localStorage.removeItem("activeUserId"); //? видаляємо id активного (авторизованого) користувача
    // const users = JSON.parse(localStorage.getItem("users"));
    // const activeUser = users.find(user => user.isActive === true);
    // console.log("❗️🗣 Активний(авторизований) користувач__signOut:", activeUser); //!
    // activeUser.isActive = false;
    // console.log("users:", users); //!
    // localStorage.setItem("users", JSON.stringify(users));
    this.setState({
      aircraftsArr: this.state.aircrafts, //! 
      aircraftsTitle: "Магазин моделей літальних апаратів",
      activeButton: "allButton", //! візуалізація активної кнопки
      isCartButton: false, //! тригер: "якщо активна кнопка «Кошик»"
      aircraftsArrAfterFiltration: this.state.aircrafts,  //! дубльоване значення aircraftsArr після фільтрації
      inputSearchValue: "", //! значення inputSearch
      radioButtonValue: "brief", //! значення параметра для пошуку/фільтрації радіо-кнопки
      inputSearchPlaceholder: "Введіть назву ЛА", //! значення placeholder для inputSearch
      inputSearchValueTrigger: false, //! тригер для коректної роботи інпуту після очищення
      modelsSelectedScale: this.state.aircrafts, //! масив моделей обраного масштабу
      modelScale: "", //! початковий масштаб моделі в ScaleSelection (для перерендеру)
      // showModal: true, //todo: var.2 відкриваємо модалку
      // users, //? НЕ перезаписуємо масив з даними користувачів
      activeUser: null, //! 🗣 активний (авторизований) користувач
      activeUserId: null, //! #️⃣🗣 індекс Активного (авторизованого) користувача
      isCartButtonDisabled: true, ///! 🔐 тригер блокування кнопки «Кошик»
      indicesSelectedModels: [], //! масив індексів обраних моделей
      selectedModels: [], //! масив обраних моделей
    });

    //! Прокрутити сторінку вгору
    this.windowSrollTo();
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth",
    // });

    this.toggleModal(); //todo: var.3 відкриваємо модалку
  };


  //! Прокрутити сторінку вгору
  windowSrollTo = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };


  render() {
    const {
      aircrafts, //! початковий масив aircraftsArr з json-server
      aircraftsArr, //! запис початкового масиву aircrafts в aircraftsArr
      // aircraftsArrNew,
      aircraftsTitle,
      activeButton, //! візуалізація активної кнопки
      indicesSelectedModels, //! масив індексів обраних моделей
      selectedModels, //! масив обраних моделей 
      isCartButton, //! тригер: "якщо активна кнопка «Кошик»"
      // totalTypes //! кількість типів ЛА
      inputSearchValue, //! значення inputSearch
      aircraftsArrAfterFiltration,  //! дубльоване значення aircraftsArr після фільтрації
      radioButtonValue, //! значення параметра для пошуку/фільтрації радіо - кнопки
      inputSearchPlaceholder, //! значення placeholder для inputSearch
      inputSearchValueTrigger, //! тригер для коректної роботи інпуту після очищення
      modelsSelectedScale, //! масив моделей обраного масштабу
      modelScale, //! початковий масштаб моделі в ScaleSelection
      showModal, //! контроль відкриття/закриття модального вікна
      users, //!  масив з даними користувачів
      activeUser, //! 🗣 активний (авторизований) користувач
      activeUserId, //! #️⃣🗣 індекс активного (авторизованого) користувача
      modalType, //! 🧾 індикатор типу модального вікна
      isCartButtonDisabled, //! 🔐 тригер блокування кнопки «Кошик»
      loader, //! ⏳ індикатор завантаження (лоадер)
      error, //! ❌ обробка помилок
    } = this.state;

    //! Рахуємо кількість типів ЛА
    const totalTypes = aircraftsArr.length;
    
    //! Рахуємо загальну кількість моделей <totalModels> виходячи з наявності фактичної ціни
    const getTotalModels = (arr) =>
      arr.reduce((previousValue, element) =>
        previousValue + Object.values(element.model.colorsPrice).filter(item => Number(item)).length, 0);

    //! Кількість обраних моделей 
    const numberOfModels = indicesSelectedModels.length;

    //! Кількість обраних моделей після сортування
    const numberOfModelsAfterSorting = selectedModels.length;
    
    console.log("----------------------------------------------");
    console.log("✈️Початковий сортований масив aircrafts з json-server:", aircrafts);
    console.log("✈️->✈️Запис початкового сортованого масиву aircrafts в aircraftsArr:", aircraftsArr);
    console.log("ℹ️Mасив індексів обраних моделей:", indicesSelectedModels);
    console.log("Ⓜ️Масив обраних моделей:", selectedModels);
    console.log("🔢Кількість обраних моделей:", numberOfModels);
    console.log("🔡Значення inputSearch:", inputSearchValue);
    console.log("Ⓜ️Ⓜ️Дубльоване значення aircraftsArr після фільтрації:", aircraftsArrAfterFiltration);
    console.log("⭕️Значення параметра для пошуку/фільтрації радіо-кнопки:", radioButtonValue);
    console.log("🔲Значення placeholder для inputSearch:", inputSearchPlaceholder);
    console.log("📕📗Масив моделей обраного масштабу:", modelsSelectedScale);
    console.log("Початковий масштаб моделі в ScaleSelection:", modelScale);
    console.log("🌀 Контроль відкриття/закриття модального вікна:", showModal);
    console.log("👨‍👩‍👦‍👦 Масив з даними користувачів:", users);
    console.log("🗣 Активний (авторизований) користувач:", activeUser);
    console.log("#️⃣🗣 Індекс Активного(авторизованого) користувача", activeUserId);
    console.log("🧾 Індикатор типу модального вікна:", modalType);
    console.log("🔐 Тригер блокування кнопки «Кошик»:", isCartButtonDisabled);
    console.log("⏳ Індикатор завантаження (лоадер):", loader);
    console.log("❌ Помилка:", error);
    console.log("______________________________________________");


    return (
      <>
        {/*//!  Модалка Реєстрації та Ідентифікації/Аутентифікації (Login) користувача */}
        {/* {showModal && !activeUser &&} */}
        {showModal && !loader && !error &&
          < ModalRegistrationIdentification
            onClose={this.toggleModal}
          >
            {/*//!  Екран вибору Реєстрації або Ідентифікації/Аутентифікації (Login) користувача */}
            {!modalType &&
              <FormChoiceRegistrationOrIdentification
                onClose={this.toggleModal}
                // onSubmit={this.submitForm}
              />
            }
            {/*//!  Форма Реєстрації користувача */}
            {modalType === "Registration" &&
              <FormRegistration
                onClose={this.toggleModal}
                onSubmit={this.submitForm}
              />
            }
            {/*//!  Форма Ідентифікації/Аутентифікації (Login) користувача */}
            {modalType === "Login" &&
              <FormIdentification
                onClose={this.toggleModal}
                onAccountLogin={this.accountLogin}
              />
            }
          </ModalRegistrationIdentification>
        }
        
        {/*//!  Реєстрація та Ідентифікація/Аутентифікація (Login) користувача */}
        <RegistrationIdentification
          onClose={this.toggleModal} //! відкриття/закриття модального вікна
          activeUser={activeUser} //! 🗣 активний (авторизований) користувач
          onSignOut={this.signOut} //! завершення сеансу облікового запису
          loader={loader} //! ⏳ індикатор завантаження (лоадер)
        />
        
        {/*//!  Вибір масштабу моделі */}
        <ScaleSelection
          modelScale={modelScale} //! початковий масштаб моделі в ScaleSelection
          aircrafts={aircrafts} //! початково сортований вхідний масив УСІХ моделей
          isLocked={isCartButton} //! тригер: "якщо активна кнопка «Кошик»"
          onGetModelsSelectedScale={this.getModelsSelectedScale} 
        />

        {/*//!  Filter */}
        <Filter
          onAll={this.allFiltration}
          onPlanes={this.planeFiltration}
          onBiplanes={this.biplaneFiltration}
          onHelicopters={this.helicopterFiltration}
          onCart={this.cartFiltration}
          filterButton={activeButton} //! візуалізація активної кнопки
          numberOfSelectedModels={numberOfModels} //! кількість обраних моделей
          isCartButtonDisabled={isCartButtonDisabled} //! 🔐 тригер блокування кнопки «Кошик»
        />

        {/*//!  Sorter */}
        <Sorter
          inputSearchValue={inputSearchValue} //! значення inputSearch
          onHandleChangeInputSearchValue={this.handleChangeInputSearchValue}
          isCartOn={isCartButton} //! тригер: "якщо активна кнопка «Кошик»"
          numberOfSelectedModels={numberOfModels} //! кількість обраних моделей
          onHandleChangeRadioButtonValue={this.handleChangeRadioButtonValue}
          radioButtonValue={radioButtonValue} //! значення параметра для пошуку/фільтрації радіо-кнопки
          inputSearchPlaceholder={inputSearchPlaceholder} //! значення placeholder для inputSearch
        />

        {/*//! ВСІ */}
        <Section
          // title={aircraftsTitle}
          //! Використання логіки тригеру: "якщо активна кнопка «Кошик»" та порожній масив [indicesSelectedModels]
          //? title={(isCartButton === true && indicesSelectedModels.length === 0) ? "" : aircraftsTitle}
          //? або:
          title={(isCartButton && !indicesSelectedModels.length) ? "" : aircraftsTitle}
          allTypes={totalTypes} //! кількість типів ЛА
          totalModels={isCartButton ? getTotalModels(selectedModels) : getTotalModels(aircraftsArr)} //! загальна кількість моделей 
          numberOfSelectedModelsAfterSorting={numberOfModelsAfterSorting} //! кількість обраних моделей
          isCartOn={isCartButton} //! тригер: "якщо активна кнопка «Кошик»"
        >
          <PlanesList
            // items={aircraftsArr}
            //! Використання логіки тригеру: "якщо активна кнопка «Кошик»" 
            items={isCartButton ? selectedModels : aircraftsArr}
            indicesArray={indicesSelectedModels}
            onActiveId={this.getActiveId}
            inputSearchValue={inputSearchValue} //! значення inputSearch
            inputSearchValueTrigger={inputSearchValueTrigger} //! тригер для коректної роботи інпуту після очищення
            // onHighlightTextProtection={this.highlightTextProtection} //! функція підсвічування тексту та допоміжна функція ---> ВИНОСИМО в utils
            radioButtonValue={radioButtonValue} //! ⭕️ значення параметра для пошуку/фільтрації радіо-кнопки
            isCartOn={isCartButton} //! тригер: "якщо активна кнопка «Кошик»"
            isCartButtonDisabled={isCartButtonDisabled} //! 🔐 тригер блокування кнопки «Кошик»
            loader={loader} //! ⏳ індикатор завантаження (лоадер)
            error={error} //! ❌ обробка помилок
          />
        </Section >
      </>
    )
  }
};

//! Перерендер компонентів відбувається у двох випадках:
//! 1.Коли до них приходять нові props
//! 2.Коли змінюється state
