import { Component } from 'react';
import css from "./ColorBox.module.css";


export class ColorBox1Class extends Component {
    state = {
        activeButtonIdx: null, //! індекс обраного елемента
        selectedButtonsIdx: [], //! масив індексів обраних елементів
        selectedColors: [] //! масив обраних елементів згідно масиву індексів
    };

    //! Формуємо масив обраних елементів(кольорів)
    //todo: var.1
    // updateSelectedColorElements = () => {
    //     this.setState(prevState => ({
    //         selectedColors: prevState.selectedButtonsIdx.flatMap(item =>
    //             this.props.colorBoxes.filter((el, idx) => idx === item))
    //     }));
    // };

    //todo: var.1
    updateSelectedColorElements = () => {
        //! Тут використовується функціональна форма setState,
        //! яка яка враховує попереднє оновлення state.selectedButtonsIdx у черзі
        this.setState(prevState => {
            console.log("⬅️prevState.selectedButtonsIdx:", prevState.selectedButtonsIdx);
            return {
                selectedColors: prevState.selectedButtonsIdx.flatMap(item =>
                    this.props.colorBoxes.filter((el, idx) => idx === item)
                )
            };
        });
    };

    setActiveIdx = index => {
        //! Перевірка на наявність вже існуючого індексу
        if ((this.state.selectedButtonsIdx.find(item => item === index)) === undefined) {
            console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");
            //! Тут використовується об'єктна форма setState:
            this.setState({
                activeButtonIdx: index,
                selectedButtonsIdx: [...this.state.selectedButtonsIdx, index].sort((a, b) => a - b), //todo-1 ✅
            });
            console.log("Індекс активної кнопки:", index);
        } else {
            console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");
            const indexElementRemoved = this.state.selectedButtonsIdx.find(item => item === index);
            console.log("Індекс видаляемого елемента:", indexElementRemoved);
            //! Тут використовується об'єктна форма setState:
            this.setState({
                selectedButtonsIdx: this.state.selectedButtonsIdx.filter(item => item !== index),
            });
        };

        //! Формуємо масив обраних елементів(кольорів)
        this.updateSelectedColorElements();
    };


    render() {
        const { colorBoxes } = this.props; //! масив об'єктів всіх елементів(кольорів)
        const {
            activeButtonIdx,
            selectedButtonsIdx,
            selectedColors
        } = this.state;

        //! Рахуємо кількість обраних кольорів:
        const numberOfColors = selectedButtonsIdx.length;

        console.log("-------------------- ColorBox1Class --------------------");
        console.log("🔘🆔Активна кнопка:", activeButtonIdx);
        console.log("ℹ️Індекси обраних кнопок:", selectedButtonsIdx);
        console.log("Ⓜ️Масив обраних елементів(кольорів):", selectedColors);
        console.log("🔢Кількість обраних кольорів:", numberOfColors);
        console.log("--------------------------------------------------------");

        return (
            <div className={css.mainContainer}>
                {/*//! Блок вибору кольорів */}
                <div className={css.colorBoxContainer}>
                    ColorBox1Class
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
                                onClick={() => this.setActiveIdx(index)}
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
    }
};
