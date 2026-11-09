// import React, { Component } from "react";
import { ColorBox1Class } from '@/components/ColorBox/ColorBox-1-Class.jsx';
import { ColorBox1Hooks } from '@/components/ColorBox/ColorBox-1-Hooks.jsx';
import { ColorBoxLifeCycle } from '@/components/ColorBoxLifeCycle/ColorBoxLifeCycle.jsx';


const colorBoxOptions = [
  { label: 'red', color: '#ff0000' },
  { label: 'orange', color: '#ffa500' },
  { label: 'yellow', color: '#ffff00' },
  { label: 'green', color: '#008000' },
  { label: 'lightblue', color: '#add8e6' },
  { label: 'blue', color: '#3131ff' },
  { label: 'violet', color: '#ee82ee' },
];

//! Звичайний компонент
export function AppColorBox() {
  return (
    <>
      {/* <ColorBox colorBoxes={colorBoxOptions} /> */}
      {/* <ColorBoxLifeCycle colorBoxes={colorBoxOptions} /> */}
      {/* //! Hooks */}
      <ColorBox1Class colorBoxes={colorBoxOptions} />
      <ColorBox1Hooks colorBoxes={colorBoxOptions} />
    </>
  )
};

//! Перерендер компонентів відбувається у двох випадках:
//! 1.Коли до них приходять нові props
//! 2.Коли змінюється state
