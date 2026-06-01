// Початковий стан застосунку
const state = {
    currentPage: '/',
    formData: {
        name: '',
        email: '',
        message: ''
    },
    isSubmitted: false
};

// Список функцій-слухачів, які викликаються при зміні стану (Observer паттерн)
const listeners = [];

export const Store = {
    // Метод для отримання поточної копії стану
    getState() {
        return { ...state };
    },

    // Метод для зміни стану
    setState(newState) {
        // Оновлюємо змінні стану
        if (newState.currentPage !== undefined) state.currentPage = newState.currentPage;
        if (newState.formData !== undefined) state.formData = { ...state.formData, ...newState.formData };
        if (newState.isSubmitted !== undefined) state.isSubmitted = newState.isSubmitted;

        // Повідомляємо всі підписані компоненти про зміни (перерендер)
        listeners.forEach(listener => listener(state));
    },

    // Підписка на зміни стану
    subscribe(listener) {
        listeners.push(listener);
    }
};
