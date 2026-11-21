import { useState, useEffect } from "react";


export function AppUseEffect2() {
    const [isRunning, setIsRunning] = useState(false); //! визначає, чи має працювати секундомір
    const [seconds, setSeconds] = useState(0); //! зберігає кількість минулих секунд.

    //todo: Аналог componentDidUpdate(за умовою) + componentWillUnmount
    //todo: Спрацює після першого рендерингу компонента і після кожної зміни isRunning.
    //todo: Очищає попередній ефект при зміні залежностей та очищає ефект при розмонтуванні компонента.
    //! ----- ЯК ЦЕ ПРАЦЮЄ? -----
    //! 1. Користувач натискає кнопку «Запустити».
    //! 2. isRunning стає true.
    //! 3. React виконує рендер.
    //! 4. useEffect запускає setInterval.
    //! 5. Кожну секунду викликається setSeconds, оновлюється інтерфейс.
    //! 6. При натисканні «Зупинити» isRunning стає false.
    //! 7. ❗️❗️❗️ Перед ПОВТОРНИМ виконанням ефекту React викликає
    //!    попередню функцію очищення clearInterval(intervalId), 
    //!    яка і зупиняє інтервал.
    useEffect(() => {
        console.log("⚠️useEffect спрацював");
        
        //? Виключаємо логіку на першому рендері
        if (!isRunning) {
            console.log("❌Таймер відключено.");
            return;
        };

        //* Запускаємо таймер при зміні значення isRunning на true
        const intervalId = setInterval(() => {
            // setSeconds(seconds + 1); //! ❌
            setSeconds(prevSeconds => prevSeconds + 1); //* ✅
        }, 1000);
        console.log(`✅Таймер №${intervalId} запущено!`);
        
        //! Очищаємо попередній інтервал при зміні значення isRunning на false
        //! Послідовність зупинки секундоміра:
        //!     1. Натискання «Зупинити»
        //!         setIsRunning(false) - запитується зміна стану.
        //!     2. Повторний рендеринг: 
        //!         React набуває нового значення isRunning = false.
        //!     3. Виклик попередньої функції очищення: 
        //!         Виконується clearInterval(intervalId).
        //!     4. Повторний запуск useEffect: 
        //!         Перевіряється if (!isRunning).
        //!     5. Вихід із ефекту: 
        //!         Новий інтервал не створюється
        return () => {
            console.log(`🛑Таймер №${intervalId} зупинено...`);
            clearInterval(intervalId); //! функція очищення
        };
    }, [isRunning]);

    console.log("----------------------------------------------");
    console.log("☯️Тригер запуску, isRunning:", isRunning);
    console.log("⏱️Відлік часу, seconds:", seconds);
    console.log("----------------------------------------------");


    return (
        <div style={{ maxWidth: "50%", display: "grid", margin: "0 auto" }}>
            <h1 style={{ color: "darkgrey", textAlign: "center" }} >
                Вивчаємо useEffect-2 (Секундомір)
            </h1>
            <br />
            <h2 style={{ color: "darkblue", textAlign: "center" }} >
                Пройшло секунд: {seconds}
            </h2>
            
            <button onClick={() => setIsRunning(prevState => !prevState)} >
                {isRunning ? "Зупинити" : "Запустити"}
            </button>
            <br />
            <button onClick={() => setSeconds(0)}>
                Скинути
            </button>
        </div>
    );
};

//? ------ЖИТТЄВИЙ ЦИКЛ ТАЙМЕРА: ------
//? 1. Перший рендеринг
//?     isRunning = false
//?         useEffect запускається, перевіряє умову і завершує роботу.Таймер не створюється.

//? 2. Натискання «Запустити»
//?     isRunning: false → true
//?         useEffect створює інтервал за допомогою setInterval() і повертає функцію очищення.

//? 3. Робота секундоміра
//?     Щосекунди викликається setSeconds(prevSeconds => prevSeconds + 1).
//?         Значення seconds збільшується.

//? 4. Натискання «Зупинити»
//?     isRunning: true → false
//?         React викликає функцію очищення попереднього ефекту.Виконується clearInterval(intervalId).

//? 5. Ефект запускається повторно
//?         Умова if (!isRunning) є істинною.Новий інтервал не створюється.

//? 6. Розмонтування компонента ❗️❗️❗️
//?         Якщо компонент видаляється, React викликає функцію очищення активного ефекту.
//?         Якщо інтервал ще працює, його буде зупинено.

//! Саме тому використання useEffect з функцією очищення
//! дозволяє реалізувати поведінку, аналогічну componentWillUnmount(),
//! але при цьому надає більш широкі можливості.
