import React, { useState, useEffect, useRef } from 'react';
import css from "./Clock.module.css";


export function ClockHooks() {
  //! Аналог state в Class Component
  const [time, setTime] = useState(new Date().toLocaleTimeString());


  //! Аналог componentDidMount() / componentDidUpdate() / componentWillUnmount()
  useEffect(() => {
    console.log('1️⃣❗️❗️❗️ ClockHooks useEffect1');

    //! Створення таймера
    const intervalId = setInterval(() => {
      console.log("⏱️ ClockHooks: спрацював setInterval");
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    console.log(`✅ Таймер ${intervalId} створено`);

    //! Аналог componentWillUnmount
    return () => {
      console.log('3️⃣❗️❗️❗️ ClockHooks cleanup useEffect');

      //! Видалення таймера
      clearInterval(intervalId);
      console.log(
        `❌ Таймер ${intervalId} видалено`
      );
    };
  }, []);


  //! Аналог componentDidUpdate()
  useEffect(() => {
    console.log("2️⃣❗️❗️❗️ ClockHooks useEffect2: оновлення часу");
    console.log("🕒 Поточний час:", time);
  }, [time]);

  console.log("0️⃣❗️❗️❗️ ClockHooks render");


  return (
    <div className={css.clockFace}>
      {time}
    </div>
  );
};
