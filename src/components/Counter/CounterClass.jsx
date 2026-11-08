// import React from "react";
import React, { Component } from "react";
import { Controls } from '@/components/Counter/Controls';
import css from "./Counter.module.css";


//! Компонент-клас
export class CounterClass extends Component {
    //! Дефолтні значення props
    static defaultProps = {
        initialValue: 9,
    }

    state = {
        //! Початковий стан лічильника з props
        value: this.props.initialValue,
    };

    handleIncrement = () => {
        console.log("+1");
        //! Оновлення значення від ПОПЕРЕДНЬОГО
        this.setState(prevState => {
            return {
                value: prevState.value + 1,
            };
        });
    };

    handleDecrement = () => {
        console.log("-1");
        //! Оновлення значення від ПОПЕРЕДНЬОГО
        this.setState(prevState => {
            return {
                value: prevState.value - 1,
            };
        });
    };


    render() {
        const { initialValue } = this.props; //! деструктурізуємо значення props
        const { value } = this.state; //! деструктурізуємо значення state

        console.log("-------------------- props & state --------------------");
        console.log("ℹ️initialValue:", initialValue);
        console.log("🔢value:", value);
        console.log("-------------------------------------------------------");

        return (
            <div className={css.counter}>
                CounterClass
                <span className={css.counterValue}>{this.state.value}</span>

                <Controls
                    onHandleIncrement={this.handleIncrement}
                    onHandleDecrement={this.handleDecrement}
                />
            </div>
        )
    }
};
