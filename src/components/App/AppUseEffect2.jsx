import { useState, useEffect } from "react";


export function AppUseEffect2() {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);

    //todo3: Аналог componentDidUpdate(за умовою) + componentWillUnmount
    //! ----- ЯК ЦЕ ПРАЦЮЄ? -----
    //! 1. Користувач натискає кнопку «Запустити».
    //! 2. isRunning стає true.
    //! 3. React виконує рендер.
    //! 4. useEffect запускає setInterval.
    //! 5. Кожну секунду викликається setSeconds, оновлюється інтерфейс.
    //! 6. При натисканні «Зупинити» isRunning стає false.
    //! 7. ❗️❗️❗️ Перед повторним виконанням ефекту React викликає
    //!    попередню функцію очищення clearInterval(intervalId), 
    ///!   яка зупиняє інтервал.
    useEffect(() => {
        console.log("⚠️useEffect спрацював");
        
        //? Виключаємо логіку на першому рендері
        if (!isRunning) {
            console.log("❌Таймер відключено.");
            return;
        };

        //* Запускаємо таймер
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);
        console.log(`✅Таймер №${intervalId} запущено!`);
        
        //! Очищаємо попередній інтервал
        return () => {
            console.log(`🛑Таймер №${intervalId} зупинено...`);
            clearInterval(intervalId);
        };
    }, [isRunning]);


    return (
        <div style={{ maxWidth: "50%", display: "grid", margin: "0 auto" }}>
            <h1
                style={{ color: "darkgrey", textAlign: "center" }}
            >
                Вивчаємо useEffect-2 (Секундомір)
            </h1>
            <br />

            <h2
                style={{ color: "darkblue", textAlign: "center" }}
            >
                Пройшло секунд: {seconds}
            </h2>
            
            <button
                onClick={() => setIsRunning(prevState => !prevState)}
            >
                {isRunning ? "Зупинити" : "Запустити"}
            </button>
            <br />
            <button onClick={() => setSeconds(0)}>
                Скинути
            </button>
        </div>
    );
};
