
import { useState, useEffect } from "react";

export const AppUseEffect = () => {
    const [value, setValue] = useState(0);
    const [showMessage, setShowMessage] = useState(false);

    console.log("1. Виконується рендер компонента");

    useEffect(() => {
        console.log("2. Виконується useEffect");
        document.title = `You clicked ${value} times`;
    });

    return (
        <div style={{ maxWidth: "50%", display: "grid", margin: "0 auto"}}>
            <h1>Вивчаємо useEffect</h1>

            <p>Кількість натискань: {value}</p>

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
                <p>Це повідомлення можна показати або приховати</p>
            )}
        </div>
    );
};