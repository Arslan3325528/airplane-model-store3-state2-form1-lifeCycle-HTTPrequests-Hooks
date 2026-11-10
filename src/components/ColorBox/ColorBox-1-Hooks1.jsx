import { useState, useEffect } from 'react';
import css from "./ColorBox.module.css";


export function ColorBox1Hooks1({ colorBoxes }) {

    const [activeButtonIdx, setActiveButtonIdx] = useState(null); //! індекс обраного елемента
    const [selectedButtonsIdx, setSelectedButtonsIdx] = useState([]); //! масив індексів обраних елементів
    const [selectedColors, setSelectedColors] = useState([]); //! масив обраних елементів згідно масиву індексів


    //! Формуємо масив обраних елементів(кольорів) з useEffect
    //? ----- ЯК ПРАЦЮЄ ЦЕЙ КОД? -----
    //? Тут одночасно використовуються три важливі механізми React та JavaScript:
    //?     1. useEffect - виконує побічні ефекти після рендеру компонента.
    //?     2. setSelectedColors – оновлює стан компонента.
    //?     3. flatMap() і filter() - формують новий масив вибраних кольорів на основі індексів.
    
    useEffect(() => {
        //todo: var.1
        // const newSelectedColors = selectedButtonsIdx.flatMap(item =>
        //     colorBoxes.filter((el, idx) => idx === item)
        // );

        //todo: var.2
        // const newSelectedColors =
        //     selectedButtonsIdx.map(item =>
        //         colorBoxes.filter((el, idx) => idx === item)
        //     )
        //     .flat();

        //todo: var.3
        const newSelectedColors = selectedButtonsIdx.map(item => colorBoxes[item]);

        //! Оновлюємо масив обраних елементів selectedColors
        setSelectedColors(newSelectedColors);

    }, [selectedButtonsIdx, colorBoxes]);

    //? У useEffect є два основних аргументи:
    useEffect(
        () => {
            //! функция эффекта - Перший аргумент
        },
        ["залежності"] //! Другий аргумент
    );
    //? Перший аргумент – функція, яку React виконає після рендеру компонента.
    //? Другий аргумент – масив залежностей, який повідомляє React, 
    //? при зміні яких значень потрібно виконати ефект.
    //? --- Це означає: ---
    //?  - якщо зміниться selectedButtonsIdx, ефект виконається;
    //?  - якщо зміниться colorBoxes, ефект також виконається;
    //?  - якщо обидва значення залишаться незмінними, ефект повторно не виконається.
    //? --- Коли спрацьовує ефект уперше? ---
    //? При першому рендері, 
    //? а також при зміні будь якого елемента з масиву залежностей

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
                ColorBox1Hooks1 з useEffect
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
