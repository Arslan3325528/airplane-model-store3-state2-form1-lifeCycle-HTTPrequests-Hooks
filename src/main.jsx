import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react'; //! Emotion Theme
import { theme } from '@/constants'; //! Emotion Theme

//todo: var.1  Підключення Normalize (npm i normalize.css)
// import 'normalize.css';  //! var.1 підключення тільки Normalize
// import './index1.css'; //! підключення тільки Reset CSS

//todo: var.2  Підключення Normalize (npm i -D postcss-normalize + postcss.config.js)
import './index.css'; //! підключення Normalize і Reset CSS

//! Aбсолютний шлях + Реекспорт
import {
  App, //! Aircrafts 

  AppColorBox, //! State

  AppSearchDebounce, //! Пошук елементів + Debounce
  AppSearchDebounceTextBacklight, //! Пошук елементів + Debounce + Підсвічування тексту

  AppUncontrolledElementsForm, //! 4.4.1.Неконтрольовані елементи форм
  AppControlledElementsForm, //! 4.4.2.Контрольовані елементи форм
  AppComplexForms, //! 4.4.3.Складні форми

  AppHTTPRequestBasics, //! 6.1.Основи HTTP-запитів у React
  AppHTTPRequestAdvanced, //! 6.2.Архітектура компонентів та станів з HTTP-запитами
  AppCounter
} from '@/components/App';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests-Hooks">
      <ThemeProvider theme={theme}>
        {/* //! Aircrafts */}
        {/* <App /> */}
        {/* //! State */}
        {/* <AppColorBox />  */}
        {/* //! Debounce */}
        {/* <AppSearchDebounce /> */}
        {/* <AppSearchDebounceTextBacklight /> */}
        {/* //! Forms */}
        {/* <AppUncontrolledElementsForm onSubmit={values => console.log(values)} /> */}
        {/* <AppControlledElementsForm /> */}
        {/* <AppComplexForms onSubmit={values => console.log(values)} /> */}
        {/* //! Life Cycle*/}
        {/* <AppComplexForms /> */}
        {/* //! HTTPRequest */}
        {/* <AppHTTPRequestBasics /> */}
        {/* <AppHTTPRequestAdvanced /> */}
        {/* //! Hooks */}
        <AppCounter />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
