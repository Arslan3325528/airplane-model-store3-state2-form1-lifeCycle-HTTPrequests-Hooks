import css from "./Counter.module.css";

//? Підняття стану
//! Звичайний компонент
export function Controls({
    onHandleIncrement,
    onHandleDecrement
}) {
    return (
        <div className={css.counterControls}>
            <button
                className={css.buttonIncrement}
                type="button"
                onClick={onHandleIncrement}
            >+ 1
            </button>
            <button
                className={css.buttonDecrement}
                type="button"
                onClick={onHandleDecrement}
            >- 1
            </button>
        </div>
    );
};
