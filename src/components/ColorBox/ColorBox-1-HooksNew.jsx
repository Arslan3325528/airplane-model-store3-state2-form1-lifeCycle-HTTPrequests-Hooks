import React, { useState } from 'react';
import css from "./ColorBox.module.css";


export function ColorBox1HooksNew({ colorBoxes }) {
    const [activeButtonIdx, setActiveButtonIdx] = useState(null); //! індекс обраного елемента
    const [selectedButtonsIdx, setSelectedButtonsIdx] = useState([]); //! масив індексів обраних елементів
    const [selectedColors, setSelectedColors] = useState([]); //! масив обраних елементів згідно масиву індексів

    //! Формуємо масив обраних елементів(кольорів)
    const updateSelectedColorElements = (selectedIndices) => {
        const newSelectedColors = selectedIndices.flatMap(item =>
            colorBoxes.filter((el, idx) => idx === item)
        );
        setSelectedColors(newSelectedColors);
    };

    const setActiveIdx = index => {
        let newSelectedButtonsIdx; //! оновлений масив індексів обраних елементів

        //! Перевірка на наявність вже існуючого індексу
        if (selectedButtonsIdx.find(item => item === index) === undefined) {
            console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");
            console.log("Індекс активної кнопки:", index);
            setActiveButtonIdx(index);
            //! Формуємо оновлений масив індексів обраних елементів
            newSelectedButtonsIdx = [...selectedButtonsIdx, index]
                .sort((a, b) => a - b);
        } else {
            console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");
            //! Формуємо оновлений масив індексів обраних елементів
            newSelectedButtonsIdx = selectedButtonsIdx.filter(
                item => item !== index
            );
        };

        //! Оновлюємо масив масив індексів обраних елементів
        setSelectedButtonsIdx(newSelectedButtonsIdx);

        ///! Оновлюємо масив обраних елементів(кольорів)
        updateSelectedColorElements(newSelectedButtonsIdx);
    };

    //! Рахуємо кількість обраних кольорів:
    const numberOfColors = selectedButtonsIdx.length;

    console.log("------------------- ColorBox1HooksNew -----------------");
    console.log("🔘🆔Активна кнопка:", activeButtonIdx);
    console.log("ℹ️Індекси обраних кнопок:", selectedButtonsIdx);
    console.log("Ⓜ️Масив обраних елементів(кольорів):", selectedColors);
    console.log("🔢Кількість обраних кольорів:", numberOfColors);
    console.log("--------------------------------------------------------");

    return (
            <div className={css.mainContainer}>
                {/*//! Блок вибору кольорів */}
                <div className={css.colorBoxContainer}>
                    ✅ColorBox1HooksNew
                    <h2 className={css.colorBoxTitle}>Вибір кольорів</h2>
                    <p className={css.colorBoxDescription}>
                        Останній <u>доданий</u> колір:&nbsp;&nbsp;
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
                                // onClick={() => this.setActiveIdx(index)}
                                onClick={() => setActiveIdx(index)} //* New
                            >
                                {(selectedButtonsIdx.some(value => value === index))
                                    ? "✅On"
                                    : "🆓Off"
                                }
                            </button>
                        ))}
                    </div>
                </div>
    
                {/*//! Блок обраних кольорів */}
                <div className={css.selectedColorsContainer}>
                    <h2 className={css.colorBoxTitle}>Обрані кольори:</h2>
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
