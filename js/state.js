// Початковий стан магазину Easy click
const state = {
    currentPage: '/',
    formData: {
        name: '',
        email: '',
        message: ''
    },
    isSubmitted: false // Чи надіслав користувач форму підтримки
};

// Масив функцій, які будуть автоматично перемальовувати інтерфейс при зміні стану
const listeners = [];

export const Store = {
    // Отримати поточну копію стану
    getState() {
        return { ...state };
    },

    // Змінити стан та повідомити систему про зміни
    setState(newState) {
        if (newState.currentPage !== undefined) state.currentPage = newState.currentPage;
        if (newState.formData !== undefined) state.formData = { ...state.formData, ...newState.formData };
        if (newState.isSubmitted !== undefined) state.isSubmitted = newState.isSubmitted;

        // Викликаємо перерендер сторінки
        listeners.forEach(listener => listener(state));
    },

    // Підписка на зміни стану (використовується в app.js)
    subscribe(listener) {
        listeners.push(listener);
    }
};
