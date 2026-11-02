import React, { Component } from 'react';
import css from "./Counter.module.css";


export class CounterReactClass extends Component {
    state = {
        count: 0
    };

    handleClick = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    };

    render() {
        const { count } = this.state;

        return (
            <div className={css.counter}>
                Class
                <p className={css.counterValue}>
                    Кількість: {count}
                </p>

                <button
                    className={css.buttonIncrement}
                    type="button"
                    onClick={this.handleClick}
                >
                    Збільшити
                </button>

            </div>
        );
    };
};
