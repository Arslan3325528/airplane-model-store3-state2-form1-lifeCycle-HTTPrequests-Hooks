import React, { Component } from "react";
// import css from "./App.module.css";


//* ============================ Принцип замикання в JS (Closure) ============================
//? Замикання (Closure) у JavaScript - це механізм,
//? при якому внутрішня функція зберігає доступ
//? до змінних зовнішньої функції навіть після того,
//? як зовнішня функція завершила виконання.

//? Простіше кажучи:
//? функція пам'ятає область видимості,
//? в якій вона була створена,
//? і може звертатися до змінних
//? із цієї області видимості.

//todo: ======================= 1.Як працю замикання =======================
function outerFunction() {
  const message = '✅ Привіт із innerFunction!';

  function innerFunction() {
    console.log(message);
  };

  return innerFunction;
};

//todo:    Крок 1. Викликаємо зовнішню функцію:
const myFunction = outerFunction();

//todo: Всередині outerFunction() створюється змінна:
const message = 'Привіт!';
//todo: А також внутрішня функція innerFunction().

//todo:    Крок 2. Зовнішня функція повертає внутрішню: return innerFunction
//todo: ВАЖЛИВО: ми повертаємо саму функцію, а не результат її виконання.
//todo: Тому тут немає круглих дужок після введенняфункції.

//todo:    Крок 3. Зовнішня функція завершує виконання.
//todo: На погляд може здатися, що змінна message
//todo: повинна зникнути разом із завершенням outerFunction().
//todo: Але це не відбувається: myFunction зберігає доступ
//todo: до лексичного оточення, в якому була створена віннер Function.

//todo:    Крок 4. Викликаємо повернену функцію:
myFunction(); //! ✅ Привіт із innerFunction!
//todo: Вона звертається до message,
//todo: хоча зовнішня функція вже завершила роботу.
//todo: ====================================================================


//? ============ 2.Найпоширеніший приклад використання замикань ============
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
//! Операція-1. Створюємо та зберігаємо посилання на внутрішню функцію
const counterLog1 = createCounter();
//! Операція-2.Викликаємо збережену внутрішню функцію
console.log("1️⃣Результати вікликів counterLog1():");
counterLog1(); //* 1
counterLog1(); //* 2
counterLog1(); //* 3
counterLog1(); //* 4

//! Так не буде працювати:
// createCounter(); //! ❌
// createCounter(); //! ❌
// createCounter(); //! ❌
// createCounter(); //! ❌

//! Так не буде працювати:
// console.log(createCounter()); // ƒ () {counter++; console.log("counter:", counter);}
// console.log(createCounter()); // ƒ () {counter++; console.log("counter:", counter);}
// console.log(createCounter()); // ƒ () {counter++; console.log("counter:", counter);}
// console.log(createCounter()); // ƒ () {counter++; console.log("counter:", counter);}

//?    ЯК ЦЕ ПРАЦЮЄ:
//? 1. Викликаємо createCounter().
//? 2. Створюється змінна counter із значенням 0.
//? 3. В counterLog1 повертається внутрішня функція.
//? 4. Внутрішня функція зберігає доступ до counter.
//? 5. Кожен наступний виклик counterLog1() змінює ту саму змінну counter.

const counterLog2 = createCounter();
//? Чому counter2 починається з одиниці?
console.log("2️⃣Результати вікликів counterLog2():");
counterLog2(); //* 1
counterLog2(); //* 2
counterLog2(); //* 3
counterLog2(); //* 4
//? Тому що кожен виклик createCounter() створює
//? ВЛАСНЕ лексичне оточення та ВЛАСНУ ЗМІННУ counter.
//? Тобто лічильники НЕЗАЛЕЖНІ один від одного.
//? ========================================================================

//* =========================================================================================


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
      Принцип замикання в JS (Closure)
    </div>
  );
};
