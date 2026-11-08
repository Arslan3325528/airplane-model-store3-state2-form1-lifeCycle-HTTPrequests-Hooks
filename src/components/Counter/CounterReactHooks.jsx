import { useState } from 'react';
import css from "./Counter.module.css";


export function CounterReactHooks() {
    //todo: 1 -------------------------------------------
    // const state = useState("A");
    // console.log("⁉️state:", state); //! ["A", ƒ]

    // const initValue = state[0];
    // const stateChangingFunction = state[1];
    // console.log("initValue:", initValue);
    //todo: 2 -------------------------------------------
    // const [initValue, setinitValue] = useState("A");
    // console.log("initValue:", initValue);
    //---------------------------------------------------

    const [count, setCount] = useState(0);

    const handleClick = () => {
        // stateChangingFunction("B"); //todo: 1
        // setinitValue("C"); //todo: 2

        //todo 01: Використовується count із замикання поточного рендеру
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);
        //todo 02: Передається React функція, яка отримує актуальне попереднє значення стану
        // setCount(prevCount => prevCount + 1);
        // setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
    };

    return (
        <div className={css.counter}>
            Hooks
            <p className={css.counterValue}>
                Кількість: {count}
            </p>
            
            <button
                className={css.buttonIncrement}
                type="button"
                onClick={handleClick}
            >
                Збільшити
            </button>

        </div>
    );
};
