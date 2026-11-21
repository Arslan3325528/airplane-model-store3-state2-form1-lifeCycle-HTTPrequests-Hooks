// import React, { Component } from "react";
import { ColorBox1Class } from '@/components/ColorBox/ColorBox-1-Class.jsx';
import { ColorBox1Hooks } from '@/components/ColorBox/ColorBox-1-Hooks.jsx';
import { ColorBox1HooksNew } from '@/components/ColorBox/ColorBox-1-HooksNew.jsx';

import { ColorBox1HooksUseEffect } from '@/components/ColorBox/ColorBox-1-HooksUseEffect.jsx';
import { ColorBox1HooksUseMemo } from '@/components/ColorBox/ColorBox-1-HooksUseMemo.jsx';

import { ColorBoxLifeCycleClass } from '@/components/ColorBoxLifeCycle/ColorBoxLifeCycleClass.jsx';
import { ColorBoxLifeCycleHooks } from '@/components/ColorBoxLifeCycle/ColorBoxLifeCycleHooks.jsx';
import { ColorBoxLifeCycleHooksUseRef } from '@/components/ColorBoxLifeCycle/ColorBoxLifeCycleHooksUseRef.jsx';


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
      
      {/* //! Hooks: useState*/}
      {/* <ColorBox1Class colorBoxes={colorBoxOptions} /> */}
      {/* <ColorBox1Hooks colorBoxes={colorBoxOptions} /> */}
      {/* <ColorBox1HooksNew colorBoxes={colorBoxOptions} /> */}

      {/* //! Hooks: useState + useEffect */}
      {/* <ColorBox1HooksUseEffect colorBoxes={colorBoxOptions} /> */}
      {/* //! Hooks: useState + useMemo */}
      {/* <ColorBox1HooksUseMemo colorBoxes={colorBoxOptions} /> */}
      
      {/* //! Hooks: useState + useEffect + кастомні хуки */}
      {/* <ColorBoxLifeCycleClass colorBoxes={colorBoxOptions} /> */}
      <ColorBoxLifeCycleHooks colorBoxes={colorBoxOptions} />
      {/* <ColorBoxLifeCycleHooksUseRef colorBoxes={colorBoxOptions} /> */}
    </>
  )
};

//! Перерендер компонентів відбувається у двох випадках:
//! 1.Коли до них приходять нові props
//! 2.Коли змінюється state
