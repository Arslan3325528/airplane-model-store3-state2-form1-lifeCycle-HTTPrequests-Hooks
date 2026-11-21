import React, { useState, useEffect, useRef } from 'react';
import css from "./ColorBoxLifeCycle.module.css";


export function ColorBoxLifeCycleHooksUseRef({ colorBoxes }) {
    const [activeButtonIdx, setActiveButtonIdx] = useState(null);

    //! 1.localStorage - Ініціалізація state з localStorage
    const [selectedButtonsIdx, setSelectedButtonsIdx] = useState(
        () => JSON.parse(localStorage.getItem("selectedIdx")) || []
    ); //! масив індексів обраних елементів

    //! Зберігаємо попередні значення state для імітації componentDidUpdate
    const prevState = useRef({
        selectedButtonsIdx,
        activeButtonIdx
    });

    //! Прапорець для пропуску першого запуску ефекту оновлення
    const isFirstRender = useRef(true);


    //! 2.localStorage - Створення запису в localStorage під час першого запуску якщо його немає
    useEffect(() => {
        console.log("1️⃣❗️.componentDidMount (useEffect)");

        const saved = localStorage.getItem("selectedIdx");

        if (!saved) {
            localStorage.setItem("selectedIdx", JSON.stringify([]));
        };

        //todo: Оновлення state "activeButtonIdx" при наявності значень в localStorage "activeButtonIdx"
        const activeButtonIdx = localStorage.getItem("activeButtonIdx");
        console.log("❇️activeButtonIdx:", activeButtonIdx);

        const parsedActiveButtonIdx = JSON.parse(activeButtonIdx);
        console.log("❇️❇️parsedActiveButtonIdx:", parsedActiveButtonIdx);

        //todo: Оновлення state "activeButtonIdx":
        if (parsedActiveButtonIdx !== null) {
            setActiveButtonIdx(parsedActiveButtonIdx);
        };
    }, []);


    //! 3.localStorage - Оновлення(синхронізація) localStorage при кожній зміні state
    useEffect(() => {
        //! Пропускаємо перший запуск, щоб імітувати componentDidUpdate
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        };

        console.log("2️⃣❗️.componentDidUpdate (useEffect)");

        //todo: Перевірка оновлення компонента у звичайному методі класу componentDidUpdate:
        const prevActiveButtonIdx = prevState.current.activeButtonIdx;
        const nextActiveButtonIdx = activeButtonIdx;

        console.log("🔙prevActiveButtonIdx:", prevActiveButtonIdx);
        console.log("🔜nextActiveButtonIdx:", nextActiveButtonIdx);

        //! 3.1. Оновлення localStorage "selectedIdx":
        if (prevState.current.selectedButtonsIdx !== selectedButtonsIdx) {
            localStorage.setItem(
                "selectedIdx",
                JSON.stringify(selectedButtonsIdx)
            );
        };

        //! 3.2. Оновлення localStorage "activeButtonIdx":
        if (prevActiveButtonIdx !== nextActiveButtonIdx) {
            console.log("❗️⭕️❗️Оновлено поле 'state.activeButtonIdx'");

            localStorage.setItem(
                "activeButtonIdx",
                JSON.stringify(nextActiveButtonIdx)
            );
        };

        //! Зберігаємо актуальні значення для наступного оновлення
        prevState.current = {
            selectedButtonsIdx,
            activeButtonIdx
        };
    }, [selectedButtonsIdx, activeButtonIdx]);


    const setActiveIdx = index => {
        //! Перевіряємо наявність елемента зі значенням <index> у масиві індексів обраних елементів [selectedButtonsIdx]
        const exists = selectedButtonsIdx.includes(index);

        if (exists) {
            console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");
        } else {
            console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");
        };

        setActiveButtonIdx(index);

        setSelectedButtonsIdx(prevState =>
            exists
                ? prevState.filter(item => item !== index)
                : [...prevState, index].sort((a, b) => a - b)
        );
    };


    console.log("0️⃣❗️.render");

    //! Формуємо масив обраних елементів(кольорів) не зберігаючи його в state:
    const selectedColors = selectedButtonsIdx.map(idx => colorBoxes[idx]);

    //! Рахуємо кількість обраних кольорів:
    const numberOfColors = selectedButtonsIdx.length;

    console.log("--------------ColorBoxLifeCycleHooksUseRef--------------");
    console.log("🔘🆔Активна кнопка:", activeButtonIdx);
    console.log("ℹ️Індекси обраних кнопок:", selectedButtonsIdx);
    console.log("Ⓜ️Масив обраних елементів(кольорів):", selectedColors);
    console.log("🔢Кількість обраних кольорів:", numberOfColors);
    console.log("--------------------------------------------------------");


    return (
        <div className={css.parentContainer}>
            ColorBoxLifeCycleHooksUseRef
            {/*//! Блок вибору кольорів */}
            <div className={css.colorBoxContainer}>
                <h2 className={css.colorBoxTitle}>Вибір кольорів</h2>

                <p className={css.colorBoxDescription}>
                    Останній <u>обраний</u> колір:&nbsp;&nbsp;
                    <span
                        className={css.colorBoxSelectedColor}
                        style={{
                            backgroundColor:
                                activeButtonIdx !== null
                                    ? colorBoxes[activeButtonIdx].color
                                    : "transparent"
                        }}
                    >
                        {activeButtonIdx !== null
                            ? colorBoxes[activeButtonIdx].label
                            : ""}
                    </span>
                </p>

                <div className={css.colorBox}>
                    {colorBoxes.map(({ label, color }, index) => (
                        <button
                            key={label}
                            className={css.colorBoxButton}
                            style={{ backgroundColor: color }}
                            onClick={() => setActiveIdx(index)}
                        >
                            {selectedButtonsIdx.includes(index) ? "✅On" : "🆓Off"}
                        </button>
                    ))}
                </div>
            </div>

            {/*//! Блок обраних кольорів */}
            <div className={css.selectedColorsContainer}>
                <h2 className={css.colorBoxTitle}>Обрані кольори з localStorage:</h2>

                <p className={css.colorBoxDescription}>
                    Кількість обраних кольорів:
                    <span className={css.colorBoxSelectedColor}>
                        {numberOfColors}
                    </span>
                </p>

                <div className={css.selectedColorsBox}>
                    {selectedColors.map(({ label, color }) => (
                        <div
                            key={label}
                            className={css.selectedColor}
                            style={{ backgroundColor: color }}
                        >
                            {color}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
