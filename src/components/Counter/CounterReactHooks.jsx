import { useState } from 'react';
import css from "./Counter.module.css";


export function CounterReactHooks() {
    //todo: 1A -------------------------------------------
    // const state = useState("A");
    // console.log("⁉️state:", state); //! ["A", ƒ]

    // const initValue = state[0];
    // const stateChangingFunction = state[1];
    // console.log("initValue:", initValue);
    //todo: 2A -------------------------------------------
    // const [initValue, setinitValue] = useState("A");
    // console.log("initValue:", initValue);
    //---------------------------------------------------

    const [count, setCount] = useState(0);
    console.log("🔢count:", count);

    const handleClick = () => {
        // stateChangingFunction("B"); //todo: 1A
        // setinitValue("C"); //todo: 2A

        //todo 01: Bикористовує count із замикання поточного рендеру
        //todo 01: Якщо count дорівнює 0, всі три виклики 
        //todo 01: використовують те саме значення з поточного замикання:
        console.log("count - ДО оновлення:", count); //! 0
        // setCount(count + 1); //! ⚠️
        console.log("count - ПІСЛЯ оновлення:", count); //! 0
        //! --- ЧОМУ count НЕ ЗМІНЮЄТЬСЯ УСЕРЕДИНІ СТАРОЇ ФУНКЦІЇ? ---
        //! Тому що setCount не переписує значення змінної count у поточному лексичному оточенні.
        //! У поточному виклику handleClick змінна count, як і раніше, дорівнює 0.
        //! Після завершення обробки React виконує повторний рендер, так як змінився state.
        //! І лише у новому виклику Counter() змінна count набуває значення 1.
        // setCount(count + 1);
        // setCount(count + 1);

        //todo 02: Передається React функція, яка отримує актуальне попереднє значення стану.
        //todo 02: Тут prevCount це не змінна з лексичного оточення компонента. 
        //todo 02: React передає їй попереднє значення стану (state) під час обробки оновлення.
        //todo 02: Особливо це важливо, якщо потрібно виконати кілька оновлень поспіль:
        setCount(prevCount => prevCount + 1); //* ✅
        // setCount(prevCount => prevCount + 1);
        // setCount(prevCount => prevCount + 1);
        
        //* ------ ВИСНОВОК: ------
        //* Кожне виконання функціонального компонента 
        //* створює нове лексичне оточення. 
        //* Обробники подій, створені у цьому оточенні,
        //* зберігають доступ до його змінних. 
        //* А useState дозволяє React зберігати значення стану 
        //* між цими виконаннями компонента.
    };

    return (
        <div className={css.counter}>
            CounterReactHooks
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
