import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks';
import css from "./ColorBoxLifeCycle.module.css";


export function ColorBoxLifeCycleHooksUseLocalStorage({ colorBoxes }) {
    //! 1.0.Ініціалізація state "activeButtonIdx" з localStorage
    // todo: var.1
    // const [activeButtonIdx, setActiveButtonIdx] = useState(() => {
    //     const saved = localStorage.getItem("activeButtonIdx");
    //     return saved !== null ? JSON.parse(saved) : null;
    // });
    // todo: var.2
    const [activeButtonIdx, setActiveButtonIdx] = useState(() =>
        JSON.parse(localStorage.getItem("activeButtonIdx")) ?? null
    );

    //! 2.Кастомний хук для роботи з localStorage
    const [selectedButtonsIdx, setSelectedButtonsIdx] = useLocalStorage("selectedIdx", []);

    //! 3(4).localStorage - Оновлення(синхронізація) localStorage при кожній зміні activeButtonIdx
    useEffect(() => {
        console.log("3️⃣❗️.componentDidUpdate --> useEffect3: [activeButtonIdx]");
        //todo: Оновлення localStorage "activeButtonIdx":
        localStorage.setItem("activeButtonIdx", JSON.stringify(activeButtonIdx));
    }, [activeButtonIdx]);


    //! 4(5).Функція вибору/видалення кольору
    const setActiveIdx = index => {
        //! Перевіряємо наявність елемента зі значенням <index> у масиві індексів обраних елементів [selectedButtonsIdx]
        const exists = selectedButtonsIdx.includes(index);
        if (exists) {
            console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");
        } else {
            console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");
        };
        //! Оновлюємо state
        setActiveButtonIdx(index);
        setSelectedButtonsIdx(prevState =>
            exists
                ? prevState.filter(item => item !== index)
                : [...prevState, index].sort((a, b) => a - b)
        );
    };


    console.log("0️⃣❗️.render - ColorBoxLifeCycleHooksUseLocalStorage");

    //! Формуємо масив обраних елементів(кольорів) не зберігаючи його в state:
    const selectedColors = selectedButtonsIdx.map(idx => colorBoxes[idx]);

    //! Рахуємо кількість обраних кольорів:
    const numberOfColors = selectedButtonsIdx.length;

    console.log("----------ColorBoxLifeCycleHooksUseLocalStorage----------");
    console.log("🔘🆔Активна кнопка:", activeButtonIdx);
    console.log("ℹ️Індекси обраних кнопок:", selectedButtonsIdx);
    console.log("Ⓜ️Масив обраних елементів(кольорів):", selectedColors);
    console.log("🔢Кількість обраних кольорів:", numberOfColors);
    console.log("---------------------------------------------------------");


    return (
        <div className={css.parentContainer}>
            ColorBoxLifeCycleHooksUseLocalStorage
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
                            : ""
                        }
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
