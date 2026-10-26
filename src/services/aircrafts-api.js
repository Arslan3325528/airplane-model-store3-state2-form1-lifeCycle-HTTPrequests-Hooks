import axios from "axios";

import { aircraftsSort } from '@/utils'; //! початкове сортування на ім'я (за полем name.brief) + сортування з перенесенням відсутніх моделей у кінець списку

//? Константи для створення url:
// const BASE_URL_AIRCRAFTS = "http://localhost:3000/";
const BASE_URL_AIRCRAFTS = import.meta.env.VITE_API_BASE_URL_AIRCRAFTS;

const ENDPOINT_AIRCRAFTS_DB = "aircraftsDB"; //* незмінна DB (тільки для читання), для оновлення карток в початковий стан

// const ENDPOINT_AIRCRAFTS = "aircrafts";
const ENDPOINT_AIRCRAFTS = "aircraftsHooks";
// const ENDPOINT_AIRCRAFTS = "aircrafts1"; //! ❌ викликає помилку 404

const ENDPOINT_USERS_AIRCRAFTS = "usersAircrafts";
// const ENDPOINT_USERS_AIRCRAFTS = "usersAircrafts1"; //! ❌ викликає помилку 404

const ENDPOINT_USERS_AIRCRAFTS_TEST = "usersAircraftsTest"; //todo: тестова DB для налаштування логіки запитів
// const ENDPOINT_USERS_AIRCRAFTS_TEST = "usersAircraftsTest1"; //! ❌ викликає помилку 404


//? Запит GET на "http://localhost:3000/aircrafts"
export async function fetchAircrafts() {
  const url = `${BASE_URL_AIRCRAFTS}${ENDPOINT_AIRCRAFTS}`;

  try {
    const response = await axios.get(url);
    console.log("🅰️xios==>✅response-GETaircrafts:", response);
    // return response.data;
    return aircraftsSort(response.data);
  } catch (error) {
    //! Помилка: Відсутня відповідь сервера
    if (!error.response) {
      console.log("🅰️xios==>❌error-GETaircrafts(Відсутня відповідь сервера):", error.response);
      throw new Error(`Відсутній зв'язок з сервером «aircrafts-DB»`);
    };
    //! Помилка: 404
    if (error.response?.status === 404) {
      console.log("🅰️xios==>❌error-GETaircrafts(404)", error);
      throw new Error(` Сервер не може знайти дані згідно з запитом: «${url}» ❓🙅‍♂️`);
    };
    //! Помилка: Інша помилка
    console.log("🅰️xios==>❌error-GETaircrafts(Інша помилка):", error);
    // console.log("🅰️🅰️xios==>❌error-GETaircrafts(Інша помилка)❌error.response:", error.response);
    // console.log("🅰️🅰️🅰️xios==>❌error-GETaircrafts(Інша помилка)❌error.response?.status:", error.response?.status);
    // console.log("🅰️🅰️🅰️xios==>❌error-GETaircrafts(Інша помилка)❌error.response?.data:", error.response?.data);
    throw error;
  };
};


//? Запит GET на "http://localhost:3000/usersAircrafts"
export async function fetchUsersAircrafts() {
  // const url = `${BASE_URL_AIRCRAFTS}${ENDPOINT_USERS_AIRCRAFTS}`;
  const url = `${BASE_URL_AIRCRAFTS}${ENDPOINT_USERS_AIRCRAFTS_TEST}`; //todo: тестова DB для налаштування логіки запитів

  try {
    const response = await axios.get(url);
    console.log("🅰️xios==>✅response-GETusersAircrafts:", response);
    return response.data;
  } catch (error) {
    //! Помилка: Відсутня відповідь сервера
    if (!error.response) {
      console.log("🅰️xios==>❌error-GETusersAircrafts(Відсутня відповідь сервера):", error.response);
      throw new Error(`Відсутній зв'язок з сервером «users-DB»`);
    };
    //! Помилка: 404
    if (error.response?.status === 404) {
      console.log("🅰️xios==>❌error-GETusersAircrafts(404)", error);
      throw new Error(` Сервер не може знайти дані згідно з запитом: «${url}» ❓🤷‍♀️`);
    };
    //! Помилка: Інша помилка
    console.log("🅰️xios==>❌error-GETusersAircrafts(Інша помилка):", error);
    // console.log("🅰️🅰️xios==>❌error-GETusersAircrafts(Інша помилка)❌error.response:", error.response);
    // console.log("🅰️🅰️🅰️xios==>❌error-GETusersAircrafts(Інша помилка)❌error.response?.status:", error.response?.status);
    // console.log("🅰️🅰️🅰️xios==>❌error-GETusersAircrafts(Інша помилка)❌error.response?.data:", error.response?.data);
    throw error;
  };
};


//? Запит PATCH на "http://localhost:3000/usersAircrafts/userId"
// export const updateUserSelectedModels = async (userId, indicesSelectedModels) => {
export async function updateUserSelectedModels(userId, indicesSelectedModels) {
  // const url = `${BASE_URL_AIRCRAFTS}${ENDPOINT_USERS_AIRCRAFTS}`;
  const url = `${BASE_URL_AIRCRAFTS}${ENDPOINT_USERS_AIRCRAFTS_TEST}/${userId}`; //todo: тестова DB для налаштування логіки запитів
  
  // const response = await axios.patch(url, { indicesSelectedModels });
  // return response.data;

  try {
    const response = await axios.patch(url, { indicesSelectedModels });
    console.log("🅰️xios==>✅response-PATCHusersAircrafts/userId:", response);
    return response.data;
  } catch (error) {
    //! Помилка: Інша помилка
    console.log("🅰️xios==>❌error-PATCHusersAircrafts/userId(Інша помилка):", error);
    // console.log("🅰️🅰️xios==>❌error-PATCHusersAircrafts/userId(Інша помилка)❌error.response:", error.response);
    // console.log("🅰️🅰️🅰️xios==>❌error-PATCHusersAircrafts/userId(Інша помилка)❌error.response?.status:", error.response?.status);
    // console.log("🅰️🅰️🅰️xios==>❌error-PATCHusersAircrafts/userId/userId(Інша помилка)❌error.response?.data:", error.response?.data);
    throw error;
  };
};

//? Запит POST на "http://localhost:3000/usersAircrafts" на додавання нового користувача
export async function updateUsers(newUser) {
  // const url = `${BASE_URL_AIRCRAFTS}${ENDPOINT_USERS_AIRCRAFTS}`;
  const url = `${BASE_URL_AIRCRAFTS}${ENDPOINT_USERS_AIRCRAFTS_TEST}`; //todo: тестова DB для налаштування логіки запитів

  // await axios.post(url, newUser);

  try {
    await axios.post(url, newUser);
    // console.log("🅰️xios==>✅response-POSTusersAircrafts:", response); //! увімкнути для демонстрації перевірки роботи помилки
    console.log("🅰️xios==>✅response-POSTusersAircrafts"); 
  } catch (error) {
    //! Помилка: Інша помилка
    console.log("🅰️xios==>❌error-POSTusersAircrafts/userId(Інша помилка):", error);
    // console.log("🅰️🅰️xios==>❌error-POSTusersAircrafts/userId(Інша помилка)❌error.response:", error.response);
    // console.log("🅰️🅰️🅰️xios==>❌error-POSTusersAircrafts/userId(Інша помилка)❌error.response?.status:", error.response?.status);
    // console.log("🅰️🅰️🅰️xios==>❌error-POSTusersAircrafts/userId/userId(Інша помилка)❌error.response?.data:", error.response?.data);
    throw error;
  };
};
