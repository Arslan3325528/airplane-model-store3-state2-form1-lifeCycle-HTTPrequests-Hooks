// import pikachuGif from "../../assets/pikachu-running.gif";
// або
// import pikachuGif from "/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests-Hooks/images/gif/pikachu-running.gif"; //! так НЕ ПРАЦЮЄ на GitHub!!!

import css from "./Loader.module.css";


export const Loader = () => {
    return (
        <div className={css.loaderBox} >
            {/* <p className={css.loaderText} >Зачекай трохи...</p> */}
            <img
                className={css.loaderImage}
                // src={pikachuGif}
                src={`${import.meta.env.BASE_URL}images/gif/pikachu-running.gif`}
                alt="Пикачу біжить"
            />
        </div>
    );
};

//?   import.meta.env — об'єкт із змінними оточеннями, які надає Vite.
//?   import.meta.env.BASE_URL — автоматично сформоване базове посилання на програму - '/airplane-model-store3-state2-form1-lifeCycle-HTTPrequests-Hooks/'.
//?   images / gif / pikachu - running.gif - шлях до GIF всередині папки public.
