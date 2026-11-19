//! Для визначення кольору фону ЗАГОЛОВКА картки в залежності від значення "aircraftType"

export function getAircraftTitleBgColor(type) {
    switch (type) {
        case 'plane':
            return "planeTitle";
        case 'helicopter':
            return "helicopterTitle";
        case 'biplane':
            return "biplaneTitle";
        case 'tiltrotor':
            return "tiltrotorTitle";
        default:
            return "baseTitle";
    }
};
