import { useState, useEffect } from "react";


export function AppUseEffect2() {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);


    useEffect(() => {
        console.log("useEffect: перевіряємо стан таймера");
        if (!isRunning) {
            return;
        };
        console.log("Таймер запущено!");
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);
        //! Очищаємо попередній інтервал
        return () => {
            console.log("Зупиняємо попередній інтервал");
            clearInterval(intervalId);
        };
    }, [isRunning]);


    return (
        <div>
            <h2>Секундомір</h2>

            <p>Пройшло секунд: {seconds}</p>

            <button
                onClick={() => setIsRunning(prevState => !prevState)}
            >
                {isRunning ? "Зупинити" : "Запустити"}
            </button>

            <button onClick={() => setSeconds(0)}>
                Скинути
            </button>
        </div>
    );
};
