import React, { useState, useEffect, useRef } from 'react';
import css from "./Clock.module.css";


export function ClockHooks() {
  //! Аналог state в Class Component
  const [time, setTime] = useState(new Date().toLocaleTimeString());


  //! Аналог свойства intervalId в Class Component
  const intervalId = useRef(null);


  //! Аналог componentDidMount() / componentDidUpdate() / componentWillUnmount()
  useEffect(() => {
    console.log('1️⃣❗️❗️❗️ ClockHooks useEffect1');

    //! Створення таймера
    intervalId.current = setInterval(() => {
      console.log("⏱️ ClockHooks: спрацював setInterval");
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    console.log(`✅ Таймер ${intervalId.current} створено`);

    //! Аналог componentWillUnmount
    return () => {
      console.log('3️⃣❗️❗️❗️ ClockHooks cleanup useEffect');

      //! Видалення таймера
      clearInterval(intervalId.current);
      console.log(
        `❌ Таймер ${intervalId.current} видалено`
      );

      intervalId.current = null;
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
