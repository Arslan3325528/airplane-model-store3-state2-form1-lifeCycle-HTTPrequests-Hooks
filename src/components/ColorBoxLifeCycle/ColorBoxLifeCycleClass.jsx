import React, { Component } from 'react';
import css from "./ColorBoxLifeCycle.module.css";


export class ColorBoxLifeCycleClass extends Component {
    state = {
        activeButtonIdx: null,
        //! 1.localStorage - Ініціалізація state з localStorage
        selectedButtonsIdx: JSON.parse(localStorage.getItem("selectedIdx")) || [], //! масив індексів обраних елементів
    };

    //! 2.localStorage - Створення запису в localStorage під час першого запуску якщо його немає
    componentDidMount() { //todo: звичайний метод класу
        console.log("1️⃣❗️.componentDidMount");
        const saved = localStorage.getItem("selectedIdx");
        if (!saved) {
            localStorage.setItem("selectedIdx", JSON.stringify([]));
        };

        //todo: Оновлення state "activeButtonIdx" при наявності значень в localStorage "activeButtonIdx" за допомогою  componentDidMount
        const activeButtonIdx = localStorage.getItem("activeButtonIdx");
        console.log("❇️activeButtonIdx:", activeButtonIdx);

        const parsedActiveButtonIdx = JSON.parse(activeButtonIdx);
        console.log("❇️❇️parsedActiveButtonIdx:", parsedActiveButtonIdx);

        //todo: Оновлення state "activeButtonIdx":
        if (parsedActiveButtonIdx !== null) {
            this.setState({ activeButtonIdx: parsedActiveButtonIdx })
        };
    };

    //! 3.localStorage - Оновлення(синхронізація) localStorage при кожній зміні selectedButtonsIdx
    componentDidUpdate(prevProps, prevState) { //todo: звичайний метод класу
        console.log("2️⃣❗️.componentDidUpdate");
        if (prevState.selectedButtonsIdx !== this.state.selectedButtonsIdx) {
            localStorage.setItem(
                "selectedIdx",
                JSON.stringify(this.state.selectedButtonsIdx)
            );
        };

        //todo: 1.Перевірка оновлення компонента у звичайному методі класу componentDidUpdate:
        const prevActiveButtonIdx = prevState.activeButtonIdx;
        const nextActiveButtonIdx = this.state.activeButtonIdx;

        console.log("🔙prevActiveButtonIdx:", prevActiveButtonIdx);
        console.log("🔜nextActiveButtonIdx:", nextActiveButtonIdx);

        if (prevActiveButtonIdx !== nextActiveButtonIdx) {
            console.log("❗️⭕️❗️Оновлено поле 'state.activeButtonIdx'");
            //todo: Оновлення localStorage "activeButtonIdx":
            localStorage.setItem("activeButtonIdx", JSON.stringify(nextActiveButtonIdx));
        };
    };

    setActiveIdx = index => {
        this.setState(prevState => {
            //! Перевіряємо наявність елемента зі значенням <index> у масиві індексів обраних елементів [selectedButtonsIdx]
            const exists = prevState.selectedButtonsIdx.includes(index);
            if (exists) {
                console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");
            } else {
                console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");
            }
            return {
                activeButtonIdx: index,
                selectedButtonsIdx: exists
                    ? prevState.selectedButtonsIdx.filter(item => item !== index)
                    : [...prevState.selectedButtonsIdx, index].sort((a, b) => a - b)
            };
        });
    };

    render() {
        console.log("0️⃣❗️.render - ColorBoxLifeCycleClass");
        const { colorBoxes } = this.props; //! масив об'єктів всіх елементів(кольорів)
        const { activeButtonIdx, selectedButtonsIdx } = this.state;

        //! Формуємо масив обраних елементів(кольорів) не зберігаючи його в state:
        const selectedColors = selectedButtonsIdx.map(idx => colorBoxes[idx]);

        //! Рахуємо кількість обраних кольорів:
        const numberOfColors = selectedButtonsIdx.length;

        console.log("-----------------ColorBoxLifeCycleClass-----------------");
        console.log("🔘🆔Активна кнопка:", activeButtonIdx);
        console.log("ℹ️Індекси обраних кнопок:", selectedButtonsIdx);
        console.log("Ⓜ️Масив обраних елементів(кольорів):", selectedColors);
        console.log("🔢Кількість обраних кольорів:", numberOfColors);
        console.log("--------------------------------------------------------");


        return (
            <div className={css.parentContainer}>
                ColorBoxLifeCycleClass
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
                                onClick={() => this.setActiveIdx(index)}
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
    }
};
