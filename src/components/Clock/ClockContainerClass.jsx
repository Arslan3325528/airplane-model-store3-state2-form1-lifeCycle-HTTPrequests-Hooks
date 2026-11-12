import React, { Component } from 'react';
import { ClockClass} from './ClockClass.jsx';


export class ClockContainerClass extends Component {

    state = {
        isClockVisible: false
    };

    //! Створення та видалення компонента Clock
    toggleClock = () => {
        this.setState(prevState => ({
            isClockVisible: !prevState.isClockVisible
        }));
    };

    render() {
        const { isClockVisible } = this.state;

        return (
            <div style={{ maxWidth: "50%", display: "grid", margin: "20px auto", padding: 20, outline: "1px solid red" }}>
                <h2
                    style={{ color: "darkred", textAlign: "center" }}
                >
                    Демонстрація componentWillUnmount() на Class
                </h2>
                <br />

                <button
                    style={{ maxWidth: "50%", height: 50, margin: "0 auto" }}
                    type="button"
                    onClick={this.toggleClock}
                >
                    {isClockVisible
                        ? "❌ Видалити Clock"
                        : "✅ Створити Clock"
                    }
                </button>

                {/*//! Умовне монтування компонента Clock */}
                {isClockVisible && <ClockClass />}
            </div>
        );
    };
};
