// import React, { Component } from 'react'; 
import React, { useState } from 'react'; //* New
import css from "./ColorBox.module.css";


// export class ColorBox1Hooks extends Component {
export function ColorBox1Hooks({ colorBoxes }) { //* New

    // state = {
    //     activeButtonIdx: null, //! індекс обраного елемента
    //     selectedButtonsIdx: [], //! масив індексів обраних елементів
    //     selectedColors: [] //! масив обраних елементів згідно масиву індексів
    // };

    //* New
    const [activeButtonIdx, setActiveButtonIdx] = useState(null); //! індекс обраного елемента
    const [selectedButtonsIdx, setSelectedButtonsIdx] = useState([]); //! масив індексів обраних елементів
    const [selectedColors, setSelectedColors] = useState([]); //! масив обраних елементів згідно масиву індексів


    //! Формуємо масив обраних елементів(кольорів)
    // updateSelectedColorElements = (arr) => {
    const updateSelectedColorElements = (arr) => { //* New
        // this.setState(prevState => ({
        //     selectedColors: prevState.selectedButtonsIdx.flatMap(item =>
        //         arr.filter((el, idx) => idx === item))
        // }));
        // setValue(prevValue => prevValue + 1);

        //* New ❓❓❓
        //! ----- Але так не працює вірно, чому? -----
        //! 1. Початковий стан: 
        //! selectedButtonsIdx = [], selectedColors = []
        //! 2. Користувач натискає кнопку №2
        //! Викликається setSelectedButtonsIdx([2]).
        //! 3. Відразу викликається updateSelectedColorElements(colorBoxes)
        //! Функція бачить старий масив []. 
        //! Тому selectedcolors залишається порожнім.
        //! 4. React виконує повторний рендер
        //! selectedButtonsIdx = [2], але selectedColors = [].
        //? 1.Формуємо масив обраних елементів selectedColors
        const newSelectedColors = selectedButtonsIdx.flatMap(item =>
            arr.filter((el, idx) => idx === item)
        );
        //? 2.Оновлюємо масив обраних елементів selectedColors
        setSelectedColors(newSelectedColors);
    };


    // setActiveIdx = index => {
    const setActiveIdx = index => {
        //! Перевірка на наявність вже існуючого індексу
        // if ((this.state.selectedButtonsIdx.find(item => item === index)) === undefined) {
        //     console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");
        //     this.setState({
        //         activeButtonIdx: index,
        //         selectedButtonsIdx: [...this.state.selectedButtonsIdx, index].sort((a, b) => a - b), //todo-1 ✅
        //     });
        //     console.log("Індекс активної кнопки:", index);
        // } else {
        //     console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");
        //     const indexElementRemoved = this.state.selectedButtonsIdx.find(item => item === index);
        //     console.log("Індекс видаляемого елемента:", indexElementRemoved);
        //     this.setState({
        //         selectedButtonsIdx: this.state.selectedButtonsIdx.filter(item => item !== index),
        //     });
        // };

        //* New
        if ((selectedButtonsIdx.find(item => item === index)) === undefined) {
            console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");
            console.log("Індекс активної кнопки:", index);
            setActiveButtonIdx(index);
            setSelectedButtonsIdx([...selectedButtonsIdx, index].sort((a, b) => a - b))
        } else {
            console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");
            const indexElementRemoved = selectedButtonsIdx.find(item => item === index);
            console.log("Індекс видаляемого елемента:", indexElementRemoved);
            setSelectedButtonsIdx(selectedButtonsIdx.filter(item => item !== index))
        };


        //! Оновлюємо масив обраних елементів(кольорів)
        // this.updateSelectedColorElements(this.props.colorBoxes);
        updateSelectedColorElements(colorBoxes); //* New
    };


    // render() {
    //     const { colorBoxes } = this.props; //! масив об'єктів всіх елементів(кольорів)
    //     const {
    //         activeButtonIdx,
    //         selectedButtonsIdx,
    //         selectedColors
    //     } = this.state;



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
                ColorBox1Hooks
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
    // }
};
