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
    const [initValue, setinitValue] = useState("A");
    console.log("initValue:", initValue);
    //---------------------------------------------------

    const [count, setCount] = useState(0);

    const handleClick = () => {
        // stateChangingFunction("B"); //todo: 1
        setinitValue("C"); //todo: 2
        // setCount(count + 1);
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
