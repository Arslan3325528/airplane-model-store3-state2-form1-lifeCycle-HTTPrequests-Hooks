import React, { useState } from "react";
import { Controls } from '@/components/Counter/Controls';
import css from "./Counter.module.css";


//! Функціональний компонент
export function Counter({ initialValue = 9 }) {

    const state = useState(0);
    console.log("⁉️state:", state);


    //! Початковий стан лічильника з props
    const [value, setValue] = useState(initialValue);

    //! Збільшення значення на 1
    const handleIncrement = () => {
        console.log("+1");
        //! Оновлення значення від ПОПЕРЕДНЬОГО
        setValue(prevValue => prevValue + 1);
    };

    //! Зменшення значення на 1
    const handleDecrement = () => {
        console.log("-1");
        //! Оновлення значення від ПОПЕРЕДНЬОГО
        setValue(prevValue => prevValue - 1);
    };

    console.log("-------------------- props & state --------------------");
    console.log("ℹ️ initialValue:", initialValue);
    console.log("🔢 value:", value);
    console.log("-------------------------------------------------------");

    return (
        <div className={css.counter}>
            <span className={css.counterValue}>{value}</span>

            <Controls
                onHandleIncrement={handleIncrement}
                onHandleDecrement={handleDecrement}
            />
        </div>
    );
};
