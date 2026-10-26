import axios from "axios";


//? Axios сам вважає помилкою HTTP-відповіді з кодами поза 2xx.
//? Тому ручна перевірка response.ok та Promise.reject(...) більше не потрібні.
//? Axios автоматично поміщає JSON-відповідь у response.data.

//* NEW-3 (axios + обробка помилок (формуємо власні помилки) + async/await)
async function fetchPokemon(name) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    console.log("🅰️xios==>✅response:", response);
    return response.data;
  } catch (error) {
    //! Помилка: 404
    if (error.response?.status === 404) {
      console.log("🅰️xios==>❌error-404", error);
      throw new Error(`Покемена з ім'ям «${name}» не існує`);
    };
    //! Помилка: 400
    if (error.response?.status === 400) {
      console.log("🅰️xios==>❌error-400:", error);
      throw new Error(`Сталася синтаксична помилка при введенні імені «${name}»`);
    };
    //! Інша помилка
    console.log("🅰️xios==>❌error-(інша помилка):", error);
    throw error;
  };
};


const api = {
  fetchPokemon,
};

export default api;
