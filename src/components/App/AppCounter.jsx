import React, { Component } from "react";
// import css from "./App.module.css";



//* ============================ Принцип замикання ============================
//? Замикання (Closure) у JavaScript - це механізм,
//? при якому внутрішня функція зберігає доступ
//? до змінних зовнішньої функції навіть після того,
//? як зовнішня функція завершила виконання.

//? Простіше кажучи:
//? функція пам'ятає область видимості,
//? в якій вона була створена,
//? і може звертатися до змінних
//? із цієї області видимості.

function createCounter() {
  let counter = 0;

  return function () {
    counter++;
    console.log("counter:", counter);
  };
};

//? Важливий принцип замикання:
//? Замикання дозволяє внутрішній функції
//? зберігати доступ до змінних зовнішньої функції.
//? Але для того, щоб скористатися цим механізмом,
//? потрібно зберегти посилання на внутрішню функцію та викликати її.
//? Саме тому у прикладі зі лічильником ми використовуємо дві операції:

const counter1 = createCounter(); //! 1.Створюємо та зберігаємо посилання на внутрішню функцію

counter1(); //! 2.Викликаємо збережену внутрішню функцію // 1
counter1(); //! 2.Викликаємо збережену внутрішню функцію // 2
counter1(); //! 2.Викликаємо збережену внутрішню функцію // 3
counter1(); //! 2.Викликаємо збережену внутрішню функцію // 4


// createCounter(); //! ❌
// createCounter(); //! ❌
// createCounter(); //! ❌
// createCounter(); //! ❌

// console.log(createCounter());
// console.log(createCounter());
// console.log(createCounter());
// console.log(createCounter());

//* ===========================================================================


//! Збільшення/Зменьшення на 1
// import { Counter } from '@/components/Counter/Counter.jsx';

//! Звичайний компонент
export function AppCounter() {

  return (
    <div>
      {/* <div className={css.counter}>
        <span className={css.counterValue}>0</span>
        <div className={css.counterControls}>
            <button className={css.buttonIncrement}>+ 1</button>
            <button className={css.buttonDecrement}>- 1</button>
        </div>
      </div> */}
      {/* <Counter /> */}
      {/* //! Початковий стан лічильника з props */}
      {/* <Counter initialValue={10} /> */}
      Counter
    </div>
  );
};
