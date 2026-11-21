import { useState, useEffect } from 'react';


//! Кастомний хук для роботи з localStorage
export function useLocalStorage(key, initialValue) {
    //! 1. Лінива ініціалізація state з localStorage
    // todo: var.1
    // const [value, setValue] = useState(() => {
    //     const savedValue = localStorage.getItem(key);
    //     return savedValue !== null
    //         ? JSON.parse(savedValue)
    //         : initialValue;
    // });

    // todo: var.2
    const [value, setValue] = useState(() => {
        return JSON.parse(localStorage.getItem(key)) ?? initialValue;
    });

    //! 2. Синхронізація state з localStorage при кожній зміні value
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    //! 3. Повертаємо state та функцію його оновлення
    return [value, setValue];
};
