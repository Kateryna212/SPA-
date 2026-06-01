import { Pages } from './pages.js';
import { Store } from './state.js';

// Маршрути нашого магазину
const routes = {
    '/': Pages.home,
    '/about': Pages.about,
    '/contact': Pages.contact
};

export const Router = {
    // Функція віртуального переходу на іншу сторінку
    navigateTo(url) {
        window.history.pushState(null, null, url);
        Store.setState({ currentPage: url }); // Оновлення стану викличе перерендер сторінки
    },

    // Функція, яка бере потрібний HTML-шаблон та вставляє його в <main id="app">
    handleRouting() {
        const path = window.location.pathname;
        const renderFunc = routes[path] || routes['/']; // Якщо сторінку не знайдено — на Головну

        // Динамічно змінюємо заголовок вкладки в браузері під назву Easy click
        if (path === '/') document.title = "Каталог | Easy click";
        else if (path === '/about') document.title = "Про нас | Easy click";
        else if (path === '/contact') document.title = "Підтримка | Easy click";

        // Вставляємо згенерований HTML-код у головний контейнер
        document.getElementById('app').innerHTML = renderFunc();

        // Активуємо роботу форми, якщо ми на сторінці контактів
        Pages.initEventListeners(path);
    },

    init() {
        // Перехоплюємо кліки по кнопках меню (посиланнях з атрибутом data-link)
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault(); // Забороняємо стандартне перезавантаження браузера
                this.navigateTo(e.target.getAttribute('href'));
            }
        });

        // Обробка подій, коли користувач тисне стрілочки "Назад" / "Вперед" у браузері
        window.addEventListener('popstate', () => {
            Store.setState({ currentPage: window.location.pathname });
        });

        // Перший запуск роутера при відкритті сайту
        this.handleRouting();
    }
};
