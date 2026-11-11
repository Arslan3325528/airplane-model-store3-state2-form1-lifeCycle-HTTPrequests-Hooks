
import { useState, useEffect } from "react";


export const AppUseEffect1 = () => {
    const [value, setValue] = useState(0);
    const [showMessage, setShowMessage] = useState(false);

    console.log("1. Виконується рендер компонента");

    
    //* ----------------------------- useEffect -----------------------------
    //todo1: Аналог componentDidMount + componentDidUpdate
    //! ----- ЦЕЙ useEffect БУДЕ ВИКОНУВАТИСЯ: -----
        //! 1. Під час ПЕРШОГО відображення компонента (початкове монтування).
    //! 2. Після КОЖНОГО натискання на кнопку, коли оновлюється значення value.
    //! 3. Після ІНШОГО ОНОВЛЕННЯ компонента, якщо воно відбудеться.
    // useEffect(() => {
    //     console.log("2.1. useEffect виконується після кожного завершеного рендеру компонента");
    //     document.title = `Number of clicks: ${value}`;
    // });

    //todo2: Аналог componentDidMount
    //! ----- ЦЕЙ useEffect БУДЕ ВИКОНУВАТИСЯ: -----
    //! 1. Під час ПЕРШОГО відображення компонента (початкове монтування).
    // useEffect(() => {
    //     console.log("2.2. useEffect виконується ТІЛЬКИ після початкового монтування компонента");
    //     document.title = `Number of clicks: ${value}`;
    // }, []);

    //todo3: Аналог componentDidMount + componentDidUpdate(за умовою)
    //! ----- ЦЕЙ useEffect БУДЕ ВИКОНУВАТИСЯ: -----
    //! 1. Під час ПЕРШОГО відображення компонента (початкове монтування).
    //! 2. Після КОЖНОГО натискання на кнопку, коли оновлюється значення value.
    useEffect(() => {
        console.log("2.3. useEffect виконується після початкового монтування ТА після наступних рендерів, у яких змінилося значення value");
        document.title = `Number of clicks: ${value}`;
    }, [value]);
    //* ---------------------------------------------------------------------


    return (
        <div style={{ maxWidth: "50%", display: "grid", margin: "0 auto"}}>
            <h1
                style={{ color: "darkgrey", textAlign: "center" }}
            >
                Вивчаємо useEffect-1
            </h1>
            <br />

            <h2
                style={{ color: "darkblue", textAlign: "center" }}
            >
                Кількість натискань: {value}
            </h2>

            <button
                onClick={() => setValue(value + 1)}
            >
                Збільшити лічильник
            </button>
            <br />

            <button
                onClick={() => setShowMessage(!showMessage)}
            >
                Показати / приховати повідомлення
            </button>

            {showMessage && (
                <h3
                    style={{ color: "darkred", textAlign: "center" }}
                >
                    Це повідомлення можна показати або приховати
                </h3>
            )}
        </div>
    );
};
