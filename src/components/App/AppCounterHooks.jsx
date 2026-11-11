import React from "react";

import { CounterReactClass } from '@/components/Counter/CounterReactClass.jsx';
import { CounterReactHooks } from '@/components/Counter/CounterReactHooks.jsx';

import { Counter } from '@/components/Counter/Counter.jsx';

import { CounterClass } from '@/components/Counter/CounterClass.jsx';
import { CounterHooks } from '@/components/Counter/CounterHooks.jsx';




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
console.log("🟡1.Як працю замикання");
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
//todo: до лексичного оточення, в якому була створена innerFunction.

//todo:    Крок 4. Викликаємо повернену функцію:
myFunction(); //! ✅ Привіт із innerFunction!
//todo: Вона звертається до message,
//todo: хоча зовнішня функція вже завершила роботу.
console.log("");
//todo: ====================================================================


//? ============ 2.Найпоширеніший приклад використання замикань ============
console.log("🟡2.Найпоширеніший приклад використання замикань");
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
console.log("");
//? ========================================================================


//todo: ================ 3.Приховування змінних (інкапсуляція) =============
console.log("🟡3.Приховування змінних (інкапсуляція)");

//? Замикання дозволяють обмежити прямий доступ до змінних.

function createUser() {
  let userName = 'Alex';
  let userAge = 25;

  return {
    getName() {
      return userName;
    },

    getAge() {
      return userAge;
    },

    setAge(newAge) {
      if (newAge > 0) {
        userAge = newAge;
      };
    }
  };
}

const user = createUser();

console.log("user.getName()", user.getName()); //! Alex
console.log("1️⃣user.getAge()", user.getAge());  //! 25

user.setAge(30);

console.log("2️⃣user.getAge()", user.getAge()); //! 30

console.log("user.userAge", user.userAge); //! undefined

//? Тут змінні userName і userAge недоступні через об'єкт user.

//? Але методи getName(), getAge() та setAge()
//? мають доступ до них завдяки замиканню.

//? Такий підхід називають інкапсуляцією
//? - обмеженням прямого доступу до внутрішніх даних.
console.log("");
//todo: ====================================================================



//todo: ================= 4.Функція із збереженням параметра ===============
console.log("🟡4.Функція із збереженням параметра");

//? Створимо функцію, яка вітатиме користувачів на ім'я

function createGreeting(userName) {
  return function () {
    console.log(`Привіт, ${userName}!`);
  };
}

const greetingAlex = createGreeting('Alex');
const greetingJohn = createGreeting('John');

greetingAlex(); //! Привіт, Alex!
greetingJohn(); //! Привіт, John!

//? Кожна створена функція зберігає значення userName.
//? Це зручно, коли потрібно створювати функції із заздалегідь заданими параметрами.
console.log("");
//todo: ====================================================================
//* =========================================================================================






//! Звичайний компонент
export function AppCounterHooks() {
  return (
    <>
      <h1
        style={{ color: "darkgrey", textAlign: "center" }}
      >
        Принцип замикання в JS (Closure)
      </h1>

      {/* <CounterReactClass /> */}
      {/* <CounterReactHooks /> */}

      {/* <Counter /> */}
      {/* //! Початковий стан лічильника з props */}
      {/* <Counter initialValue={10} /> */}

      <CounterClass />
      <CounterHooks />
    </>
  );
};
