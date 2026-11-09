import { useState, useMemo } from 'react';
import css from "./ColorBox.module.css";


export function ColorBox1Hooks2({ colorBoxes }) {

    const [activeButtonIdx, setActiveButtonIdx] = useState(null); //! індекс обраного елемента
    const [selectedButtonsIdx, setSelectedButtonsIdx] = useState([]); //! масив індексів обраних елементів


    //! Формуємо масив обраних елементів(кольорів)
    const selectedColors = useMemo(() => {
        return selectedButtonsIdx.flatMap(item =>
            colorBoxes.filter((el, idx) => idx === item)
        );
    }, [selectedButtonsIdx, colorBoxes]);


    const setActiveIdx = index => {
        //! Перевірка на наявність вже існуючого індексу
        if (selectedButtonsIdx.find(item => item === index) === undefined) {
            console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");
            setActiveButtonIdx(index);
            setSelectedButtonsIdx(prevState =>
                [...prevState, index].sort((a, b) => a - b)
            );
            console.log("Індекс активної кнопки:", index);
        } else {
            console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");
            const indexElementRemoved = selectedButtonsIdx.find(item => item === index);
            console.log("Індекс видаляемого елемента:", indexElementRemoved);
            setSelectedButtonsIdx(prevState =>
                prevState.filter(item => item !== index)
            );
        };
    };


    //! Рахуємо кількість обраних кольорів:
    const numberOfColors = selectedButtonsIdx.length;

    console.log("----------------------------------------------");
    console.log("🔘🆔Активна кнопка:", activeButtonIdx);
    console.log("ℹ️Індекси обраних кнопок:", selectedButtonsIdx);
    console.log("Ⓜ️Масив обраних елементів(кольорів):", selectedColors);
    console.log("🔢Кількість обраних кольорів:", numberOfColors);
    console.log("----------------------------------------------");


    return (
        <div className={css.mainContainer}>
            {/*//! Блок вибору кольорів */}
            <div className={css.colorBoxContainer}>
                ColorBox1Hooks2
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
                            onClick={() => setActiveIdx(index)}
                        >
                            {selectedButtonsIdx.some(value => value === index)
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

