import React, { Component } from 'react';
import css from "./Clock.module.css";


export class ClockClass extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  intervalId = null;

  componentDidMount() {
    console.log('1️⃣❗️❗️❗️.Clock componentDidMount');

    this.intervalId = setInterval(
      () => this.setState({ time: new Date().toLocaleTimeString() }),
      1000,
    );
    console.log(`✅Таймер ${this.intervalId} створено`);
  };


  componentDidUpdate(prevProps, prevState) {
    console.log("2️⃣❗️❗️❗️.Clock componentDidUpdate");
  };


  componentWillUnmount() {
    console.log('3️⃣❗️❗️❗️.Clock componentWillUnmount');
    //! Видалення таймера
    clearInterval(this.intervalId);
    console.log(`❌Таймер ${this.intervalId} видалено`);
  };


  render() {
    console.log("0️⃣❗️❗️❗️.Clock render");
    return (
      <div
        className={css.clockFace}>
        {this.state.time}
      </div>
    );
  };
};
